import { IntegTest } from '@aws-cdk/integ-tests-alpha';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ocf from '../../src';

class ElastiCacheStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new cdk.aws_ec2.Vpc(this, 'VPC', {});

    new ocf.aws_elasticache.ServerlessCache(this, 'Valkey8', {
      serverlessCacheEngine: ocf.aws_elasticache.ServerlessCacheEngine.valkey({
        engineVersion: ocf.aws_elasticache.ValkeyEngineVersion.VER_8,
      }),
      vpc,
    });

    new ocf.aws_elasticache.ServerlessCache(this, 'Valkey7', {
      serverlessCacheEngine: ocf.aws_elasticache.ServerlessCacheEngine.valkey({
        engineVersion: ocf.aws_elasticache.ValkeyEngineVersion.VER_7,
      }),
      vpc,
    });

    new ocf.aws_elasticache.ServerlessCache(this, 'Redis7', {
      serverlessCacheEngine: ocf.aws_elasticache.ServerlessCacheEngine.redis({
        engineVersion: ocf.aws_elasticache.RedisEngineVersion.VER_7,
      }),
      vpc,
    });

    new ocf.aws_elasticache.ServerlessCache(this, 'Memcached1_6', {
      serverlessCacheEngine: ocf.aws_elasticache.ServerlessCacheEngine.memcached({
        engineVersion: ocf.aws_elasticache.MemcachedEngineVersion.VER_1_6,
      }),
      vpc,
    });
  }
}

const app = new cdk.App();

const testCase = new ElastiCacheStack(app, 'ElastiCacheServerlessCacheEngineStack');

new IntegTest(app, 'ElastiCacheServerlessCacheEngineTest', {
  testCases: [testCase],
});
