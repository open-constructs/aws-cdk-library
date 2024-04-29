import { aws_ec2 } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export enum InstanceConnectEndpointPort {
  SSH = 22,
  RDP = 3389,
}

export interface InstanceConnectEndpointProps {
  /**
   * Unique, case-sensitive identifier that you provide to ensure the idempotency of the request.
   *
   * @default - Automatically generated client token.
   */
  clientToken?: string;

  /**
   * @default InstanceConnectEndpointPort.SSH
   */
  port?: InstanceConnectEndpointPort;

  /**
   * Indicates whether your client's IP address is preserved as the source.
   *
   * @default true
   */
  preserveClientIp?: boolean;

  /**
   * The subnet in which to create the EC2 Instance Connect Endpoint.
   */
  subnet: aws_ec2.ISubnet;

  /**
   * The security groups to associate with the EC2 Instance Connect Endpoint.
   */
  securityGroups?: aws_ec2.ISecurityGroup[];
}

export class InstanceConnectEndpoint extends Construct {

  constructor(scope: Construct, id: string, props: InstanceConnectEndpointProps) {
    super(scope, id);

    const instanceConnectEndpoint = this.createInstanceConnectEndpoint(this, 'Resource', {
      clientToken: props.clientToken,
      preserveClientIp: props.preserveClientIp,
      securityGroupIds: props.securityGroups?.map(sg => sg.securityGroupId) ?? [],
      subnetId: props.subnet.subnetId,
    });
  }

  protected createInstanceConnectEndpoint(
    scope: Construct,
    id: string,
    props: aws_ec2.CfnInstanceConnectEndpointProps,
  ): aws_ec2.CfnInstanceConnectEndpoint {
    return new aws_ec2.CfnInstanceConnectEndpoint(scope, id, props);
  }
}

