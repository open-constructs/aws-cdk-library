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
 * Attributes for importing a User.
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
 * Base properties for all user types
 */
export interface UserBaseProps {
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
 * Base class for all user types
 */
abstract class UserBase extends Resource implements IUser {
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

  protected readonly props: UserBaseProps;

  protected constructor(scope: Construct, id: string, props: UserBaseProps = {}) {
    super(scope, id, {
      physicalName:
        props.userId ??
        Lazy.string({
          produce: () => Names.uniqueResourceName(scope, { separator: '-', maxLength: 40 }).toLowerCase(),
        }),
    });
    this.props = props;
    this.validateUserId(props.userId);
  }

  protected validateUserId(userId: string | undefined): void {
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
  protected validateUserName(userName: string | undefined): void {
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

  protected createResource(scope: Construct, id: string, props: aws_elasticache.CfnUserProps): aws_elasticache.CfnUser {
    return new aws_elasticache.CfnUser(scope, id, props);
  }
}

/**
 * Properties for IAM authentication users
 */
export interface IamUserProps extends UserBaseProps {}

/**
 * Represents an IAM authentication user construct in AWS CDK.
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
export class IamUser extends UserBase {
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

  constructor(scope: Construct, id: string, props: IamUserProps = {}) {
    super(scope, id, props);

    const user = this.createResource(this, 'Resource', {
      engine: Engine.REDIS,
      userId: this.physicalName,
      userName: this.physicalName, // For IAM users, userName must equal userId
      accessString: this.props.accessString ?? 'off -@all',
      authenticationMode: {
        Type: 'iam',
      },
    });

    this.userArn = user.attrArn;
    this.userId = user.ref;
    this.userName = user.userName;
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
 * Properties for password-authenticated users
 */
export interface PasswordUserProps extends UserBaseProps {
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
export class PasswordUser extends UserBase {
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

  constructor(scope: Construct, id: string, props: PasswordUserProps) {
    super(scope, id, props);

    if (!props.passwords || props.passwords.length === 0) {
      throw new Error('At least one password must be provided for password authentication');
    }

    this.validateUserName(props.userName);

    const user = this.createResource(this, 'Resource', {
      engine: Engine.REDIS,
      userId: this.physicalName,
      userName: props.userName ?? this.physicalName,
      accessString: this.props.accessString ?? 'off -@all',
      authenticationMode: {
        Type: 'password',
        Passwords: props.passwords.map(password => password.unsafeUnwrap()),
      },
    });

    this.userArn = user.attrArn;
    this.userId = user.ref;
    this.userName = user.userName;
  }
}

/**
 * Properties for users that don't require authentication
 */
export interface NoPasswordRequiredUserProps extends UserBaseProps {
  /**
   * The username of the user.
   * @default - same as userId
   */
  readonly userName?: string;
}

/**
 * Represents a no password required user construct in AWS CDK.
 *
 * @example
 *
 * const user = new NoPasswordRequiredUser(
 *   stack,
 *   'User',
 *   {
 *     userName: 'my-user,
 *     accessString: 'on ~* +@all',
 *   },
 * );
 */
export class NoPasswordRequiredUser extends UserBase {
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

  constructor(scope: Construct, id: string, props: NoPasswordRequiredUserProps = {}) {
    super(scope, id, props);

    this.validateUserName(props.userName);

    const user = this.createResource(this, 'Resource', {
      engine: Engine.REDIS,
      userId: this.physicalName,
      userName: props.userName ?? this.physicalName,
      accessString: this.props.accessString ?? 'off -@all',
      authenticationMode: {
        Type: 'no-password-required',
      },
    });

    this.userArn = user.attrArn;
    this.userId = user.ref;
    this.userName = user.userName;
  }
}
