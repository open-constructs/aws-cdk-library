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
   * \`userGroupId\` must consist only of alphanumeric characters or hyphens, with the first character as a letter, and it can't end with a hyphen or contain two consecutive hyphens.
   *
   * @default - auto generate
   */
  readonly userGroupId?: string;

  /**
   * The list of User that belong to the user group.
   *
   * `default` user is automatically added to the user group.
   *
   * @default - only `default` user added
   */
  readonly users?: IUser[];
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
        resource: 'elasticache',
        service: 'usergroup',
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
          produce: () => Names.uniqueResourceName(this, { maxLength: 40, allowedSpecialCharacters: '-' }).toLowerCase(),
        }),
    });
    this.props = props;
    this.users = this.props.users ?? [];

    this.validateUserGroupId();

    const userGroup = this.createResource(this, 'Resource', {
      engine: Engine.REDIS,
      userGroupId: this.physicalName,
      userIds: Lazy.list({ produce: () => ['default', ...this.users.map(user => user.userId)] }),
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
      throw new Error(`\`userGroupId\` must be between 1 and 40 characters, got ${userGroupId.length}`);
    }

    if (!/^[A-Za-z][A-Za-z0-9]*(-[A-Za-z0-9]+)*$/.test(userGroupId)) {
      throw new Error(
        `\`userGroupId\` must consist only of alphanumeric characters or hyphens, with the first character as a letter, and it can't end with a hyphen or contain two consecutive hyphens, got: ${userGroupId}.`,
      );
    }
  }

  /**
   * Adds an user to the user group
   *
   * @param user the user to add
   */
  public addUser(user: IUser): void {
    if (this.users.includes(user)) {
      throw new Error(`An adding user is already inclueded in the user group, ARN: ${user.userArn}.`);
    }

    this.users.push(user);
  }
}
