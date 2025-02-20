import { Lazy, Names, Resource, Token } from 'aws-cdk-lib';
import {
  Connections,
  IConnectable,
  ISecurityGroup,
  ISubnet,
  IVpc,
  Peer,
  Port,
  SecurityGroup,
  SubnetSelection,
} from 'aws-cdk-lib/aws-ec2';
import { CfnResolverEndpoint } from 'aws-cdk-lib/aws-route53resolver';
import { Construct } from 'constructs';
import { MultiDefaultPortConnections } from './private/multi-default-port-connections';
import { Protocol } from './protocol';
import { ForwardRule, ForwardRuleOptions } from './resolver-rule';

/**
 * Represents the Resolver Endpoint protocols.
 */
export class Protocols {
  /**
   * Do53 alone.
   */
  static readonly DO_53 = new Protocols([Protocol.DO_53]);
  /**
   * DoH alone.
   */
  static readonly DO_H = new Protocols([Protocol.DO_H]);
  /**
   * Do53 and DoH in combination.
   */
  static readonly DO_53_AND_DO_H = new Protocols([Protocol.DO_53, Protocol.DO_H]);
  protected constructor(readonly protocols: Protocol[]) {}
}
/**
 * The protocol sets for inbound endpoint.
 */
export class InboundProtocols extends Protocols {
  /**
   * DoH-FIPS alone.
   */
  static readonly DO_H_FIPS = new InboundProtocols([Protocol.DO_H_FIPS]);
  /**
   * Do53 and DoH-FIPS in combination.
   */
  static readonly DO_53_AND_DO_H_FIPS = new InboundProtocols([
    Protocol.DO_53,
    Protocol.DO_H_FIPS,
  ]);
}

/**
 * A Resolver Endpoint.
 */
export interface IResolverEndpoint {
  /**
   * The ID of the Resolver Endpoint.
   */
  readonly resolverEndpointId: string;
}

/**
 * The IP address that you want DNS resolvers on your network to forward DNS queries to.
 */
export interface IpAddress {
  /**
   * The subnet that contains the IP addresses you want assigned to your Resolver endpoint ENIs.
   * These are the addresses you will send DNS queries to. The subnet must have an available IP address.
   *
   * The subnet IP address must match the IP address type and the subnet ID uniquely identifies a VPC.
   */
  readonly subnet: ISubnet;
  /**
   * The IPv4 address that you want to forward DNS queries to.
   */
  readonly ipv4?: string;
  /**
   * The IPv6 address that you want to forward DNS queries to.
   */
  readonly ipv6?: string;
}

interface IpAddressesOptions {
  readonly subnetSelection?: SubnetSelection;
  readonly ipAddresses?: IpAddress[];
}
/**
 * The IP addresses that you want DNS resolvers on your network to forward DNS queries to.
 * We require you to specify a minimum of two IP addresses for redundancy.
 */
export class IpAddresses {
  static autoAssign(subnetSelection?: SubnetSelection) {
    return new IpAddresses({
      subnetSelection,
    });
  }
  static specify(ipAddresses: IpAddress[]) {
    return new IpAddresses({
      ipAddresses,
    });
  }
  private readonly ipAddresses?: IpAddress[];
  private readonly subnetSelection?: SubnetSelection;
  private constructor(readonly options: IpAddressesOptions) {}
  getIpAddresses(vpc: IVpc): IpAddress[] {
    if (this.ipAddresses) {
      return this.ipAddresses;
    }
    return vpc.selectSubnets(this.subnetSelection).subnets.map((subnet) => ({
      subnet,
    }));
  }
}

/**
 * The type of IP address.
 */
export enum IpAddressType {
  /**
   * Allocate IPv4 addresses.
   */
  IPV4 = 'IPV4',
  /**
   * Allocate IPv6 addresses.
   */
  IPV6 = 'IPV6',
  /**
   * Allocate both IPv4 and IPv6 addresses.
   */
  DUAL_STACK = 'DUALSTACK',
}

/**
 * Options for a Resolver Endpoint.
 */
