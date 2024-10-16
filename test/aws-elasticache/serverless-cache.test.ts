import { App, RemovalPolicy, Stack, aws_ec2, aws_kms } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { SecurityGroup } from 'aws-cdk-lib/aws-ec2';
import { Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import {
  AuthenticationType,
  DailySnapshotTime,
  Engine,
  IServerlessCache,
  MajorVersion,
  ServerlessCache,
  User,
  UserGroup,
} from '../../src/aws-elasticache';

describe('ElastiCache Serverless Cache', () => {
  let app: App;
  let stack: Stack;
  let vpc: aws_ec2.Vpc;

  beforeEach(() => {
    app = new App();
    stack = new Stack(app, 'TestStack', {});
    vpc = new aws_ec2.Vpc(stack, 'VPC');
  });

  test('Create a serverless cache with minimal properties', () => {
    new ServerlessCache(stack, 'ServerlessCache', {
      engine: Engine.VALKEY,
      vpc,
    });

    Template.fromStack(stack).hasResourceProperties('AWS::ElastiCache::ServerlessCache', {
      Engine: 'valkey',
      SecurityGroupIds: [Match.anyValue()],
      ServerlessCacheName: Match.anyValue(),
      SubnetIds: [{ Ref: 'VPCPrivateSubnet1Subnet8BCA10E0' }, { Ref: 'VPCPrivateSubnet2SubnetCFCDAA7A' }],
    });
  });

  test('Create a serverless cache with maximum properties', () => {
    const user = new User(stack, 'User', {
      authenticationType: AuthenticationType.NO_PASSWORD_REQUIRED,
    });

    const userGroup = new UserGroup(stack, 'UserGroup', {
      users: [user],
      userGroupId: 'my-user-group',
    });

    const key = new aws_kms.Key(stack, 'Key', { removalPolicy: RemovalPolicy.DESTROY });

    const securityGroup = new aws_ec2.SecurityGroup(stack, 'SecurityGroup', {
      vpc,
    });

    new ServerlessCache(stack, 'ServerlessCache', {
      engine: Engine.VALKEY,
      serverlessCacheName: 'my-serverless-cache',
      dailySnapshotTime: new DailySnapshotTime({ hour: 12, minute: 0 }),
      description: 'my serverless cache',
      finalSnapshotName: 'my-finalsnapshot',
      kmsKey: key,
      majorEngineVersion: MajorVersion.VER_7,
      snapshotRetentionLimit: 6,
      snapshotArnsToRestore: ['arn:aws:elasticache:us-east-1:123456789012:serverlesscachesnapshot:my-final-snapshot'],
      securityGroups: [securityGroup],
      vpc,
      vpcSubnets: vpc.selectSubnets({
        subnetType: aws_ec2.SubnetType.PRIVATE_WITH_EGRESS,
      }),
      userGroup,
    });

    Template.fromStack(stack).hasResourceProperties('AWS::ElastiCache::ServerlessCache', {
      Engine: 'valkey',
      ServerlessCacheName: 'my-serverless-cache',
      DailySnapshotTime: '12:00',
      Description: 'my serverless cache',
      FinalSnapshotName: 'my-finalsnapshot',
      KmsKeyId: stack.resolve(key.keyArn),
      MajorEngineVersion: '7',
      SnapshotRetentionLimit: 6,
      SnapshotArnsToRestore: ['arn:aws:elasticache:us-east-1:123456789012:serverlesscachesnapshot:my-final-snapshot'],
      SecurityGroupIds: [stack.resolve(securityGroup.securityGroupId)],
      SubnetIds: [{ Ref: 'VPCPrivateSubnet1Subnet8BCA10E0' }, { Ref: 'VPCPrivateSubnet2SubnetCFCDAA7A' }],
      UserGroupId: stack.resolve(userGroup.userGroupId),
    });
  });

  describe('import method test', () => {
    let importedServerlessCache: IServerlessCache;
    let securityGroup: SecurityGroup;
    beforeEach(() => {
      app = new App();
      stack = new Stack(app, 'TestStack');
      securityGroup = new aws_ec2.SecurityGroup(stack, 'SecurityGroup', {
        vpc,
      });
      importedServerlessCache = ServerlessCache.fromServerlessCacheAttributes(stack, 'ImportedServerlessCache', {
        serverlessCacheName: 'my-serverless-cache',
        securityGroups: [securityGroup],
        endpointAddress: 'my-serverless-cache.endpoint.com',
        endpointPort: 6379,
      });
    });

    test('should correctly set serverlessCacheName', () => {
      expect(importedServerlessCache.serverlessCacheName).toEqual('my-serverless-cache');
    });

    test('should correctly set endpointAddress', () => {
      expect(importedServerlessCache.endpointAddress).toEqual('my-serverless-cache.endpoint.com');
    });

    test('should correctly set endpointPort', () => {
      expect(importedServerlessCache.endpointPort).toEqual(6379);
    });

    test('should correctly format serverlessCacheArn', () => {
      expect(importedServerlessCache.serverlessCacheArn).toEqual(
        Stack.of(stack).formatArn({
          service: 'elasticache',
          resource: 'serverlesscache',
          resourceName: 'my-serverless-cache',
        }),
      );
    });

    test('should correctly set security groups', () => {
      expect(importedServerlessCache.connections.securityGroups).toEqual([securityGroup]);
    });
  });

  describe('grant method test', () => {
    test('grantConnect test', () => {
      const role = new Role(stack, 'Role', {
        assumedBy: new ServicePrincipal('foo'),
      });

      const serverlessCache = new ServerlessCache(stack, 'ServerlessCache', {
        engine: Engine.VALKEY,
        vpc,
      });

      serverlessCache.grantConnect(role);

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
                      ':serverlesscache:teststackserverlesscache2c8c8b86',
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

  describe('validateServerlessCacheName test', () => {
    test('throws an error when serverlessCacheName includes spaces', () => {
      expect(() => {
        new ServerlessCache(stack, 'ServerlessCache', {
          serverlessCacheName: 'my serverless cache',
          engine: Engine.VALKEY,
          vpc,
        });
      }).toThrow('`serverlessCacheName` must not contain spaces, got: my serverless cache.');
    });

    test.each(['', 'a'.repeat(41)])(
      'throws when serverlessCacheName length is invalid, got %s',
      serverlessCacheName => {
        expect(() => {
          new ServerlessCache(stack, 'ServerlessCache', {
            serverlessCacheName,
            engine: Engine.VALKEY,
            vpc,
          });
        }).toThrow(
          `\`serverlessCacheName\` must be between 1 and 40 characters, got: ${serverlessCacheName.length} characters.`,
        );
      },
    );
  });

  describe('validateDescription test', () => {
    test.each(['>', '<'])('throws an error when description includes %s', description => {
      expect(() => {
        new ServerlessCache(stack, 'ServerlessCache', {
          description,
          engine: Engine.VALKEY,
          vpc,
        });
      }).toThrow(`\`description\` must not contain < and >, got: ${description}`);
    });

    test('throws when description length is invalid', () => {
      expect(() => {
        new ServerlessCache(stack, 'ServerlessCache', {
          description: 'a'.repeat(256),
          engine: Engine.VALKEY,
          vpc,
        });
      }).toThrow('`description` must not exceed 255 characters, got: 256 characters.');
    });
  });

  describe('validateAutomaticBackupSettings test', () => {
    test('throws when dailySnapshotTime is set without snapshotRetentionLimit', () => {
      expect(() => {
        new ServerlessCache(stack, 'ServerlessCache', {
          engine: Engine.VALKEY,
          vpc,
          dailySnapshotTime: new DailySnapshotTime({ hour: 12, minute: 0 }),
        });
      }).toThrow('`snapshotRetentionLimit` must be specified when `dailySnapshotTime` is set.');
    });

    test.each([0, 36])('throws when snapshotRetentionLimit is invalid, got %s', snapshotRetentionLimit => {
      expect(() => {
        new ServerlessCache(stack, 'ServerlessCache', {
          engine: Engine.VALKEY,
          vpc,
          snapshotRetentionLimit,
        });
      }).toThrow(`\`snapshotRetentionLimit\` must be between 1 and 35, got: ${snapshotRetentionLimit}.`);
    });
  });

  describe('validateFinalSnapshotName test', () => {
    test.each(['123abc', 'UpperName', 'invalid$name', 'end-with-a-hyphen-', 'two--consecutive-hyphens'])(
      'throws when finalSnapshotName is invalid, got %s',
      finalSnapshotName => {
        expect(() => {
          new ServerlessCache(stack, 'ServerlessCache', {
            engine: Engine.VALKEY,
            vpc,
            finalSnapshotName,
          });
        }).toThrow(
          `\`finalSnapshotName\` must consist only of lowercase alphanumeric characters or hyphens, with the first character as a letter, and it can't end with a hyphen or contain two consecutive hyphens, got: ${finalSnapshotName}.`,
        );
      },
    );

    test('throws when finalSnapshotName length is invalid', () => {
      expect(() => {
        new ServerlessCache(stack, 'ServerlessCache', {
          engine: Engine.VALKEY,
          vpc,
          finalSnapshotName: 'a'.repeat(256),
        });
      }).toThrow('`finalSnapshotName` must not exceed 255 characters, got: 256 characters.');
    });
  });

  describe('validateUserGroup test', () => {
    test('throws when userGroup is set with not Valkey or Redis engine', () => {
      expect(() => {
        const userGroup = new UserGroup(stack, 'UserGroup', {});

        new ServerlessCache(stack, 'ServerlessCache', {
          engine: Engine.MEMCACHED,
          vpc,
          userGroup,
        });
      }).toThrow('`userGroup` is available for Valkey and Redis OSS only, got engine: memcached.');
    });
  });
});
