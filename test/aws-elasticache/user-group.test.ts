import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { AuthenticationType, IUserGroup, User, UserGroup } from '../../src/aws-elasticache';

describe('ElastiCache User Group', () => {
  let app: App;
  let stack: Stack;

  beforeEach(() => {
    app = new App();
    stack = new Stack(app, 'TestStack', {});
  });

  test('Create an user group with minimal properties', () => {
    new UserGroup(stack, 'UserGroup', {});

    Template.fromStack(stack).hasResourceProperties('AWS::ElastiCache::UserGroup', {
      Engine: 'redis',
      UserIds: ['default'],
    });
  });

  test('Create an user group with maximum properties', () => {
    const user = new User(stack, 'User', {
      authenticationType: AuthenticationType.NO_PASSWORD_REQUIRED,
    });

    new UserGroup(stack, 'UserGroup', {
      users: [user],
      userGroupId: 'my-user-group',
    });

    Template.fromStack(stack).hasResourceProperties('AWS::ElastiCache::UserGroup', {
      Engine: 'redis',
      UserGroupId: 'my-user-group',
      UserIds: ['default', stack.resolve(user.userId)],
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
        });
      }).toThrow(`\`userGroupId\` must be between 1 and 40 characters, got ${userGroupId.length} characters.`);
    });

    test.each(['123abc', 'invalid$name', 'end-with-a-hyphen-', 'two--consecutive-hyphens'])(
      'throws an error if userId is invalid, got %s',
      userGroupId => {
        expect(() => {
          new UserGroup(stack, 'UserGroup', {
            userGroupId,
          });
        }).toThrow(
          `\`userGroupId\` must consist only of alphanumeric characters or hyphens, with the first character as a letter, and it can't end with a hyphen or contain two consecutive hyphens, got: ${userGroupId}.`,
        );
      },
    );
  });

  describe('test addUser method', () => {
    test('add user after creation', () => {
      const user = new User(stack, 'User', {
        authenticationType: AuthenticationType.NO_PASSWORD_REQUIRED,
      });

      const userGroup = new UserGroup(stack, 'UserGroup', {
        userGroupId: 'my-user-group',
      });

      userGroup.addUser(user);

      Template.fromStack(stack).hasResourceProperties('AWS::ElastiCache::UserGroup', {
        Engine: 'redis',
        UserGroupId: 'my-user-group',
        UserIds: ['default', stack.resolve(user.userId)],
      });
    });

    test('throws when an adding user is already included the user group', () => {
      const user = new User(stack, 'User', {
        authenticationType: AuthenticationType.NO_PASSWORD_REQUIRED,
      });

      const userGroup = new UserGroup(stack, 'UserGroup', {
        userGroupId: 'my-user-group',
      });

      userGroup.addUser(user);

      expect(() => {
        userGroup.addUser(user);
      }).toThrow(`An adding user is already included in the user group, ARN: ${user.userArn}.`);
    });
  });
});