export interface ResolverEndpointOptions {
  /**
   * **For Inbound Endpoint**
   * - All inbound DNS queries from your network pass through this VPC on the way to Resolver.
   *
   * **For Outbound Endpoint**
   * - All outbound DNS queries will flow through this VPC on the way to your network.
   */
  readonly vpc: IVpc;
  /**
   * The name of this Resolver Endpoint.
   *
   * @default - Generate a new name bu AWS CDK.
   */
  readonly resolverEndpointName?: string;
  /**
   * One or more security groups that control access to this VPC.
   * The security groups rules must allow TCP and UDP access.
   *
   * **For Inbound Endpoint**
   * - The security group must include one or more inbound rules.
   * - Open port 53.
   *
   * **For Outbound Endpoint**
   * - The security group must include one or more outbound rules.
   * - Open the port that you're using for DNS queries on your network.
   *
   * @default - Create a new Security Group.
   */
  readonly securityGroups?: ISecurityGroup[];
  /**
   * The subnets and IP addresses. We require you to specify a minimum of two IP addresses for redundancy.
   *
   * **For Inbound Endpoint**
   * - The IP addresses that you want DNS resolvers on your network to forward DNS queries to.
   *
   * **For Outbound Endpoint**
   * - The IP addresses in your VPC that you want Resolver to forward DNS queries to on the way to resolvers on your network.
   * These are not the IP addresses of the DNS resolvers on your network, you specify resolver IP addresses when you create the rules that you associate with one or more VPCs.
   *
   * @default - Auto assign from private subnets.
   */
  readonly ipAddresses?: IpAddresses;
  /**
   * For the IP address type you can choose either IPv4, IPv6, or dual-stack.
   * A dual-stack endpoint means that it will resolve via both IPv4 and IPv6.
   * This IP address type is applied to all IP addresses.
   *
   * @default IpAddressType.IPV4
   */
  readonly ipAddressType?: IpAddressType;
}

/**
 * Resolver Endpoint direction.
 */
enum Direction {
  /**
   * Direction of inbound.
   */
  INBOUND = 'INBOUND',
  /**
   * Direction of outbound.
   */
  OUTBOUND = 'OUTBOUND',
}

/**
 * Properties for a Resolver Endpoint.
 */
interface ResolverEndpointBaseProps extends ResolverEndpointOptions {
  readonly direction: Direction;
  readonly protocols?: Protocols;
  /**
   * @default false
   */
  readonly allowAllOutbound?: boolean;
  /**
   * @default false
   */
  readonly allowAllIpv6Outbound?: boolean;
}

abstract class ResolverEndpointBase
  extends Resource
  implements IConnectable, IResolverEndpoint {
  readonly connections: Connections;
  readonly resolverEndpointArn: string;
  readonly resolverEndpointId: string;
  constructor(scope: Construct, id: string, props: ResolverEndpointBaseProps) {
    super(scope, id, {
      physicalName: props.resolverEndpointName,
    });
    this.connections = new MultiDefaultPortConnections({
      // Will be replace to Port.DNS_TCP and Port.DNS_UDP
      defaultPorts: [Port.tcp(53), Port.udp(53)],
      securityGroups: props.securityGroups ?? [
        new SecurityGroup(this, 'SecurityGroup', {
          vpc: props.vpc,
          allowAllOutbound: props.allowAllOutbound ?? false,
          allowAllIpv6Outbound: props.allowAllIpv6Outbound ?? false,
        }),
      ],
    });
    const ipAddresses = (
      props.ipAddresses ?? IpAddresses.autoAssign()
    ).getIpAddresses(props.vpc);

    const resource = new CfnResolverEndpoint(this, 'Resource', {
      name: props.resolverEndpointName ?? Names.uniqueResourceName(this, {
        maxLength: 64,
      }),
      direction: props.direction,
      ipAddresses: ipAddresses.map((ipAddress) => ({
        subnetId: ipAddress.subnet.subnetId,
        ip: ipAddress.ipv4,
        ipv6: ipAddress.ipv6,
      })),
      resolverEndpointType: props.ipAddressType,
      protocols: props.protocols?.protocols,
      securityGroupIds: Lazy.list({
        produce: () =>
          this.connections.securityGroups.map((sg) => sg.securityGroupId),
      }),
    });
    this.resolverEndpointArn = resource.attrArn;
    this.resolverEndpointId = resource.attrResolverEndpointId;
  }
}

