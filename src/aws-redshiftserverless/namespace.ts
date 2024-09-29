import { IResource, Lazy, Names, Resource, SecretValue, Stack, Token, aws_redshiftserverless } from 'aws-cdk-lib';
import { IRole } from 'aws-cdk-lib/aws-iam';
import { IKey } from 'aws-cdk-lib/aws-kms';
import { Construct } from 'constructs';

/**
 * A Redshift Serverless Namespace
 */
export interface INamespace extends IResource {
  /**
   * The namespace ARN
   *
   * @attribute
   */
  readonly namespaceArn: string;

  /**
   * The namespace name
   *
   * @attribute
   */
  readonly namespaceName: string;

  /**
   * The namespace id
   *
   * @attribute
   */
  readonly namespaceId: string;
}

/**
 * Properties for defining a Redshift Serverless Namespace.
 */
export interface NamespaceProps {
  /**
   * The username of the administrator for the primary database created in the namespace.
   *
   * You must specify both `adminUsername` and `adminUserPassword`, or neither.
   *
   * @default - no admin user
   */
  readonly adminUsername?: string;

  /**
   * The password of the administrator for the primary database created in the namespace.
   *
   * You must specify both `adminUsername` and `adminUserPassword`, or neither.
   *
   * @default - no admin user
   */
  readonly adminUserPassword?: SecretValue;

  /**
   * The name of the primary database created in the namespace.
   *
   * @default - 'dev'
   */
  readonly dbName?: string;

  /**
   * The IAM role to set as a default in the namespace.
   *
   * @default - no default IAM role
   */
  readonly defaultIamRole?: IRole;

  /**
   * The name of the snapshot to be created before the namespace is deleted.
   *
   * If not specified, the final snapshot will not be taken.
   *
   * @default - no final snapshot
   */
  readonly finalSnapshotName?: string;

  /**
   * How long days to retain the final snapshot.
   *
   * You must set `finalSnapshotName` when you specify `finalSnapshotRetentionPeriod`.
   *
   * @default - Retained indefinitely if `finalSnapshotName` is specified, otherwise no final snapshot
   */
  readonly finalSnapshotRetentionPeriod?: number;

  /**
   * A list of IAM roles to associate with the namespace.
   *
   * @default - no IAM role associated
   */
  readonly iamRoles?: IRole[];

  /**
   * A Customer Managed Key used to encrypt your data.
   *
   * @default - use AWS managed key
   */
  readonly kmsKey?: IKey;

  /**
   * The types of logs the namespace can export.
   *
   * @default - no logs export
   */
  readonly logExports?: LogExport[];

  /**
   * The namespace name.
   *
   * @default - auto generate
   */
  readonly namespaceName?: string;
}

/**
 * The types of logs the namespace can export.
 */
export enum LogExport {
  /**
   * User log
   */
  USER_LOG = 'userlog',

  /**
   * Connection log
   */
  CONNECTION_LOG = 'connectionlog',

  /**
   * User activity log
   */
  USER_ACTIVITY_LOG = 'useractivitylog',
}

/**
 * Attributes for importing a Redshift Serverless Namespace.
 */
export interface NamespaceAttributes {
  /**
   * The namespace name
   */
  readonly namespaceName: string;
  /**
   * The namespace id
   */
  readonly namespaceId: string;
}

/**
 * Represents a Redshift Serverless Namespace construct in AWS CDK.
 *
 * @example
 *
 * const nameSpace = new Namespace(
 *   stack,
 *   'Namespace',
 *   {
 *     namespaceName: 'my-namespace',
 *   },
 * );
 */
export class Namespace extends Resource implements INamespace {
  /**
   * Imports an existing Namespace from attributes
   */
  public static fromNamespaceAttributes(scope: Construct, id: string, attrs: NamespaceAttributes): INamespace {
    class Import extends Resource implements INamespace {
      public readonly namespaceName = attrs.namespaceName;
      public readonly namespaceId = attrs.namespaceId;
      public readonly namespaceArn = Stack.of(this).formatArn({
        resource: 'redshift-serverless',
        service: 'namespace',
        resourceName: attrs.namespaceId,
      });
    }

    return new Import(scope, id);
  }

  /**
   * The namespace Arn
   */
  readonly namespaceArn: string;
  /**
   * The namespace name
   */
  readonly namespaceName: string;
  /**
   * The namespace id
   */
  readonly namespaceId: string;

  private readonly props: NamespaceProps;

  private readonly iamRoles: IRole[];

