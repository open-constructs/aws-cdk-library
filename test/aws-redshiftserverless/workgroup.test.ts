import { App, Stack, aws_ec2 } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { Namespace, Workgroup } from '../../src/aws-redshiftserverless';

describe('Redshift Serverless Workgroup', () => {
  let app: App;
  let stack: Stack;
  let vpc: aws_ec2.Vpc;

  beforeEach(() => {
    app = new App();
    stack = new Stack(app, 'TestStack', {
      env: { account: '012345678901', region: 'us-east-1' },
    });
    vpc = new aws_ec2.Vpc(stack, 'VPC',);
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

  test('Create namsepace with maximum properties ', () => {
    const namespace = new Namespace(stack, 'Namespace', {});
    const securityGroup = aws_ec2.SecurityGroup.fromSecurityGroupId(stack, 'SG', 'sg-123456789');

    new Workgroup(stack, 'Workgroup', {
      baseCapacity: 8,
      configParameters: {
        aaa: 'aaa',
      },
      enhancedVpcRouting: true,
      namespace,
      port: 5440,
      publiclyAccessible: true,
      securityGroups: [securityGroup],
      vpc,
      vpcSubnets: {
        subnetType: aws_ec2.SubnetType.PRIVATE_WITH_EGRESS,
      },
      workgroupName: 'my-workgroup',
    });

    Template.fromStack(stack).hasResourceProperties('AWS::RedshiftServerless::Workgroup', {
      SecurityGroupIds: [stack.resolve(securityGroup.securityGroupId)],
      SubnetIds: [
        { Ref: 'VPCPrivateSubnet1Subnet8BCA10E0' },
        { Ref: 'VPCPrivateSubnet2SubnetCFCDAA7A' },
        { Ref: 'VPCPrivateSubnet3Subnet3EDCD457' },
      ],
    });
  });

  describe('import method', () => {
    test('imports Workgroup correctly', () => {

      const securityGroup = aws_ec2.SecurityGroup.fromSecurityGroupId(stack, 'SG', 'sg-123456789')
      const importedWorkgroup = Workgroup.fromWorkgroupAttributes(stack, 'ImportedWorkgroup', {
        workgroupName: 'my-workgroup',
        workgroupId: 'my-workgroup-id',
        endpointAddress: 'my-workgroup.endpoint.com',
        port: 5439,
        securityGroups: [securityGroup],
      });

      expect(importedWorkgroup.workgroupName).toEqual('my-workgroup');

      expect(importedWorkgroup.workgroupId).toEqual('my-workgroup-id');

      expect(importedWorkgroup.endpointAddress).toEqual('my-workgroup.endpoint.com');

      expect(importedWorkgroup.port).toEqual(5439);

      expect(importedWorkgroup.workgroupName).toEqual('my-workgroup');

      expect(importedWorkgroup.workgroupArn).toEqual(Stack.of(stack).formatArn({
        resource: 'redshift-serverless',
        service: 'workgroup',
        resourceName: 'my-workgroup-id',
      }));

      expect(importedWorkgroup.connections.securityGroups).toEqual([securityGroup]);
    });
  });

  describe('validateCapacity test', () => {
    test.each([0, 520, 15])('throws when baseCapacity is invalid, got %d', (baseCapacity) => {
      expect(() => {
        new Workgroup(stack, 'Workgroup', {
          baseCapacity,
          vpc,
        });
      }).toThrow(`\`baseCapacity\` must be between 8 and 512 in units of 8, got: ${baseCapacity}.`);
    });
  });

  describe('validateWorkgroupName test', () => {
    test.each(['ABC', 'name with spaces', 'a'.repeat(2), 'a'.repeat(100),])
      ('throws when workgroupName is invalid, got %s', (workgroupName) => {
        expect(() => {
          new Workgroup(stack, 'Workgroup', {
            workgroupName,
            vpc,
          });
        }).toThrow(`\`workgroupName\` must be between 3 and 64 characters long, contain only lowercase letters, numbers, and hyphens, got: ${workgroupName}.`);
      });
  });

  describe('validatePort test', () => {
    test.each([5430, 5456, 8190, 8216])('throws when port is invalid, got %d', (port) => {
      expect(() => {
        new Workgroup(stack, 'Workgroup', {
          port,
          vpc,
        });
      }).toThrow(`\`port\` must be in the range of 5431-5455 or 8191-8215 for Amazon Redshift Serverless, got: ${port}.`);
    });
  });

  describe('validateSubnet test', () => {
    test('throws when vpc has only 2 AZs', () => {
      const vpcFor2Az = new aws_ec2.Vpc(stack, 'VPCfor2Az', {
        maxAzs: 2,
      });

      expect(() => {
        new Workgroup(stack, 'Workgroup', {
          vpc: vpcFor2Az,
        });
      }).toThrow('\`vpc` must have at least three subnets, and they must span across three Availability Zones.');
    });
  });
});