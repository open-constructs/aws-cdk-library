import {
  IResource,
  Lazy,
  Names,
  Resource,
  Stack,
  aws_elasticache,
  SecretValue,
  Token,
  aws_iam,
  ArnFormat,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Engine } from './util';

/**
 * An User
 */
export interface IUser extends IResource {
  /**
   * The ARN of the user.
   *
   * @attribute
   */
  readonly userArn: string;
  /**
   * The ID of the user.
   *
   * @attribute
   */
  readonly userId: string;
  /**
   * The name of the user.
   *
   * @attribute
   */
  readonly userName: string;

  /**
   * Grant the given identity the specified actions
   */
  grant(grantee: aws_iam.IGrantable, ...actions: string[]): aws_iam.Grant;

  /**
   * Grant the given identity connection access to the cache.
   */
  grantConnect(grantee: aws_iam.IGrantable): aws_iam.Grant;
}

/**
 * Authentication type.
 */
export enum AuthenticationType {
  /**
   * Password required.
   */
  PASSWORD = 'password',

  /**
   * No password required.
   */
  NO_PASSWORD_REQUIRED = 'no-password-required',

  /**
   * IAM authentication.
   */
  IAM = 'iam',
}

/**
 * Properties for defining an User.
 */
export interface UserProps {
  /**
   * The username of the user.
   *
   * The name can have up to 120 characters, and must not contain spaces.
   *
   * \`userId\` and \`userName\` must be same When \`authenticationType\` is set to \`AuthenticationType.IAM\`.
   *
   * @default - same value as `userId`
   * @see https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/auth-iam.html
   */
  readonly userName?: string;

  /**
   * The ID of the user.
   *
   * \`userGroupId\` can have up to 40 characters.
   *
   * \`userId\` must consist only of alphanumeric characters or hyphens, with the first character as a letter,
   * and it can't end with a hyphen or contain two consecutive hyphens.
   *
   * \`userId\` and \`userName\` must be same When \`authenticationType\` is set to \`AuthenticationType.IAM\`.
   *
   * @default - auto generate
   */
  readonly userId?: string;

  /**
   * Access permissions string used for this user.
   *
   * @default - 'off -@all'
   * @see https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/Clusters.RBAC.html#Access-string
   */
  readonly accessString?: string;

  /**
   * Specifies the authentication type.
   */
  readonly authenticationType: AuthenticationType;

  /**
   * Passwords used for this user account.
   * You can create up to two passwords for each user.
   *
   * You must set at least one password when `authenticatipnType` is set to `AuthenticationType.PASSWORD`
   *
   * @default - no passwords for this user
   */
  readonly passwords?: SecretValue[];
}

/**
 * Attributes for importing an User.
 */
export interface UserAttributes {
  /**
   * The ID of the user.
   */
  readonly userId: string;
  /**
   * The name of the user.
   */
  readonly userName: string;
}

/**
 * A new or imported User.
 */
export abstract class UserBase extends Resource implements IUser {
  /**
   * Imports an existing User from attributes
   */
  public static fromUserAttributes(scope: Construct, id: string, attrs: UserAttributes): IUser {
    class Import extends UserBase implements IUser {
      public readonly userId = attrs.userId;
      public readonly userName = attrs.userName;
      public readonly userArn = Stack.of(this).formatArn({
        service: 'elasticache',
        resource: 'user',
        resourceName: attrs.userId,
      });
    }
    return new Import(scope, id);
  }

  /**
   * The ARN of the user.
   */
  public abstract readonly userArn: string;

  /**
   * The ID of the user.
   */
  public abstract readonly userId: string;

  /**
   * The name of the user.
   */
  public abstract readonly userName: string;

  /**
   * Grant the given identity the specified actions
   * @param grantee the identity to be granted the actions
   * @param actions the data-access actions
   *
   * @see https://docs.aws.amazon.com/service-authorization/latest/reference/list_amazonelasticache.html
   */
  public grant(grantee: aws_iam.IGrantable, ...actions: string[]): aws_iam.Grant {
    return aws_iam.Grant.addToPrincipal({
      grantee,
      actions,
      resourceArns: [
        Stack.of(this).formatArn({
          service: 'elasticache',
          resource: 'user',
          resourceName: this.userId,
          arnFormat: ArnFormat.COLON_RESOURCE_NAME,
        }),
      ],
    });
  }

  /**
   * Permits an IAM principal to perform connect to the user.
   *
   * Actions: Connect
   *
   * @param grantee The principal to grant access to.
   * @see https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/auth-iam.html
   */
  public grantConnect(grantee: aws_iam.IGrantable): aws_iam.Grant {
    return this.grant(grantee, 'elasticache:Connect');
  }
}

