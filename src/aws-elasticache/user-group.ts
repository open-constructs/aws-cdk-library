import { IResource, Lazy, Names, Resource, Stack, Token, aws_elasticache } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { IUser } from './user';
import { Engine } from './util';

/**
 * An User Group
 */
export interface IUserGroup extends IResource {
  /**
   * The ARN of the user group.
   *
   * @attribute
   */
  readonly userGroupArn: string;
  /**
   * The ID of the user group.
   *
   * @attribute
   */
  readonly userGroupId: string;
}

/**
 * Properties for defining an User Group.
 */
export interface UserGroupProps {
  /**
   * The ID of the user group.
   *
   * \`userGroupId\` can have up to 40 characters.
   *
   * \`userGroupId\` must consist only of alphanumeric characters or hyphens,
   * with the first character as a letter, and it can't end with a hyphen or contain two consecutive hyphens.
   *
   * @default - auto generate
   */
  readonly userGroupId?: string;

  /**
   * The default user of the user group.
   * The `userName` of the default user must be `default`.
   *
   * `defaultUser` must be included in `users`.
   *
   * @see https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/Clusters.RBAC.html#Users-management
   */
  readonly defaultUser: IUser;

  /**
   * The list of User that belong to the user group.
   *
   * `defaultUser` must be included in `users`.
   */
  readonly users: IUser[];
}

/**
 * Attributes for importing an User Group.
 */
export interface UserGroupAttributes {
  /**
   * The ID of the user group.
   */
  readonly userGroupId: string;
}

/**
 * Represents an user group construct in AWS CDK.
 *
 * @example
 * declare const user: User;
 *
 * const userGroup = new UserGroup(
 *   stack,
 *   'UserGroup',
 *   {
 *      user: [user],
 *   },
 * );
 */
export class UserGroup extends Resource implements IUserGroup {
  /**
   * Imports an existing user group from attributes
   */
  public static fromUserGroupId(scope: Construct, id: string, userGroupId: string): IUserGroup {
    class Import extends Resource implements IUserGroup {
      public readonly userGroupId = userGroupId;
      public readonly userGroupArn = Stack.of(this).formatArn({
        service: 'elasticache',
        resource: 'usergroup',
        resourceName: userGroupId,
      });
    }
    return new Import(scope, id);
  }

  /**
   * The ARN of the user group.
   */
  readonly userGroupArn: string;

  /**
   * The ID of the user group.
   */
  readonly userGroupId: string;

  private readonly props: UserGroupProps;

  private readonly users: IUser[];

  constructor(scope: Construct, id: string, props: UserGroupProps) {
    super(scope, id, {
      physicalName:
        props.userGroupId ??
        Lazy.string({
          produce: () =>
            Names.uniqueResourceName(this, {
              maxLength: 40,
              separator: '-',
            }).toLowerCase(),
        }),
    });
    this.props = props;
    this.users = this.props.users ?? [];

    this.validateUserGroupId();
    this.validateDefaultUser();

    const userGroup = this.createResource(this, 'Resource', {
      engine: Engine.REDIS,
      userGroupId: this.physicalName,
      userIds: Lazy.list({ produce: () => this.users.map(user => user.userId) }),
    });

    this.userGroupArn = userGroup.attrArn;
    this.userGroupId = userGroup.ref;
  }

  protected createResource(
    scope: Construct,
    id: string,
    props: aws_elasticache.CfnUserGroupProps,
  ): aws_elasticache.CfnUserGroup {
    return new aws_elasticache.CfnUserGroup(scope, id, props);
  }

  /**
   * Validates user group id.
   */
  private validateUserGroupId(): void {
    const userGroupId = this.props.userGroupId;
    if (Token.isUnresolved(userGroupId) || userGroupId === undefined) {
      return;
    }

    if (userGroupId.length < 1 || userGroupId.length > 40) {
      throw new Error(`\`userGroupId\` must be between 1 and 40 characters, got ${userGroupId.length} characters.`);
    }

    if (!/^[A-Za-z][A-Za-z0-9]*(-[A-Za-z0-9]+)*$/.test(userGroupId)) {
      throw new Error(
        `\`userGroupId\` must consist only of alphanumeric characters or hyphens, with the first character as a letter, and it can't end with a hyphen or contain two consecutive hyphens, got: ${userGroupId}.`,
      );
    }
  }

  /**
   * Validates default user.
   */
  private validateDefaultUser(): void {
    const defaultUserName = this.props.defaultUser.userName;

    if (Token.isUnresolved(defaultUserName)) {
      return;
    }

    if (defaultUserName !== 'default') {
      throw new Error(`\`defaultUser\` must have \`userName\` as \`default\`, got: ${defaultUserName}.`);
    }

    if (!this.props.users.includes(this.props.defaultUser)) {
      throw new Error('`defaultUser` must be included in `users`.');
    }
  }

  /**
   * Adds an user to the user group
   *
   * @param user the user to add
   */
  public addUser(user: IUser): void {
    if (this.users.includes(user)) {
      throw new Error(`An adding user is already included in the user group, ARN: ${user.userArn}.`);
    }

    this.users.push(user);
  }
}
