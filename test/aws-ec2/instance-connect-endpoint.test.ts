import { App, Stack, aws_ec2 } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { InstanceConnectEndpoint } from '../../src/aws-ec2';

describe('InstanceConnectEndpoint', () => {
  let app: App;
  let stack: Stack;

  beforeEach(() => {
    app = new App();
    stack = new Stack(app, 'TestStack');
  });

  test('default configuration', () => {
    new InstanceConnectEndpoint(stack, 'MyInstanceConnectEndpoint', {
      vpc: new aws_ec2.Vpc(stack, 'VPC', {
        maxAzs: 2,
      }),
    });

    Template.fromStack(stack).hasResourceProperties('AWS::EC2::InstanceConnectEndpoint', {
      SecurityGroupIds: [
        { 'Fn::GetAtt': ['MyInstanceConnectEndpointSecurityGroup99B9E814', 'GroupId'] },
      ],
      SubnetId: { Ref: 'VPCPrivateSubnet1Subnet8BCA10E0' },
    });
  });

  test('custom configuration', () => {
    const vpc = new aws_ec2.Vpc(stack, 'VPC', {
      maxAzs: 2,
    });
    new InstanceConnectEndpoint(stack, 'MyCustomInstanceConnectEndpoint', {
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

  test('import from attributes', () => {
    const vpc = new aws_ec2.Vpc(stack, 'VPC');
    const securityGroup = new aws_ec2.SecurityGroup(stack, 'SecurityGroup', {
      vpc,
      allowAllOutbound: false,
    });

    const existingEndpoint = InstanceConnectEndpoint.fromInstanceConnectEndpointAttributes(
      stack,
      'ImportedInstanceConnectEndpoint',
      {
        instanceConnectEndpointId: 'my-endpoint-id',
        securityGroups: [securityGroup],
      },
    );

    expect(existingEndpoint.instanceConnectEndpointId).toEqual('my-endpoint-id');
    expect(existingEndpoint.connections.securityGroups).toEqual([securityGroup]);
  });
});