/**
 * Properties for a Inbound Endpoint.
 */
export interface InboundEndpointProps extends ResolverEndpointOptions {
  /**
   * Whether the instance could initiate IPv4 connections from anywhere by default.
   *
   * @default true
   */
  readonly allowAllInbound?: boolean;
  /**
   * Whether the instance could initiate IPv6 connections from anywhere by default.
   *
   * @default true
   */
  readonly allowAllIpv6Inbound?: boolean;
  /**
   * Endpoint protocol determines how data is transmitted to the inbound endpoint.
   * Choose a protocol, or protocols, depending on the level of security needed.
   *
   * @default InboundProtocols.DO_53
   */
  readonly protocols?: InboundProtocols;
}

/**
 * Define a new Inbound Endpoint.
 *
 * @resource AWS::Route53Resolver::ResolverEndpoint
 */
export class InboundEndpoint extends ResolverEndpointBase {
  constructor(scope: Construct, id: string, props: InboundEndpointProps) {
    super(scope, id, {
      ...props,
      direction: Direction.INBOUND,
    });
    // https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/best-practices-resolver-endpoint-scaling.html
    if (!props.securityGroups && (props.allowAllInbound ?? true)) {
      this.connections.allowDefaultPortFrom(
        Peer.anyIpv4(),
        'Allow all inbound IPv4 DNS traffic by default',
      );
    }
    if (!props.securityGroups && (props.allowAllIpv6Inbound ?? true)) {
      this.connections.allowDefaultPortFrom(
        Peer.anyIpv6(),
        'Allow all inbound IPv6 DNS traffic by default',
      );
    }
  }
}

/**
 * An Outbound Endpoint.
 */
export interface IOutboundEndpoint extends IResolverEndpoint {
  /**
   * Add a new Forward Rule.
   */
  addRule(options: ForwardRuleOptions): ForwardRule;
}

/**
 * Properties for a Outbound Endpoint.
 */
export interface OutboundEndpointProps extends ResolverEndpointOptions {
  /**
   * Whether the instance could initiate IPv4 connections to anywhere by default.
   * This property is only used when you do not provide a security group.
   *
   * @default true
   */
  readonly allowAllOutbound?: boolean;
  /**
   * Whether the instance could initiate IPv6 connections to anywhere by default.
   * This property is only used when you do not provide a security group.
   *
   * @default true
   */
  readonly allowAllIpv6Outbound?: boolean;
  /**
   * Endpoint protocol determines how data is transmitted from the outbound endpoint.
   * Choose a protocol, or protocols, depending on the level of security needed.
   *
   * @default Protocols.DO_53
   */
  readonly protocols?: Protocols;
}

/**
 * Define a new Outbound Endpoint.
 *
 * @resource AWS::Route53Resolver::ResolverEndpoint
 */
export class OutboundEndpoint
  extends ResolverEndpointBase
  implements IOutboundEndpoint {
  private readonly vpc: IVpc;
  private readonly rules: ForwardRule[] = [];
  constructor(scope: Construct, id: string, props: OutboundEndpointProps) {
    super(scope, id, {
      ...props,
      allowAllOutbound: props.allowAllOutbound ?? true,
      allowAllIpv6Outbound: props.allowAllIpv6Outbound ?? true,
      direction: Direction.OUTBOUND,
    });
    this.vpc = props.vpc;
  }
  addRule(options: ForwardRuleOptions) {
    const idSuffix = Token.isUnresolved(options.domainName)
      ? this.rules.length
      : options.domainName;
    const rule = new ForwardRule(this, `Rule-${idSuffix}`, {
      domainName: options.domainName,
      outboundEndpoint: this,
      vpcs: [this.vpc],
      targets: options.targets,
    });
    this.rules.push(rule);
    return rule;
  }
}
