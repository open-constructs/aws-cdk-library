/**
 * Adapted for the Open Constructs Library from DNS Validated Certificate V2.
 * Copyright 2026 Gary Sassano
 *
 * This product includes software developed as part of the AWS Cloud Development Kit (AWS CDK).
 * AWS Cloud Development Kit (AWS CDK)
 * Copyright 2018-2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 */
import {
  TagManager,
  Duration,
  Lazy,
  ReferenceStrength,
  RemovalPolicy,
  Resource,
  Stack,
  Stage,
  Token,
} from 'aws-cdk-lib';
import {
  CertificateProps,
  CertificateReference,
  ICertificate,
  KeyAlgorithm,
  Certificate,
  CertificateValidation,
  CfnCertificate,
} from 'aws-cdk-lib/aws-certificatemanager';
import { Metric, MetricOptions, Stats } from 'aws-cdk-lib/aws-cloudwatch';
import { IHostedZone, CfnHostedZone, HostedZone } from 'aws-cdk-lib/aws-route53';
import { RegionInfo } from 'aws-cdk-lib/region-info';
import type { Construct } from 'constructs';

const CONSTRUCT_SYMBOL = Symbol.for('@open-constructs/aws-cdk.aws-certificatemanager.DnsValidatedCertificateV2');

/**
 * Properties for a DNS-validated ACM certificate.
 */
export interface DnsValidatedCertificateV2Props {
  /**
   * Fully qualified domain name to request a certificate for.
   *
   * Wildcards such as `*.example.com` are supported.
   */
  readonly domainName: string;

  /**
   * Route 53 hosted zone used to validate every certificate domain name.
   *
   * Specify exactly one of `hostedZone` and `hostedZones`.
   * When the certificate is created in a separate stack, the hosted zone ID
   * must be concrete. Imports from `HostedZone.fromLookup()`,
   * `HostedZone.fromHostedZoneId()`, and `HostedZone.fromHostedZoneAttributes()`
   * satisfy that requirement.
   *
   * @default - use hostedZones for exact per-domain validation
   */
  readonly hostedZone?: IHostedZone;

  /**
   * Route 53 hosted zones used to validate individual certificate domain names.
   *
   * Keys are the primary domain name and every subject alternative name.
   * Matching is case-insensitive and ignores one trailing dot. Specify exactly
   * one of `hostedZone` and `hostedZones`.
   *
   * @default - use hostedZone for every domain
   */
  readonly hostedZones?: Record<string, IHostedZone>;

  /**
   * Alternative domain names on the certificate.
   *
   * @default - no subject alternative names
   */
  readonly subjectAlternativeNames?: string[];

  /**
   * Whether the public certificate can be exported.
   *
   * Exportable public certificates incur issuance and renewal charges.
   *
   * @default false
   */
  readonly allowExport?: boolean;

  /**
   * Whether ACM certificate transparency logging is enabled.
   *
   * @default true
   */
  readonly transparencyLoggingEnabled?: boolean;

  /**
   * Value for the certificate's `Name` tag.
   *
   * @default - the construct path, truncated to 255 characters
   */
  readonly certificateName?: string;

  /**
   * Public/private key algorithm for the certificate.
   *
   * @default KeyAlgorithm.RSA_2048
   */
  readonly keyAlgorithm?: KeyAlgorithm;

  /**
   * Tags applied directly to the certificate.
   *
   * These work in both same-stack and separate-stack modes. Standard
   * `Tags.of(certificate).add()` calls are also supported.
   *
   * @default - no explicit certificate tags
   */
  readonly tags?: Record<string, string>;

  /**
   * Region in which to create the certificate.
   *
   * @default us-east-1
   */
  readonly region?: string;

  /**
   * ID for the generated or reused certificate stack.
   *
   * Supplying this property creates or reuses a separate stack even when the
   * containing stack is already in the requested certificate region.
   *
   * Cannot be combined with `certificateStack`.
   *
   * @default - `dns-validated-certificate-stack-${containingStack.node.addr}-${region}`
   */
  readonly stackId?: string;

