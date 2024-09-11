import { IResource, Lazy, Names, Resource, SecretValue, aws_redshiftserverless } from 'aws-cdk-lib';
import { IRole } from 'aws-cdk-lib/aws-iam';
import { IKey } from 'aws-cdk-lib/aws-kms';
import { Construct } from 'constructs';

/**
 * A Redshift Serverless Namespace
 */
export interface INamespace extends IResource {
  /**
   * The namespace Arn
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
}

/**
 * Properties for defining a Redshift Serverless Namespace.
 */
export interface NamespaceProps {
  /**
   * The username of the administrator for the primary database created in the namespace.
   *
   * @default - no admin user
   */
  readonly adminUsername?: string;

  /**
   * The password of the administrator for the primary database created in the namespace.
   *
   * @default - no admin user
   */
  readonly adminUserPassword?: SecretValue;

  /**
   * The name of the primary database created in the namespace.
   *
   * @default - dev
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
   * @default - no final snapshot
   */
  readonly finalSnapshotName?: string;

  /**
   * How long to retain the final snapshot.
   *
   * @default - Retained indefinitely if finalSnapshotName is specified, otherwise no final snapshot
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
   * The name of the cost report.
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
  USER_ACTIVITY_LOG = 'useractivitylog'
}

/**
 * Attributes for importing a Redshift Serverless Namespace.
 */
export interface NamespaceAttributes {
  /**
   * The namespace Arn
   */
  readonly namespaceArn: string;
  /**
   * The namespace name
   */
  readonly namespaceName: string;

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
   * Import an existing namspace to the stack from its attributes.
   */
  public static fromNamespaceAttributes(
    scope: Construct,
    id: string,
    attrs: NamespaceAttributes,
  ): INamespace {
    class Import extends Resource implements INamespace {
      public readonly namespaceArn = attrs.namespaceArn;
      public readonly namespaceName = attrs.namespaceName;
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

  private readonly props: NamespaceProps;

  constructor(scope: Construct, id: string, props: NamespaceProps) {
    super(scope, id, {
      physicalName: props.namespaceName ?? Lazy.string({
        produce: () => Names.uniqueResourceName(this, { maxLength: 64, allowedSpecialCharacters: '-' }).toLowerCase(),
      }),
    });
    this.props = props;

    const namespace = this.createNamespace();

    this.namespaceArn = namespace.attrNamespaceNamespaceArn;
    this.namespaceName = namespace.attrNamespaceNamespaceName;

  }

  protected createNamespace(): aws_redshiftserverless.CfnNamespace {
    return new aws_redshiftserverless.CfnNamespace(this, 'Resource', {
      adminUsername: this.props.adminUsername,
      adminUserPassword: this.props.adminUserPassword?.unsafeUnwrap(),
      dbName: this.props.dbName,
      defaultIamRoleArn: this.props.defaultIamRole?.roleArn,
      finalSnapshotName: this.props.finalSnapshotName,
      finalSnapshotRetentionPeriod: this.props.finalSnapshotRetentionPeriod,
      iamRoles: Lazy.list({ produce: () => this.props.iamRoles?.map(role => role.roleArn) }, { omitEmpty: true }),
      kmsKeyId: this.props.kmsKey?.keyId,
      logExports: this.props.logExports,
      namespaceName: this.physicalName,
    });
  }
}
