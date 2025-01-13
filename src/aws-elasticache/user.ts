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
 * A User
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
   */
  readonly userId: string;
  /**
   * The name of the user.
   */
  readonly userName: string;
}

/**
 * Attributes for importing a User
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
 * Properties for all user types
 */
export interface UserProps {
  /**
   * The ID of the user.
   * Must consist only of alphanumeric characters or hyphens, with the first character as a letter.
   * Cannot end with a hyphen or contain two consecutive hyphens.
   * @default - auto generated
   */
  readonly userId?: string;

  /**
   * Access permissions string used for this user.
   * @default - 'off -@all'
   * @see https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/Clusters.RBAC.html#Access-string
   */
  readonly accessString?: string;
}

/**
 * Imports an existing User from attributes
 */
export function fromUserAttributes(scope: Construct, id: string, attrs: UserAttributes): IUser {
  class Import extends Resource implements IUser {
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
 * Abstract base class for creating users
 */
abstract class BaseUser extends Resource implements IUser {
  /**
   * The ARN of the user.
   */
  public readonly userArn: string;

  /**
   * The ID of the user.
   */
  public readonly userId: string;

  /**
   * The name of the user.
   */
  public readonly userName: string;

  protected readonly props: UserProps;

  protected constructor(scope: Construct, id: string, props: UserProps = {}) {
    super(scope, id, {
      physicalName:
        props.userId ??
        Lazy.string({
          produce: () => Names.uniqueResourceName(scope, { separator: '-', maxLength: 40 }).toLowerCase(),
        }),
    });

    this.props = props;

    this.validateUserId(props.userId);

    const user = this.createResource(this, 'Resource', {
      engine: Engine.REDIS,
      userId: this.physicalName,
      userName: this.renderUserName(),
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
   * Render userName property
   */
  protected abstract renderUserName(): string;

  /**
   * Render authenticationMode property
   */
  protected abstract renderAuthenticationMode(): any;

  /**
   * Validates user id
   */
  protected validateUserId(userId?: string): void {
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
   * Validates username
   */
  protected validateUserName(userName?: string): void {
    if (Token.isUnresolved(userName) || userName === undefined) {
      return;
    }

    if (userName.length < 1 || userName.length > 120) {
      throw new Error(`\`userName\` must be between 1 and 120 characters, got ${userName.length} characters.`);
    }

    if (/\s/.test(userName)) {
      throw new Error(`\`userName\` must not contain spaces, got: ${userName}.`);
    }
  }
}

/**
 * Interface for IAM-enabled users
 */
export interface IIamUser extends IUser {
  /**
   * Grant permissions to this user
   */
  grant(grantee: aws_iam.IGrantable, ...actions: string[]): aws_iam.Grant;

  /**
   * Grant connect permissions to this user
   */
  grantConnect(grantee: aws_iam.IGrantable): aws_iam.Grant;
}

/**
 * Properties for IAM-enabled users
 */
export interface IamUserProps extends UserProps {}

/**
 * Represents an IAM-enabled user construct in AWS CDK.
 *
 * @example
 *
 * const user = new IamUser(
 *   stack,
 *   'User',
 *   {
 *     accessString: 'on ~* +@all',
 *   },
 * );
 */
export class IamUser extends BaseUser implements IIamUser {
  /**
   * Imports an existing User from userId
   */
  public static fromUserId(scope: Construct, id: string, userId: string): IIamUser {
    class Import extends Resource implements IIamUser {
      public readonly userId = userId;
      public readonly userName = userId;
      public readonly userArn = Stack.of(this).formatArn({
        service: 'elasticache',
        resource: 'user',
        resourceName: userId,
      });

      public grant(grantee: aws_iam.IGrantable, ...actions: string[]): aws_iam.Grant {
        return aws_iam.Grant.addToPrincipal({
          grantee,
          actions,
          resourceArns: [this.userArn],
        });
      }

      public grantConnect(grantee: aws_iam.IGrantable): aws_iam.Grant {
        return this.grant(grantee, 'elasticache:Connect');
      }
    }
    return new Import(scope, id);
  }

  constructor(scope: Construct, id: string, props: IamUserProps = {}) {
    super(scope, id, props);
  }

  /**
   * For IAM-enabled ElastiCache users the username and user id properties must be identical
   *
   * @see https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/auth-iam.html
   */
  protected renderUserName(): string {
    return this.physicalName;
  }

  protected renderAuthenticationMode(): any {
    return {
      Type: 'iam',
    };
  }

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
 * Interface for password-authenticated users
 */
export interface IPasswordUser extends IUser {}

/**
 * Attributes for importing a password-authenticated user
 */
export interface PasswordUserAttributes {
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
 * Properties for password-authenticated users
 */
export interface PasswordUserProps extends UserProps {
  /**
   * The username of the user.
   * @default - same as userId
   */
  readonly userName?: string;

  /**
   * Passwords used for this user account.
   * You can create up to two passwords for each user.
   */
  readonly passwords: SecretValue[];
}

/**
 * Represents a password authentication user construct in AWS CDK.
 *
 * @example
 *
 * const user = new PasswordUser(
 *   stack,
 *   'User',
 *   {
 *    passwords: [
 *      cdk.SecretValue.unsafePlainText('exampleUserPassword123'),
 *      cdk.SecretValue.unsafePlainText('anotherUserPassword123'),
 *    ],
 *   },
 * );
 */
export class PasswordUser extends BaseUser implements IPasswordUser {
  public static fromUserAttributes(scope: Construct, id: string, attrs: PasswordUserAttributes): IPasswordUser {
    return fromUserAttributes(scope, id, attrs);
  }

  constructor(scope: Construct, id: string, props: PasswordUserProps) {
    super(scope, id, props);

    if (props.passwords.length === 0) {
      throw new Error('At least one password must be provided for password authentication.');
    }

    if (props.passwords.length > 2) {
      throw new Error(`Up to 2 passwords can be set, got ${props.passwords.length} passwords.`);
    }

    this.validateUserName(props.userName);
  }

  protected renderUserName(): string {
    return (this.props as PasswordUserProps).userName ?? this.physicalName;
  }

  protected renderAuthenticationMode(): any {
    return {
      Type: 'password',
      Passwords: (this.props as PasswordUserProps).passwords.map(password => password.unsafeUnwrap()),
    };
  }
}

/**
 * Interface for no password required users
 */
export interface INoPasswordRequiredUser extends IUser {}

/**
 * Attributes for importing a no password required user
 */
export interface NoPasswordUserAttributes {
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
 * Properties for no password required users
 */
export interface NoPasswordRequiredUserProps extends UserProps {
  /**
   * The username of the user.
   * @default - same as userId
   */
  readonly userName?: string;
}

/**
 * Represents a no password required user construct in AWS CDK
 *
 * @example
 *
 * const user = new NoPasswordRequiredUser(
 *   stack,
 *   'User',
 *   {
 *     userName: 'my-user',
 *     accessString: 'on ~* +@all',
 *   },
 * );
 */
export class NoPasswordRequiredUser extends BaseUser implements INoPasswordRequiredUser {
  public static fromUserAttributes(
    scope: Construct,
    id: string,
    attrs: NoPasswordUserAttributes,
  ): INoPasswordRequiredUser {
    return fromUserAttributes(scope, id, attrs);
  }

  constructor(scope: Construct, id: string, props: NoPasswordRequiredUserProps = {}) {
    super(scope, id, props);

    this.validateUserName(props.userName);
  }

  protected renderUserName(): string {
    return (this.props as NoPasswordRequiredUserProps).userName ?? this.physicalName;
  }

  protected renderAuthenticationMode(): any {
    return {
      Type: 'no-password-required',
    };
  }
}
