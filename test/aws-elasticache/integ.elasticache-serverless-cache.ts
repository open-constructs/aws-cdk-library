import { IntegTest } from '@aws-cdk/integ-tests-alpha';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ocf from '../../src';
import { DailySnapshotTime, Engine, MajorVersion } from '../../src/aws-elasticache';

class ElastiCacheStack extends cdk.Stack {
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

    const role = new cdk.aws_iam.Role(this, 'TestRole', { assumedBy: new cdk.aws_iam.AccountRootPrincipal() });
    iamUser.grantConnect(role);
    importedIamUser.grantConnect(role);
    serverlessCache.grantConnect(role);
  }
}

const app = new cdk.App();

const testCase = new ElastiCacheStack(app, 'ElastiCacheServerlessCacheStack');

new IntegTest(app, 'ElastiCacheServerlessCacheTest', {
  testCases: [testCase],
});
