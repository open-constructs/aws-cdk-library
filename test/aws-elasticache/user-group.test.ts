import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { AuthenticationType, IUserGroup, User, UserGroup } from '../../src/aws-elasticache';

describe('ElastiCache User Group', () => {
  let app: App;
  let stack: Stack;
  let defaultUser: User;

  beforeEach(() => {
    app = new App();
    stack = new Stack(app, 'TestStack', {});
    defaultUser = new User(stack, 'DefaultUser', {
      authenticationType: AuthenticationType.NO_PASSWORD_REQUIRED,
      userId: 'new-default',
      userName: 'default',
    });
  });

  test('Create an user group with minimal properties', () => {
    new UserGroup(stack, 'UserGroup', {
      defaultUser,
      users: [defaultUser],
    });

    Template.fromStack(stack).hasResourceProperties('AWS::ElastiCache::UserGroup', {
      Engine: 'redis',
      UserIds: [stack.resolve(defaultUser.userId)],
    });
  });

  test('Create an user group with maximum properties', () => {
    const user = new User(stack, 'User', {
      authenticationType: AuthenticationType.NO_PASSWORD_REQUIRED,
    });

    new UserGroup(stack, 'UserGroup', {
      defaultUser,
      users: [defaultUser, user],
      userGroupId: 'my-user-group',
    });

    Template.fromStack(stack).hasResourceProperties('AWS::ElastiCache::UserGroup', {
      Engine: 'redis',
      UserGroupId: 'my-user-group',
      UserIds: [stack.resolve(defaultUser.userId), stack.resolve(user.userId)],
    });
  });

  describe('import method test', () => {
    let importedUserGroup: IUserGroup;

    beforeEach(() => {
      app = new App();
      stack = new Stack(app, 'TestStack');
      importedUserGroup = UserGroup.fromUserGroupId(stack, 'ImportedUser', 'my-user-group-id');
    });

    test('should correctly set userGroupId', () => {
      expect(importedUserGroup.userGroupId).toEqual('my-user-group-id');
    });

    test('should correctly format userGroupArn', () => {
      expect(importedUserGroup.userGroupArn).toEqual(
        Stack.of(stack).formatArn({
          service: 'elasticache',
          resource: 'usergroup',
          resourceName: 'my-user-group-id',
        }),
      );
    });
  });

  describe('validateUserGroupId test', () => {
    test.each(['', 'a'.repeat(41)])('throws when userGroupId length is invalid, got %s', userGroupId => {
      expect(() => {
        new UserGroup(stack, 'UserGroup', {
          defaultUser,
          userGroupId,
          users: [defaultUser],
        });
      }).toThrow(`\`userGroupId\` must be between 1 and 40 characters, got ${userGroupId.length} characters.`);
    });

    test.each(['123abc', 'invalid$name', 'end-with-a-hyphen-', 'two--consecutive-hyphens'])(
      'throws an error if userId is invalid, got %s',
      userGroupId => {
        expect(() => {
          new UserGroup(stack, 'UserGroup', {
            defaultUser,
            userGroupId,
            users: [defaultUser],
          });
        }).toThrow(
          `\`userGroupId\` must consist only of alphanumeric characters or hyphens, with the first character as a letter, and it can't end with a hyphen or contain two consecutive hyphens, got: ${userGroupId}.`,
        );
      },
    );
  });

  describe('validateDefaultUser test', () => {
    test('throws an error if default user name is not `default`', () => {
      const invalidDefaultUser = new User(stack, 'InvalidDefaultUser', {
        userName: 'not-default',
        authenticationType: AuthenticationType.NO_PASSWORD_REQUIRED,
      });

      expect(() => {
        new UserGroup(stack, 'UserGroup', {
          defaultUser: invalidDefaultUser,
          users: [invalidDefaultUser],
        });
      }).toThrow(`\`defaultUser\` must have \`userName\` as \`default\`, got: ${invalidDefaultUser.userName}.`);
    });

    test("throws an error if `users` don't include `defaultUser`", () => {
      const user = new User(stack, 'User', {
        authenticationType: AuthenticationType.NO_PASSWORD_REQUIRED,
      });

      expect(() => {
        new UserGroup(stack, 'UserGroup', {
          defaultUser,
          users: [user],
        });
      }).toThrow('`defaultUser` must be included in `users`.');
    });
  });

  describe('test addUser method', () => {
    test('add user after creation', () => {
      const user = new User(stack, 'User', {
        authenticationType: AuthenticationType.NO_PASSWORD_REQUIRED,
      });

      const userGroup = new UserGroup(stack, 'UserGroup', {
        defaultUser,
        userGroupId: 'my-user-group',
        users: [defaultUser],
      });

      userGroup.addUser(user);

      Template.fromStack(stack).hasResourceProperties('AWS::ElastiCache::UserGroup', {
        Engine: 'redis',
        UserGroupId: 'my-user-group',
        UserIds: [stack.resolve(defaultUser.userId), stack.resolve(user.userId)],
      });
    });

    test('throws when an adding user is already included the user group', () => {
      const user = new User(stack, 'User', {
        authenticationType: AuthenticationType.NO_PASSWORD_REQUIRED,
      });

      const userGroup = new UserGroup(stack, 'UserGroup', {
        defaultUser,
        userGroupId: 'my-user-group',
        users: [defaultUser],
      });

      userGroup.addUser(user);

      expect(() => {
        userGroup.addUser(user);
      }).toThrow(`An adding user is already included in the user group, ARN: ${user.userArn}.`);
    });
  });
});
