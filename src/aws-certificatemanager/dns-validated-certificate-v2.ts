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
  IResolveContext,
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

const GENERATED_OWNER_SYMBOL = Symbol.for(
  '@open-constructs/aws-cdk.aws-certificatemanager.DnsValidatedCertificateV2.generatedOwner',
);

const CONSTRUCT_SYMBOL = Symbol.for('@open-constructs/aws-cdk.aws-certificatemanager.DnsValidatedCertificateV2');

/**
 * Properties for a DNS-validated ACM certificate.
 */
export interface DnsValidatedCertificateV2Props {
  /**
   * Fully qualified domain name to request a certificate for.
   *
   * Wildcards such as `*.example.com` are supported. Scalar tokens must be
   * valid in the native owner; consumer-owned parameters can create cycles.
   */
  readonly domainName: string;

  /**
   * Route 53 hosted zone used to validate every certificate domain name.
   *
   * Specify exactly one of `hostedZone` and `hostedZonesByDomain`.
   * A separate owner requires a concrete zone ID or a native public hosted
   * zone created in that owner. Imported token scope does not prove ownership.
   * Public delegation and actual account ownership remain caller preconditions.
   *
   * @default - use hostedZonesByDomain for exact per-domain validation
   */
  readonly hostedZone?: IHostedZone;

  /**
   * Route 53 hosted zones used to validate individual certificate domain names.
   *
   * Keys are the primary domain name and every subject alternative name.
   * Matching is case-insensitive and ignores one trailing dot. Specify exactly
   * one of `hostedZone` and `hostedZonesByDomain`. Apex and wildcard names
   * require distinct keys. There is no suffix matching or implicit SAN creation.
   * Names and the SAN list must be concrete in this mode.
   *
   * @default - use hostedZone for every domain
   */
  readonly hostedZonesByDomain?: Record<string, IHostedZone>;

  /**
   * Alternative domain names on the certificate.
   *
   * Single-zone validation supports fixed arrays of scalar tokens and lists
   * whose length resolves during synthesis. Resolved names are normalized and
   * checked for duplicates and zone authority. Opaque deployment-time lists
   * are unsupported. Empty or absent resolved lists omit the native SAN
   * property. Exact multi-zone mapping requires concrete names.
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
   * Concrete region in which to create the certificate.
   *
   * Cannot be combined with `certificateStack`. Omit this property for an
   * environment-agnostic same-stack certificate. CloudFront requires us-east-1.
   *
   * @default - the containing stack's region
   */
  readonly certificateRegion?: string;

  /**
   * Explicit stack in which to create the certificate.
   *
   * Use this when the certificate stack needs a custom synthesizer, stack name,
   * permissions boundary, termination protection, or explicit lifecycle
   * ownership. The stack must be in the same app/stage, account, and partition
   * as the containing stack. Its region determines the certificate region.
   *
   * Nested owners support consumers only within their top-level stack tree.
   * Use a top-level owner for sharing outside that tree.
   * Cannot be combined with `certificateRegion`.
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

  /** The ARN of the certificate. Nested owners support consumers only within their top-level stack tree. */
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
  public readonly certificateResource: CfnCertificate;
  private readonly props: DnsValidatedCertificateV2Props;
  private readonly validationAuthorities: ValidationAuthority[];

