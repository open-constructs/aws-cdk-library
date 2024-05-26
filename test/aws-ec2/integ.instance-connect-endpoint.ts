import { IntegTest } from '@aws-cdk/integ-tests-alpha';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ocf from '../../src';

class InstanceConnectEndpointStack extends cdk.Stack {
  constructor(scope: Construct) {
    super(scope, 'InstanceConnectEndpointStack');

    const vpc = new cdk.aws_ec2.Vpc(this, 'VPC', {
      maxAzs: 2,
    });

    const instance = new cdk.aws_ec2.Instance(this, 'Instance', {
      vpc,
      instanceType: cdk.aws_ec2.InstanceType.of(
        cdk.aws_ec2.InstanceClass.C5,
        cdk.aws_ec2.InstanceSize.LARGE,
      ),
      machineImage: new cdk.aws_ec2.AmazonLinuxImage({
        generation: cdk.aws_ec2.AmazonLinuxGeneration.AMAZON_LINUX_2023,
      }),
    });

    const securityGroup = new cdk.aws_ec2.SecurityGroup(this, 'SecurityGroup', {
      vpc,
      allowAllOutbound: false,
    });

    const instanceConnectEndpoint = new ocf.aws_ec2.InstanceConnectEndpoint(
      this,
      'InstanceConnectEndpoint',
      {
        clientToken: 'my-client-token',
        securityGroups: [securityGroup],
        preserveClientIp: true,
        vpc,
      },
    );

    instanceConnectEndpoint.connections.allowTo(
      instance,
      cdk.aws_ec2.Port.tcp(22),
    );
  }
}

const app = new cdk.App();
const testCase = new InstanceConnectEndpointStack(app);
new IntegTest(app, 'InstanceConnectEndpoint', {
  testCases: [testCase],
});
