import { IntegTest } from '@aws-cdk/integ-tests-alpha';
import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import * as ocf from '../../src';

class SplitHorizonDnsStack extends cdk.Stack {
  constructor(scope: Construct) {
    super(scope, 'SplitHorizonDnsStack');
    const vpc = new ec2.Vpc(this, 'myvpc');

    const targets = [
      {
        target: ['www.example.com'],
        public: true,
      },
      {
        target: ['www.example.com'],
        private: true,
      },
    ];

    new ocf.aws_route53.SplitHorizonDns(this, 'SplitHorizonDns', {
      zoneName: 'example.com',
      privateZoneVpcs: [vpc],
      targets,
    });
  }
}

const app = new cdk.App();
const testCase = new SplitHorizonDnsStack(app);
new IntegTest(app, 'SplitHorizonDns', {
  testCases: [testCase],
});