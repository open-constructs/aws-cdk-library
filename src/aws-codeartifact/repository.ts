import { Annotations, ArnFormat, IResource, Lazy, Resource, Stack } from 'aws-cdk-lib';
import { CfnRepository, CfnRepositoryProps } from 'aws-cdk-lib/aws-codeartifact';
import {
  AddToResourcePolicyResult,
  Grant,
  GrantWithResourceOptions,
  IGrantable,
  PolicyDocument,
  PolicyStatement,
  principalIsOwnedResource,
} from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import { Domain, IDomain } from './domain';

const READ_ACTIONS = [
  'codeartifact:DescribePackageVersion',
  'codeartifact:DescribeRepository',
  'codeartifact:GetPackageVersionReadme',
  'codeartifact:GetRepositoryEndpoint',
  'codeartifact:ListPackageVersionAssets',
  'codeartifact:ListPackageVersionDependencies',
  'codeartifact:ListPackageVersions',
  'codeartifact:ListPackages',
  'codeartifact:ReadFromRepository',
];

const PUBLISH_ACTIONS = ['codeartifact:PublishPackageVersion', 'codeartifact:PutPackageMetadata'];

/**
 * Represents the supported external connections for CodeArtifact repositories.
 */
export enum RepositoryConnection {
  /** Python Package Index (PyPI) */
  PYTHON = 'public:pypi',
  /** Node Package Manager (npm) */
  NPM = 'public:npmjs',
  /** NuGet Gallery */
  NUGET = 'public:nuget-org',
  /** RubyGems */
  RUBY = 'public:ruby-gems-org',
  /** Crates.io (Rust) */
  RUST = 'public:crates-io',
  /** Maven Central Repository */
  MAVEN_CENTRAL = 'public:maven-central',
  /** Gradle Plugins */
  GRADLE_PLUGINS = 'public:gradle-plugins',
  /** Maven Google */
  MAVEN_GOOGLE = 'public:maven-google',
  /** Maven Apache */
  MAVEN_APACHE = 'public:maven-apache',
  /** Maven Atlassian */
  MAVEN_ATLASSIAN = 'public:maven-atlassian',
  /** Maven Eclipse */
  MAVEN_ECLIPSE = 'public:maven-eclipse',
  /** Maven JBoss */
  MAVEN_JBOSS = 'public:maven-jboss',
  /** Maven Spring */
  MAVEN_SPRING = 'public:maven-spring',
  /** Maven Spring Plugins */
  MAVEN_SPRING_PLUGINS = 'public:maven-spring-plugins',
}

/**
 * Represents an CodeArtifact Repository
 */
export interface IRepository extends IResource {
  /**
   * The ARN of the repository
   *
   * @attribute
   */
  readonly repositoryArn: string;

  /**
   * The name of the repository
   *
   * @attribute
   */
  readonly repositoryName: string;

  /**
   * The domain that contains the repository
   *
   * @attribute
   */
  readonly repositoryDomainName: string;

  /**
   * The domain owner of the repository
   *
   * @attribute
   */
  readonly repositoryDomainOwner: string;

  /**
   * The domain that contains the repository
   *
   */
  readonly domain: IDomain;

  /**
   * Adds a statement to the CodeArtifact repository resource policy.
   *
   * @param statement The policy statement to add
   */
  addToResourcePolicy(statement: PolicyStatement): AddToResourcePolicyResult;

  /**
   * Grants the given principal identity permissions to perform the actions on the repository.
   *
   * @param grantee The principal to grant permissions to
   * @param actions The actions to grant
   */
  grant(grantee: IGrantable, ...actions: string[]): Grant;

  /**
   * Grants the given principal identity permissions to perform the actions on the repository.
   *
   * @param grantee The principal to grant permissions to
   */
  grantReadAndPublish(grantee: IGrantable): Grant;

  /**
   * Grants the given principal identity permissions to perform the actions on the repository.
   *
   * @param grantee The principal to grant permissions to
   */
  grantRead(grantee: IGrantable): Grant;
}

/**
 * Properties for creating a new CodeArtifact repository.
 *
 */
