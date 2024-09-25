import {
  Annotations,
  ArnFormat,
  IResource,
  ITaggableV2,
  Lazy,
  Resource,
  Stack,
  TagManager,
  TagType,
} from 'aws-cdk-lib';
import { CfnDomain, CfnDomainProps } from 'aws-cdk-lib/aws-codeartifact';
import {
  AddToResourcePolicyResult,
  Grant,
  GrantWithResourceOptions,
  IGrantable,
  PolicyDocument,
  PolicyStatement,
  principalIsOwnedResource,
} from 'aws-cdk-lib/aws-iam';
import { IKey, Key } from 'aws-cdk-lib/aws-kms';
import { Construct } from 'constructs';

/**
 * Represents a Codeartifact Domain
 */
export interface IDomain extends IResource {
  /**
   * The ARN of the Domain
   *
   * @attribute
   */
  readonly domainArn: string;

  /**
   * The name of the Domain
   *
   * @attribute
   */
  readonly domainName: string;

  /**
   * The key used to encrypt the Domain
   * TODO: how to expose both the CFN @attribute (srting) and this IKEy? see AWS CDK Design guidelines
   *
   */
  readonly encryptionKey?: IKey;

  /**
   * 12-digit account number of the AWS account that owns the domain that contains the Domain.
   *
   * @attribute
   */
  readonly domainOwner: string;

  /**
   * Adds a statement to the Codeartifact domain resource policy.
   * @param statement The policy statement to add
   */
  addToResourcePolicy(statement: PolicyStatement): AddToResourcePolicyResult;

  /**
   * Grants permissions to the specified grantee on this CodeArtifact domain.
   *
   * It handles both same-environment and cross-environment scenarios:
   * - For same-environment grants, it adds the permissions to the principal or resource.
   * - For cross-environment grants, it adds the permissions to both the principal and the resource.
   *
   * @param grantee - The principal to grant permissions to.
   * @param actions - The actions to grant. These should be valid CodeArtifact actions.
   */
  grant(grantee: IGrantable, ...actions: string[]): Grant;

  /**
   * Grants contribute permissions to the specified grantee on this CodeArtifact domain.
   *
   * @param grantee - The principal to grant contribute permissions to.
   */
  grantContribute(grantee: IGrantable): Grant;
}

/**
 * A new or imported Codeartifact Domain.
 */
abstract class DomainBase extends Resource implements IDomain {
  /**
   * The ARN (Amazon Resource Name) of the CodeArtifact domain.
   */
  public abstract readonly domainArn: string;

  /**
   * The name of the CodeArtifact domain.
   */
  public abstract readonly domainName: string;

  /**
   * The AWS KMS encryption key associated with the domain, if any.
   */
  public abstract readonly encryptionKey?: IKey;

  /**
   * The AWS account ID that owns the domain.
   */
  public abstract readonly domainOwner: string;

  /**
   * Optional policy document that represents the resource policy of this key.
   */
  protected abstract readonly policy?: PolicyDocument;