  /**
   * Explicit stack in which to create the certificate.
   *
   * Use this when the certificate stack needs a custom synthesizer, stack name,
   * permissions boundary, termination protection, or explicit lifecycle
   * ownership. The stack must be in the same app and stage, account, partition,
   * and requested certificate region as the containing stack.
   *
   * Cannot be combined with `stackId`.
   *
   * @default - create or reuse a generated certificate stack when needed
   */
  readonly certificateStack?: Stack;

  /**
   * Removal policy for the ACM certificate.
   *
   * @default RemovalPolicy.DESTROY
   */
  readonly removalPolicy?: RemovalPolicy;
}

/**
 * A native DNS-validated ACM certificate in a specific region.
 *
 * The construct creates `AWS::CertificateManager::Certificate` directly. If
 * the requested certificate region differs from the containing stack region,
 * it creates or uses a certificate stack and returns the ARN through a weak
 * `Fn::GetStackOutput` reference.
 */
export class DnsValidatedCertificateV2 extends Resource implements ICertificate {
  /** Return whether an object is a `DnsValidatedCertificateV2`. */
  public static isDnsValidatedCertificateV2(value: any): value is DnsValidatedCertificateV2 {
    return value !== null && typeof value === 'object' && CONSTRUCT_SYMBOL in value;
  }

  /** Import an existing certificate without adopting it or creating resources. */
  public static fromCertificateAttributes(
    scope: Construct,
    id: string,
    attrs: DnsValidatedCertificateV2Attributes,
  ): ICertificate {
    return Certificate.fromCertificateArn(scope, id, attrs.certificateArn);
  }

  /** The ARN of the certificate. */
  public readonly certificateArn: string;

  /** The region in which the certificate is created. */
  public readonly certificateRegion: string;

  /** The stack that owns the native ACM certificate. */
  public readonly certificateStack: Stack;

  /** Tag manager for the native ACM certificate. */
  public readonly tags: TagManager;

  /**
   * Native certificate in certificateStack, also exposed as node.defaultChild.
   * Overriding this resource changes the owning stack, not the wrapper's stack.
   */
  protected readonly certificateResource: CfnCertificate;
  private readonly props: DnsValidatedCertificateV2Props;
  private readonly validationAuthorities: ValidationAuthority[];

