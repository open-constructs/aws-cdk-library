import { IntegTest } from '@aws-cdk/integ-tests-alpha';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ocf from '../../src';
import { AuthenticationType, DailySnapshotTime, Engine, MajorVersion } from '../../src/aws-elasticache';

class ElastiCacheStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const defaultUser = new ocf.aws_elasticache.User(this, 'DefaultUser', {
      authenticationType: AuthenticationType.NO_PASSWORD_REQUIRED,
      userId: 'new-default',
      userName: 'default',
    });

    const iamUser = new ocf.aws_elasticache.User(this, 'IamUser', {
      accessString: 'on ~* +@all',
      authenticationType: AuthenticationType.IAM,
    });

    const noPasswordRequiredUser = new ocf.aws_elasticache.User(this, 'NoPasswordRequiredUser', {
      userId: 'no-password-required-user',
      accessString: 'on ~* +@all',
      authenticationType: AuthenticationType.NO_PASSWORD_REQUIRED,
    });

    const passwordUser = new ocf.aws_elasticache.User(this, 'PasswordUser', {
      userId: 'password-user',
      userName: 'password-user-names',
      accessString: 'on ~* +@all',
      authenticationType: AuthenticationType.PASSWORD,
      passwords: [
        cdk.SecretValue.unsafePlainText('adminUserPassword123'),
        cdk.SecretValue.unsafePlainText('hogehogeadminUserPassword123'),
      ],
    });

    const userGroup = new ocf.aws_elasticache.UserGroup(this, 'UserGroup', {
      userGroupId: 'my-user-group',
      users: [defaultUser, iamUser, noPasswordRequiredUser],
    });

    userGroup.addUser(passwordUser);

    const vpc = new cdk.aws_ec2.Vpc(this, 'VPC', {});

    const key = new cdk.aws_kms.Key(this, 'Key', {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const serverlessCache = new ocf.aws_elasticache.ServerlessCache(this, 'ElastiCacheServerlessCluster', {
      engine: Engine.VALKEY,
      serverlessCacheName: 'my-serverless-cache',
      dailySnapshotTime: new DailySnapshotTime({ hour: 12, minute: 0 }),
      description: 'my serverless cache',
      finalSnapshotName: 'my-finalsnapshot',
      kmsKey: key,
      majorEngineVersion: MajorVersion.VER_8,
      snapshotRetentionLimit: 6,
      securityGroups: [
        new cdk.aws_ec2.SecurityGroup(this, 'SecurityGroup', {
          vpc,
        }),
      ],
      vpc,
      vpcSubnets: vpc.selectSubnets({
        subnetType: cdk.aws_ec2.SubnetType.PRIVATE_WITH_EGRESS,
      }),
      userGroup,
    });

    serverlessCache.metric('CacheHits', {}).createAlarm(this, 'CacheHitsAlarm', {
      threshold: 50,
      evaluationPeriods: 1,
    });
    serverlessCache.metricBytesUsedForCache().createAlarm(this, 'BytesUsedForCacheAlarm', {
      threshold: 50,
      evaluationPeriods: 1,
    });
    serverlessCache.metricElastiCacheProcessingUnits().createAlarm(this, 'ElastiCacheProcessingUnitsAlarm', {
      threshold: 50,
      evaluationPeriods: 1,
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
