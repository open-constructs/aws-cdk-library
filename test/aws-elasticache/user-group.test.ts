import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { IConstruct } from 'constructs';
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

  test('Create a user group with minimal properties', () => {
    new UserGroup(stack, 'UserGroup', {
      users: [defaultUser],
    });

    Template.fromStack(stack).hasResourceProperties('AWS::ElastiCache::UserGroup', {
      Engine: 'redis',
      UserIds: [stack.resolve(defaultUser.userId)],
    });
  });

  test('Create a user group with maximum properties', () => {
    const user = new User(stack, 'User', {
      authenticationType: AuthenticationType.NO_PASSWORD_REQUIRED,
    });

    new UserGroup(stack, 'UserGroup', {
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
    test("throws an error if `users` don't include default user", () => {
      const user = new User(stack, 'User', {
        authenticationType: AuthenticationType.NO_PASSWORD_REQUIRED,
        userName: 'not-default',
      });

      new UserGroup(stack, 'UserGroup', {
        users: [user],
      });

      const errors = validate(stack);
      expect(errors.length).toEqual(1);
      const error = errors[0];

      expect(error).toMatch(/A user with the username `default` must be included in `users`./);
    });
  });

  describe('validateDuplicateUsernames test', () => {
    test('throws an error if `users` include duplicate username', () => {
      const user = new User(stack, 'User', {
        authenticationType: AuthenticationType.NO_PASSWORD_REQUIRED,
        userName: 'test-user',
      });

      const duplicateUser = new User(stack, 'DuplicateUser', {
        authenticationType: AuthenticationType.NO_PASSWORD_REQUIRED,
        userName: 'test-user',
      });

      const anotherUser = new User(stack, 'AnotherUser', {
        authenticationType: AuthenticationType.NO_PASSWORD_REQUIRED,
        userName: 'another-test-user',
      });

      const anotherDuplicateUser = new User(stack, 'AnotherDuplicateUser', {
        authenticationType: AuthenticationType.NO_PASSWORD_REQUIRED,
        userName: 'another-test-user',
      });

      new UserGroup(stack, 'UserGroup', {
        users: [defaultUser, user, duplicateUser, anotherUser, anotherDuplicateUser],
      });

      const errors = validate(stack);
      expect(errors.length).toEqual(2);
      const error = errors[0];
      const anotherError = errors[1];

      expect(error).toMatch(
        /Duplicate username found in user group: `test-user` is duplicated. Each username must be unique within a user group./,
      );

      expect(anotherError).toMatch(
        /Duplicate username found in user group: `another-test-user` is duplicated. Each username must be unique within a user group./,
      );
    });
  });

  describe('test addUser method', () => {
    test('add user after creation', () => {
      const user = new User(stack, 'User', {
        authenticationType: AuthenticationType.NO_PASSWORD_REQUIRED,
      });

      const userGroup = new UserGroup(stack, 'UserGroup', {
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

    test('throws an error when adding user with duplicate username', () => {
      const user = new User(stack, 'User', {
        authenticationType: AuthenticationType.NO_PASSWORD_REQUIRED,
        userName: 'test-user',
      });

      const anotherUser = new User(stack, 'AnotherUser', {
        authenticationType: AuthenticationType.NO_PASSWORD_REQUIRED,
        userName: 'another-test-user',
      });

      const userGroup = new UserGroup(stack, 'UserGroup', {
        users: [defaultUser, user, anotherUser],
      });

      const duplicateUser = new User(stack, 'DuplicateUser', {
        authenticationType: AuthenticationType.NO_PASSWORD_REQUIRED,
        userName: 'test-user',
      });

      const anotherDuplicateUser = new User(stack, 'AnotherDuplicateUser', {
        authenticationType: AuthenticationType.NO_PASSWORD_REQUIRED,
        userName: 'another-test-user',
      });

      userGroup.addUser(duplicateUser);
      userGroup.addUser(anotherDuplicateUser);

      const errors = validate(stack);
      expect(errors.length).toEqual(2);
      const error = errors[0];
      const anotherError = errors[1];

      expect(error).toMatch(
        /Duplicate username found in user group: `test-user` is duplicated. Each username must be unique within a user group./,
      );

      expect(anotherError).toMatch(
        /Duplicate username found in user group: `another-test-user` is duplicated. Each username must be unique within a user group./,
      );
    });
  });
});

function validate(construct: IConstruct): string[] {
  try {
    (construct.node.root as App).synth();
    return [];
  } catch (err: any) {
    if (!('message' in err) || !err.message.startsWith('Validation failed')) {
      throw err;
    }
    return err.message.split('\n').slice(1);
  }
}