  public constructor(scope: Construct, id: string, props: DnsValidatedCertificateV2Props) {
    const placement = resolvePlacement(scope, id, props);
    super(scope, id, { region: placement.region });
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

      this.certificateRegion = placement.region;
      const domainNames = certificateDomainNames(this.props);
      assertUniqueDomainNames(domainNames);
      const containingStack = placement.containingStack;
      const usesSeparateStack = placement.separate;

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
      const authorityErrors = this.validateHostedZoneAuthority();
      if (authorityErrors.length > 0) {
        throw new Error(authorityErrors.join('; '));
      }
      this.certificateStack = this.selectCertificateStack(containingStack, props, usesSeparateStack);
      const validation = this.validationForCertificate(validationConfiguration, usesSeparateStack);

      const certificateScope: Construct = usesSeparateStack ? this.certificateStack : this;
      const certificateProps = certificateProperties(this, this.props, validation);
      this.certificateResource = this.createCertificateResource(
        certificateScope,
        usesSeparateStack ? `Certificate${this.node.addr}` : 'Certificate',
        Token.isUnresolved(certificateProps.subjectAlternativeNames)
          ? { ...certificateProps, subjectAlternativeNames: undefined }
          : certificateProps,
      );
      if (validationConfiguration.kind === 'single') {
        this.configureSingleZoneNames(validationConfiguration.hostedZone);
      }

      this.node.defaultChild = this.certificateResource;
      this.tags = this.certificateResource.tags;

      if (props.removalPolicy !== undefined) {
        this.certificateResource.applyRemovalPolicy(props.removalPolicy);
      }

      this.certificateResource.applyCrossStackReferenceStrength(ReferenceStrength.WEAK);
      const nativeArn = this.certificateResource.ref;
      const ownerRoot = topLevelStack(this.certificateStack);
      this.certificateArn = this.certificateStack.nested
        ? Lazy.uncachedString({
            produce: context => {
              if (topLevelStack(Stack.of(context.scope)) !== ownerRoot) {
                throw new Error(
                  this.node.path +
                    ': a certificate owned by a nested stack cannot be consumed outside its top-level stack tree; use a top-level certificateStack for cross-stack sharing',
                );
              }
              return nativeArn;
            },
          })
        : nativeArn;

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

  /**
   * Create the native resource through public ACM composition.
   *
   * Props contain eagerly normalized inputs. Opaque SAN lists are withheld;
   * the constructor applies shared synthesis-time name resolution afterwards.
   */
  protected createCertificateResource(scope: Construct, id: string, props: CertificateProps): CfnCertificate {
    const certificate = new Certificate(scope, id, props);
    const resource = certificate.node.defaultChild;
    if (!CfnCertificate.isCfnCertificate(resource)) {
      throw new Error(`${this.node.path}: expected an ACM certificate resource`);
    }
    return resource;
  }

  private configureSingleZoneNames(hostedZone: IHostedZone): void {
    // Use the current resolution context so CDK can discover references during
    // preparation and retain their originating stacks. Stack.resolve() here
    // would flatten parameter/resource references before dependency discovery.
    const names = (context: IResolveContext): string[] => {
      const resolvedSans: unknown = context.resolve(this.props.subjectAlternativeNames ?? []);
      const sans: unknown = resolvedSans === undefined ? [] : resolvedSans;
      if (!Array.isArray(sans)) {
        throw new Error(
          `${this.node.path}: subjectAlternativeNames must resolve to a fixed-length list at synthesis so DNS validation options can be created; use a concrete array of string tokens for deployment-time values`,
        );
      }
      const values = [context.resolve(this.props.domainName), ...sans].map(value =>
        typeof value === 'string' ? normalizeConcreteDnsName(value) : Token.asString(value),
      );
      assertUniqueDomainNames(values);
      const errors = this.validateHostedZoneAuthority(values.map(domainName => ({ domainName, hostedZone })));
      if (errors.length > 0) {
        throw new Error(`${this.node.path}: ${errors.join('; ')}`);
      }
      return values;
    };
    this.certificateResource.domainName = Lazy.uncachedString({ produce: context => names(context)[0] });
    if (this.props.subjectAlternativeNames !== undefined) {
      this.certificateResource.subjectAlternativeNames = Lazy.uncachedList(
        { produce: context => names(context).slice(1) },
        { omitEmpty: true },
      );
    }
    this.certificateResource.domainValidationOptions = Lazy.uncachedAny({
      produce: context =>
        names(context)
          .filter(name => Token.isUnresolved(name) || !name.startsWith('*.') || !names(context).includes(name.slice(2)))
          .map(domainName => ({ domainName, hostedZoneId: hostedZone.hostedZoneId.replace(/^\/hostedzone\//, '') })),
    });
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

  private selectCertificateStack(
    containingStack: Stack,
    props: DnsValidatedCertificateV2Props,
    usesSeparateStack: boolean,
  ): Stack {
    if (props.certificateStack !== undefined) {
      this.validateCertificateStack(props.certificateStack, props.certificateStack.node.id);
      return props.certificateStack;
    }

    if (!usesSeparateStack) {
      return containingStack;
    }

    const stage = Stage.of(this);
    if (stage === undefined) {
      throw new Error('cross-stack certificates must be defined inside a CDK App or Stage');
    }

    const stackId = `dns-validated-certificate-stack-${containingStack.node.addr}-${this.certificateRegion}`;
    const existing = stage.node.tryFindChild(stackId);
    if (existing !== undefined) {
      if (!Stack.isStack(existing)) {
        throw new Error(`a construct named ${JSON.stringify(stackId)} already exists in the stage and is not a Stack`);
      }
      if (!(GENERATED_OWNER_SYMBOL in existing)) {
        throw new Error(
          `a stack named ${JSON.stringify(stackId)} already exists and is not a generated certificate owner; pass it as certificateStack`,
        );
      }
      this.validateCertificateStack(existing, stackId);
      return existing;
    }

    const owner = new Stack(stage, stackId, {
      env: {
        account: containingStack.account,
        region: this.certificateRegion,
      },
      tags: containingStack.tags.tagValues(),
    });
    Object.defineProperty(owner, GENERATED_OWNER_SYMBOL, { value: true });
    return owner;
  }

  private validateCertificateStack(stack: Stack, stackId: string): void {
    const containingStack = Stack.of(this);
    if (stack === containingStack) {
      return;
    }
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
    const hostedZonesByDomain = Object.fromEntries(
      Object.entries(configuration.hostedZonesByDomain).map(([domainName, hostedZone], index) => {
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
    return CertificateValidation.fromDnsMultiZone(hostedZonesByDomain);
  }

  private isOwnerLocalHostedZone(hostedZone: IHostedZone, owner = this.props.certificateStack): boolean {
    const resource = hostedZone.node.defaultChild;
    return (
      owner !== undefined &&
      CfnHostedZone.isCfnHostedZone(resource) &&
      Stack.of(resource) === owner &&
      hostedZone.hostedZoneId === resource.ref
    );
  }

  private importHostedZone(hostedZone: IHostedZone, index: number): IHostedZone {
    if (this.isOwnerLocalHostedZone(hostedZone, this.certificateStack)) {
      return hostedZone;
    }
    const hostedZoneId = hostedZone.hostedZoneId.replace(/^\/hostedzone\//, '');

    return HostedZone.fromHostedZoneId(this.certificateStack, `ValidationZone${index}${this.node.addr}`, hostedZoneId);
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
      if (
        usesSeparateStack &&
        Token.isUnresolved(hostedZone.hostedZoneId) &&
        !this.isOwnerLocalHostedZone(hostedZone)
      ) {
        throw new Error(
          'certificates created in a separate stack require concrete hosted zone IDs or a native hosted zone in certificateStack; use HostedZone.fromLookup(), HostedZone.fromHostedZoneId(), or HostedZone.fromHostedZoneAttributes()',
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
  readonly hostedZonesByDomain: Record<string, IHostedZone>;
  readonly authorities: ValidationAuthority[];
}

type ValidationConfiguration = SingleZoneValidationConfiguration | MultiZoneValidationConfiguration;

function resolveValidationConfiguration(
  props: DnsValidatedCertificateV2Props,
  domainNames: string[],
): ValidationConfiguration {
  if ((props.hostedZone === undefined) === (props.hostedZonesByDomain === undefined)) {
    throw new Error('specify exactly one of hostedZone and hostedZonesByDomain');
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
      'hostedZonesByDomain cannot be used with an unresolved subjectAlternativeNames list; use hostedZone or provide a concrete list',
    );
  }

  const unresolvedDomainName = domainNames.find(domainName => Token.isUnresolved(domainName));
  if (unresolvedDomainName !== undefined) {
    throw new Error(
      'hostedZonesByDomain requires concrete domain names; use hostedZone when a domain name is unresolved',
    );
  }

  const configuredZones = props.hostedZonesByDomain as Record<string, IHostedZone>;
  const normalizedZones = new Map<string, { key: string; hostedZone: IHostedZone }>();
  for (const [key, hostedZone] of Object.entries(configuredZones)) {
    const normalized = normalizeDnsName(key);
    const existing = normalizedZones.get(normalized);
    if (existing !== undefined) {
      throw new Error(
        `hostedZonesByDomain contains duplicate domain mappings ${JSON.stringify(existing.key)} and ${JSON.stringify(key)}`,
      );
    }
    normalizedZones.set(normalized, { key, hostedZone });
  }

  const hostedZonesByDomain: Record<string, IHostedZone> = {};
  const authorities: ValidationAuthority[] = [];
  for (const domainName of domainNames) {
    const matched = normalizedZones.get(normalizeDnsName(domainName))?.hostedZone;
    if (matched === undefined) {
      throw new Error(
        `hostedZonesByDomain must contain a mapping for certificate domain name ${JSON.stringify(domainName)}`,
      );
    }
    hostedZonesByDomain[domainName] = matched;
    authorities.push({ domainName, hostedZone: matched });
  }

  const certificateDomainNameKeys = new Set(domainNames.map(normalizeDnsName));
  for (const [normalized, { key }] of normalizedZones) {
    if (!certificateDomainNameKeys.has(normalized)) {
      throw new Error(
        `hostedZonesByDomain contains a mapping for ${JSON.stringify(key)}, which is not a certificate domain name`,
      );
    }
  }

  return { kind: 'multi', hostedZonesByDomain, authorities };
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
    subjectAlternativeNames: props.subjectAlternativeNames?.length === 0 ? undefined : props.subjectAlternativeNames,
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

/** Resolve ownership metadata without allocating infrastructure. */
function resolvePlacement(
  scope: Construct,
  id: string,
  props: DnsValidatedCertificateV2Props,
): {
  containingStack: Stack;
  region: string;
  separate: boolean;
} {
  const path = `${scope.node.path}/${id}`;
  if (props.certificateStack !== undefined && props.certificateRegion !== undefined) {
    throw new Error(`${path}: specify at most one of certificateStack and certificateRegion`);
  }
  if (props.certificateRegion !== undefined && Token.isUnresolved(props.certificateRegion)) {
    throw new Error(
      `${path}: certificateRegion must be concrete; omit it for same-stack deployment or provide a concrete region for regional placement`,
    );
  }
  const containingStack = Stack.of(scope);
  const region = props.certificateStack?.region ?? props.certificateRegion ?? containingStack.region;
  const separate =
    props.certificateStack !== undefined
      ? props.certificateStack !== containingStack
      : props.certificateRegion !== undefined && props.certificateRegion !== containingStack.region;
  if (separate && Token.isUnresolved(region)) {
    throw new Error(`${path}: a separate certificateStack must have a concrete region`);
  }
  return { containingStack, region, separate };
}

/** Find the reference boundary shared by a top-level stack and its nested descendants. */
function topLevelStack(stack: Stack): Stack {
  let current = stack;
  while (current.nestedStackParent !== undefined) {
    current = current.nestedStackParent;
  }
  return current;
}
