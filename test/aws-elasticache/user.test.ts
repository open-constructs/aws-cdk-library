import { App, SecretValue, Stack } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { AuthenticationType, IUser, User } from '../../src/aws-elasticache';

describe('ElastiCache User', () => {
  let app: App;
  let stack: Stack;

  beforeEach(() => {
    app = new App();
    stack = new Stack(app, 'TestStack', {});
  });

  test('Create an user with minimal properties', () => {
    new User(stack, 'User', {
      authenticationType: AuthenticationType.NO_PASSWORD_REQUIRED,
    });

    Template.fromStack(stack).hasResourceProperties('AWS::ElastiCache::User', {
      Engine: 'redis',
      AccessString: 'off -@all',
      AuthenticationMode: { Type: 'no-password-required' },
      UserId: Match.anyValue(),
      UserName: Match.anyValue(),
    });
  });

  test('Create an user with maximum properties', () => {
    new User(stack, 'User', {
      accessString: 'on ~* +@all',
      authenticationType: AuthenticationType.IAM,
      userId: 'my-user',
      userName: 'my-user',
    });

    Template.fromStack(stack).hasResourceProperties('AWS::ElastiCache::User', {
      Engine: 'redis',
      AccessString: 'on ~* +@all',
      AuthenticationMode: { Type: 'iam' },
      UserId: 'my-user',
      UserName: 'my-user',
    });
  });

  test('Create user with password authentication', () => {
    new User(stack, 'User', {
      authenticationType: AuthenticationType.PASSWORD,
      passwords: [
        SecretValue.unsafePlainText('adminUserPassword123'),
        SecretValue.unsafePlainText('adminUserPassword12345'),
      ],
    });

    Template.fromStack(stack).hasResourceProperties('AWS::ElastiCache::User', {
      AuthenticationMode: {
        Type: 'password',
        Passwords: ['adminUserPassword123', 'adminUserPassword12345'],
      },
    });
  });

  describe('import method test', () => {
    let importedUser: IUser;

    beforeEach(() => {
      app = new App();
      stack = new Stack(app, 'TestStack');
      importedUser = User.fromUserAttributes(stack, 'ImportedUser', { userId: 'my-user-id', userName: 'my-user-name' });
    });

    test('should correctly set userId', () => {
      expect(importedUser.userId).toEqual('my-user-id');
    });

    test('should correctly set userName', () => {
      expect(importedUser.userName).toEqual('my-user-name');
    });

    test('should correctly format userArn', () => {
      expect(importedUser.userArn).toEqual(
        Stack.of(stack).formatArn({
          service: 'elasticache',
          resource: 'user',
          resourceName: 'my-user-id',
        }),
      );
    });
  });

  describe('grant method test', () => {
    test('grantConnect test', () => {
      const user = new User(stack, 'User', {
        authenticationType: AuthenticationType.IAM,
      });

      const role = new Role(stack, 'Role', {
        assumedBy: new ServicePrincipal('foo'),
      });

      user.grantConnect(role);

      Template.fromStack(stack).hasResourceProperties(
        'AWS::IAM::Policy',
        Match.objectLike({
          PolicyDocument: Match.objectLike({
            Statement: [
              {
                Action: 'elasticache:Connect',
                Effect: 'Allow',
                Resource: {
                  'Fn::Join': [
                    '',
                    [
                      'arn:',
                      { Ref: 'AWS::Partition' },
                      ':elasticache:',
                      { Ref: 'AWS::Region' },
                      ':',
                      { Ref: 'AWS::AccountId' },
                      ':user:',
                      { Ref: 'User00B015A1' },
                    ],
                  ],
                },
              },
            ],
          }),
        }),
      );
    });
  });

  describe('validateUserId test', () => {
    test.each(['', 'a'.repeat(41)])('throws when userId length is invalid, got %s', userId => {
      expect(() => {
        new User(stack, 'User', {
          authenticationType: AuthenticationType.NO_PASSWORD_REQUIRED,
          userId,
        });
      }).toThrow(`\`userId\` must be between 1 and 40 characters, got ${userId.length} characters.`);
    });

    test.each(['123abc', 'invalid$name', 'end-with-a-hyphen-', 'two--consecutive-hyphens'])(
      'throws an error if userId is invalid, got %s',
      userId => {
        expect(() => {
          new User(stack, 'User', {
            userId,
            authenticationType: AuthenticationType.NO_PASSWORD_REQUIRED,
          });
        }).toThrow(
          `\`userId\` must consist only of alphanumeric characters or hyphens, with the first character as a letter, and it can't end with a hyphen or contain two consecutive hyphens, got: ${userId}.`,
        );
      },
    );

    test('throws if userId is default', () => {
      expect(() => {
        new User(stack, 'User', {
          userId: 'default',
          authenticationType: AuthenticationType.NO_PASSWORD_REQUIRED,
        });
      }).toThrow(
        '`userId` cannot be `default` because ElastiCache automatically configures a default user with user ID `default`.',
      );
    });
  });

  describe('validateUserName test', () => {
    test.each(['', 'a'.repeat(121)])('throws when userName length is invalid, got %s', userName => {
      expect(() => {
        new User(stack, 'User', {
          authenticationType: AuthenticationType.NO_PASSWORD_REQUIRED,
          userName,
        });
      }).toThrow(`\`userName\` must be between 1 and 120 characters, got ${userName.length} characters.`);
    });

    test('throws if userName contains spaces', () => {
      expect(() => {
        new User(stack, 'User', {
          userName: 'Invalid User Name',
          authenticationType: AuthenticationType.NO_PASSWORD_REQUIRED,
        });
      }).toThrow('`userName` must not contain spaces. got: Invalid User Name.');
    });
  });

  describe('validateAuthenticationSettings test', () => {
    test('throws when authenticationType is AuthenticationType.Password with no passwords', () => {
      expect(() => {
        new User(stack, 'User', {
          authenticationType: AuthenticationType.PASSWORD,
        });
      }).toThrow(
        'At least one password must be set to `passwords` when `authenticationType` is set to `AuthenticationType.PASSWORD`.',
      );
    });

    test('throws when authenticationType is not AuthenticationType.Password with passwords', () => {
      expect(() => {
        new User(stack, 'User', {
          authenticationType: AuthenticationType.IAM,
          passwords: [SecretValue.unsafePlainText('adminUserPassword123')],
        });
      }).toThrow('`passwords` can only be set when `authenticationType` is set to `AuthenticationType.PASSWORD`.');
    });

    test('throws when authenticationType is  AuthenticationType.IAM and userName and userId are different', () => {
      expect(() => {
        new User(stack, 'User', {
          userId: 'my-user-id',
          userName: 'my-user-name',
          authenticationType: AuthenticationType.IAM,
        });
      }).toThrow(
        '`userId` and `userName` must be the same When `authenticationType` is set to `AuthenticationType.IAM`, got userId: my-user-id, userName: my-user-name.',
      );
    });
  });
});
