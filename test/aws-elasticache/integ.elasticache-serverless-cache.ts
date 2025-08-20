import { IntegTest, ExpectedResult, AwsApiCall } from '@aws-cdk/integ-tests-alpha';
import * as cdk from 'aws-cdk-lib';
import * as cloudwatch from 'aws-cdk-lib/aws-cloudwatch';
import { Construct } from 'constructs';
import * as ocf from '../../src';
import {
  DailySnapshotTime,
  DataStorage,
  ECPUPerSecond,
  ServerlessCacheEngine,
  ValkeyEngineVersion,
} from '../../src/aws-elasticache';

class ElastiCacheStack extends cdk.Stack {
  public readonly alarms: cloudwatch.IAlarm[] = [];

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const defaultUser = new ocf.aws_elasticache.NoPasswordRequiredUser(this, 'DefaultUser', {
      userId: 'new-default',
      userName: 'default',
    });

    const iamUser = new ocf.aws_elasticache.IamUser(this, 'IamUser', {
      accessString: 'on ~* +@all',
    });

    const noPasswordRequiredUser = new ocf.aws_elasticache.NoPasswordRequiredUser(this, 'NoPasswordRequiredUser', {
      userId: 'no-password-required-user',
      accessString: 'on ~* +@all',
    });

    const passwordUser = new ocf.aws_elasticache.PasswordUser(this, 'PasswordUser', {
      userId: 'password-user',
      userName: 'password-user-names',
      accessString: 'on ~* +@all',
      passwords: [
        cdk.SecretValue.unsafePlainText('adminUserPassword123'),
        cdk.SecretValue.unsafePlainText('hogehogeadminUserPassword123'),
      ],
    });

    const generatedPasswordUser = new ocf.aws_elasticache.PasswordUser(this, 'GeneratedPasswordUser', {
      userId: 'generated-password-user',
      userName: 'generated-password-user-names',
      accessString: 'on ~* +@all',
    });

    const iamUserForImport = new ocf.aws_elasticache.IamUser(this, 'IamUserForImport', {
      userId: 'iam-user-for-import',
      accessString: 'on ~* +@all',
    });

    const importedIamUser = ocf.aws_elasticache.IamUser.fromUserId(this, 'ImportedIamUser', iamUserForImport.userId);

    const userGroup = new ocf.aws_elasticache.UserGroup(this, 'UserGroup', {
      userGroupId: 'my-user-group',
      users: [defaultUser, iamUser, noPasswordRequiredUser, generatedPasswordUser],
    });

    userGroup.addUser(passwordUser);
    userGroup.addUser(importedIamUser);

    const vpc = new cdk.aws_ec2.Vpc(this, 'VPC', {});

    const key = new cdk.aws_kms.Key(this, 'Key', {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const serverlessCache = new ocf.aws_elasticache.ServerlessCache(this, 'ElastiCacheServerlessCluster', {
      serverlessCacheEngine: ServerlessCacheEngine.valkey({
        engineVersion: ValkeyEngineVersion.VER_8,
      }),
      serverlessCacheName: 'my-serverless-cache',
      cacheUsageLimits: {
        dataStorage: DataStorage.gb({ minimum: 1, maximum: 5000 }),
        ecpuPerSecond: ECPUPerSecond.of({ minimum: 1000, maximum: 15000000 }),
      },
      dailySnapshotTime: new DailySnapshotTime({ hour: 12, minute: 0 }),
      description: 'my serverless cache',
      finalSnapshotName: 'my-finalsnapshot',
      kmsKey: key,
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

    const cacheHitsAlarm = serverlessCache.metric('CacheHits', {}).createAlarm(this, 'CacheHitsAlarm', {
      threshold: 50,
      evaluationPeriods: 1,
    });
    const bytesUsedAlarm = serverlessCache.metricBytesUsedForCache().createAlarm(this, 'BytesUsedForCacheAlarm', {
      threshold: 50,
      evaluationPeriods: 1,
    });
    serverlessCache.metricElastiCacheProcessingUnits().createAlarm(this, 'ElastiCacheProcessingUnitsAlarm', {
      threshold: 50,
      evaluationPeriods: 1,
    });

    // Add the alarms to the array to assert on them later
    // ElastiCacheProcessingUnitsAlarm is not added because ElastiCacheProcessingUnits metric data is not available without executing commands
    this.alarms.push(cacheHitsAlarm, bytesUsedAlarm);

    const role = new cdk.aws_iam.Role(this, 'TestRole', { assumedBy: new cdk.aws_iam.AccountRootPrincipal() });
    iamUser.grantConnect(role);
    importedIamUser.grantConnect(role);
    serverlessCache.grantConnect(role);
  }
}

const app = new cdk.App();

const testCase = new ElastiCacheStack(app, 'ElastiCacheServerlessCacheStack');

const integ = new IntegTest(app, 'ElastiCacheServerlessCacheTest', {
  testCases: [testCase],
});

const describeAlarmsCall = integ.assertions
  .awsApiCall(
    'cloudwatch',
    'DescribeAlarmsCommand',
    {
      AlarmNames: testCase.alarms.map(a => a.alarmName),
    },
    testCase.alarms.map((_, i) => `MetricAlarms.${i}.StateValue`),
  )
  .waitForAssertions({
    totalTimeout: cdk.Duration.minutes(2),
  }) as AwsApiCall;

// In the current version of aws-cdk-lib, awsApiCall cannot generate the correct policy for CloudWatch API calls
// https://github.com/aws/aws-cdk/pull/33078
describeAlarmsCall.waiterProvider?.addToRolePolicy({
  Effect: 'Allow',
  Action: ['cloudwatch:DescribeAlarms'],
  Resource: ['*'],
});

for (const [i, _] of testCase.alarms.entries()) {
  describeAlarmsCall.assertAtPath(`MetricAlarms.${i}.StateValue`, ExpectedResult.stringLikeRegexp('OK'));
}
