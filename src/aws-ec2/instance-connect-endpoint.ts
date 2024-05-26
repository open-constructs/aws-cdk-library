import { IResource, Resource, aws_ec2 } from 'aws-cdk-lib';
import { Construct } from 'constructs';

/**
 * An EC2 Instance Connect Endpoint.
 */
export interface IInstanceConnectEndpoint
  extends aws_ec2.IConnectable,
    IResource {
  /**
   * The ID of the EC2 Instance Connect Endpoint.
   *
   * @attribute
   */
  readonly instanceConnectEndpointId: string;
}

/**
 * Properties for defining an EC2 Instance Connect Endpoint.
 */
export interface InstanceConnectEndpointProps {
  /**
   * Unique, case-sensitive identifier that you provide to ensure the idempotency of the request.
   *
   * @see https://docs.aws.amazon.com/ja_jp/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-instanceconnectendpoint.html#cfn-ec2-instanceconnectendpoint-clienttoken
   */
  readonly clientToken?: string;

  /**
   * Indicates whether your client's IP address is preserved as the source.
   *
   * @see https://docs.aws.amazon.com/ja_jp/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-instanceconnectendpoint.html#cfn-ec2-instanceconnectendpoint-preserveclientip
   * @default true
   */
  readonly preserveClientIp?: boolean;

  /**
   * The security groups to associate with the EC2 Instance Connect Endpoint.
   *
   * @default - a new security group is created
   */
  readonly securityGroups?: aws_ec2.ISecurityGroup[];

  /**
   * The VPC in which the EC2 Instance Connect Endpoint is created.
   */
  readonly vpc: aws_ec2.IVpc;
}

/**
 * Attributes for importing an EC2 Instance Connect Endpoint.
 */
export interface InstanceConnectEndpointAttributes {
  /**
   * The ID of the EC2 Instance Connect Endpoint.
   */
  readonly instanceConnectEndpointId: string;

  /**
   * The security groups associated with the EC2 Instance Connect Endpoint.
   */
  readonly securityGroups: aws_ec2.ISecurityGroup[];
}

/**
 * Represents an EC2 Instance Connect Endpoint construct in AWS CDK.
 *
 * @example
 * declare const securityGroups: aws_ec2.ISecurityGroup[];
 * declare const vpc: aws_ec2.IVpc;
 *
 * const instanceConnectEndpoint = new InstanceConnectEndpoint(
 *   stack,
 *   'InstanceConnectEndpoint',
 *   {
 *     clientToken: 'my-client-token',
 *     preserveClientIp: true,
 *     securityGroups,
 *     vpc,
 *   },
 * );
 */
export class InstanceConnectEndpoint
  extends Resource
  implements IInstanceConnectEndpoint
{
  /**
   * Import an existing endpoint to the stack from its attributes.
   */
  public static fromInstanceConnectEndpointAttributes(
    scope: Construct,
    id: string,
    attrs: InstanceConnectEndpointAttributes,
  ): IInstanceConnectEndpoint {
    class Import extends Resource implements IInstanceConnectEndpoint {
      public readonly instanceConnectEndpointId =
        attrs.instanceConnectEndpointId;
      public readonly connections = new aws_ec2.Connections({
        securityGroups: attrs.securityGroups,
      });
    }

    return new Import(scope, id);
  }

  /**
   * The ID of the EC2 Instance Connect Endpoint.
   */
  public readonly instanceConnectEndpointId: string;

  /**
   * The connection object associated with the EC2 Instance Connect Endpoint.
   */
  public readonly connections: aws_ec2.Connections;

  private readonly props: InstanceConnectEndpointProps;
  private readonly securityGroups: aws_ec2.ISecurityGroup[];

  constructor(
    scope: Construct,
    id: string,
    props: InstanceConnectEndpointProps,
  ) {
    super(scope, id);
    this.props = props;

    this.securityGroups = props.securityGroups ?? [this.createSecurityGroup()];

    this.connections = new aws_ec2.Connections({
      securityGroups: this.securityGroups,
    });

    const instanceConnectEndpoint = this.createInstanceConnectEndpoint();

    this.instanceConnectEndpointId = instanceConnectEndpoint.attrId;
  }

  protected createInstanceConnectEndpoint(): aws_ec2.CfnInstanceConnectEndpoint {
    return new aws_ec2.CfnInstanceConnectEndpoint(this, 'Resource', {
      clientToken: this.props.clientToken,
      preserveClientIp: this.props.preserveClientIp,
      securityGroupIds: this.securityGroups.map((sg) => sg.securityGroupId),
      subnetId: this.props.vpc.selectSubnets().subnetIds[0],
    });
  }

  protected createSecurityGroup(): aws_ec2.SecurityGroup {
    return new aws_ec2.SecurityGroup(this, 'SecurityGroup', {
      vpc: this.props.vpc,
    });
  }
}
