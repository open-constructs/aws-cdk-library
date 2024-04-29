import { App, Stack, aws_ec2 } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { InstanceConnectEndpoint } from '../../src/aws-ec2';

describe('CostReport', () => {
  let app: App;
  let stack: Stack;

  beforeEach(() => {
    app = new App();
    stack = new Stack(app, 'TestStack');
  });

  test('default configuration', () => {
    new InstanceConnectEndpoint(stack, 'MyCostReport', {
      vpc: new aws_ec2.Vpc(stack, 'VPC', {
        maxAzs: 2,
      }),
    });

    Template.fromStack(stack).hasResourceProperties('AWS::EC2::InstanceConnectEndpoint', {
      SecurityGroupIds: [
        { 'Fn::GetAtt': ['MyCostReportSecurityGroup9CB2B7F4', 'GroupId'] },
      ],
      SubnetId: { Ref: 'VPCPrivateSubnet1Subnet8BCA10E0' },
    });
  });

  test('custom configuration', () => {
    const vpc = new aws_ec2.Vpc(stack, 'VPC', {
      maxAzs: 2,
    });
    new InstanceConnectEndpoint(stack, 'MyCustomCostReport', {
      vpc,
      clientToken: 'my-client-token',
      preserveClientIp: false,
      securityGroups: [
        new aws_ec2.SecurityGroup(stack, 'SecurityGroup', {
          vpc,
          allowAllOutbound: false,
        }),
      ],
    });

    Template.fromStack(stack).hasResourceProperties('AWS::EC2::InstanceConnectEndpoint', {
      ClientToken: 'my-client-token',
      PreserveClientIp: false,
      SecurityGroupIds: [
        { 'Fn::GetAtt': ['SecurityGroupDD263621', 'GroupId'] },
      ],
      SubnetId: { Ref: 'VPCPrivateSubnet1Subnet8BCA10E0' },
    });
  });
});
