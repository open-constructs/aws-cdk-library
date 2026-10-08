import { Resource, Token } from 'aws-cdk-lib';
import { IVpc } from 'aws-cdk-lib/aws-ec2';
import {
  CfnResolverRule,
  CfnResolverRuleAssociation,
} from 'aws-cdk-lib/aws-route53resolver';
import { Construct } from 'constructs';
import { Protocol } from './protocol';
import { IResolverEndpoint } from './resolver-endpoint';

/**
 * A Resolver Rule.
 */
export interface IResolverRule {
  readonly resolverRuleId: string;
}

enum RuleType {
  FORWARD = 'FORWARD',
  SYSTEM = 'SYSTEM',
  RECURSIVE = 'RECURSIVE',
}

/**
 * The target of the Resolver Rule.
 */
export interface Target {
  /**
   * The IPv4 Address of the target.
   */
  readonly ipv4?: string;
  /**
   * The IPv6 Address of the target.
   */
  readonly ipv6?: string;
  /**
   * The target port.
   *
   * @default 53
   */
  readonly port?: number;
  /**
   * The transmission protocol.
   *
   * @default Protocol.DO_53
   */
  readonly protocol?: Protocol;
}

/**
 * Options for a Resolver Rule.
 */
interface ResolverRuleOptions {
  /**
   * The name of the domain for which you want to forward queries.
   */
  readonly domainName: string;
}

interface ResolverRuleBaseProps extends ResolverRuleOptions {
  readonly vpcs: IVpc[];
  readonly outboundEndpoint?: IResolverEndpoint;
  readonly targets?: Target[];
  readonly ruleType: RuleType;
}

class ResolverRuleBase extends Resource implements IResolverRule {
  readonly resolverRuleId: string;
  constructor(scope: Construct, id: string, props: ResolverRuleBaseProps) {
    super(scope, id);
    const resource = new CfnResolverRule(this, 'Resource', {
      domainName: props.domainName,
      ruleType: props.ruleType,
      resolverEndpointId: props.outboundEndpoint?.resolverEndpointId,
      targetIps: props.targets?.map((target) => ({
        ip: target.ipv4,
        ipv6: target.ipv6,
        port: target.port?.toString(),
        protocol: target.protocol,
      })),
    });
    this.resolverRuleId = resource.attrResolverRuleId;
    props.vpcs.forEach((vpc, index) => {
      /**
       * Domain names are used as ID as much as possible in order to reduce logical ID changes due to changes in order.
       * We use index only for unresolved tokens.
       */
      const idSuffix = Token.isUnresolved(props.domainName)
        ? index
        : props.domainName;
      new CfnResolverRuleAssociation(
        vpc,
        `ResolverRuleAssociation-${idSuffix}`,
        {
          resolverRuleId: resource.attrResolverRuleId,
          vpcId: vpc.vpcId,
        },
      );
    });
  }
}

/**
 * Options for a Forward Rule.
 */
export interface ForwardRuleOptions extends ResolverRuleOptions {
  /**
   * The targets of this rule.
   * An outbound endpoint type can have an IP address of IPv4, IPv6, or a dual stack that includes both.
   * The Resolver rule you create must have the same IP address type as the outbound endpoint.
   * If the outbound endpoint has a dual stack IP address, you can choose all of IP addresses are IPv4 or IPv6, but you can't include both.
   *
   * @example [{ ipv4: '10.0.0.2' }, { ipv4: '10.0.0.253' }]
   */
  readonly targets: Target[];
}

/**
 * Properties for a Forward Rule.
 */
export interface ForwardRuleProps extends ForwardRuleOptions {
  /**
   * VPCs that use this rule.
   * You can associate this rule with as many VPCs as you want.
   */
  readonly vpcs: IVpc[];
  /**
   * The Outbound Endpoint that associate this Resolver Rule.
   */
  readonly outboundEndpoint: IResolverEndpoint;
}

/**
 * Define a new Forward Rule.
 *
 * @resource AWS::Route53Resolver::ResolverRule
 */
export class ForwardRule extends ResolverRuleBase {
  constructor(scope: Construct, id: string, props: ForwardRuleProps) {
    super(scope, id, {
      ...props,
      ruleType: RuleType.FORWARD,
    });
  }
}

/**
 * Properties for a System Rule.
 */
export interface SystemRuleProps extends ResolverRuleOptions {
  /**
   * VPCs that use this rule.
   * You can associate this rule with as many VPCs as you want.
   */
  readonly vpcs: IVpc[];
}

/**
 * Define a new System Rule.
 *
 * @resource AWS::Route53Resolver::ResolverRule
 */
export class SystemRule extends ResolverRuleBase {
  constructor(scope: Construct, id: string, props: SystemRuleProps) {
    super(scope, id, {
      ...props,
      ruleType: RuleType.SYSTEM,
    });
  }
}
