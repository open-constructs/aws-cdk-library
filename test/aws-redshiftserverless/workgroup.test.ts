import { App, Stack, aws_ec2 } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { Workgroup } from '../../src/aws-redshiftserverless';

describe('Redshift Serverless Workgroup', () => {
  let app: App;
  let stack: Stack;
  let vpc: aws_ec2.Vpc;

  beforeEach(() => {
    app = new App();
    stack = new Stack(app, 'TestStack', {
      env: { account: '012345678901', region: 'us-east-1' },
    });
    vpc = new aws_ec2.Vpc(stack, 'VPC');
  });

  test('Create namsepace with minimal properties ', () => {
    new Workgroup(stack, 'Namespace', {
      vpc,
    });

    Template.fromStack(stack).hasResourceProperties('AWS::RedshiftServerless::Workgroup', {
      SecurityGroupIds: [{
        'Fn::GetAtt': [
          'NamespaceSecurityGroup051B6159',
          'GroupId',
        ],
      }],
      SubnetIds: [
        { Ref: 'VPCPrivateSubnet1Subnet8BCA10E0' },
        { Ref: 'VPCPrivateSubnet2SubnetCFCDAA7A' },
        { Ref: 'VPCPrivateSubnet3Subnet3EDCD457' },
      ],
    });
  });

  // WIP: add more tests
});