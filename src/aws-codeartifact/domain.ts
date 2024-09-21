import { ArnFormat, IResource, ITaggableV2, Resource, Stack, TagManager, TagType } from 'aws-cdk-lib';
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
 * Represents an Codeartifact Domain
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
   *
   * @attribute
   */
  readonly encryptionKey?: IKey;

  /**
   * 12-digit account number of the AWS account that owns the domain that contains the Domain.
   *
   * @attribute
   */
  readonly domainOwner: string;
}

/**
 * A new or imported clustered database.
 */
abstract class DomainBase extends Resource implements IDomain {
  public abstract readonly domainArn: string;
  public abstract readonly domainName: string;
  public abstract readonly encryptionKeyArn?: string;
  public abstract readonly domainOwner: string;
}

export interface DomainAttributes {
  readonly domainArn: string;
  readonly domainName: string;
  readonly encryptionKeyArn?: string;
  readonly domainOwner: string;
}

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

export class Domain extends DomainBase implements IDomain, ITaggableV2 {
  public static fromDomainAttributes(scope: Construct, id: string, attrs: DomainAttributes): IDomain {
    class Import extends DomainBase {
      public readonly domainArn = attrs.domainArn;
      public readonly domainName = attrs.domainName;
      public readonly encryptionKeyArn = attrs.encryptionKeyArn;
      public readonly domainOwner = attrs.domainOwner;
    }

    return new Import(scope, id);
  }

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

  protected cfnResource: CfnDomain;
  private cfnResourceProps: CfnDomainProps;

  readonly cdkTagManager: TagManager;
  readonly domainArn: string;
  readonly domainName: string;
  readonly encryptionKeyArn?: string;
  readonly domainOwner: string;
  /**
   * Optional policy document that represents the resource policy of this repository
   *
   * If specified, addToResourcePolicy can be used to edit this policy.
   * Otherwise this method will no-op.
   */
  protected readonly policy?: PolicyDocument;

  constructor(scope: Construct, id: string, props: DomainProps) {
    super(scope, id);
    this.policy = new PolicyDocument();
    this.cdkTagManager = new TagManager(TagType.KEY_VALUE, 'AWS::CodeArtifact::Domain');

    const encryptionKey =
      props.encryptionKey ??
      new Key(this, 'Key', {
        description: `Key for CodeArtifact Domain ${props.domainName}`,
        alias: `codeartifact-domain/${props.domainName}`,
      });

    this.cfnResourceProps = {
      domainName: props.domainName,
      encryptionKey: encryptionKey?.keyArn,
      tags: this.cdkTagManager.renderTags(),
      permissionsPolicyDocument: this.policy,
    };
    this.cfnResource = this.createCfnResource();

    this.domainName = this.cfnResource.attrName;
    this.domainArn = this.cfnResource.attrArn;
    this.encryptionKeyArn = this.cfnResource.attrEncryptionKey;
    this.domainOwner = this.cfnResource.attrOwner;
  }

  protected createCfnResource(): CfnDomain {
    return new CfnDomain(this, 'Resource', this.cfnResourceProps);
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
        `Unable to add statement to IAM resource policy for Codeartifact domain: ${JSON.stringify(stack.resolve(this.domainArn))}`,
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
