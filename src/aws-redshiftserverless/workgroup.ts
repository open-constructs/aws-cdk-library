import { IResource, Lazy, Names, Resource, aws_redshiftserverless, aws_ec2, Token, Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { INamespace } from './namespace';

/**
 * A Redshift Serverless Workgroup
 */
export interface IWorkgroup extends IResource, aws_ec2.IConnectable {
  /**
   * The workgroup Arn
   *
   * @attribute
   */
  readonly workgroupArn: string;
  /**
   * The workgroup name
   *
   * @attribute
   */
  readonly workgroupName: string;
  /**
   * The workgroup id
   *
   * @attribute
   */
  readonly workgroupId: string;
  /**
   * The workgroup endpoint address
   *
   * @attribute
   */
  readonly endpointAddress: string;
  /**
   * The workgroup port
   *
   * @attribute
   */
  readonly port: number;
}

/**
 * Properties for defining a Redshift Serverless Workgroup.
 */
export interface WorkgroupProps {
  /**
   * The base compute capacity of the workgroup in Redshift Processing Units (RPUs).
   *
   * You can adjust the base capacity setting from 8 RPUs to 512 RPUs in units of 8.
   * Also you can increment or decrement RPUs in units of 32 when setting a base capacity between 512-1024.
   *
   * @default 128
   *
   * @see https://docs.aws.amazon.com/redshift/latest/mgmt/serverless-capacity.html
   */
  readonly baseCapacity?: number;

  /**
   * A list of parameters to set for finer control over a database.
   *
   * @see https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshiftserverless-workgroup.html#cfn-redshiftserverless-workgroup-configparameters
   * @default - no config parameters
   */
  readonly configParameters?: { [key: string]: string };

  /**
   * The value that specifies whether to enable enhanced virtual private cloud (VPC) routing,
   * which forces Amazon Redshift Serverless to route traffic through your VPC.
   *
   * @default false
   */
  readonly enhancedVpcRouting?: boolean;

  /**
   * The namespace the workgroup is associated with.
   *
   * @default - the workgroup is not associated with any namespace
   */
  readonly namespace?: INamespace;

  /**
   * The custom port to use when connecting to a workgroup. Valid port ranges are 5431-5455 and 8191-8215.
   *
   * @default 5439
   */
  readonly port?: number;

  /**
   * A value that specifies whether the workgroup can be accessible from a public network.
   *
   * @default false
   */
  readonly publiclyAccessible?: boolean;

  /**
   * The security groups to associate with the workgroup.
   *
   * @default - a new security group is created
   */
  readonly securityGroups?: aws_ec2.ISecurityGroup[];

  /**
   * The VPC to place the workgroup in.
   *
   * `vpc` must have at least 3 subnets, and they must span across 3 Availability Zones.
   */
  readonly vpc: aws_ec2.IVpc;

  /**
   * Where to place the workgroup within the VPC.
   *
   * @default - private subnets
   */
  readonly vpcSubnets?: aws_ec2.SubnetSelection;

  /**
   * The workgroup name.
   *
   * \`workgroupName\` must be between 3 and 64 characters long, contain only lowercase letters, numbers, and hyphens.
   *
   * @default - auto generate
   */
  readonly workgroupName?: string;
}

/**
 * Attributes for importing a Redshift Serverless Workgroup.
 */
export interface WorkgroupAttributes {
  /**
   * The workgroup name
   */
  readonly workgroupName: string;
  /**
   * The workgroup id
   */
  readonly workgroupId: string;
  /**
   * The workgroup endpoint address
   */
  readonly endpointAddress: string;
  /**
   * The workgroup port
   */
  readonly port: number;
  /**
   * The security groups associated with the Redshift Serverless Workgroup.
   */
  readonly securityGroups: aws_ec2.ISecurityGroup[];
}

/**
 * Represents a Redshift Serverless Workgroup construct in AWS CDK.
 *
 * @example
 * declare const namespace: Namespace;
 * declare const vpc: aws_ec2.IVpc;
 *
 * const nameSpace = new Workgroup(
 *   stack,
 *   'Workgroup',
 *   {
 *     workgroupName: 'my-workgroup',
 *     namespace: namespace,
 *     vpc,
 *   },
 * );
 */
export class Workgroup extends Resource implements IWorkgroup {
  /**
   * Import an existing workgroup to the stack from its attributes.
   */
  public static fromWorkgroupAttributes(scope: Construct, id: string, attrs: WorkgroupAttributes): IWorkgroup {
    class Import extends Resource implements IWorkgroup {
      public readonly workgroupName = attrs.workgroupName;
      public readonly workgroupId = attrs.workgroupId;
      public readonly endpointAddress = attrs.endpointAddress;
      public readonly port = attrs.port;
      public readonly connections = new aws_ec2.Connections({
        securityGroups: attrs.securityGroups,
        defaultPort: aws_ec2.Port.tcp(attrs.port),
      });
      public readonly workgroupArn = Stack.of(this).formatArn({
        resource: 'redshift-serverless',
        service: 'workgroup',
        resourceName: attrs.workgroupId,
      });
    }

    return new Import(scope, id);
  }

  /**
   * The workgroup Arn
   */
  readonly workgroupArn: string;

  /**
   * The workgroup name
   */
  readonly workgroupName: string;

  /**
   * The workgroup id
   */
  readonly workgroupId: string;

  /**
   * The workgroup endpoint address
   */
  readonly endpointAddress: string;

  /**
   * The workgroup port
   */
  readonly port: number;

  /**
   * The connection object associated with the Redshift Serverless Workgroup.
   */
  public readonly connections: aws_ec2.Connections;

  private readonly props: WorkgroupProps;
  private readonly securityGroups: aws_ec2.ISecurityGroup[];
  private readonly vpcSubnets: aws_ec2.SubnetSelection;

  constructor(scope: Construct, id: string, props: WorkgroupProps) {
    super(scope, id, {
      physicalName:
        props.workgroupName ??
        Lazy.string({
          produce: () => Names.uniqueResourceName(this, { maxLength: 64, allowedSpecialCharacters: '-' }).toLowerCase(),
        }),
    });
    this.props = props;

    this.securityGroups = props.securityGroups ?? [
      this.createSecurityGroup(this, 'SecurityGroup', {
        vpc: this.props.vpc,
        description: 'Automatic generated security group for Redshift Serverless Security Group',
      }),
    ];

    this.connections = new aws_ec2.Connections({
      securityGroups: this.securityGroups,
    });

    this.vpcSubnets = props.vpcSubnets ?? {
      subnetType: aws_ec2.SubnetType.PRIVATE_WITH_EGRESS,
    };

    this.validateCapacity();
    this.validateWorkgroupName();
    this.validatePort();
    this.validateSubnet();

    const workgroup = this.createResource(this, 'Resource', {
      baseCapacity: this.props.baseCapacity,
      configParameters: this.props.configParameters
        ? Object.entries(this.props.configParameters).map(([key, value]) => ({
            parameterKey: key,
            parameterValue: value,
          }))
        : undefined,
      enhancedVpcRouting: this.props.enhancedVpcRouting,
      namespaceName: this.props.namespace?.namespaceName,
      publiclyAccessible: this.props.publiclyAccessible,
      port: this.props.port,
      securityGroupIds: this.securityGroups.map(sg => sg.securityGroupId),
      subnetIds: this.props.vpc.selectSubnets(this.vpcSubnets).subnetIds,
      workgroupName: this.physicalName,
    });

    this.workgroupArn = workgroup.attrWorkgroupWorkgroupArn;
    this.workgroupName = workgroup.attrWorkgroupWorkgroupName;
    this.workgroupId = workgroup.attrWorkgroupWorkgroupId;
    this.endpointAddress = workgroup.attrWorkgroupEndpointAddress;
    this.port = workgroup.attrWorkgroupEndpointPort;
  }

  protected createResource(
    scope: Construct,
    id: string,
    props: aws_redshiftserverless.CfnWorkgroupProps,
  ): aws_redshiftserverless.CfnWorkgroup {
    return new aws_redshiftserverless.CfnWorkgroup(scope, id, props);
  }

  protected createSecurityGroup(
    scope: Construct,
    id: string,
    props: aws_ec2.SecurityGroupProps,
  ): aws_ec2.SecurityGroup {
    return new aws_ec2.SecurityGroup(scope, id, props);
  }

  /**
   * Validates capacity settings.
   */
  private validateCapacity(): void {
    const baseCapacity = this.props.baseCapacity;

    if (!Token.isUnresolved(baseCapacity) && baseCapacity !== undefined) {
      if (baseCapacity < 8 || baseCapacity > 1024) {
        throw new Error(`\`baseCapacity\` must be between 8 and 1024, got: ${baseCapacity}.`);
      }

      if (8 <= baseCapacity && baseCapacity <= 512 && baseCapacity % 8 !== 0) {
        throw new Error(`\`baseCapacity\` must be units of 8 between 8 and 512, got: ${baseCapacity}.`);
      }

      if (512 <= baseCapacity && baseCapacity <= 1024 && baseCapacity % 32 !== 0) {
        throw new Error(`\`baseCapacity\` must be units of 32 between 512 and 1024, got: ${baseCapacity}.`);
      }
    }
  }

  /**
   * Validates a workgroup name.
   */
  private validateWorkgroupName(): void {
    const workgroupName = this.props.workgroupName;
    if (Token.isUnresolved(workgroupName) || workgroupName === undefined) {
      return;
    }

    if (!/^[a-z0-9-]+$/.test(workgroupName)) {
      throw new Error(
        `\`workgroupName\` must contain only lowercase letters, numbers, and hyphens, got: ${workgroupName}.`,
      );
    }

    if (workgroupName.length < 3 || workgroupName.length > 64) {
      throw new Error(
        `\`workgroupName\` must be between 3 and 64 characters, got: ${workgroupName.length} characters.`,
      );
    }
  }

  /**
   * Validates a port number.
   *
   * @see https://docs.aws.amazon.com/redshift/latest/mgmt/serverless-connecting.html
   */
  private validatePort(): void {
    const port = this.props.port;
    if (!Token.isUnresolved(port) && port !== undefined) {
      const isValidPort = (port >= 5431 && port <= 5455) || (port >= 8191 && port <= 8215);

      if (!isValidPort) {
        throw new Error(
          `\`port\` must be in the range of 5431-5455 or 8191-8215 for Amazon Redshift Serverless, got: ${port}.`,
        );
      }
    }
  }

  /**
   * Validates subnets.
   *
   * @see https://docs.aws.amazon.com/redshift/latest/mgmt/serverless-usage-considerations.html
   */
  private validateSubnet(): void {
    const azLength = this.props.vpc.availabilityZones.length;
    if (azLength < 3) {
      throw new Error(
        `\`vpc\` must have at least 3 subnets, and they must span across 3 Availability Zones, got: ${azLength} AZs.`,
      );
    }
  }
}
