import { App, Stack, aws_ec2 } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import {
  ValkeyEngineVersion,
  ServerlessCache,
  ServerlessCacheEngine,
  RedisEngineVersion,
  MemcachedEngineVersion,
} from '../../src/aws-elasticache';

describe('ElastiCache Serverless Cache Engine', () => {
  let app: App;
  let stack: Stack;
  let vpc: aws_ec2.Vpc;

  beforeEach(() => {
    app = new App();
    stack = new Stack(app, 'TestStack', {});
    vpc = new aws_ec2.Vpc(stack, 'VPC');
  });

  test.each([
    ['7', ValkeyEngineVersion.VER_7],
    ['8', ValkeyEngineVersion.VER_8],
  ])('valkey engine version %s', (majorVersion, engineVersion) => {
    new ServerlessCache(stack, 'ServerlessCache', {
      serverlessCacheEngine: ServerlessCacheEngine.valkey({
        engineVersion,
      }),
      vpc,
    });

    Template.fromStack(stack).hasResourceProperties('AWS::ElastiCache::ServerlessCache', {
      Engine: 'valkey',
      MajorEngineVersion: majorVersion,
    });
  });

  test.each([['7', RedisEngineVersion.VER_7]])('redis engine version %s', (majorVersion, engineVersion) => {
    new ServerlessCache(stack, 'ServerlessCache', {
      serverlessCacheEngine: ServerlessCacheEngine.redis({
        engineVersion,
      }),
      vpc,
    });

    Template.fromStack(stack).hasResourceProperties('AWS::ElastiCache::ServerlessCache', {
      Engine: 'redis',
      MajorEngineVersion: majorVersion,
    });
  });

  test.each([['1.6', MemcachedEngineVersion.VER_1_6]])('memcached engine version %s', (majorVersion, engineVersion) => {
    new ServerlessCache(stack, 'ServerlessCache', {
      serverlessCacheEngine: ServerlessCacheEngine.memcached({
        engineVersion,
      }),
      vpc,
    });

    Template.fromStack(stack).hasResourceProperties('AWS::ElastiCache::ServerlessCache', {
      Engine: 'memcached',
      MajorEngineVersion: majorVersion,
    });
  });
});
