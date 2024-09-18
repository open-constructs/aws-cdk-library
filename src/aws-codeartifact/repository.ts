import { IResource, ITaggableV2, Resource, Stack, TagManager, TagType } from 'aws-cdk-lib';
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
import { IDomain } from './domain';

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

const PUBLUSH_ACTIONS = ['codeartifact:PublishPackageVersion', 'codeartifact:PutPackageMetadata'];

export enum RepositoryConnection {
  PYTHON = 'public:pypi',
  NPM = 'public:npmjs',
  // TODO: add connections from https://docs.aws.amazon.com/codeartifact/latest/ug/external-connection.html#supported-public-repositories
}

/**
 * Represents an Codeartifact Repository
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
   * The domain name that contains the repository
   *
   * @attribute
   */
  readonly domainName: string;

  /**
   * 12-digit account number of the AWS account that owns the domain that contains the repository.
   *
   * @attribute
   */
  readonly domainOwner: string;
}

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
   * The connections to external repositories
   *
   * You can use the AWS CLI to connect your CodeArtifact repository to an external repository by adding an external connection directly to the repository. This will allow users connected to the CodeArtifact repository, or any of its downstream repositories, to fetch packages from the configured external repository. Each CodeArtifact repository can only have one external connection.
   */
  readonly externalConnection?: RepositoryConnection;
}

export class Repository extends Resource implements IRepository, ITaggableV2 {
  protected cfnResource: CfnRepository;
  protected cfnResourceProps: CfnRepositoryProps;

  readonly cdkTagManager: TagManager;
  readonly repositoryArn: string;
  readonly repositoryName: string;
  readonly domainName: string;
  readonly domainOwner: string;
  /**
   * Optional policy document that represents the resource policy of this repository
   *
   * If specified, addToResourcePolicy can be used to edit this policy.
   * Otherwise this method will no-op.
   */
  protected readonly policy?: PolicyDocument;

  constructor(scope: Construct, id: string, props: RepositoryProps) {
    super(scope, id);
    this.policy = new PolicyDocument();

    this.cdkTagManager = new TagManager(TagType.KEY_VALUE, 'AWS::CodeArtifact::Repository');

    this.cfnResourceProps = {
      domainName: props.domain.domainName,
      repositoryName: props.repositoryName,
      description: props.description,
      domainOwner: props.domain.domainOwner,
      tags: this.cdkTagManager.renderTags(),
      externalConnections: props.externalConnection !== undefined ? [props.externalConnection] : undefined, // only 1 allowed
      permissionsPolicyDocument: this.policy,
      upstreams: undefined, // TODO: add upstreams
    };

    this.cfnResource = this.createCfnResource();

    this.repositoryArn = this.cfnResource.attrArn;
    this.repositoryName = this.cfnResource.attrName;
    this.domainName = this.cfnResource.attrDomainName;
    this.domainOwner = this.cfnResource.attrDomainOwner;
  }

  protected createCfnResource(): CfnRepository {
    return new CfnRepository(this, 'Resource', this.cfnResourceProps);
  }

  /**
   * Adds a statement to the KMS key resource policy.
   * @param statement The policy statement to add
   * @param allowNoOp If this is set to `false` and there is no policy
   * defined (i.e. external key), the operation will fail. Otherwise, it will
   * no-op.
   */
  public addToResourcePolicy(statement: PolicyStatement, allowNoOp = true): AddToResourcePolicyResult {
    const stack = Stack.of(this);

    if (!this.policy) {
      if (allowNoOp) {
        return { statementAdded: false };
      }
      throw new Error(
        `Unable to add statement to IAM resource policy for Codeartifact repository: ${JSON.stringify(stack.resolve(this.repositoryArn))}`,
      );
    }

    this.policy.addStatements(statement);
    return { statementAdded: true, policyDependable: this.policy };
  }

  private isCrossEnvironmentGrantee(grantee: IGrantable): boolean {
    if (!principalIsOwnedResource(grantee.grantPrincipal)) {
      return false;
    }
    const thisStack = Stack.of(this);
    const identityStack = Stack.of(grantee.grantPrincipal);
    return thisStack.region !== identityStack.region || thisStack.account !== identityStack.account;
  }

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

  public grantRead(grantee: IGrantable) {
    return this.grant(grantee, ...READ_ACTIONS);
  }

  public grantReadAndPublish(grantee: IGrantable) {
    return this.grant(grantee, ...READ_ACTIONS, ...PUBLUSH_ACTIONS);
  }
}