  constructor(scope: Construct, id: string, props: NamespaceProps) {
    super(scope, id, {
      physicalName:
        props.namespaceName ??
        Lazy.string({
          produce: () => Names.uniqueResourceName(this, { maxLength: 64, allowedSpecialCharacters: '-' }).toLowerCase(),
        }),
    });
    this.props = props;
    this.iamRoles = props.iamRoles ?? [];

    this.validateAdmin();
    this.validateDbName();
    this.validateFinalSnapshot();
    this.validateDefaultIamRole();
    this.validateNamespaceName();

    const namespace = this.createNamespace(this, 'Resource', {
      adminUsername: this.props.adminUsername,
      adminUserPassword: this.props.adminUserPassword?.unsafeUnwrap(),
      dbName: this.props.dbName,
      defaultIamRoleArn: this.props.defaultIamRole?.roleArn,
      finalSnapshotName: this.props.finalSnapshotName,
      finalSnapshotRetentionPeriod: this.props.finalSnapshotRetentionPeriod,
      iamRoles: Lazy.list({ produce: () => this.iamRoles.map(role => role.roleArn) }, { omitEmpty: true }),
      kmsKeyId: this.props.kmsKey?.keyId,
      logExports: this.props.logExports,
      namespaceName: this.physicalName,
    });

    this.namespaceArn = namespace.attrNamespaceNamespaceArn;
    this.namespaceName = namespace.attrNamespaceNamespaceName;
    this.namespaceId = namespace.attrNamespaceNamespaceId;
  }

  protected createNamespace(
    scope: Construct,
    id: string,
    props: aws_redshiftserverless.CfnNamespaceProps,
  ): aws_redshiftserverless.CfnNamespace {
    return new aws_redshiftserverless.CfnNamespace(scope, id, props);
  }

  /**
   * Validates admin settings.
   */
  private validateAdmin(): void {
    const adminUsername = this.props.adminUsername;
    const adminUserPassword = this.props.adminUserPassword;

    if (Token.isUnresolved(adminUsername)) {
      return;
    }

    if (
      (adminUsername !== undefined && adminUserPassword === undefined) ||
      (adminUsername === undefined && adminUserPassword !== undefined)
    ) {
      throw new Error('You must specify both `adminUsername` and `adminUserPassword`, or neither.');
    }

    if (adminUsername && !/^[a-zA-Z][a-zA-Z_0-9+.@-]*$/.test(adminUsername)) {
      throw new Error(
        `\`adminUsername\` must start with a letter and can only contain letters, numbers, and the special characters: _, +, ., @, -, got: ${adminUsername}.`,
      );
    }
  }

  /**
   * Validates a database name.
   */
  private validateDbName(): void {
    const dbName = this.props.dbName;

    if (Token.isUnresolved(dbName) || dbName === undefined) {
      return;
    }

    if (!/^[a-zA-Z][a-zA-Z_0-9+.@-]*$/.test(dbName) || dbName.length > 127) {
      throw new Error(
        `\`dbName\` must start with a letter, can only contain letters, numbers, and the special characters: _, +, ., @, -, and must not exceed 127 characters, got: ${dbName}.`,
      );
    }
  }

  /**
   * Validates final snapshot settings.
   */
  private validateFinalSnapshot(): void {
    const finalSnapshotName = this.props.finalSnapshotName;
    const finalSnapshotRetentionPeriod = this.props.finalSnapshotRetentionPeriod;

    if (Token.isUnresolved(finalSnapshotName)) return;

    if (finalSnapshotName) {
      if (!/^[a-z][a-z0-9]*(-[a-z0-9]+)*$/.test(finalSnapshotName) || finalSnapshotName.length > 255) {
        throw new Error(
          `\`finalSnapshotName\` must be between 1 and 255, consist only of lowercase alphanumeric characters or hyphens, with the first character as a letter, and it can't end with a hyphen or contain two consecutive hyphens, got: ${finalSnapshotName}.`,
        );
      }
    }

    if (!Token.isUnresolved(finalSnapshotRetentionPeriod) && finalSnapshotRetentionPeriod !== undefined) {
      if (!finalSnapshotName) {
        throw new Error('You must set `finalSnapshotName` when you specify `finalSnapshotRetentionPeriod`.');
      }

      if (finalSnapshotRetentionPeriod < 1 || finalSnapshotRetentionPeriod > 3653) {
        {
          throw new Error(
            `\`finalSnapshotRetentionPeriod\` must be between 1 and 3653, got: ${finalSnapshotRetentionPeriod}.`,
          );
        }
      }
    }
  }

  /**
   * Validates role settings.
   */
  private validateDefaultIamRole(): void {
    if (!this.props.defaultIamRole) {
      return;
    }

    if (!this.props.iamRoles || !this.props.iamRoles.includes(this.props.defaultIamRole)) {
      throw new Error('`defaultIamRole` must be included in `iamRoles`.');
    }
  }

  /**
   * Validates a namespace name.
   */
  private validateNamespaceName(): void {
    const namespaceName = this.props.namespaceName;

    if (Token.isUnresolved(namespaceName) || namespaceName === undefined) {
      return;
    }

    if (!/^[a-z0-9-]+$/.test(namespaceName) || namespaceName.length < 3 || namespaceName.length > 64) {
      throw new Error(
        `\`namespaceName\` must be between 3 and 64 characters, consist only of lowercase alphanumeric characters or hyphens, got: ${namespaceName}.`,
      );
    }
  }

  /**
   * Adds a role to the namespace
   *
   * @param role the role to add
   */
  public addIamRole(role: IRole): void {
    if (this.iamRoles.includes(role)) {
      throw new Error('An adding IAM Role is already attached to the namespace');
    }

    this.iamRoles.push(role);
  }
}