  /**
   * Adds a statement to the Codeartifact domain resource policy.
   * @param statement The policy statement to add
   */
  public addToResourcePolicy(statement: PolicyStatement): AddToResourcePolicyResult {
    const stack = Stack.of(this);

    if (!this.policy) {
      Annotations.of(stack).addWarningV2(
        'NoResourcePolicyStatementAdded',
        `No statements added to imported resource ${this.domainArn}.`,
      );
      return { statementAdded: false };
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

  /**
   * Grants permissions to the specified grantee on this CodeArtifact domain.
   *
   * It handles both same-environment and cross-environment scenarios:
   * - For same-environment grants, it adds the permissions to the principal or resource.
   * - For cross-environment grants, it adds the permissions to both the principal and the resource.
   *
   * @param grantee - The principal to grant permissions to.
   * @param actions - The actions to grant. These should be valid CodeArtifact actions.
   */
  public grant(grantee: IGrantable, ...actions: string[]): Grant {
    const crossEnvironment = this.isCrossEnvironmentGrantee(grantee);
    const grantOptions: GrantWithResourceOptions = {
      grantee,
      actions,
      resource: this,
      resourceArns: [this.domainArn],
      resourceSelfArns: crossEnvironment ? undefined : ['*'],
    };
    if (!crossEnvironment) {
      return Grant.addToPrincipalOrResource(grantOptions);
    } else {
      return Grant.addToPrincipalAndResource({
        ...grantOptions,
        resourceArns: [this.domainArn],
        resourcePolicyPrincipal: grantee.grantPrincipal,
      });
    }
  }

  /**
   * Grants contribute permissions to the specified grantee on this CodeArtifact domain.
   *
   * @param grantee - The principal to grant contribute permissions to.
   */
  public grantContribute(grantee: IGrantable) {
    return this.grant(
      grantee,
      'codeartifact:CreateRepository',
      'codeartifact:DescribeDomain',
      'codeartifact:GetAuthorizationToken',
      'codeartifact:GetDomainPermissionsPolicy',
      'codeartifact:ListRepositoriesInDomain',
      'sts:GetServiceBearerToken',
    );
  }
}

/**
 * Interface representing the attributes of a CodeArtifact domain.
 */
export interface DomainAttributes {
  /**
   * The ARN (Amazon Resource Name) of the CodeArtifact domain.
   */
  readonly domainArn: string;

  /**
   * The name of the CodeArtifact domain.
   */
  readonly domainName: string;

  /**
   * The AWS KMS encryption key associated with the domain, if any.
   */
  readonly encryptionKey?: IKey;

  /**
   * The AWS account ID that owns the domain.
   */
  readonly domainOwner: string;
}

/**
 * Construction properties for `Domain`.
 */
export interface DomainProps {
  /**
   * The name of the Domain
   */
  readonly domainName: string;
  /**
   * The key used to encrypt the Domain
   */
  readonly encryptionKey?: IKey;
}

/**
 * Deploys a CodeArtifact domain.
 */
export class Domain extends DomainBase implements IDomain, ITaggableV2 {
  /**
   * Creates a Domain object from existing domain attributes.
   *
   * @param scope The parent construct.
   * @param id The construct id.
   * @param attrs The attributes of the domain to import.
   */
  public static fromDomainAttributes(scope: Construct, id: string, attrs: DomainAttributes): IDomain {
    class Import extends DomainBase {
      public readonly domainArn = attrs.domainArn;
      public readonly domainName = attrs.domainName;
      public readonly encryptionKey = attrs.encryptionKey;
      public readonly domainOwner = attrs.domainOwner;
      protected readonly policy?: PolicyDocument | undefined = undefined;
    }

    return new Import(scope, id);
  }

  /**
   * Creates an IDomain object from an existing CodeArtifact domain ARN.
   *
   * @param scope The parent construct.
   * @param id The construct id.
   * @param domainArn - The ARN (Amazon Resource Name) of the existing CodeArtifact domain.
   */
  public static fromDomainArn(scope: Construct, id: string, domainArn: string): IDomain {
    const domainResourceArnParts = Stack.of(scope).splitArn(domainArn, ArnFormat.SLASH_RESOURCE_NAME);
    if (
      domainResourceArnParts.resource !== 'domain' ||
      domainResourceArnParts.account === undefined ||
      domainResourceArnParts.resourceName === undefined
    ) {
      throw new Error(`Expected a domain ARN, but got ${domainArn}`);
    }
    return Domain.fromDomainAttributes(scope, id, {
      domainArn,
      domainName: domainResourceArnParts.resourceName,
      domainOwner: domainResourceArnParts.account,
    });
  }

  /**
   * (internal) The CloudFormation resource representing this CodeArtifact domain.
   */
  protected cfnResource: CfnDomain;
  /**
   * The properties used to create the CloudFormation resource for this domain.
   */
  private cfnResourceProps: CfnDomainProps;

  /**
   * TagManager to set, remove and format tags
   */
  readonly cdkTagManager: TagManager;
  /**
   * The ARN (Amazon Resource Name) of this CodeArtifact domain.
   */
  readonly domainArn: string;
  /**
   * The name of this CodeArtifact domain.
   */
  readonly domainName: string;
  /**
   * The AWS KMS encryption key associated with this domain, if any.
   */
  readonly encryptionKey?: IKey;
  /**
   * The AWS account ID that owns this domain.
   */
  readonly domainOwner: string;
  /**
   * Optional policy document that represents the resource policy of this repository
   *
   * If specified, addToResourcePolicy can be used to edit this policy.
   * Otherwise this method will no-op.
   */
  protected policy?: PolicyDocument;

  constructor(scope: Construct, id: string, props: DomainProps) {
    super(scope, id);
    this.cdkTagManager = new TagManager(TagType.KEY_VALUE, 'AWS::CodeArtifact::Domain');
    this.policy = new PolicyDocument();

    const encryptionKey =
      props.encryptionKey ??
      new Key(this, 'Key', {
        description: `Key for CodeArtifact Domain ${props.domainName}`,
        alias: `codeartifact-domain/${props.domainName}`,
      });

    this.cfnResourceProps = {
      domainName: props.domainName,
      encryptionKey: encryptionKey?.keyArn,
      permissionsPolicyDocument: Lazy.any({ produce: () => this.policy?.toJSON() }),
    };
    this.cfnResource = this.createCfnResource();

    this.domainName = this.cfnResource.attrName;
    this.domainArn = this.cfnResource.attrArn;
    this.encryptionKey = encryptionKey;
    this.domainOwner = this.cfnResource.attrOwner;
  }

  protected createCfnResource(): CfnDomain {
    return new CfnDomain(this, 'Resource', this.cfnResourceProps);
  }
}