  public constructor(scope: Construct, id: string, props: DnsValidatedCertificateV2Props) {
    super(scope, id, { region: props.region ?? 'us-east-1' });
    this.props = {
      ...props,
      domainName: normalizeConcreteDnsName(props.domainName),
      subjectAlternativeNames:
        props.subjectAlternativeNames === undefined || Token.isUnresolved(props.subjectAlternativeNames)
          ? props.subjectAlternativeNames
          : props.subjectAlternativeNames.map(normalizeConcreteDnsName),
    };
    try {
      Object.defineProperty(this, CONSTRUCT_SYMBOL, { value: true });

      if (props.stackId !== undefined && props.certificateStack !== undefined) {
        throw new Error('stackId and certificateStack cannot be specified together');
      }

      this.certificateRegion = props.region ?? 'us-east-1';
      if (Token.isUnresolved(this.certificateRegion)) {
        throw new Error('region must be concrete; unresolved tokens are not supported');
      }

      const domainNames = certificateDomainNames(props);
      assertUniqueDomainNames(domainNames);

      const containingStack = Stack.of(this);
      const usesSeparateStack =
        props.certificateStack !== undefined
          ? props.certificateStack !== containingStack
          : props.stackId !== undefined || containingStack.region !== this.certificateRegion;

      if (usesSeparateStack) {
        if (Token.isUnresolved(containingStack.region)) {
          throw new Error(
            'certificates created in a separate stack require the containing stack to have a concrete region',
          );
        }
        this.validateCrossPartitionReference(containingStack);
      }

      const validationConfiguration = resolveValidationConfiguration(this.props, certificateDomainNames(this.props));
      this.validationAuthorities = validationConfiguration.authorities;
      this.validateHostedZones(containingStack.account, usesSeparateStack);
      this.certificateStack = this.selectCertificateStack(containingStack, props);
      const validation = this.validationForCertificate(validationConfiguration, usesSeparateStack);

      const certificateScope: Construct = usesSeparateStack ? this.certificateStack : this;
      const certificateProps = certificateProperties(this, this.props, validation);
      this.certificateResource = this.createCertificateResource(
        certificateScope,
        usesSeparateStack ? `Certificate${this.node.addr}` : 'Certificate',
        certificateProps,
      );

      this.node.defaultChild = this.certificateResource;
      this.tags = this.certificateResource.tags;
      this.applyExplicitTags(props);

      if (props.removalPolicy !== undefined) {
        this.certificateResource.applyRemovalPolicy(props.removalPolicy);
      }

      this.certificateArn = usesSeparateStack
        ? Stack.consumeReference(this.certificateResource.ref, ReferenceStrength.WEAK)
        : this.certificateResource.ref;

      this.node.addValidation({ validate: () => this.validateHostedZoneAuthority() });
    } catch (error) {
      throw new Error(`${this.node.path}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /** A public ACM resource reference. */
  public get certificateRef(): CertificateReference {
    return {
      certificateArn: this.certificateArn,
    };
  }

  /** Apply a removal policy to the native certificate resource. */
  public applyRemovalPolicy(policy: RemovalPolicy): void {
    this.certificateResource.applyRemovalPolicy(policy);
  }

  /** Create the native resource through the public ACM Certificate construct. */
  protected createCertificateResource(scope: Construct, id: string, props: CertificateProps): CfnCertificate {
    const unresolvedSans = Token.isUnresolved(props.subjectAlternativeNames);
    // Public Certificate iterates SANs eagerly. Keep a tokenized list intact and
    // defer its DNS options until synthesis, when a Lazy list can be enumerated.
    const certificate = new Certificate(
      scope,
      id,
      unresolvedSans ? { ...props, subjectAlternativeNames: undefined } : props,
    );
    const resource = certificate.node.defaultChild;
    if (!CfnCertificate.isCfnCertificate(resource)) {
      throw new Error(`${this.node.path}: expected an ACM certificate resource`);
    }
    if (unresolvedSans) {
      const hostedZone = this.validationAuthorities[0].hostedZone;
      resource.subjectAlternativeNames = props.subjectAlternativeNames;
      resource.domainValidationOptions = Lazy.any({
        produce: () => {
          const stack = Stack.of(scope);
          const resolved: unknown = stack.resolve(props.subjectAlternativeNames);
          if (!Array.isArray(resolved)) {
            throw new Error(
              `${this.node.path}: subjectAlternativeNames must resolve to a fixed-length list at synthesis so DNS validation options can be created; use a concrete array of string tokens for deployment-time values`,
            );
          }
          const names = [
            Token.asString(stack.resolve(props.domainName)),
            ...resolved.map(value => Token.asString(value)),
          ];
          assertUniqueDomainNames(names);
          const errors = this.validateHostedZoneAuthority(names.map(domainName => ({ domainName, hostedZone })));
          if (errors.length > 0) {
            throw new Error(`${this.node.path}: ${errors.join('; ')}`);
          }
          // ACM uses the same validation record for an apex and its wildcard.
          return names
            .filter(name => Token.isUnresolved(name) || !name.startsWith('*.') || !names.includes(name.slice(2)))
            .map(domainName => ({ domainName, hostedZoneId: hostedZone.hostedZoneId }));
        },
      });
    }
    return resource;
  }

  /** Return the ACM `DaysToExpiry` metric in the certificate region. */
  public metricDaysToExpiry(props?: MetricOptions): Metric {
    return new Metric({
      period: Duration.days(1),
      ...props,
      dimensionsMap: { CertificateArn: this.certificateArn },
      metricName: 'DaysToExpiry',
      namespace: 'AWS/CertificateManager',
      region: this.certificateRegion,
      statistic: Stats.MINIMUM,
    });
  }

  private selectCertificateStack(containingStack: Stack, props: DnsValidatedCertificateV2Props): Stack {
    if (props.certificateStack !== undefined) {
      this.validateCertificateStack(props.certificateStack, props.certificateStack.node.id);
      return props.certificateStack;
    }

    const containingRegionMatches =
      !Token.isUnresolved(containingStack.region) && containingStack.region === this.certificateRegion;
    if (containingRegionMatches && props.stackId === undefined) {
      return containingStack;
    }

    const stage = Stage.of(this);
    if (stage === undefined) {
      throw new Error('cross-stack certificates must be defined inside a CDK App or Stage');
    }

    const stackId =
      props.stackId ?? `dns-validated-certificate-stack-${containingStack.node.addr}-${this.certificateRegion}`;
    const existing = stage.node.tryFindChild(stackId);
    if (existing !== undefined) {
      if (!Stack.isStack(existing)) {
        throw new Error(`a construct named ${JSON.stringify(stackId)} already exists in the stage and is not a Stack`);
      }
      this.validateCertificateStack(existing, stackId);
      return existing;
    }

    return new Stack(stage, stackId, {
      env: {
        account: containingStack.account,
        region: this.certificateRegion,
      },
      tags: containingStack.tags.tagValues(),
    });
  }

  private validateCertificateStack(stack: Stack, stackId: string): void {
    const containingStack = Stack.of(this);
    const containingStage = Stage.of(containingStack);
    const certificateStage = Stage.of(stack);
    if (containingStage === undefined || certificateStage !== containingStage) {
      throw new Error(
        `certificate stack ${JSON.stringify(stackId)} must be in the same CDK App or Stage as the containing stack`,
      );
    }

    if (Token.isUnresolved(stack.region) || stack.region !== this.certificateRegion) {
      throw new Error(
        `certificate stack ${JSON.stringify(stackId)} must be in region ${JSON.stringify(this.certificateRegion)}, got ${JSON.stringify(stack.region)}`,
      );
    }

    const oneAccountIsUnresolved = Token.isUnresolved(containingStack.account) !== Token.isUnresolved(stack.account);
    if (
      oneAccountIsUnresolved ||
      (!Token.isUnresolved(containingStack.account) && containingStack.account !== stack.account)
    ) {
      throw new Error(
        `certificate stack ${JSON.stringify(stackId)} must be in account ${JSON.stringify(containingStack.account)}, got ${JSON.stringify(stack.account)}`,
      );
    }
  }

  private validateCrossPartitionReference(containingStack: Stack): void {
    const containingPartition = RegionInfo.get(containingStack.region).partition;
    const certificatePartition = RegionInfo.get(this.certificateRegion).partition;
    if (
      containingPartition !== undefined &&
      certificatePartition !== undefined &&
      containingPartition !== certificatePartition
    ) {
      throw new Error(
        `cross-partition references are not supported; the containing stack is in partition ${JSON.stringify(containingPartition)} and the certificate region is in partition ${JSON.stringify(certificatePartition)}`,
      );
    }
  }

  private validationForCertificate(
    configuration: ValidationConfiguration,
    usesSeparateStack: boolean,
  ): CertificateValidation {
    if (configuration.kind === 'single') {
      const hostedZone = usesSeparateStack
        ? this.importHostedZone(configuration.hostedZone, 0)
        : configuration.hostedZone;
      return CertificateValidation.fromDns(hostedZone);
    }

    const importedZones = new Map<IHostedZone, IHostedZone>();
    const hostedZones = Object.fromEntries(
      Object.entries(configuration.hostedZones).map(([domainName, hostedZone], index) => {
        if (!usesSeparateStack) {
          return [domainName, hostedZone];
        }

        const cached = importedZones.get(hostedZone);
        if (cached !== undefined) {
          return [domainName, cached];
        }

        const imported = this.importHostedZone(hostedZone, index);
        importedZones.set(hostedZone, imported);
        return [domainName, imported];
      }),
    );
    return CertificateValidation.fromDnsMultiZone(hostedZones);
  }

  private importHostedZone(hostedZone: IHostedZone, index: number): IHostedZone {
    const hostedZoneId = hostedZone.hostedZoneId.replace(/^\/hostedzone\//, '');

    return HostedZone.fromHostedZoneId(this.certificateStack, `ValidationZone${index}${this.node.addr}`, hostedZoneId);
  }

  private applyExplicitTags(props: DnsValidatedCertificateV2Props): void {
    for (const [key, value] of Object.entries(props.tags ?? {})) {
      if (key === 'Name' && props.certificateName !== undefined) {
        continue;
      }
      this.tags.setTag(key, value, 101);
    }
  }

  private validateHostedZones(certificateAccount: string, usesSeparateStack: boolean): void {
    for (const { hostedZone } of this.validationAuthorities) {
      const resource = hostedZone.node.defaultChild;
      const vpcs = CfnHostedZone.isCfnHostedZone(resource) ? Stack.of(hostedZone).resolve(resource.vpcs) : undefined;
      if (Array.isArray(vpcs) && vpcs.length > 0) {
        throw new Error(
          `hosted zone ${JSON.stringify(hostedZone.node.path)} is private; public ACM certificates require a public hosted zone`,
        );
      }
      if (usesSeparateStack && Token.isUnresolved(hostedZone.hostedZoneId)) {
        throw new Error(
          'certificates created in a separate stack require concrete hosted zone IDs; use HostedZone.fromLookup(), HostedZone.fromHostedZoneId(), or HostedZone.fromHostedZoneAttributes()',
        );
      }
      if (
        !Token.isUnresolved(certificateAccount) &&
        !Token.isUnresolved(hostedZone.env.account) &&
        hostedZone.env.account !== certificateAccount
      ) {
        throw new Error(
          `hosted zone ${JSON.stringify(hostedZone.node.path)} must be in certificate account ${JSON.stringify(certificateAccount)}, got ${JSON.stringify(hostedZone.env.account)}`,
        );
      }
    }
  }

  private validateHostedZoneAuthority(authorities = this.validationAuthorities): string[] {
    const errors: string[] = [];
    for (const { domainName, hostedZone } of authorities) {
      const zoneName = tryGetHostedZoneName(hostedZone);
      if (
        zoneName !== undefined &&
        !Token.isUnresolved(zoneName) &&
        !Token.isUnresolved(domainName) &&
        !isDomainNameInZone(domainName, zoneName)
      ) {
        errors.push(
          `DNS zone ${normalizeDnsName(zoneName)} is not authoritative for certificate domain name ${domainName}`,
        );
      }
    }
    return errors;
  }
}

interface ValidationAuthority {
  readonly domainName: string;
  readonly hostedZone: IHostedZone;
}

interface SingleZoneValidationConfiguration {
  readonly kind: 'single';
  readonly hostedZone: IHostedZone;
  readonly authorities: ValidationAuthority[];
}

interface MultiZoneValidationConfiguration {
  readonly kind: 'multi';
  readonly hostedZones: Record<string, IHostedZone>;
  readonly authorities: ValidationAuthority[];
}

type ValidationConfiguration = SingleZoneValidationConfiguration | MultiZoneValidationConfiguration;

function resolveValidationConfiguration(
  props: DnsValidatedCertificateV2Props,
  domainNames: string[],
): ValidationConfiguration {
  if ((props.hostedZone === undefined) === (props.hostedZones === undefined)) {
    throw new Error('specify exactly one of hostedZone and hostedZones');
  }

  if (props.hostedZone !== undefined) {
    return {
      kind: 'single',
      hostedZone: props.hostedZone,
      authorities: domainNames.map(domainName => ({
        domainName,
        hostedZone: props.hostedZone as IHostedZone,
      })),
    };
  }

  if (props.subjectAlternativeNames !== undefined && Token.isUnresolved(props.subjectAlternativeNames)) {
    throw new Error(
      'hostedZones cannot be used with an unresolved subjectAlternativeNames list; use hostedZone or provide a concrete list',
    );
  }

  const unresolvedDomainName = domainNames.find(domainName => Token.isUnresolved(domainName));
  if (unresolvedDomainName !== undefined) {
    throw new Error('hostedZones requires concrete domain names; use hostedZone when a domain name is unresolved');
  }

  const configuredZones = props.hostedZones as Record<string, IHostedZone>;
  const normalizedZones = new Map<string, { key: string; hostedZone: IHostedZone }>();
  for (const [key, hostedZone] of Object.entries(configuredZones)) {
    const normalized = normalizeDnsName(key);
    const existing = normalizedZones.get(normalized);
    if (existing !== undefined) {
      throw new Error(
        `hostedZones contains duplicate domain mappings ${JSON.stringify(existing.key)} and ${JSON.stringify(key)}`,
      );
    }
    normalizedZones.set(normalized, { key, hostedZone });
  }

  const hostedZones: Record<string, IHostedZone> = {};
  const authorities: ValidationAuthority[] = [];
  for (const domainName of domainNames) {
    const matched = normalizedZones.get(normalizeDnsName(domainName))?.hostedZone;
    if (matched === undefined) {
      throw new Error(`hostedZones must contain a mapping for certificate domain name ${JSON.stringify(domainName)}`);
    }
    hostedZones[domainName] = matched;
    authorities.push({ domainName, hostedZone: matched });
  }

  const certificateDomainNameKeys = new Set(domainNames.map(normalizeDnsName));
  for (const [normalized, { key }] of normalizedZones) {
    if (!certificateDomainNameKeys.has(normalized)) {
      throw new Error(
        `hostedZones contains a mapping for ${JSON.stringify(key)}, which is not a certificate domain name`,
      );
    }
  }

  return { kind: 'multi', hostedZones, authorities };
}

function certificateProperties(
  scope: Construct,
  props: DnsValidatedCertificateV2Props,
  validation: CertificateValidation,
): CertificateProps {
  return {
    allowExport: props.allowExport,
    certificateName: props.certificateName ?? scope.node.path.slice(0, 255),
    domainName: props.domainName,
    keyAlgorithm: props.keyAlgorithm,
    subjectAlternativeNames: props.subjectAlternativeNames,
    transparencyLoggingEnabled: props.transparencyLoggingEnabled,
    validation,
  };
}

function certificateDomainNames(props: DnsValidatedCertificateV2Props): string[] {
  const domainNames = [props.domainName];
  if (props.subjectAlternativeNames !== undefined && !Token.isUnresolved(props.subjectAlternativeNames)) {
    domainNames.push(...props.subjectAlternativeNames);
  }
  return domainNames;
}

function assertUniqueDomainNames(domainNames: string[]): void {
  const seen = new Map<string, string>();
  for (const domainName of domainNames) {
    if (Token.isUnresolved(domainName)) {
      continue;
    }
    const normalized = normalizeDnsName(domainName);
    const existing = seen.get(normalized);
    if (existing !== undefined) {
      throw new Error(
        `certificate domain names must be unique; ${JSON.stringify(existing)} and ${JSON.stringify(domainName)} refer to the same DNS name`,
      );
    }
    seen.set(normalized, domainName);
  }
}

function tryGetHostedZoneName(hostedZone: IHostedZone): string | undefined {
  try {
    return hostedZone.zoneName;
  } catch {
    // ID-only hosted zone imports intentionally do not expose zoneName.
    return undefined;
  }
}

function isDomainNameInZone(domainName: string, zoneName: string): boolean {
  const normalizedDomainName = normalizeDnsName(domainName);
  const normalizedZoneName = normalizeDnsName(zoneName);
  return normalizedDomainName === normalizedZoneName || normalizedDomainName.endsWith(`.${normalizedZoneName}`);
}

function normalizeDnsName(name: string): string {
  const lowerCaseName = name.toLowerCase();
  return lowerCaseName.endsWith('.') ? lowerCaseName.slice(0, -1) : lowerCaseName;
}

function normalizeConcreteDnsName(value: string): string {
  return Token.isUnresolved(value) ? value : normalizeDnsName(value);
}

/** Attributes of an existing ACM certificate to import. */
export interface DnsValidatedCertificateV2Attributes {
  /** The ARN of an existing ACM certificate. */
  readonly certificateArn: string;
}
