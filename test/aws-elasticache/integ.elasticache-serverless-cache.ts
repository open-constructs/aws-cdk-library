import { IntegTest } from '@aws-cdk/integ-tests-alpha';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ocf from '../../src';
import { AuthenticationType, DailySnapshotTime, Engine } from '../../src/aws-elasticache';

class ElastiCacheStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const iamUser = new ocf.aws_elasticache.User(this, 'IamUser', {
      accessString: 'off -@all',
      authenticationType: AuthenticationType.IAM,
    });

    const noPasswordRequiredUser = new ocf.aws_elasticache.User(this, 'NoPasswordRequiredUser', {
      userId: 'no-password-required-user',
      accessString: 'off -@all',
      authenticationType: AuthenticationType.NO_PASSWORD_REQUIRED,
    });

    const passwordUser = new ocf.aws_elasticache.User(this, 'PasswordUser', {
      userId: 'password-user-id',
      userName: 'password-user-names',
      accessString: 'off -@all',
      authenticationType: AuthenticationType.PASSWORD,
      passwords: [
        cdk.SecretValue.unsafePlainText('adminUserPassword123'),
        cdk.SecretValue.unsafePlainText('hogehogeadminUserPassword123'),
      ],
    });

    const userGroup = new ocf.aws_elasticache.UserGroup(this, 'UserGroup', {
      userGroupId: 'my-user-group',
      users: [iamUser, noPasswordRequiredUser],
    });

    userGroup.addUser(passwordUser);

    const vpc = new cdk.aws_ec2.Vpc(this, 'VPC', {});

    new ocf.aws_elasticache.ServerlessCache(this, 'ElastiCacheServerlessCluster', {
      engine: Engine.VALKEY,
      serverlessCacheName: 'my-serverless-cache',
      dailySnapshotTime: new DailySnapshotTime({ hour: 12, minute: 0 }),
      description: 'my serverless cache',
      finalSnapshotName: 'my-final-snapshot',
      vpc,
      userGroup,
    });
  }
}

const app = new cdk.App();

const testCase = new ElastiCacheStack(app, 'ElastiCacheServerlessCacheStack');

new IntegTest(app, 'ElastiCacheServerlessCacheTest', {
  testCases: [testCase],
  enableLookups: true,
  stackUpdateWorkflow: false,
});
