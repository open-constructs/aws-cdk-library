import { App, Stack, aws_ec2 } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { IWorkgroup, Namespace, Workgroup } from '../../src/aws-redshiftserverless';

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

  test('Create workgroup with minimal properties ', () => {
    new Workgroup(stack, 'Namespace', {
      vpc,
    });

    Template.fromStack(stack).hasResourceProperties('AWS::RedshiftServerless::Workgroup', {
      SecurityGroupIds: [
        {
          'Fn::GetAtt': ['NamespaceSecurityGroup051B6159', 'GroupId'],
        },
      ],
      SubnetIds: [
        { Ref: 'VPCPrivateSubnet1Subnet8BCA10E0' },
        { Ref: 'VPCPrivateSubnet2SubnetCFCDAA7A' },
        { Ref: 'VPCPrivateSubnet3Subnet3EDCD457' },
      ],
    });
  });

  test('Create workgroup with maximum properties ', () => {
    const namespace = new Namespace(stack, 'Namespace', {});
    const securityGroup = aws_ec2.SecurityGroup.fromSecurityGroupId(stack, 'SG', 'sg-123456789');

    new Workgroup(stack, 'Workgroup', {
      baseCapacity: 8,
      configParameters: {
        datestyle: 'ISO, MDY',
        enable_user_activity_logging: 'true',
        query_group: 'default',
        require_ssl: 'true',
        search_path: '$user, public',
        max_query_execution_time: '14440',
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
      WorkgroupName: 'my-workgroup',
      NamespaceName: stack.resolve(namespace.namespaceName),
      BaseCapacity: 8,
      ConfigParameters: [
        { ParameterKey: 'datestyle', ParameterValue: 'ISO, MDY' },
        { ParameterKey: 'enable_user_activity_logging', ParameterValue: 'true' },
        { ParameterKey: 'query_group', ParameterValue: 'default' },
        { ParameterKey: 'require_ssl', ParameterValue: 'true' },
        { ParameterKey: 'search_path', ParameterValue: '$user, public' },
        { ParameterKey: 'max_query_execution_time', ParameterValue: '14440' },
      ],
      EnhancedVpcRouting: true,
      Port: 5440,
      PubliclyAccessible: true,
      SecurityGroupIds: [stack.resolve(securityGroup.securityGroupId)],
      SubnetIds: [
        { Ref: 'VPCPrivateSubnet1Subnet8BCA10E0' },
        { Ref: 'VPCPrivateSubnet2SubnetCFCDAA7A' },
        { Ref: 'VPCPrivateSubnet3Subnet3EDCD457' },
      ],
    });
  });

  describe('import method', () => {
    let securityGroup: aws_ec2.ISecurityGroup;
    let importedWorkgroup: IWorkgroup;

    beforeEach(() => {
      stack = new Stack();
      securityGroup = aws_ec2.SecurityGroup.fromSecurityGroupId(stack, 'SG', 'sg-123456789');
      importedWorkgroup = Workgroup.fromWorkgroupAttributes(stack, 'ImportedWorkgroup', {
        workgroupName: 'my-workgroup',
        workgroupId: 'my-workgroup-id',
        endpointAddress: 'my-workgroup.endpoint.com',
        port: 5439,
        securityGroups: [securityGroup],
      });
    });

    test('should correctly set workgroupName', () => {
      expect(importedWorkgroup.workgroupName).toEqual('my-workgroup');
    });

    test('should correctly set workgroupId', () => {
      expect(importedWorkgroup.workgroupId).toEqual('my-workgroup-id');
    });

    test('should correctly set endpointAddress', () => {
      expect(importedWorkgroup.endpointAddress).toEqual('my-workgroup.endpoint.com');
    });

    test('should correctly set port', () => {
      expect(importedWorkgroup.port).toEqual(5439);
    });

    test('should correctly format workgroupArn', () => {
      expect(importedWorkgroup.workgroupArn).toEqual(
        Stack.of(stack).formatArn({
          resource: 'redshift-serverless',
          service: 'workgroup',
          resourceName: 'my-workgroup-id',
        }),
      );
    });

    test('should correctly set security groups', () => {
      expect(importedWorkgroup.connections.securityGroups).toEqual([securityGroup]);
    });
  });

  describe('validateCapacity test', () => {
    test.each([0, 1056])('throws when baseCapacity is out of range, got %d', baseCapacity => {
      expect(() => {
        new Workgroup(stack, 'Workgroup', {
          baseCapacity,
          vpc,
        });
      }).toThrow(`\`baseCapacity\` must be between 8 and 1024, got: ${baseCapacity}.`);
    });

    test('throws when baseCapacity is not units of 8 between 8 and 512', () => {
      expect(() => {
        new Workgroup(stack, 'Workgroup', {
          baseCapacity: 15,
          vpc,
        });
      }).toThrow('`baseCapacity` must be units of 8 between 8 and 512, got: 15.');
    });

    test('throws when baseCapacity is not units of 32 between 512 and 1024', () => {
      expect(() => {
        new Workgroup(stack, 'Workgroup', {
          baseCapacity: 520,
          vpc,
        });
      }).toThrow('`baseCapacity` must be units of 32 between 512 and 1024, got: 520.');
    });
  });

  describe('validateWorkgroupName test', () => {
    test.each(['ABC', 'name with spaces'])('throws when workgroupName is invalid, got %s', workgroupName => {
      expect(() => {
        new Workgroup(stack, 'Workgroup', {
          workgroupName,
          vpc,
        });
      }).toThrow(`\`workgroupName\` must contain only lowercase letters, numbers, and hyphens, got: ${workgroupName}.`);
    });

    test.each(['a'.repeat(2), 'a'.repeat(100)])(
      'throws when workgroupName length is invalid, got %s',
      workgroupName => {
        expect(() => {
          new Workgroup(stack, 'Workgroup', {
            workgroupName,
            vpc,
          });
        }).toThrow(`\`workgroupName\` must be between 3 and 64 characters, got: ${workgroupName.length} characters.`);
      },
    );
  });

  describe('validatePort test', () => {
    test.each([5430, 5456, 8190, 8216])('throws when port is invalid, got %d', port => {
      expect(() => {
        new Workgroup(stack, 'Workgroup', {
          port,
          vpc,
        });
      }).toThrow(
        `\`port\` must be in the range of 5431-5455 or 8191-8215 for Amazon Redshift Serverless, got: ${port}.`,
      );
    });
  });

  describe('validateSubnet test', () => {
    test('throws when vpc has over 3 subnets but has only 2 AZs', () => {
      const vpcFor2Az = new aws_ec2.Vpc(stack, 'VPCfor2Az', {
        maxAzs: 2,
        subnetConfiguration: [
          {
            cidrMask: 24,
            name: 'Public',
            subnetType: aws_ec2.SubnetType.PUBLIC,
          },
          {
            cidrMask: 24,
            name: 'Private',
            subnetType: aws_ec2.SubnetType.PRIVATE_WITH_EGRESS,
          },
          {
            cidrMask: 24,
            name: 'AnotherPrivate',
            subnetType: aws_ec2.SubnetType.PRIVATE_WITH_EGRESS,
          },
        ],
      });

      expect(() => {
        new Workgroup(stack, 'Workgroup', {
          vpc: vpcFor2Az,
        });
      }).toThrow('`vpc` must have at least 3 subnets, and they must span across 3 Availability Zones, got: 2 AZs.');
    });
  });
});