export interface RepositoryProps {
  /**
   * The name of the repository
   */
  readonly repositoryName: string;
  /**
   * The domain that contains the repository
   */
  readonly domain: IDomain;
  /**
   * The description of the repository
   */
  readonly description?: string;
  /**
   * The connections to external repositories (like npmjs, pypi, etc.)
   *
   * You can use the AWS CLI to connect your CodeArtifact repository to an external repository by adding an external connection directly to the repository.
   * This will allow users connected to the CodeArtifact repository, or any of its downstream repositories, to fetch packages from the configured external repository.
   * Each CodeArtifact repository can only have one external connection.
   */
  readonly externalConnection?: RepositoryConnection;
  /**
   * A list of upstream Codeartifact repositories to associate with the repository.
   * The order of the upstream repositories in the list determines their priority order when CodeArtifact looks for a requested package version.
   * see https://docs.aws.amazon.com/codeartifact/latest/ug/repo-upstream-behavior.html#package-retention-intermediate-repositories
   *
   * @default - No upstream repositories
   */
  readonly upstreams?: IRepository[];
}

/**
 * A new or imported Codeartifact Repository.
 */
abstract class RepositoryBase extends Resource implements IRepository {
  /**
   * The ARN of the repository
   */
  public abstract readonly repositoryArn: string;
  /**
   * The name of the repository
   */
  public abstract readonly repositoryName: string;
  /**
   * The domain that contains the repository
   */
  public abstract readonly repositoryDomainName: string;
  /**
   * The domain owner of the repository
   */
  public abstract readonly repositoryDomainOwner: string;
  /**
   * The domain that contains the repository
   */
  public abstract readonly domain: IDomain;

  protected abstract readonly policy?: PolicyDocument;

  private isCrossEnvironmentGrantee(grantee: IGrantable): boolean {
    if (!principalIsOwnedResource(grantee.grantPrincipal)) {
      return false;
    }
    const thisStack = Stack.of(this);
    const identityStack = Stack.of(grantee.grantPrincipal);
    return thisStack.region !== identityStack.region || thisStack.account !== identityStack.account;
  }

  /**
   * Adds a statement to the CodeArtifact repository resource policy.
   * @param statement The policy statement to add
   */
  public addToResourcePolicy(statement: PolicyStatement): AddToResourcePolicyResult {
    if (!Resource.isOwnedResource(this)) {
      Annotations.of(this).addWarningV2(
        'NoResourcePolicyStatementAdded',
        `No statements added to imported resource ${this.repositoryArn}.`,
      );
      return { statementAdded: false };
    }

    if (!this.policy) {
      this.policy = new PolicyDocument();
    }
    this.policy.addStatements(statement);
    return { statementAdded: true, policyDependable: this.policy };
  }

  /**
   * Grants permissions to the specified grantee on this CodeArtifact repository.
   *
   * @param grantee The principal to grant permissions to
   * @param actions The actions to grant
   */
  public grant(grantee: IGrantable, ...actions: string[]): Grant {
    const crossEnvironment = this.isCrossEnvironmentGrantee(grantee);
    const grantOptions: GrantWithResourceOptions = {
      grantee,
      actions,
      resource: this,
      resourceArns: [this.repositoryArn],
      resourceSelfArns: crossEnvironment ? undefined : ['*'],
    };
    if (!crossEnvironment) {
      return Grant.addToPrincipalOrResource(grantOptions);
    } else {
      return Grant.addToPrincipalAndResource({
        ...grantOptions,
        resourceArns: [this.repositoryArn],
        resourcePolicyPrincipal: grantee.grantPrincipal,
      });
    }
  }

  /**
   * Grants read permissions to the specified grantee on this CodeArtifact repository.
   *
   * @param grantee The principal to grant read permissions to
   */
  public grantRead(grantee: IGrantable) {
    return this.grant(grantee, ...READ_ACTIONS);
  }

  /**
   * Grants read and publish permissions to the specified grantee on this CodeArtifact repository.
   *
   * @param grantee The principal to grant read and publish permissions to
   */
  public grantReadAndPublish(grantee: IGrantable) {
    return this.grant(grantee, ...READ_ACTIONS, ...PUBLISH_ACTIONS);
  }
}

/**
 * Represents the attributes of an existing CodeArtifact repository.
 */
export interface RepositoryAttributes {
  /**
   * The ARN (Amazon Resource Name) of the CodeArtifact repository.
   */
  readonly repositoryArn: string;
  /**
   * The name of the CodeArtifact repository.
   */
  readonly repositoryName: string;
  /**
   * The CodeArtifact domain associated with this repository.
   */
  readonly domain: IDomain;
}

/**
 * Deploys a CodeArtifact repository
 */
