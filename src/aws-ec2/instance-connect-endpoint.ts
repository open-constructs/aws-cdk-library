import { aws_ec2 } from 'aws-cdk-lib';
import { Construct, IConstruct } from 'constructs';

/**
 * An EC2 Instance Connect Endpoint.
 */
export interface IInstanceConnectEndpoint extends aws_ec2.IConnectable, IConstruct {
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
  clientToken?: string;

  /**
   * Indicates whether your client's IP address is preserved as the source.
   *
   * @see https://docs.aws.amazon.com/ja_jp/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-instanceconnectendpoint.html#cfn-ec2-instanceconnectendpoint-preserveclientip
   * @default true
   */
  preserveClientIp?: boolean;

  /**
   * The security groups to associate with the EC2 Instance Connect Endpoint.
   *
   * @default - a new security group is created
   */
  securityGroups?: aws_ec2.ISecurityGroup[];

  /**
   * The VPC in which the EC2 Instance Connect Endpoint is created.
   */
  vpc: aws_ec2.IVpc;
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
export class InstanceConnectEndpoint extends Construct implements IInstanceConnectEndpoint {

  /**
   * The ID of the EC2 Instance Connect Endpoint.
   */
  public readonly instanceConnectEndpointId: string;

  /**
   * The connection object associated with the EC2 Instance Connect Endpoint.
   */
  public readonly connections: aws_ec2.Connections;

  constructor(scope: Construct, id: string, props: InstanceConnectEndpointProps) {
    super(scope, id);

    const securityGroups = props.securityGroups ?? [
      new aws_ec2.SecurityGroup(this, 'SecurityGroup', {
        vpc: props.vpc,
      }),
    ];

    this.connections = new aws_ec2.Connections({
      securityGroups,
    });

    const instanceConnectEndpoint = this.createInstanceConnectEndpoint(this, 'Resource', {
      clientToken: props.clientToken,
      preserveClientIp: props.preserveClientIp,
      securityGroupIds: securityGroups.map(sg => sg.securityGroupId),
      subnetId: props.vpc.selectSubnets().subnetIds[0],
    });

    this.instanceConnectEndpointId = instanceConnectEndpoint.getAtt('Id').toString();
  }

  protected createInstanceConnectEndpoint(
    scope: Construct,
    id: string,
    props: aws_ec2.CfnInstanceConnectEndpointProps,
  ): aws_ec2.CfnInstanceConnectEndpoint {
    return new aws_ec2.CfnInstanceConnectEndpoint(scope, id, props);
  }
}