/**
 * Represents an User construct in AWS CDK.
 *
 * @example
 *
 * const user = new User(
 *   stack,
 *   'User',
 *   {
 *     authenticationType: AuthenticationType.IAM,
 *   },
 * );
 */
export class User extends UserBase implements IUser {
  /**
   * The ARN of the user.
   */
  readonly userArn: string;

  /**
   * The ID of the user.
   */
  readonly userId: string;

  /**
   * The name of the user.
   */
  readonly userName: string;

  private readonly props: UserProps;

  constructor(scope: Construct, id: string, props: UserProps) {
    super(scope, id, {
      physicalName:
        props.userId ??
        Lazy.string({
          produce: () => Names.uniqueResourceName(this, { separator: '-', maxLength: 40 }).toLowerCase(),
        }),
    });
    this.props = props;

    this.validateUserId();
    this.validateUserName();
    this.validateAuthenticationSettings();

    const user = this.createResource(this, 'Resource', {
      engine: Engine.REDIS,
      userId: this.physicalName,
      userName: this.props.userName ?? this.physicalName,
      accessString: this.props.accessString ?? 'off -@all',
      authenticationMode: this.renderAuthenticationMode(),
    });

    this.userArn = user.attrArn;
    this.userId = user.ref;
    this.userName = user.userName;
  }

  protected createResource(scope: Construct, id: string, props: aws_elasticache.CfnUserProps): aws_elasticache.CfnUser {
    return new aws_elasticache.CfnUser(scope, id, props);
  }

  /**
   * Render `authenticationMode` property.
   *
   * @see https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_elasticache.CfnUser.html#authenticationmode
   */
  protected renderAuthenticationMode(): { [key: string]: any } {
    const authenticationMode: { Type: string; Passwords?: string[] } = {
      Type: this.props.authenticationType,
    };

    if (this.props.passwords) {
      authenticationMode.Passwords = this.props.passwords.map(password => password.unsafeUnwrap());
    }

    return authenticationMode;
  }

  /**
   * Validates user id.
   */
  private validateUserId(): void {
    const userId = this.props.userId;
    if (Token.isUnresolved(userId) || userId === undefined) {
      return;
    }

    if (userId.length < 1 || userId.length > 40) {
      throw new Error(`\`userId\` must be between 1 and 40 characters, got ${userId.length} characters.`);
    }

    if (userId === 'default') {
      throw new Error(
        '`userId` cannot be `default` because ElastiCache automatically configures a default user with user ID `default`.',
      );
    }

    if (!/^[A-Za-z][A-Za-z0-9]*(-[A-Za-z0-9]+)*$/.test(userId)) {
      throw new Error(
        `\`userId\` must consist only of alphanumeric characters or hyphens, with the first character as a letter, and it can't end with a hyphen or contain two consecutive hyphens, got: ${userId}.`,
      );
    }
  }

  /**
   * Validates user name.
   */
  private validateUserName(): void {
    const userName = this.props.userName;
    if (Token.isUnresolved(userName) || userName === undefined) {
      return;
    }

    if (userName.length < 1 || userName.length > 120) {
      throw new Error(`\`userName\` must be between 1 and 120 characters, got ${userName.length} characters.`);
    }

    if (/\s/.test(userName)) {
      throw new Error(`\`userName\` must not contain spaces. got: ${userName}.`);
    }
  }

  /**
   * Validates authentication settings.
   */
  private validateAuthenticationSettings(): void {
    const authenticationType = this.props.authenticationType;
    const passwords = this.props.passwords;
    const userId = this.props.userId;
    const userName = this.props.userName;

    if (authenticationType === AuthenticationType.PASSWORD && !passwords) {
      throw new Error(
        'At least one password must be set to `passwords` when `authenticationType` is set to `AuthenticationType.PASSWORD`.',
      );
    }

    if (authenticationType !== AuthenticationType.PASSWORD && passwords) {
      throw new Error('`passwords` can only be set when `authenticationType` is set to `AuthenticationType.PASSWORD`.');
    }

    if (
      Token.isUnresolved(userId) ||
      Token.isUnresolved(userName) ||
      (userId === undefined && userName === undefined)
    ) {
      return;
    }

    if (authenticationType === AuthenticationType.IAM && userId !== userName) {
      throw new Error(
        `\`userId\` and \`userName\` must be the same When \`authenticationType\` is set to \`AuthenticationType.IAM\`, got userId: ${userId}, userName: ${userName}.`,
      );
    }
  }
}