export class Repository extends RepositoryBase implements IRepository {
  /**
   * Creates an IRepository object from existing repository attributes.
   *
   * @param scope - The parent construct in which to create this repository reference.
   * @param id - The identifier of the construct.
   * @param attrs - The attributes of the repository to import.
   */
  public static fromRepositoryAttributes(scope: Construct, id: string, attrs: RepositoryAttributes): IRepository {
    class Import extends RepositoryBase {
      public readonly repositoryArn = attrs.repositoryArn;
      public readonly repositoryName = attrs.repositoryName;
      public readonly repositoryDomainName = attrs.domain.domainName;
      public readonly repositoryDomainOwner = attrs.domain.domainOwner;
      public readonly domain = attrs.domain;
      protected readonly policy?: PolicyDocument;
    }

    return new Import(scope, id);
  }

  /**
   * Creates an IRepository object from an existing repository ARN.
   *
   * @param scope - The parent construct in which to create this repository reference.
   * @param id - The identifier of the construct.
   * @param repositoryArn - The ARN of the repository to import.
   */
  public static fromRepositoryArn(scope: Construct, id: string, repositoryArn: string): IRepository {
    const repositoryResourceArnParts = Stack.of(scope).splitArn(repositoryArn, ArnFormat.SLASH_RESOURCE_NAME);
    if (
      repositoryResourceArnParts.resource !== 'repository' ||
      repositoryResourceArnParts.account === '' ||
      repositoryResourceArnParts.resourceName === undefined
    ) {
      throw new Error(`Expected a repository ARN, but got ${repositoryArn}`);
    }
    const repositoryNameParts = repositoryResourceArnParts.resourceName.split('/');
    if (repositoryNameParts.length !== 2) {
      throw new Error(
        `Expected a repository ARN with a domain and repository name (arn:aws:codeartifact:region-ID:account-ID:repository/my_domain/my_repo), but got ${repositoryArn}`,
      );
    }
    const domainName = repositoryNameParts[0];
    const repositoryName = repositoryNameParts[1];

    const domain = Domain.fromDomainArn(
      scope,
      'Domain',
      Stack.of(scope).formatArn({
        resource: 'domain',
        service: 'codeartifact',
        resourceName: domainName,
      }),
    );

    return Repository.fromRepositoryAttributes(scope, id, {
      repositoryArn: repositoryArn,
      repositoryName: repositoryName,
      domain,
    });
  }

  /**
   * (internal) The CloudFormation resource representing this CodeArtifact repository.
   */
  protected cfnResource: CfnRepository;
  /**
   * The properties used to create the CloudFormation resource for this repository.
   */
  protected cfnResourceProps: CfnRepositoryProps;

  /**
   * The ARN (Amazon Resource Name) of this CodeArtifact repository.
   */
  readonly repositoryArn: string;
  /**
   * The name of this CodeArtifact repository.
   */
  readonly repositoryName: string;
  /**
   * The domain that contains this repository.
   */
  readonly repositoryDomainName: string;
  /**
   * The domain owner of this repository.
   */
  readonly repositoryDomainOwner: string;
  /**
   * The domain that contains this repository.
   */
  readonly domain: IDomain;
  protected readonly policy: PolicyDocument;
  protected readonly upstreams: IRepository[];

  constructor(scope: Construct, id: string, props: RepositoryProps) {
    super(scope, id);

    this.policy = new PolicyDocument();
    this.upstreams = props.upstreams ?? [];

    this.cfnResourceProps = {
      domainName: props.domain.domainName,
      repositoryName: props.repositoryName,
      description: props.description,
      domainOwner: props.domain.domainOwner,
      externalConnections: props.externalConnection !== undefined ? [props.externalConnection] : undefined, // only 1 allowed
      permissionsPolicyDocument: Lazy.any({ produce: () => this.policy?.toJSON() }),
      upstreams: Lazy.list({ produce: () => this.renderUpstreams() }, { omitEmpty: true })
    };

    this.cfnResource = this.createCfnResource();

    this.repositoryArn = this.cfnResource.attrArn;
    this.repositoryName = this.cfnResource.attrName;
    this.repositoryDomainName = this.cfnResource.attrDomainName;
    this.repositoryDomainOwner = this.cfnResource.attrDomainOwner;

    this.domain = Domain.fromDomainArn(
      this,
      'Domain',
      Stack.of(this).formatArn({
        resource: 'domain',
        service: 'codeartifact',
        account: this.repositoryDomainOwner,
        resourceName: this.repositoryDomainName,
      }),
    );
  }

  protected createCfnResource(): CfnRepository {
    return new CfnRepository(this, 'Resource', this.cfnResourceProps);
  }

  protected renderUpstreams(): string[] {
    return this.upstreams.map(repo => repo.repositoryName);
  }
}
