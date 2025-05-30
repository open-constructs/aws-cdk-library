import { App, ArnFormat, SecretValue, Stack } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { IamUser, IUser, NoPasswordRequiredUser, PasswordUser } from '../../src/aws-elasticache';

describe('ElastiCache User', () => {
  let app: App;
  let stack: Stack;

  beforeEach(() => {
    app = new App();
    stack = new Stack(app, 'TestStack', {});
  });

  test('Create a no password required user', () => {
    new NoPasswordRequiredUser(stack, 'User', {});

    Template.fromStack(stack).hasResourceProperties('AWS::ElastiCache::User', {
      Engine: 'redis',
      AccessString: 'off -@all',
      AuthenticationMode: { Type: 'no-password-required' },
      UserId: Match.anyValue(),
      UserName: Match.anyValue(),
    });
  });

  test('Create an IAM-enabled user', () => {
    new IamUser(stack, 'User', {
      accessString: 'on ~* +@all',
      userId: 'my-user',
    });

    Template.fromStack(stack).hasResourceProperties('AWS::ElastiCache::User', {
      Engine: 'redis',
      AccessString: 'on ~* +@all',
      AuthenticationMode: { Type: 'iam' },
      UserId: 'my-user',
      UserName: 'my-user',
    });
  });

  describe('Create password required user', () => {
    test('User with provided passwords', () => {
      new PasswordUser(stack, 'User', {
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

    test('User with generated passwords', () => {
      new PasswordUser(stack, 'User', {
        userName: 'admin-username',
      });

      const template = Template.fromStack(stack);
      template.hasResourceProperties('AWS::SecretsManager::Secret', {
        Description: 'Generated by the CDK for stack: TestStack',
        GenerateSecretString: {
          ExcludeCharacters: '"%\'()*+,./:;=?@[\\]_`{|}~',
          GenerateStringKey: 'password',
          PasswordLength: 32,
          SecretStringTemplate: '{"username":"admin-username"}',
        },
      });
      template.hasResourceProperties('AWS::ElastiCache::User', {
        AuthenticationMode: {
          Type: 'password',
          Passwords: [
            {
              'Fn::Join': [
                '',
                [
                  '{{resolve:secretsmanager:',
                  {
                    Ref: 'UserSecretE2C04A69',
                  },
                  ':SecretString:password::}}',
                ],
              ],
            },
          ],
        },
      });
    });
  });

  describe('import method test', () => {
    describe('IAM-enabled User', () => {
      let importedUser: IUser;

      beforeEach(() => {
        app = new App();
        stack = new Stack(app, 'TestStack');
        importedUser = IamUser.fromUserId(stack, 'ImportedUser', 'my-user-id');
      });

      test('should correctly set userId', () => {
        expect(importedUser.userId).toEqual('my-user-id');
      });

      test('should correctly set userName', () => {
        expect(importedUser.userName).toEqual('my-user-id');
      });

      test('should correctly format userArn', () => {
        expect(importedUser.userArn).toEqual(
          Stack.of(stack).formatArn({
            service: 'elasticache',
            resource: 'user',
            resourceName: 'my-user-id',
            arnFormat: ArnFormat.COLON_RESOURCE_NAME,
          }),
        );
      });
    });

    describe('password authentication user', () => {
      let importedUser: IUser;

      beforeEach(() => {
        app = new App();
        stack = new Stack(app, 'TestStack');
        importedUser = PasswordUser.fromUserAttributes(stack, 'ImportedUser', {
          userId: 'my-user-id',
          userName: 'my-user-name',
        });
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
            arnFormat: ArnFormat.COLON_RESOURCE_NAME,
          }),
        );
      });
    });

    describe('no password required user', () => {
      let importedUser: IUser;

      beforeEach(() => {
        app = new App();
        stack = new Stack(app, 'TestStack');
        importedUser = NoPasswordRequiredUser.fromUserAttributes(stack, 'ImportedUser', {
          userId: 'my-user-id',
          userName: 'my-user-name',
        });
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
            arnFormat: ArnFormat.COLON_RESOURCE_NAME,
          }),
        );
      });
    });
  });

  describe('grant method test', () => {
    test('grantConnect test', () => {
      const user = new IamUser(stack, 'User', {});

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

    test('imported IAM User can use grant method', () => {
      const importedUser = IamUser.fromUserId(stack, 'ImportedUser', 'my-user-id');
      const role = new Role(stack, 'Role', {
        assumedBy: new ServicePrincipal('foo'),
      });

      importedUser.grantConnect(role);

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
                      ':user:my-user-id',
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
        new IamUser(stack, 'User', {
          userId,
        });
      }).toThrow(`\`userId\` must be between 1 and 40 characters, got ${userId.length} characters.`);
    });

    test.each(['123abc', 'invalid$name', 'end-with-a-hyphen-', 'two--consecutive-hyphens'])(
      'throws an error if userId is invalid, got %s',
      userId => {
        expect(() => {
          new IamUser(stack, 'User', {
            userId,
          });
        }).toThrow(
          `\`userId\` must consist only of alphanumeric characters or hyphens, with the first character as a letter, and it can't end with a hyphen or contain two consecutive hyphens, got: ${userId}.`,
        );
      },
    );

    test('throws if userId is default', () => {
      expect(() => {
        new IamUser(stack, 'User', {
          userId: 'default',
        });
      }).toThrow(
        '`userId` cannot be `default` because ElastiCache automatically configures a default user with user ID `default`.',
      );
    });
  });

  describe('validateUserName test', () => {
    test.each(['', 'a'.repeat(121)])('throws when userName length is invalid, got %s', userName => {
      expect(() => {
        new NoPasswordRequiredUser(stack, 'User', {
          userName,
        });
      }).toThrow(`\`userName\` must be between 1 and 120 characters, got ${userName.length} characters.`);
    });

    test('throws if userName contains spaces', () => {
      expect(() => {
        new NoPasswordRequiredUser(stack, 'User', {
          userName: 'Invalid User Name',
        });
      }).toThrow('`userName` must not contain spaces, got: Invalid User Name.');
    });
  });

  describe('test validations in PasswordUser class', () => {
    test('throws when more than 2 passwords are set', () => {
      expect(() => {
        new PasswordUser(stack, 'User', {
          passwords: [
            SecretValue.unsafePlainText('adminUserPassword123'),
            SecretValue.unsafePlainText('adminUserPassword12345'),
            SecretValue.unsafePlainText('adminUserPassword123456'),
          ],
        });
      }).toThrow('Up to 2 passwords can be set, got 3 passwords.');
    });

    test('throws when access the generatedSecret property when passwords are provided', () => {
      const user = new PasswordUser(stack, 'User', {
        passwords: [SecretValue.unsafePlainText('adminUserPassword123')],
      });

      expect(() => user.generatedSecret).toThrow(
        "The generated secret is only available when 'passwords' is not specified.",
      );
    });
  });
});
