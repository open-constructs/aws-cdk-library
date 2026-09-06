import {
  App,
  BootstraplessSynthesizer,
  CfnOutput,
  CfnParameter,
  Duration,
  Fn,
  Lazy,
  NestedStack,
  RemovalPolicy,
  Stack,
  Stage,
  Tags,
  Token,
  Validations,
} from 'aws-cdk-lib';
import { Annotations, Match, Template } from 'aws-cdk-lib/assertions';
import { CfnCertificate, KeyAlgorithm } from 'aws-cdk-lib/aws-certificatemanager';
import { CloudFrontWebDistribution, Distribution, ViewerCertificate } from 'aws-cdk-lib/aws-cloudfront';
import { HttpOrigin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { Alarm } from 'aws-cdk-lib/aws-cloudwatch';
import { Vpc } from 'aws-cdk-lib/aws-ec2';
import { CfnHostedZone, HostedZone, PrivateHostedZone, PublicHostedZone } from 'aws-cdk-lib/aws-route53';
import { Construct } from 'constructs';
import { DnsValidatedCertificateV2 } from '../../src/aws-certificatemanager';

const ACCOUNT = '111111111111';
const OTHER_ACCOUNT = '222222222222';
const WEAK_REFERENCE_CONTEXT = {
  '@aws-cdk/core:defaultCrossStackReferences': 'weak',
};

describe('certificate placement and references', () => {
  test('creates a native certificate in an explicitly requested us-east-1 support stack', () => {
    const { app, stack, hostedZone } = crossRegionFixture();
    const certificate = new DnsValidatedCertificateV2(stack, 'Certificate', {
      certificateRegion: 'us-east-1',
      domainName: 'test.example.com',
      hostedZone,
      subjectAlternativeNames: ['api.example.com'],
    });
    new CfnOutput(stack, 'CertificateArn', { value: certificate.certificateArn });

    const certificateStack = generatedCertificateStack(app, stack);
    Template.fromStack(certificateStack).hasResourceProperties('AWS::CertificateManager::Certificate', {
      DomainName: 'test.example.com',
      DomainValidationOptions: Match.arrayWith([
        { DomainName: 'test.example.com', HostedZoneId: 'Z123456' },
        { DomainName: 'api.example.com', HostedZoneId: 'Z123456' },
      ]),
      SubjectAlternativeNames: ['api.example.com'],
      ValidationMethod: 'DNS',
    });
    const certificateResources = Template.fromStack(certificateStack).toJSON().Resources as Record<
      string,
      { Type: string }
    >;
    expect(Object.values(certificateResources).map(resource => resource.Type)).toEqual([
      'AWS::CertificateManager::Certificate',
    ]);
    Template.fromStack(stack).hasOutput('CertificateArn', {
      Value: weakCertificateArnReference(stack),
    });
    expect(stack.dependencies).toContain(certificateStack);
    expect(certificate.certificateRegion).toBe('us-east-1');
    expect(certificate.certificateStack).toBe(certificateStack);
  });

  test('creates the certificate in the containing stack when regions match', () => {
    const app = createApp();
    const stack = createStack(app, 'Stack', 'us-east-1');
    const hostedZone = HostedZone.fromHostedZoneId(stack, 'HostedZone', 'Z123456');

    const certificate = new DnsValidatedCertificateV2(stack, 'Certificate', {
      certificateRegion: 'us-east-1',
      domainName: 'test.example.com',
      hostedZone,
    });

    Template.fromStack(stack).resourceCountIs('AWS::CertificateManager::Certificate', 1);
    expect(certificate.certificateStack).toBe(stack);
    expect(app.node.tryFindChild(`dns-validated-certificate-stack-${stack.node.addr}-us-east-1`)).toBeUndefined();
  });

  test('creates a certificate in an explicit non-default region', () => {
    const { app, stack, hostedZone } = crossRegionFixture();

    const certificate = new DnsValidatedCertificateV2(stack, 'Certificate', {
      domainName: 'test.example.com',
      hostedZone,
      certificateRegion: 'us-west-2',
    });

    expect(certificate.certificateRegion).toBe('us-west-2');
    expect(generatedCertificateStack(app, stack, 'us-west-2').region).toBe('us-west-2');
  });

  test('reuses one generated stack for multiple certificates', () => {
    const { app, stack, hostedZone } = crossRegionFixture();

    const first = new DnsValidatedCertificateV2(stack, 'FirstCertificate', {
      certificateRegion: 'us-east-1',
      domainName: 'first.example.com',
      hostedZone,
    });
    const second = new DnsValidatedCertificateV2(stack, 'SecondCertificate', {
      certificateRegion: 'us-east-1',
      domainName: 'second.example.com',
      hostedZone,
    });

    expect(first.certificateStack).toBe(second.certificateStack);
    Template.fromStack(generatedCertificateStack(app, stack)).resourceCountIs(
      'AWS::CertificateManager::Certificate',
      2,
    );
  });

  test('an explicit owner separates certificates even in the same region', () => {
    const app = createApp();
    const stack = createStack(app, 'Stack', 'us-east-1');
    const hostedZone = HostedZone.fromHostedZoneId(stack, 'HostedZone', 'Z123456');

    const certificate = new DnsValidatedCertificateV2(stack, 'Certificate', {
      domainName: 'test.example.com',
      hostedZone,
      certificateStack: createStack(app, 'Certificates', 'us-east-1'),
    });
    new CfnOutput(stack, 'CertificateArn', { value: certificate.certificateArn });

    expect(certificate.certificateStack).toBe(app.node.findChild('Certificates'));
    Template.fromStack(stack).hasOutput('CertificateArn', {
      Value: weakCertificateArnReference(stack, 'Certificates'),
    });
  });

  test('uses an explicit certificate stack with its custom synthesizer', () => {
    const app = createApp();
    const stack = createStack(app, 'Stack', 'eu-west-1');
    const certificateStack = new Stack(app, 'Certificates', {
      env: { account: ACCOUNT, region: 'us-east-1' },
      stackName: 'shared-certificates',
      synthesizer: new BootstraplessSynthesizer(),
      terminationProtection: true,
    });
    const hostedZone = HostedZone.fromHostedZoneId(stack, 'HostedZone', 'Z123456');

    const certificate = new DnsValidatedCertificateV2(stack, 'Certificate', {
      certificateStack,
      domainName: 'test.example.com',
      hostedZone,
    });
    new CfnOutput(stack, 'CertificateArn', { value: certificate.certificateArn });

    expect(certificate.certificateStack).toBe(certificateStack);
    expect(certificateStack.stackName).toBe('shared-certificates');
    expect(certificateStack.terminationProtection).toBe(true);
    Template.fromStack(certificateStack).resourceCountIs('AWS::CertificateManager::Certificate', 1);
  });

  test('generated stack inherits the containing stack account and stack tags', () => {
    const app = createApp();
    const stack = new Stack(app, 'Stack', {
      env: { account: ACCOUNT, region: 'eu-west-1' },
      tags: { team: 'edge' },
    });
    const hostedZone = HostedZone.fromHostedZoneId(stack, 'HostedZone', 'Z123456');

    const certificate = new DnsValidatedCertificateV2(stack, 'Certificate', {
      certificateRegion: 'us-east-1',
      domainName: 'test.example.com',
      hostedZone,
    });

    expect(certificate.certificateStack.account).toBe(ACCOUNT);
    expect(certificate.certificateStack.tags.tagValues()).toEqual({ team: 'edge' });
  });

  test('works with CloudFront using the current certificate reference contract', () => {
    const { stack, hostedZone } = crossRegionFixture();
    const certificate = new DnsValidatedCertificateV2(stack, 'Certificate', {
      certificateRegion: 'us-east-1',
      domainName: 'test.example.com',
      hostedZone,
    });

    new Distribution(stack, 'Distribution', {
      certificate,
      defaultBehavior: { origin: new HttpOrigin('example.com') },
      domainNames: ['test.example.com'],
    });

    Template.fromStack(stack).hasResourceProperties('AWS::CloudFront::Distribution', {
      DistributionConfig: {
        ViewerCertificate: {
          AcmCertificateArn: weakCertificateArnReference(stack),
          SslSupportMethod: 'sni-only',
        },
      },
    });
  });

  test('exposes the public certificate ARN reference contract', () => {
    const app = createApp();
    const stack = createStack(app, 'Stack', 'us-east-1');
    const hostedZone = HostedZone.fromHostedZoneId(stack, 'HostedZone', 'Z123456');
    const certificate = new DnsValidatedCertificateV2(stack, 'Certificate', {
      certificateRegion: 'us-east-1',
      domainName: 'test.example.com',
      hostedZone,
    });

    expect(certificate.certificateRef).toEqual({
      certificateArn: certificate.certificateArn,
    });
  });

  test('does not emit the global default-reference warning when the app selects weak references', () => {
    const { stack, hostedZone } = crossRegionFixture();
    const certificate = new DnsValidatedCertificateV2(stack, 'Certificate', {
      certificateRegion: 'us-east-1',
      domainName: 'test.example.com',
      hostedZone,
    });
    new CfnOutput(stack, 'CertificateArn', { value: certificate.certificateArn });

    Template.fromStack(stack);
    expect(
      Annotations.fromStack(stack).findWarning(
        '*',
        Match.stringLikeRegexp('No cross-stack-reference strength configured'),
      ),
    ).toEqual([]);
  });
});

describe('DNS validation', () => {
  test('supports one hosted zone per certificate domain name', () => {
    const app = createApp();
    const stack = createStack(app, 'Stack', 'us-east-1');
    const exampleCom = HostedZone.fromHostedZoneAttributes(stack, 'ExampleCom', {
      hostedZoneId: 'ZEXAMPLECOM',
      zoneName: 'example.com',
    });
    const exampleNet = HostedZone.fromHostedZoneAttributes(stack, 'ExampleNet', {
      hostedZoneId: 'ZEXAMPLENET',
      zoneName: 'example.net',
    });

    new DnsValidatedCertificateV2(stack, 'Certificate', {
      certificateRegion: 'us-east-1',
      domainName: 'www.example.com',
      hostedZonesByDomain: {
        'www.example.com': exampleCom,
        'api.example.net': exampleNet,
      },
      subjectAlternativeNames: ['api.example.net'],
    });

    Template.fromStack(stack).hasResourceProperties('AWS::CertificateManager::Certificate', {
      DomainValidationOptions: [
        { DomainName: 'www.example.com', HostedZoneId: 'ZEXAMPLECOM' },
        { DomainName: 'api.example.net', HostedZoneId: 'ZEXAMPLENET' },
      ],
    });
  });

  test('matches multi-zone keys case-insensitively and without a trailing dot', () => {
    const app = createApp();
    const stack = createStack(app, 'Stack', 'us-east-1');
    const hostedZone = HostedZone.fromHostedZoneAttributes(stack, 'HostedZone', {
      hostedZoneId: 'Z123456',
      zoneName: 'example.com',
    });

    new DnsValidatedCertificateV2(stack, 'Certificate', {
      certificateRegion: 'us-east-1',
      domainName: 'WWW.Example.Com',
      hostedZonesByDomain: { 'www.example.com.': hostedZone },
    });

    Template.fromStack(stack).hasResourceProperties('AWS::CertificateManager::Certificate', {
      DomainName: 'www.example.com',
      DomainValidationOptions: [{ DomainName: 'www.example.com', HostedZoneId: 'Z123456' }],
    });
  });

  test('strips the Route 53 hosted zone resource prefix in a support stack', () => {
    const app = createApp();
    const stack = createStack(app, 'Stack', 'eu-west-1');
    const hostedZone = HostedZone.fromHostedZoneId(stack, 'HostedZone', '/hostedzone/Z123456');

    const certificate = new DnsValidatedCertificateV2(stack, 'Certificate', {
      certificateRegion: 'us-east-1',
      domainName: 'test.example.com',
      hostedZone,
    });

    Template.fromStack(certificate.certificateStack).hasResourceProperties('AWS::CertificateManager::Certificate', {
      DomainValidationOptions: Match.arrayWith([{ DomainName: 'test.example.com', HostedZoneId: 'Z123456' }]),
    });
  });

  test('allows an unresolved hosted zone ID when the certificate stays in the containing stack', () => {
    const app = createApp();
    const stack = createStack(app, 'Stack', 'us-east-1');
    const hostedZone = new PublicHostedZone(stack, 'HostedZone', {
      zoneName: 'example.com',
    });

    new DnsValidatedCertificateV2(stack, 'Certificate', {
      certificateRegion: 'us-east-1',
      domainName: 'test.example.com',
      hostedZone,
    });

    Template.fromStack(stack).resourceCountIs('AWS::Route53::HostedZone', 1);
    Template.fromStack(stack).resourceCountIs('AWS::CertificateManager::Certificate', 1);
  });

  test('rejects an unresolved hosted zone ID for a separate certificate stack', () => {
    const app = createApp();
    const stack = createStack(app, 'Stack', 'eu-west-1');
    const hostedZone = new PublicHostedZone(stack, 'HostedZone', {
      zoneName: 'example.com',
    });

    expect(
      () =>
        new DnsValidatedCertificateV2(stack, 'Certificate', {
          certificateRegion: 'us-east-1',
          domainName: 'test.example.com',
          hostedZone,
        }),
    ).toThrow(/require concrete hosted zone IDs/);
  });

  test('rejects a primary domain outside the hosted zone', () => {
    const app = createApp();
    const stack = createStack(app, 'Stack', 'us-east-1');
    const hostedZone = HostedZone.fromHostedZoneAttributes(stack, 'HostedZone', {
      hostedZoneId: 'Z123456',
      zoneName: 'example.com',
    });

    expect(
      () =>
        new DnsValidatedCertificateV2(stack, 'Certificate', {
          certificateRegion: 'us-east-1',
          domainName: 'notexample.com',
          hostedZone,
        }),
    ).toThrow(/DNS zone example\.com is not authoritative for certificate domain name notexample\.com/);
  });

  test('rejects a subject alternative name outside the single hosted zone', () => {
    const app = createApp();
    const stack = createStack(app, 'Stack', 'us-east-1');
    const hostedZone = HostedZone.fromHostedZoneAttributes(stack, 'HostedZone', {
      hostedZoneId: 'Z123456',
      zoneName: 'example.com',
    });

    expect(
      () =>
        new DnsValidatedCertificateV2(stack, 'Certificate', {
          certificateRegion: 'us-east-1',
          domainName: 'www.example.com',
          hostedZone,
          subjectAlternativeNames: ['api.example.net'],
        }),
    ).toThrow(/DNS zone example\.com is not authoritative for certificate domain name api\.example\.net/);
  });

  test('rejects a mismatched zone in multi-zone validation', () => {
    const app = createApp();
    const stack = createStack(app, 'Stack', 'us-east-1');
    const wrongZone = HostedZone.fromHostedZoneAttributes(stack, 'WrongZone', {
      hostedZoneId: 'ZWRONG',
      zoneName: 'example.net',
    });

    expect(
      () =>
        new DnsValidatedCertificateV2(stack, 'Certificate', {
          certificateRegion: 'us-east-1',
          domainName: 'www.example.com',
          hostedZonesByDomain: { 'www.example.com': wrongZone },
        }),
    ).toThrow(/DNS zone example\.net is not authoritative for certificate domain name www\.example\.com/);
  });

  test('rejects a hosted zone from a different concrete account', () => {
    const app = createApp();
    const stack = createStack(app, 'Stack', 'eu-west-1');
    const hostedZoneStack = new Stack(app, 'HostedZoneStack', {
      env: { account: OTHER_ACCOUNT, region: 'us-east-1' },
    });
    const hostedZone = HostedZone.fromHostedZoneId(hostedZoneStack, 'HostedZone', 'Z123456');

    expect(
      () =>
        new DnsValidatedCertificateV2(stack, 'Certificate', {
          certificateRegion: 'us-east-1',
          domainName: 'test.example.com',
          hostedZone,
        }),
    ).toThrow(/hosted zone .* must be in certificate account/);
  });

  test('accepts case differences, trailing dots, and wildcard names', () => {
    const app = createApp();
    const stack = createStack(app, 'Stack', 'us-east-1');
    const hostedZone = HostedZone.fromHostedZoneAttributes(stack, 'HostedZone', {
      hostedZoneId: 'Z123456',
      zoneName: 'Example.COM.',
    });

    new DnsValidatedCertificateV2(stack, 'Certificate', {
      certificateRegion: 'us-east-1',
      domainName: '*.example.com',
      hostedZone,
      subjectAlternativeNames: ['API.Example.Com.'],
    });

    expect(() => Template.fromStack(stack)).not.toThrow();
  });

  test('skips authority validation for an ID-only hosted zone import', () => {
    const app = createApp();
    const stack = createStack(app, 'Stack', 'us-east-1');
    const hostedZone = HostedZone.fromHostedZoneId(stack, 'HostedZone', 'Z123456');

    new DnsValidatedCertificateV2(stack, 'Certificate', {
      certificateRegion: 'us-east-1',
      domainName: 'unknown.example.net',
      hostedZone,
    });

    expect(() => Template.fromStack(stack)).not.toThrow();
  });

  test('requires exactly one hosted zone configuration', () => {
    const app = createApp();
    const stack = createStack(app, 'Stack', 'us-east-1');
    const hostedZone = HostedZone.fromHostedZoneId(stack, 'HostedZone', 'Z123456');

    expect(
      () =>
        new DnsValidatedCertificateV2(stack, 'Missing', {
          certificateRegion: 'us-east-1',
          domainName: 'test.example.com',
        }),
    ).toThrow(/exactly one of hostedZone and hostedZonesByDomain/);
    expect(
      () =>
        new DnsValidatedCertificateV2(stack, 'Both', {
          certificateRegion: 'us-east-1',
          domainName: 'test.example.com',
          hostedZone,
          hostedZonesByDomain: { 'test.example.com': hostedZone },
        }),
    ).toThrow(/exactly one of hostedZone and hostedZonesByDomain/);
  });

  test('requires a multi-zone mapping for every certificate domain name', () => {
    const app = createApp();
    const stack = createStack(app, 'Stack', 'us-east-1');
    const hostedZone = HostedZone.fromHostedZoneId(stack, 'HostedZone', 'Z123456');

    expect(
      () =>
        new DnsValidatedCertificateV2(stack, 'Certificate', {
          certificateRegion: 'us-east-1',
          domainName: 'www.example.com',
          hostedZonesByDomain: { 'www.example.com': hostedZone },
          subjectAlternativeNames: ['api.example.com'],
        }),
    ).toThrow(/mapping for certificate domain name "api\.example\.com"/);
  });

  test('rejects duplicate normalized multi-zone keys', () => {
    const app = createApp();
    const stack = createStack(app, 'Stack', 'us-east-1');
    const hostedZone = HostedZone.fromHostedZoneId(stack, 'HostedZone', 'Z123456');

    expect(
      () =>
        new DnsValidatedCertificateV2(stack, 'Certificate', {
          certificateRegion: 'us-east-1',
          domainName: 'www.example.com',
          hostedZonesByDomain: {
            'WWW.EXAMPLE.COM': hostedZone,
            'www.example.com.': hostedZone,
          },
        }),
    ).toThrow(/duplicate domain mappings/);
  });

  test('rejects an unresolved SAN list with multi-zone validation', () => {
    const app = createApp();
    const stack = createStack(app, 'Stack', 'us-east-1');
    const hostedZone = HostedZone.fromHostedZoneId(stack, 'HostedZone', 'Z123456');
    const subjectAlternativeNames = Lazy.list({
      produce: () => ['api.example.com'],
    });

    expect(
      () =>
        new DnsValidatedCertificateV2(stack, 'Certificate', {
          certificateRegion: 'us-east-1',
          domainName: 'www.example.com',
          hostedZonesByDomain: { 'www.example.com': hostedZone },
          subjectAlternativeNames,
        }),
    ).toThrow(/cannot be used with an unresolved subjectAlternativeNames list/);
  });

  test('rejects an unresolved domain name with multi-zone validation', () => {
    const app = createApp();
    const stack = createStack(app, 'Stack', 'us-east-1');
    const hostedZone = HostedZone.fromHostedZoneId(stack, 'HostedZone', 'Z123456');
    const domainName = Token.asString({ Ref: 'CertificateDomainName' });

    expect(
      () =>
        new DnsValidatedCertificateV2(stack, 'Certificate', {
          certificateRegion: 'us-east-1',
          domainName,
          hostedZonesByDomain: { [domainName]: hostedZone },
        }),
    ).toThrow(/hostedZonesByDomain requires concrete domain names/);
  });

  test('rejects an unused multi-zone mapping', () => {
    const app = createApp();
    const stack = createStack(app, 'Stack', 'us-east-1');
    const hostedZone = HostedZone.fromHostedZoneId(stack, 'HostedZone', 'Z123456');

    expect(
      () =>
        new DnsValidatedCertificateV2(stack, 'Certificate', {
          certificateRegion: 'us-east-1',
          domainName: 'www.example.com',
          hostedZonesByDomain: {
            'api.example.com': hostedZone,
            'www.example.com': hostedZone,
          },
        }),
    ).toThrow(/mapping for "api\.example\.com", which is not a certificate domain name/);
  });

  test('rejects duplicate certificate names before default template validation', () => {
    const app = createApp();
    const stack = createStack(app, 'Stack', 'us-east-1');
    const hostedZone = HostedZone.fromHostedZoneId(stack, 'HostedZone', 'Z123456');

    expect(
      () =>
        new DnsValidatedCertificateV2(stack, 'Certificate', {
          certificateRegion: 'us-east-1',
          domainName: 'www.example.com',
          hostedZone,
          subjectAlternativeNames: ['WWW.EXAMPLE.COM.'],
        }),
    ).toThrow(/certificate domain names must be unique/);
  });
});

describe('certificate options, tags, metrics, and lifecycle', () => {
  test('passes native ACM certificate options through', () => {
    const app = createApp();
    const stack = createStack(app, 'Stack', 'us-east-1');
    const hostedZone = HostedZone.fromHostedZoneId(stack, 'HostedZone', 'Z123456');

    new DnsValidatedCertificateV2(stack, 'Certificate', {
      certificateRegion: 'us-east-1',
      allowExport: true,
      certificateName: 'Edge certificate',
      domainName: 'test.example.com',
      hostedZone,
      keyAlgorithm: KeyAlgorithm.EC_PRIME256V1,
      transparencyLoggingEnabled: false,
    });

    Template.fromStack(stack).hasResourceProperties('AWS::CertificateManager::Certificate', {
      CertificateExport: 'ENABLED',
      CertificateTransparencyLoggingPreference: 'DISABLED',
      KeyAlgorithm: 'EC_prime256v1',
      Tags: Match.arrayWith([{ Key: 'Name', Value: 'Edge certificate' }]),
    });
  });

  test('applies explicit tags in a generated stack', () => {
    const { stack, hostedZone } = crossRegionFixture();
    const certificate = new DnsValidatedCertificateV2(stack, 'Certificate', {
      certificateRegion: 'us-east-1',
      domainName: 'test.example.com',
      hostedZone,
    });
    Tags.of(certificate).add('application', 'edge');
    Tags.of(certificate).add('costCenter', 'web');

    Template.fromStack(certificate.certificateStack).hasResourceProperties('AWS::CertificateManager::Certificate', {
      Tags: Match.arrayWith([
        { Key: 'application', Value: 'edge' },
        { Key: 'costCenter', Value: 'web' },
      ]),
    });
  });

  test('proxies Tags.of() directly to a cross-region certificate', () => {
    const { stack, hostedZone } = crossRegionFixture();
    const certificate = new DnsValidatedCertificateV2(stack, 'Certificate', {
      certificateRegion: 'us-east-1',
      domainName: 'test.example.com',
      hostedZone,
    });
    Tags.of(certificate).add('application', 'edge');

    Template.fromStack(certificate.certificateStack).hasResourceProperties('AWS::CertificateManager::Certificate', {
      Tags: Match.arrayWith([{ Key: 'application', Value: 'edge' }]),
    });
  });

  test('proxies containing-stack tag aspects to a cross-region certificate', () => {
    const { stack, hostedZone } = crossRegionFixture();
    const certificate = new DnsValidatedCertificateV2(stack, 'Certificate', {
      certificateRegion: 'us-east-1',
      domainName: 'test.example.com',
      hostedZone,
    });
    Tags.of(stack).add('environment', 'production');

    Template.fromStack(certificate.certificateStack).hasResourceProperties('AWS::CertificateManager::Certificate', {
      Tags: Match.arrayWith([{ Key: 'environment', Value: 'production' }]),
    });
  });

  test('explicit certificateName takes precedence over a Name tag', () => {
    const { stack, hostedZone } = crossRegionFixture();
    const certificate = new DnsValidatedCertificateV2(stack, 'Certificate', {
      certificateRegion: 'us-east-1',
      certificateName: 'Friendly certificate',
      domainName: 'test.example.com',
      hostedZone,
    });
    Tags.of(certificate).add('Name', 'Ignored name', { priority: 50 });
    Tags.of(certificate).add('application', 'edge');

    Template.fromStack(certificate.certificateStack).hasResourceProperties('AWS::CertificateManager::Certificate', {
      Tags: Match.arrayWith([
        { Key: 'application', Value: 'edge' },
        { Key: 'Name', Value: 'Friendly certificate' },
      ]),
    });
    Template.fromStack(certificate.certificateStack).hasResourceProperties('AWS::CertificateManager::Certificate', {
      Tags: Match.not(Match.arrayWith([{ Key: 'Name', Value: 'Ignored name' }])),
    });
  });

  test('a Name tag can replace the generated default name', () => {
    const { stack, hostedZone } = crossRegionFixture();
    const certificate = new DnsValidatedCertificateV2(stack, 'Certificate', {
      certificateRegion: 'us-east-1',
      domainName: 'test.example.com',
      hostedZone,
    });
    Tags.of(certificate).add('Name', 'Tagged name', { priority: 200 });

    Template.fromStack(certificate.certificateStack).hasResourceProperties('AWS::CertificateManager::Certificate', {
      Tags: Match.arrayWith([{ Key: 'Name', Value: 'Tagged name' }]),
    });
  });

  test('applies removal policy from props and through the method', () => {
    const { stack, hostedZone } = crossRegionFixture();
    const retained = new DnsValidatedCertificateV2(stack, 'Retained', {
      certificateRegion: 'us-east-1',
      domainName: 'retained.example.com',
      hostedZone,
      removalPolicy: RemovalPolicy.RETAIN,
    });
    const method = new DnsValidatedCertificateV2(stack, 'Method', {
      certificateRegion: 'us-east-1',
      domainName: 'method.example.com',
      hostedZone,
    });
    method.applyRemovalPolicy(RemovalPolicy.RETAIN);

    Template.fromStack(retained.certificateStack).resourceCountIs('AWS::CertificateManager::Certificate', 2);
    const resources = Template.fromStack(retained.certificateStack).findResources(
      'AWS::CertificateManager::Certificate',
    );
    expect(Object.values(resources).every(resource => resource.DeletionPolicy === 'Retain')).toBe(true);
  });

  test('metricDaysToExpiry uses the certificate region', () => {
    const { stack, hostedZone } = crossRegionFixture();
    const certificate = new DnsValidatedCertificateV2(stack, 'Certificate', {
      certificateRegion: 'us-east-1',
      domainName: 'test.example.com',
      hostedZone,
    });

    expect(stack.resolve(certificate.metricDaysToExpiry().toMetricConfig())).toEqual({
      metricStat: expect.objectContaining({
        dimensions: [{ name: 'CertificateArn', value: stack.resolve(certificate.certificateArn) }],
        metricName: 'DaysToExpiry',
        namespace: 'AWS/CertificateManager',
        period: stack.resolve(Duration.days(1)),
        region: 'us-east-1',
        regionOverride: 'us-east-1',
        statistic: 'Minimum',
      }),
      renderingProperties: expect.anything(),
    });
  });

  test('supports cross-copy type detection', () => {
    const app = createApp();
    const stack = createStack(app, 'Stack', 'us-east-1');
    const hostedZone = HostedZone.fromHostedZoneId(stack, 'HostedZone', 'Z123456');
    const certificate = new DnsValidatedCertificateV2(stack, 'Certificate', {
      certificateRegion: 'us-east-1',
      domainName: 'test.example.com',
      hostedZone,
    });

    expect(DnsValidatedCertificateV2.isDnsValidatedCertificateV2(certificate)).toBe(true);
    expect(DnsValidatedCertificateV2.isDnsValidatedCertificateV2({})).toBe(false);
    expect(DnsValidatedCertificateV2.isDnsValidatedCertificateV2(null)).toBe(false);
  });
});

describe('invalid stack topology', () => {
  test.each(['us-east-1', 'eu-west-1'])(
    'rejects certificateRegion %s together with certificateStack',
    certificateRegion => {
      const app = createApp();
      const stack = createStack(app, 'Stack', 'eu-west-1');
      const certificateStack = createStack(app, 'Certificates', 'us-east-1');
      const hostedZone = HostedZone.fromHostedZoneId(stack, 'HostedZone', 'Z123456');

      expect(
        () =>
          new DnsValidatedCertificateV2(stack, 'Certificate', {
            certificateStack,
            domainName: 'test.example.com',
            hostedZone,
            certificateRegion,
          }),
      ).toThrow(/specify at most one of certificateStack and certificateRegion/);
    },
  );

  test.each(['eu-west-1', 'us-east-1'])('infers explicit owner region %s', region => {
    const { app, stack, hostedZone } = crossRegionFixture();
    const owner = createStack(app, 'Owner', region);
    const certificate = new DnsValidatedCertificateV2(stack, 'Certificate', {
      domainName: 'test.example.com',
      hostedZone,
      certificateStack: owner,
    });
    expect(certificate.certificateRegion).toBe(region);
    expect(certificate.env.region).toBe(region);
    Template.fromStack(owner).resourceCountIs('AWS::CertificateManager::Certificate', 1);
  });

  test('rejects a certificate stack in a different account', () => {
    const app = createApp();
    const stack = createStack(app, 'Stack', 'eu-west-1');
    const certificateStack = new Stack(app, 'Certificates', {
      env: { account: OTHER_ACCOUNT, region: 'us-east-1' },
    });
    const hostedZone = HostedZone.fromHostedZoneId(stack, 'HostedZone', 'Z123456');

    expect(
      () =>
        new DnsValidatedCertificateV2(stack, 'Certificate', {
          certificateStack,
          domainName: 'test.example.com',
          hostedZone,
        }),
    ).toThrow(/must be in account "111111111111", got "222222222222"/);
  });

  test('rejects a certificate stack in a different stage', () => {
    const app = createApp();
    const sourceStage = new Stage(app, 'Source');
    const certificateStage = new Stage(app, 'Certificates');
    const stack = createStack(sourceStage, 'Stack', 'eu-west-1');
    const certificateStack = createStack(certificateStage, 'CertificateStack', 'us-east-1');
    const hostedZone = HostedZone.fromHostedZoneId(stack, 'HostedZone', 'Z123456');

    expect(
      () =>
        new DnsValidatedCertificateV2(stack, 'Certificate', {
          certificateStack,
          domainName: 'test.example.com',
          hostedZone,
        }),
    ).toThrow(/same CDK App or Stage/);
  });

  test('rejects a cross-partition certificate reference', () => {
    const app = createApp();
    const stack = createStack(app, 'Stack', 'cn-north-1');
    const hostedZone = HostedZone.fromHostedZoneId(stack, 'HostedZone', 'Z123456');

    expect(
      () =>
        new DnsValidatedCertificateV2(stack, 'Certificate', {
          certificateRegion: 'us-east-1',
          domainName: 'test.example.com',
          hostedZone,
        }),
    ).toThrow(/cross-partition references are not supported/);
  });

  test('rejects an unresolved certificate region', () => {
    const app = createApp();
    const stack = createStack(app, 'Stack', 'eu-west-1');
    const hostedZone = HostedZone.fromHostedZoneId(stack, 'HostedZone', 'Z123456');

    expect(
      () =>
        new DnsValidatedCertificateV2(stack, 'Certificate', {
          domainName: 'test.example.com',
          hostedZone,
          certificateRegion: Token.asString({ Ref: 'CertificateRegion' }),
        }),
    ).toThrow(/certificateRegion must be concrete/);
  });

  test('rejects an unresolved containing-stack region for a separate stack', () => {
    const app = createApp();
    const stack = new Stack(app, 'Stack');
    const hostedZone = HostedZone.fromHostedZoneId(stack, 'HostedZone', 'Z123456');

    expect(
      () =>
        new DnsValidatedCertificateV2(stack, 'Certificate', {
          certificateRegion: 'us-east-1',
          domainName: 'test.example.com',
          hostedZone,
        }),
    ).toThrow(/containing stack to have a concrete region/);
  });

  test('rejects an explicit environment-agnostic certificate stack for a concrete account', () => {
    const app = createApp();
    const stack = createStack(app, 'Stack', 'eu-west-1');
    const certificateStack = new Stack(app, 'Certificates', {
      env: { region: 'us-east-1' },
    });
    const hostedZone = HostedZone.fromHostedZoneId(stack, 'HostedZone', 'Z123456');

    expect(
      () =>
        new DnsValidatedCertificateV2(stack, 'Certificate', {
          certificateStack,
          domainName: 'test.example.com',
          hostedZone,
        }),
    ).toThrow(/must be in account/);
  });

  test('rejects a generated stack ID occupied by a non-stack construct', () => {
    const app = createApp();
    const stack = createStack(app, 'Stack', 'eu-west-1');
    const hostedZone = HostedZone.fromHostedZoneId(stack, 'HostedZone', 'Z123456');
    new Construct(app, `dns-validated-certificate-stack-${stack.node.addr}-us-east-1`);

    expect(
      () =>
        new DnsValidatedCertificateV2(stack, 'Certificate', {
          domainName: 'test.example.com',
          hostedZone,
          certificateRegion: 'us-east-1',
        }),
    ).toThrow(/already exists in the stage and is not a Stack/);
  });

  test('requires an App or Stage when it needs to generate a stack', () => {
    const root = new Construct(undefined as never, 'Root');
    const stack = new Stack(root, 'Stack', {
      env: { account: ACCOUNT, region: 'eu-west-1' },
    });
    const hostedZone = HostedZone.fromHostedZoneId(stack, 'HostedZone', 'Z123456');

    expect(
      () =>
        new DnsValidatedCertificateV2(stack, 'Certificate', {
          certificateRegion: 'us-east-1',
          domainName: 'test.example.com',
          hostedZone,
        }),
    ).toThrow(/inside a CDK App or Stage/);
  });
});

describe('OCF contract regressions', () => {
  test('recognizes another loaded OCF copy without relying on instanceof', async () => {
    let OtherCertificate: typeof DnsValidatedCertificateV2;
    await jest.isolateModulesAsync(async () => {
      OtherCertificate = (await import('../../src/aws-certificatemanager')).DnsValidatedCertificateV2;
    });
    const { stack, hostedZone } = crossRegionFixture();
    const certificate = new OtherCertificate!(stack, 'OtherCertificate', { domainName: 'www.example.com', hostedZone });
    expect(certificate instanceof DnsValidatedCertificateV2).toBe(false);
    expect(DnsValidatedCertificateV2.isDnsValidatedCertificateV2(certificate)).toBe(true);
    expect(DnsValidatedCertificateV2.isDnsValidatedCertificateV2(undefined)).toBe(false);
    expect(DnsValidatedCertificateV2.isDnsValidatedCertificateV2('certificate')).toBe(false);
    expect(DnsValidatedCertificateV2.isDnsValidatedCertificateV2({ [Symbol.for('unrelated.Certificate')]: true })).toBe(
      false,
    );
  });

  test('retains explicit owners and preserves period and label metric overrides', () => {
    const app = createApp();
    const owner = createStack(app, 'Owner', 'us-east-1');
    const consumer = createStack(app, 'Consumer', 'eu-central-1');
    const zone = HostedZone.fromHostedZoneId(owner, 'Zone', 'Z123456');
    const certificate = new DnsValidatedCertificateV2(consumer, 'Certificate', {
      domainName: 'www.example.com',
      hostedZone: zone,
      certificateStack: owner,
      removalPolicy: RemovalPolicy.RETAIN,
    });
    Template.fromStack(owner).hasResource('AWS::CertificateManager::Certificate', {
      DeletionPolicy: 'Retain',
      UpdateReplacePolicy: 'Retain',
    });
    const metric = certificate.metricDaysToExpiry({ period: Duration.hours(6), label: 'Expiry' });
    expect(metric.period.toSeconds()).toBe(21600);
    expect(metric.label).toBe('Expiry');
    expect(metric.statistic).toBe('Minimum');
    expect(metric.region).toBe('us-east-1');
  });

  test.each([undefined, 'strong', 'weak'])(
    'wires the real producer output with global reference default %s',
    strength => {
      const app = new App({ context: strength ? { '@aws-cdk/core:defaultCrossStackReferences': strength } : {} });
      const stack = createStack(app, 'Consumer', 'eu-central-1');
      const zone = HostedZone.fromHostedZoneAttributes(stack, 'Zone', {
        hostedZoneId: 'Z123456',
        zoneName: 'example.com',
      });
      const certificate = new DnsValidatedCertificateV2(stack, 'Certificate', {
        certificateRegion: 'us-east-1',
        domainName: 'www.example.com',
        hostedZone: zone,
      });
      new Distribution(stack, 'Distribution', {
        certificate,
        domainNames: ['www.example.com'],
        defaultBehavior: { origin: new HttpOrigin('origin.example.com') },
      });
      expect(certificate.env.region).toBe('us-east-1');
      expect(certificate.env.account).toBe(ACCOUNT);
      expect(certificate.stack).toBe(stack);
      expect(Stack.of(certificate)).toBe(stack);
      const assembly = app.synth();
      const consumer = assembly.getStackArtifact(stack.artifactId);
      const owner = assembly.getStackArtifact(certificate.certificateStack.artifactId);
      const distribution: any = Object.values(consumer.template.Resources).find(
        (r: any) => r.Type === 'AWS::CloudFront::Distribution',
      );
      const reference =
        distribution.Properties.DistributionConfig.ViewerCertificate.AcmCertificateArn['Fn::GetStackOutput'];
      expect(reference).toEqual({
        StackName: certificate.certificateStack.stackName,
        OutputName: expect.any(String),
        Region: 'us-east-1',
      });
      const resource = certificate.node.defaultChild as CfnCertificate;
      expect(owner.template.Outputs[reference.OutputName]).toEqual({
        Value: { Ref: certificate.certificateStack.getLogicalId(resource) },
      });
      expect(consumer.dependencies.map(d => d.id)).toContain(owner.id);
      for (const artifact of assembly.stacks) {
        for (const entry of Object.values(artifact.template.Resources ?? {}) as any[]) {
          expect(entry.Type).not.toMatch(
            /^(AWS::Lambda::Function|AWS::IAM::Role|AWS::IAM::Policy|AWS::Logs::LogGroup|AWS::CloudFormation::CustomResource|Custom::)/,
          );
        }
      }
    },
  );

  test.each([false, true])('exposes a truthful native default child, separate=%s', separate => {
    const app = createApp();
    const stack = createStack(app, 'Consumer', separate ? 'eu-central-1' : 'us-east-1');
    const zone = HostedZone.fromHostedZoneId(stack, 'Zone', 'Z123456');
    const certificate = new DnsValidatedCertificateV2(stack, 'Certificate', {
      certificateRegion: 'us-east-1',
      domainName: 'www.example.com',
      hostedZone: zone,
    });
    const resource = certificate.node.defaultChild as CfnCertificate;
    expect(CfnCertificate.isCfnCertificate(resource)).toBe(true);
    expect(resource.node.id).toBe('Resource');
    expect(Stack.of(resource)).toBe(certificate.certificateStack);
    resource.addPropertyOverride('CertificateTransparencyLoggingPreference', 'DISABLED');
    Template.fromStack(certificate.certificateStack).hasResourceProperties('AWS::CertificateManager::Certificate', {
      CertificateTransparencyLoggingPreference: 'DISABLED',
    });
    Template.fromStack(stack).resourceCountIs('AWS::CertificateManager::Certificate', separate ? 0 : 1);
  });

  test('normalizes native names and exact multi-zone options without mutating inputs', () => {
    const { stack, hostedZone } = crossRegionFixture();
    const sans = Object.freeze(['*.Example.COM.', 'Api.Example.COM.']);
    const mappings = Object.freeze({
      'EXAMPLE.COM.': hostedZone,
      '*.example.com': hostedZone,
      'API.EXAMPLE.COM': hostedZone,
    });
    const props = Object.freeze({
      domainName: 'Example.COM.',
      subjectAlternativeNames: [...sans],
      hostedZonesByDomain: mappings,
    });
    const certificate = new DnsValidatedCertificateV2(stack, 'Certificate', props);
    Template.fromStack(certificate.certificateStack).hasResourceProperties('AWS::CertificateManager::Certificate', {
      DomainName: 'example.com',
      SubjectAlternativeNames: ['*.example.com', 'api.example.com'],
      DomainValidationOptions: [
        { DomainName: 'example.com', HostedZoneId: 'Z123456' },
        { DomainName: 'api.example.com', HostedZoneId: 'Z123456' },
      ],
    });
    expect(props.domainName).toBe('Example.COM.');
    expect(props.subjectAlternativeNames).toEqual(sans);
    expect(Object.keys(mappings)).toEqual(['EXAMPLE.COM.', '*.example.com', 'API.EXAMPLE.COM']);
  });

  test('ignores inherited mappings and rejects an empty map before creating an owner', () => {
    for (const inherited of [false, true]) {
      const { app, stack, hostedZone } = crossRegionFixture();
      const hostedZonesByDomain = inherited ? Object.create({ 'test.example.com': hostedZone }) : {};
      expect(
        () =>
          new DnsValidatedCertificateV2(stack, 'Certificate', {
            certificateRegion: 'us-east-1',
            domainName: 'test.example.com',
            hostedZonesByDomain,
          }),
      ).toThrow(/Stack\/Certificate: hostedZonesByDomain must contain a mapping/);
      expect(app.node.children.filter(Stack.isStack)).toEqual([stack]);
    }
  });

  test.each([false, true])('rejects a known private zone before allocating support infrastructure, multi=%s', multi => {
    const app = createApp();
    const stack = createStack(app, 'Consumer', 'us-east-1');
    const vpc = new Vpc(stack, 'Vpc', { maxAzs: 2, natGateways: 0 });
    const zone = new PrivateHostedZone(stack, 'Zone', { zoneName: 'example.com', vpc });
    expect(
      () =>
        new DnsValidatedCertificateV2(stack, 'Certificate', {
          certificateRegion: 'us-east-1',
          domainName: 'www.example.com',
          ...(multi ? { hostedZonesByDomain: { 'www.example.com': zone } } : { hostedZone: zone }),
        }),
    ).toThrow(/Consumer\/Certificate: hosted zone .* is private/);
    expect(app.node.children.filter(Stack.isStack)).toEqual([stack]);
  });

  test('unknown imported zone privacy and tokenized zone privacy remain caller preconditions', () => {
    const app = createApp();
    const stack = createStack(app, 'Consumer', 'us-east-1');
    const zone = new PublicHostedZone(stack, 'Zone', { zoneName: 'example.com' });
    (zone.node.defaultChild as CfnHostedZone).vpcs = Lazy.any({ produce: () => undefined });
    new DnsValidatedCertificateV2(stack, 'Certificate', {
      certificateRegion: 'us-east-1',
      domainName: 'www.example.com',
      hostedZone: zone,
    });
    Template.fromStack(stack).resourceCountIs('AWS::CertificateManager::Certificate', 1);
  });

  test('preserves unresolved single-zone names and SAN lists', () => {
    const app = createApp();
    const stack = createStack(app, 'Consumer', 'us-east-1');
    const zone = HostedZone.fromHostedZoneId(stack, 'Zone', 'Z123456');
    const domainName = Lazy.string({ produce: () => 'www.example.com' });
    const subjectAlternativeNames = Lazy.list({ produce: () => ['api.example.com'] });
    new DnsValidatedCertificateV2(stack, 'Certificate', {
      certificateRegion: 'us-east-1',
      domainName,
      subjectAlternativeNames,
      hostedZone: zone,
    });
    Template.fromStack(stack).hasResourceProperties('AWS::CertificateManager::Certificate', {
      DomainName: 'www.example.com',
      SubjectAlternativeNames: ['api.example.com'],
    });
  });

  test('authority checks respect DNS label boundaries', () => {
    const app = createApp();
    const stack = createStack(app, 'Consumer', 'us-east-1');
    const zone = HostedZone.fromHostedZoneAttributes(stack, 'Zone', {
      hostedZoneId: 'Z123456',
      zoneName: 'example.com',
    });
    expect(
      () =>
        new DnsValidatedCertificateV2(stack, 'Certificate', {
          certificateRegion: 'us-east-1',
          domainName: 'notexample.com',
          hostedZone: zone,
        }),
    ).toThrow(/not authoritative/);
  });

  test.each(['duplicate', 'authority', 'opaque', 'valid'])('checks lazy SAN lists at synthesis: %s', kind => {
    const app = createApp();
    const stack = createStack(app, 'Consumer', 'eu-central-1');
    const zone = HostedZone.fromHostedZoneAttributes(stack, 'Zone', {
      hostedZoneId: 'Z123456',
      zoneName: 'example.com',
    });
    let names: string[] = [];
    const subjectAlternativeNames =
      kind === 'opaque'
        ? new CfnParameter(stack, 'Names', { type: 'CommaDelimitedList' }).valueAsList
        : Lazy.list({ produce: () => names });
    const certificate = new DnsValidatedCertificateV2(stack, 'Certificate', {
      certificateRegion: 'us-east-1',
      domainName: 'www.example.com',
      hostedZone: zone,
      subjectAlternativeNames,
    });
    names =
      kind === 'duplicate'
        ? ['WWW.EXAMPLE.COM.']
        : kind === 'authority'
          ? ['notexample.com']
          : ['api.example.com', '*.example.com', 'example.com'];
    if (kind === 'valid') {
      Template.fromStack(certificate.certificateStack).hasResourceProperties('AWS::CertificateManager::Certificate', {
        SubjectAlternativeNames: names,
        DomainValidationOptions: ['www.example.com', 'api.example.com', 'example.com'].map(DomainName => ({
          DomainName,
          HostedZoneId: 'Z123456',
        })),
      });
    } else {
      expect(() => app.synth()).toThrow(
        kind === 'duplicate'
          ? /must be unique/
          : kind === 'authority'
            ? /not authoritative/
            : /must resolve to a fixed-length list at synthesis/,
      );
    }
  });

  test.each([false, true])('forwards app, parent, direct tags and removal with precedence, separate=%s', separate => {
    const app = createApp();
    const stack = createStack(app, 'Consumer', separate ? 'eu-central-1' : 'us-east-1');
    const scope = new Construct(stack, 'Scope');
    const zone = HostedZone.fromHostedZoneId(stack, 'Zone', 'Z123456');
    const certificate = new DnsValidatedCertificateV2(scope, 'Certificate', {
      certificateRegion: 'us-east-1',
      domainName: 'www.example.com',
      hostedZone: zone,

      certificateName: 'named',
    });
    Tags.of(app).add('App', 'app');
    Tags.of(scope).add('Parent', 'parent');
    Tags.of(certificate).add('Direct', 'direct');
    Tags.of(certificate).add('Priority', 'aspect', { priority: 200 });
    Tags.of(certificate).add('Removed', 'remove-me');
    Tags.of(certificate).remove('Removed');
    Tags.of(certificate).add('Excluded', 'no', { excludeResourceTypes: ['AWS::CertificateManager::Certificate'] });
    const resources = Template.fromStack(certificate.certificateStack).findResources(
      'AWS::CertificateManager::Certificate',
    );
    const tags = Object.values(resources)[0].Properties.Tags;
    expect(tags).toEqual([
      { Key: 'App', Value: 'app' },
      { Key: 'Direct', Value: 'direct' },
      { Key: 'Name', Value: 'named' },
      { Key: 'Parent', Value: 'parent' },
      { Key: 'Priority', Value: 'aspect' },
    ]);
  });

  test('keeps automatic owners separate by containing stack and target region', () => {
    const app = createApp();
    const first = createStack(app, 'First', 'eu-central-1');
    const second = createStack(app, 'Second', 'eu-central-1');
    const zone = HostedZone.fromHostedZoneId(first, 'Zone', 'Z123456');
    const a = new DnsValidatedCertificateV2(first, 'A', {
      certificateRegion: 'us-east-1',
      domainName: 'a.example.com',
      hostedZone: zone,
    });
    const b = new DnsValidatedCertificateV2(second, 'B', {
      certificateRegion: 'us-east-1',
      domainName: 'b.example.com',
      hostedZone: zone,
    });
    const c = new DnsValidatedCertificateV2(first, 'C', {
      domainName: 'c.example.com',
      hostedZone: zone,
      certificateRegion: 'eu-west-1',
    });
    expect(new Set([a.certificateStack, b.certificateStack, c.certificateStack]).size).toBe(3);
    const before = app.synth().stacks.map(s => [s.id, s.template]);
    expect(app.synth().stacks.map(s => [s.id, s.template])).toEqual(before);
  });

  test('supports explicit same-stack and shared owners with direct native references', () => {
    const app = createApp();
    const owner = createStack(app, 'Owner', 'us-east-1');
    const consumer = createStack(app, 'Consumer', 'eu-central-1');
    const zone = HostedZone.fromHostedZoneId(owner, 'Zone', 'Z123456');
    const a = new DnsValidatedCertificateV2(owner, 'A', {
      domainName: 'a.example.com',
      hostedZone: zone,
      certificateStack: owner,
    });
    const b = new DnsValidatedCertificateV2(consumer, 'B', {
      domainName: 'b.example.com',
      hostedZone: zone,
      certificateStack: owner,
    });
    new Distribution(owner, 'Distribution', {
      certificate: a,
      domainNames: ['a.example.com'],
      defaultBehavior: { origin: new HttpOrigin('origin.example.com') },
    });
    new Distribution(consumer, 'Distribution', {
      certificate: b,
      domainNames: ['b.example.com'],
      defaultBehavior: { origin: new HttpOrigin('origin.example.com') },
    });
    const template = Template.fromStack(owner);
    template.resourceCountIs('AWS::CertificateManager::Certificate', 2);
    template.hasResourceProperties('AWS::CloudFront::Distribution', {
      DistributionConfig: {
        ViewerCertificate: {
          AcmCertificateArn: { Ref: owner.getLogicalId(a.node.defaultChild as CfnCertificate) },
          SslSupportMethod: 'sni-only',
        },
      },
    });
  });

  test('rejects an unmanaged stack collision instead of adopting it', () => {
    const { app, stack, hostedZone } = crossRegionFixture();
    createStack(app, `dns-validated-certificate-stack-${stack.node.addr}-us-east-1`, 'us-east-1');
    expect(
      () =>
        new DnsValidatedCertificateV2(stack, 'Certificate', {
          certificateRegion: 'us-east-1',
          domainName: 'a.example.com',
          hostedZone,
        }),
    ).toThrow(/not a generated certificate owner; pass it as certificateStack/);
  });

  test('a nested consumer depends on a top-level regional owner through its parent', () => {
    const app = createApp();
    const parent = createStack(app, 'Parent', 'eu-central-1');
    const nested = new NestedStack(parent, 'Nested');
    const zone = HostedZone.fromHostedZoneId(nested, 'Zone', 'Z123456');
    const certificate = new DnsValidatedCertificateV2(nested, 'Certificate', {
      certificateRegion: 'us-east-1',
      domainName: 'www.example.com',
      hostedZone: zone,
    });
    new Distribution(nested, 'Distribution', {
      certificate,
      defaultBehavior: { origin: new HttpOrigin('origin.example.com') },
    });
    Template.fromStack(nested).hasResourceProperties('AWS::CloudFront::Distribution', {
      DistributionConfig: {
        ViewerCertificate: { AcmCertificateArn: weakCertificateArnReference(nested), SslSupportMethod: 'sni-only' },
      },
    });
    expect(
      app
        .synth()
        .getStackArtifact(parent.artifactId)
        .dependencies.map(d => d.id),
    ).toContain(certificate.certificateStack.artifactId);
  });

  test('a parent consumes a nested owner through native nested outputs', () => {
    const app = createApp();
    const parent = createStack(app, 'Parent', 'us-east-1');
    const owner = new NestedStack(parent, 'Owner');
    const zone = HostedZone.fromHostedZoneId(owner, 'Zone', 'Z123456');
    const certificate = new DnsValidatedCertificateV2(parent, 'Certificate', {
      domainName: 'www.example.com',
      hostedZone: zone,
      certificateStack: owner,
    });
    new Distribution(parent, 'Distribution', {
      certificate,
      defaultBehavior: { origin: new HttpOrigin('origin.example.com') },
    });
    const template = Template.fromStack(parent).toJSON();
    const distribution: any = Object.values(template.Resources).find(
      (r: any) => r.Type === 'AWS::CloudFront::Distribution',
    );
    const reference = distribution.Properties.DistributionConfig.ViewerCertificate.AcmCertificateArn;
    expect(reference['Fn::GetStackOutput']).toBeUndefined();
    const [id, output] = reference['Fn::GetAtt'];
    expect(template.Resources[id].Type).toBe('AWS::CloudFormation::Stack');
    expect(Template.fromStack(owner).toJSON().Outputs[output.replace(/^Outputs\./, '')].Value).toEqual({
      Ref: owner.getLogicalId(certificate.node.defaultChild as CfnCertificate),
    });
  });

  test('creates native same-stack certificates within nested stacks', () => {
    const app = createApp();
    const parent = createStack(app, 'Parent', 'us-east-1');
    const nested = new NestedStack(parent, 'Nested');
    const zone = new PublicHostedZone(nested, 'Zone', { zoneName: 'example.com' });
    const certificate = new DnsValidatedCertificateV2(nested, 'Certificate', {
      certificateRegion: 'us-east-1',
      domainName: 'www.example.com',
      hostedZone: zone,
    });
    expect(certificate.certificateStack).toBe(nested);
    Template.fromStack(nested).resourceCountIs('AWS::CertificateManager::Certificate', 1);
    Template.fromStack(parent).resourceCountIs('AWS::CertificateManager::Certificate', 0);
  });

  test('attributes imports remain ordinary ACM interfaces and create no owner', () => {
    const app = createApp();
    const stack = createStack(app, 'Consumer', 'eu-central-1');
    const arn = `arn:aws:acm:us-east-1:${ACCOUNT}:certificate/12345678-1234-1234-1234-123456789012`;
    const certificate = DnsValidatedCertificateV2.fromCertificateAttributes(stack, 'Imported', { certificateArn: arn });
    new Distribution(stack, 'Distribution', {
      certificate,
      defaultBehavior: { origin: new HttpOrigin('origin.example.com') },
    });
    expect(certificate.certificateArn).toBe(arn);
    expect(DnsValidatedCertificateV2.isDnsValidatedCertificateV2(certificate)).toBe(false);
    expect(app.node.children.filter(Stack.isStack)).toEqual([stack]);
    Template.fromStack(stack).resourceCountIs('AWS::CertificateManager::Certificate', 0);
  });

  test('legacy CloudFront also accepts the native regional reference', () => {
    const { stack, hostedZone } = crossRegionFixture();
    const certificate = new DnsValidatedCertificateV2(stack, 'Certificate', {
      certificateRegion: 'us-east-1',
      domainName: 'www.example.com',
      hostedZone,
    });
    new CloudFrontWebDistribution(stack, 'Distribution', {
      viewerCertificate: ViewerCertificate.fromAcmCertificate(certificate, { aliases: ['www.example.com'] }),
      originConfigs: [
        { customOriginSource: { domainName: 'origin.example.com' }, behaviors: [{ isDefaultBehavior: true }] },
      ],
    });
    Template.fromStack(stack).hasResourceProperties('AWS::CloudFront::Distribution', {
      DistributionConfig: {
        ViewerCertificate: Match.objectLike({ AcmCertificateArn: weakCertificateArnReference(stack) }),
      },
    });
  });
});

function createApp(): App {
  const app = new App({ context: WEAK_REFERENCE_CONTEXT });
  Validations.of(app).acknowledge({
    id: 'CloudFormation-Validate::F0001',
    reason: 'A weak-reference consumer can intentionally contain only outputs in unit tests.',
  });
  return app;
}

function createStack(scope: Construct, id: string, region: string): Stack {
  return new Stack(scope, id, {
    env: { account: ACCOUNT, region },
  });
}

function crossRegionFixture(): {
  readonly app: App;
  readonly stack: Stack;
  readonly hostedZone: ReturnType<typeof HostedZone.fromHostedZoneId>;
} {
  const app = createApp();
  const stack = createStack(app, 'Stack', 'eu-west-1');
  const hostedZone = HostedZone.fromHostedZoneId(stack, 'HostedZone', 'Z123456');
  return { app, stack, hostedZone };
}

function generatedCertificateStack(app: App, containingStack: Stack, region = 'us-east-1'): Stack {
  return app.node.findChild(`dns-validated-certificate-stack-${containingStack.node.addr}-${region}`) as Stack;
}

function weakCertificateArnReference(
  containingStack: Stack,
  stackNamePattern = `dns-validated-certificate-stack-${containingStack.node.addr}-us-east-1`,
  region = 'us-east-1',
): unknown {
  return {
    'Fn::GetStackOutput': {
      OutputName: Match.anyValue(),
      Region: region,
      StackName: Match.stringLikeRegexp(stackNamePattern),
    },
  };
}

describe('revised placement and late DNS contracts', () => {
  test.each([false, true])('omitted placement stays local, environment agnostic=%s', agnostic => {
    const app = createApp();
    const stack = agnostic ? new Stack(app, 'Consumer') : createStack(app, 'Consumer', 'eu-central-1');
    const hostedZone = HostedZone.fromHostedZoneId(stack, 'Zone', 'Z123456');
    for (const explicit of [false, true]) {
      const certificate = new DnsValidatedCertificateV2(stack, explicit ? 'Explicit' : 'Default', {
        domainName: 'www.example.com',
        hostedZone,
        ...(explicit ? { certificateStack: stack } : {}),
      });
      expect(certificate.certificateStack).toBe(stack);
      expect(certificate.certificateRegion).toBe(stack.region);
      expect(certificate.env.region).toBe(stack.region);
    }
    Template.fromStack(stack).resourceCountIs('AWS::CertificateManager::Certificate', 2);
    expect(app.synth().stacks).toHaveLength(1);
  });

  test.each([false, true])('native owner-local hosted zone succeeds, map=%s', multi => {
    const { app, stack } = crossRegionFixture();
    const owner = createStack(app, 'Owner', 'us-east-1');
    const zone = new PublicHostedZone(owner, 'Zone', { zoneName: 'example.com' });
    const certificate = new DnsValidatedCertificateV2(stack, 'Certificate', {
      domainName: 'www.example.com',
      certificateStack: owner,
      ...(multi ? { hostedZonesByDomain: { 'www.example.com': zone } } : { hostedZone: zone }),
    });
    new Distribution(stack, 'Distribution', {
      certificate,
      defaultBehavior: { origin: new HttpOrigin('origin.example.com') },
    });
    const template = Template.fromStack(owner);
    template.hasResourceProperties('AWS::CertificateManager::Certificate', {
      DomainValidationOptions: [
        {
          DomainName: 'www.example.com',
          HostedZoneId: { Ref: owner.getLogicalId(zone.node.defaultChild as CfnHostedZone) },
        },
      ],
    });
    expect(owner.dependencies).not.toContain(stack);
    expect(stack.dependencies).toContain(owner);
    expect(owner.node.children.filter(child => child.node.id.startsWith('ValidationZone'))).toHaveLength(0);
  });

  test('an imported token scoped under the owner does not establish native zone ownership', () => {
    const { app, stack } = crossRegionFixture();
    const owner = createStack(app, 'Owner', 'us-east-1');
    const foreignId = new CfnParameter(stack, 'ZoneId').valueAsString;
    const zone = HostedZone.fromHostedZoneId(owner, 'Imported', foreignId);
    expect(
      () =>
        new DnsValidatedCertificateV2(stack, 'Certificate', {
          domainName: 'www.example.com',
          hostedZone: zone,
          certificateStack: owner,
        }),
    ).toThrow(/require concrete hosted zone IDs or a native hosted zone in certificateStack/);
  });

  test.each([false, true])('domain parameter belongs in native owner, foreign=%s', foreign => {
    const { app, stack, hostedZone } = crossRegionFixture();
    const owner = createStack(app, 'Owner', 'us-east-1');
    const parameter = new CfnParameter(foreign ? stack : owner, 'DomainName');
    const certificate = new DnsValidatedCertificateV2(stack, 'Certificate', {
      domainName: parameter.valueAsString,
      hostedZone,
      certificateStack: owner,
    });
    new Distribution(stack, 'Distribution', {
      certificate,
      defaultBehavior: { origin: new HttpOrigin('origin.example.com') },
    });
    if (foreign) {
      expect(() => app.synth()).toThrow(/cyclic reference/);
    } else {
      Template.fromStack(owner).hasResourceProperties('AWS::CertificateManager::Certificate', {
        DomainName: { Ref: 'DomainName' },
        DomainValidationOptions: [{ DomainName: { Ref: 'DomainName' }, HostedZoneId: 'Z123456' }],
      });
    }
  });

  test('eager and late normalized names emit identical properties after caller configuration', () => {
    const properties = (late: boolean) => {
      const { stack, hostedZone } = crossRegionFixture();
      let values: string[] = [];
      new DnsValidatedCertificateV2(stack, 'Certificate', {
        domainName: late ? Lazy.string({ produce: () => 'WWW.Example.COM.' }) : 'www.example.com',
        subjectAlternativeNames: late
          ? Lazy.list({ produce: () => values })
          : ['api.example.com', '*.example.com', 'example.com'],
        hostedZone,
      });
      values = ['Api.Example.COM.', '*.Example.COM.', 'Example.COM.'];
      return Object.values(Template.fromStack(stack).findResources('AWS::CertificateManager::Certificate'))[0]
        .Properties;
    };
    expect(properties(true)).toEqual(properties(false));
  });

  test.each(['duplicate', 'authority'])('late normalized %s names fail', kind => {
    const { app, stack } = crossRegionFixture();
    const hostedZone = HostedZone.fromHostedZoneAttributes(stack, 'KnownZone', {
      hostedZoneId: 'Z123456',
      zoneName: 'example.com',
    });
    new DnsValidatedCertificateV2(stack, 'Certificate', {
      domainName: 'www.example.com',
      hostedZone,
      subjectAlternativeNames: Lazy.list({
        produce: () => [kind === 'duplicate' ? 'WWW.Example.COM.' : 'Api.Other.COM.'],
      }),
    });
    expect(() => app.synth()).toThrow(kind === 'duplicate' ? /must be unique/ : /not authoritative/);
  });

  test('a real subclass uses the public native handle and retains lazy DNS validation', () => {
    class ExtendedCertificate extends DnsValidatedCertificateV2 {
      protected createCertificateResource(
        scope: Construct,
        id: string,
        props: import('aws-cdk-lib/aws-certificatemanager').CertificateProps,
      ): CfnCertificate {
        const resource = super.createCertificateResource(scope, id, props);
        resource.addPropertyOverride('CertificateTransparencyLoggingPreference', 'DISABLED');
        return resource;
      }
    }
    const { stack, hostedZone } = crossRegionFixture();
    const certificate = new ExtendedCertificate(stack, 'Certificate', {
      domainName: 'www.example.com',
      hostedZone,
      certificateRegion: 'us-east-1',
      subjectAlternativeNames: Lazy.list({ produce: () => ['API.Example.COM.'] }),
    });
    expect(certificate.certificateResource).toBe(certificate.node.defaultChild);
    expect(Stack.of(certificate.certificateResource)).toBe(certificate.certificateStack);
    Template.fromStack(certificate.certificateStack).hasResourceProperties('AWS::CertificateManager::Certificate', {
      CertificateTransparencyLoggingPreference: 'DISABLED',
      SubjectAlternativeNames: ['api.example.com'],
    });
    Template.fromStack(stack).resourceCountIs('AWS::CertificateManager::Certificate', 0);
  });

  test('generated owners are shared across independently loaded package copies', async () => {
    let OtherCertificate: typeof DnsValidatedCertificateV2;
    await jest.isolateModulesAsync(async () => {
      OtherCertificate = (await import('../../src/aws-certificatemanager')).DnsValidatedCertificateV2;
    });
    const { stack, hostedZone } = crossRegionFixture();
    const first = new DnsValidatedCertificateV2(stack, 'First', {
      domainName: 'a.example.com',
      hostedZone,
      certificateRegion: 'us-east-1',
    });
    const second = new OtherCertificate!(stack, 'Second', {
      domainName: 'b.example.com',
      hostedZone,
      certificateRegion: 'us-east-1',
    });
    expect(first.certificateStack).toBe(second.certificateStack);
    Template.fromStack(first.certificateStack).resourceCountIs('AWS::CertificateManager::Certificate', 2);
  });
});

test('rejects a separate owner with unresolved region before allocating native resources', () => {
  const { app, stack, hostedZone } = crossRegionFixture();
  const owner = new Stack(app, 'Owner');
  expect(
    () =>
      new DnsValidatedCertificateV2(stack, 'Certificate', {
        domainName: 'www.example.com',
        hostedZone,
        certificateStack: owner,
      }),
  ).toThrow(/separate certificateStack must have a concrete region/);
  expect(owner.node.children).toHaveLength(0);
});

test('caches a shared imported zone for exact multi-zone mappings', () => {
  const { stack, hostedZone } = crossRegionFixture();
  const certificate = new DnsValidatedCertificateV2(stack, 'Certificate', {
    domainName: 'www.example.com',
    subjectAlternativeNames: ['api.example.com'],
    certificateRegion: 'us-east-1',
    hostedZonesByDomain: { 'www.example.com': hostedZone, 'api.example.com': hostedZone },
  });
  expect(
    certificate.certificateStack.node.children.filter(child => child.node.id.startsWith('ValidationZone')),
  ).toHaveLength(1);
  Template.fromStack(certificate.certificateStack).hasResourceProperties('AWS::CertificateManager::Certificate', {
    DomainValidationOptions: [
      { DomainName: 'www.example.com', HostedZoneId: 'Z123456' },
      { DomainName: 'api.example.com', HostedZoneId: 'Z123456' },
    ],
  });
});

test('rejects a native private zone even when it belongs to the explicit owner', () => {
  const { app, stack } = crossRegionFixture();
  const owner = createStack(app, 'Owner', 'us-east-1');
  const zone = new PrivateHostedZone(owner, 'Zone', {
    zoneName: 'example.com',
    vpc: new Vpc(owner, 'Vpc', { natGateways: 0 }),
  });
  expect(
    () =>
      new DnsValidatedCertificateV2(stack, 'Certificate', {
        domainName: 'www.example.com',
        hostedZone: zone,
        certificateStack: owner,
      }),
  ).toThrow(/is private/);
});

test.each([false, true])('scalar token SAN arrays retain source dependencies, lazy=%s', lazy => {
  const { app, stack, hostedZone } = crossRegionFixture();
  const owner = createStack(app, 'Owner', 'us-east-1');
  const parameter = new CfnParameter(stack, 'ForeignSan');
  const sans = [parameter.valueAsString];
  const certificate = new DnsValidatedCertificateV2(stack, 'Certificate', {
    domainName: 'www.example.com',
    hostedZone,
    certificateStack: owner,
    subjectAlternativeNames: lazy ? Lazy.list({ produce: () => sans }) : sans,
  });
  new Distribution(stack, 'Distribution', {
    certificate,
    defaultBehavior: { origin: new HttpOrigin('origin.example.com') },
  });
  expect(() => app.synth()).toThrow(/cyclic reference/);
});

test('explicit owner tag aspects reach the native certificate alongside wrapper tags', () => {
  const { app, stack, hostedZone } = crossRegionFixture();
  const owner = createStack(app, 'Owner', 'us-east-1');
  const certificate = new DnsValidatedCertificateV2(stack, 'Certificate', {
    domainName: 'www.example.com',
    hostedZone,
    certificateStack: owner,
  });
  Tags.of(owner).add('Owner', 'certificates');
  Tags.of(certificate).add('Service', 'web');
  Template.fromStack(owner).hasResourceProperties('AWS::CertificateManager::Certificate', {
    Tags: Match.arrayWith([
      { Key: 'Owner', Value: 'certificates' },
      { Key: 'Service', Value: 'web' },
    ]),
  });
});

test.each([false, true])('owner-local scalar SAN tokens synthesize without flattening, lazy=%s', lazy => {
  const { app, stack, hostedZone } = crossRegionFixture();
  const owner = createStack(app, 'Owner', 'us-east-1');
  const parameter = new CfnParameter(owner, 'San');
  const sans = [parameter.valueAsString];
  new DnsValidatedCertificateV2(stack, 'Certificate', {
    domainName: 'www.example.com',
    hostedZone,
    certificateStack: owner,
    subjectAlternativeNames: lazy ? Lazy.list({ produce: () => sans }) : sans,
  });
  Template.fromStack(owner).hasResourceProperties('AWS::CertificateManager::Certificate', {
    SubjectAlternativeNames: [{ Ref: 'San' }],
    DomainValidationOptions: [
      { DomainName: 'www.example.com', HostedZoneId: 'Z123456' },
      { DomainName: { Ref: 'San' }, HostedZoneId: 'Z123456' },
    ],
  });
  expect(owner.dependencies).not.toContain(stack);
});

test('rejects a known authority mismatch before creating a generated owner', () => {
  const { app, stack } = crossRegionFixture();
  const hostedZone = HostedZone.fromHostedZoneAttributes(stack, 'KnownZone', {
    hostedZoneId: 'Z123456',
    zoneName: 'example.com',
  });
  expect(
    () =>
      new DnsValidatedCertificateV2(stack, 'Certificate', {
        certificateRegion: 'us-east-1',
        domainName: 'www.other.com',
        hostedZone,
      }),
  ).toThrow(/not authoritative/);
  expect(app.node.children.filter(Stack.isStack)).toEqual([stack]);
});

describe('producer reference strength across shared consumption contexts', () => {
  const cases = [undefined, 'strong', 'weak', 'both'].flatMap(policy =>
    [false, true].flatMap(local => [false, true].map(reverse => ({ policy, local, reverse }))),
  );
  test.each(cases)('keeps references contextual: %j', ({ policy, local, reverse }) => {
    const app = new App({ context: policy ? { '@aws-cdk/core:defaultCrossStackReferences': policy } : {} });
    const stackSpecs = [
      ['Owner', 'us-east-1'],
      ['Consumer', 'eu-central-1'],
      ['SecondConsumer', 'eu-west-1'],
    ];
    const stacks = new Map(
      (reverse ? [...stackSpecs].reverse() : stackSpecs).map(([id, region]) => [id, createStack(app, id, region)]),
    );
    const owner = stacks.get('Owner')!;
    const consumer = stacks.get('Consumer')!;
    const second = stacks.get('SecondConsumer')!;
    const nested = new NestedStack(owner, 'NestedConsumer');
    const hostedZone = HostedZone.fromHostedZoneId(owner, 'Zone', 'Z123456');
    const certificate = new DnsValidatedCertificateV2(local ? owner : consumer, 'Certificate', {
      domainName: 'www.example.com',
      hostedZone,
      ...(local ? {} : { certificateStack: owner }),
    });
    new CfnOutput(owner, 'CertificateArn', { value: certificate.certificateArn });
    new CfnOutput(owner, 'CertificateRefArn', { value: certificate.certificateRef.certificateArn });
    new Alarm(owner, 'Expiry', { metric: certificate.metricDaysToExpiry(), threshold: 30, evaluationPeriods: 1 });
    const consumers = [owner, consumer, second, nested];
    for (const scope of reverse ? [...consumers].reverse() : consumers) {
      new Distribution(scope, 'Distribution', {
        certificate,
        defaultBehavior: { origin: new HttpOrigin('origin.example.com') },
      });
    }
    const assembly = app.synth();
    const own = assembly.getStackArtifact(owner.artifactId).template;
    const localRef = { Ref: owner.getLogicalId(certificate.certificateResource) };
    const viewerArn = (template: any): any =>
      Object.values(template.Resources)
        .filter((resource: any) => resource.Type === 'AWS::CloudFront::Distribution')
        .map((resource: any) => resource.Properties.DistributionConfig.ViewerCertificate.AcmCertificateArn)[0];
    expect(own.Outputs.CertificateArn.Value).toEqual(localRef);
    expect(own.Outputs.CertificateRefArn.Value).toEqual(localRef);
    expect(viewerArn(own)).toEqual(localRef);
    Template.fromStack(owner).hasResourceProperties('AWS::CloudWatch::Alarm', {
      Dimensions: [{ Name: 'CertificateArn', Value: localRef }],
    });
    for (const remote of [consumer, second]) {
      const artifact = assembly.getStackArtifact(remote.artifactId);
      const reference = viewerArn(artifact.template)['Fn::GetStackOutput'];
      expect(reference).toEqual({ StackName: owner.stackName, Region: 'us-east-1', OutputName: expect.any(String) });
      expect(own.Outputs[reference.OutputName].Value).toEqual(localRef);
      expect(artifact.dependencies.map(dependency => dependency.id)).toContain(owner.artifactId);
    }
    const nestedTemplate = Template.fromStack(nested).toJSON();
    const parameter = viewerArn(nestedTemplate).Ref;
    expect(nestedTemplate.Parameters[parameter].Type).toBe('String');
    expect(own.Resources[owner.getLogicalId(nested.nestedStackResource!)].Properties.Parameters[parameter]).toEqual(
      localRef,
    );
    expect(owner.dependencies).not.toContain(consumer);
    expect(owner.dependencies).not.toContain(second);
    for (const template of [...assembly.stacks.map(stack => stack.template), nestedTemplate]) {
      for (const resource of Object.values(template.Resources ?? {}) as any[]) {
        expect(resource.Type).not.toMatch(
          /^(AWS::Lambda::|AWS::IAM::|AWS::Logs::|Custom::|AWS::CloudFormation::CustomResource)/,
        );
      }
    }
  });
});

describe('optional lazy SAN absence', () => {
  const forms = {
    omitted: () => undefined,
    empty: () => [],
    lazyEmpty: () => Lazy.list({ produce: () => [] }),
    omitEmpty: () => Lazy.list({ produce: () => [] }, { omitEmpty: true }),
    lazyUndefined: () => Lazy.list({ produce: () => undefined }),
  };
  test.each(
    Object.entries(forms).flatMap(([name, produce]) => [false, true].map(separate => ({ name, produce, separate }))),
  )('omits native SANs for $name, separate=$separate', ({ produce, separate }) => {
    const { stack, hostedZone } = crossRegionFixture();
    const certificate = new DnsValidatedCertificateV2(stack, 'Certificate', {
      domainName: 'WWW.Example.COM.',
      hostedZone,
      ...(separate ? { certificateRegion: 'us-east-1' } : {}),
      subjectAlternativeNames: produce(),
    });
    Template.fromStack(certificate.certificateStack).hasResourceProperties('AWS::CertificateManager::Certificate', {
      DomainName: 'www.example.com',
      SubjectAlternativeNames: Match.absent(),
      DomainValidationOptions: [{ DomainName: 'www.example.com', HostedZoneId: 'Z123456' }],
    });
  });

  test('an omitEmpty producer can be populated after construction', () => {
    const { stack, hostedZone } = crossRegionFixture();
    let names: string[] | undefined;
    const certificate = new DnsValidatedCertificateV2(stack, 'Certificate', {
      domainName: 'www.example.com',
      hostedZone,
      subjectAlternativeNames: Lazy.list({ produce: () => names }, { omitEmpty: true }),
    });
    names = ['API.Example.COM.'];
    Template.fromStack(certificate.certificateStack).hasResourceProperties('AWS::CertificateManager::Certificate', {
      SubjectAlternativeNames: ['api.example.com'],
      DomainValidationOptions: [
        { DomainName: 'www.example.com', HostedZoneId: 'Z123456' },
        { DomainName: 'api.example.com', HostedZoneId: 'Z123456' },
      ],
    });
  });

  test.each(['split', 'condition'])('still rejects a deployment-time %s list', kind => {
    const { app, stack, hostedZone } = crossRegionFixture();
    const value = new CfnParameter(stack, 'Names').valueAsString;
    new DnsValidatedCertificateV2(stack, 'Certificate', {
      domainName: 'www.example.com',
      hostedZone,
      subjectAlternativeNames:
        kind === 'split' ? Fn.split(',', value) : Token.asList(Fn.conditionIf('HasNames', ['api.example.com'], [])),
    });
    expect(() => app.synth()).toThrow(/subjectAlternativeNames must resolve to a fixed-length list/);
  });
});

test.each([undefined, []])('omits empty concrete SANs in exact multi-zone mode: %j', subjectAlternativeNames => {
  const { stack, hostedZone } = crossRegionFixture();
  const certificate = new DnsValidatedCertificateV2(stack, 'Certificate', {
    domainName: 'www.example.com',
    subjectAlternativeNames,
    hostedZonesByDomain: { 'www.example.com': hostedZone },
  });
  Template.fromStack(certificate.certificateStack).hasResourceProperties('AWS::CertificateManager::Certificate', {
    SubjectAlternativeNames: Match.absent(),
    DomainValidationOptions: [{ DomainName: 'www.example.com', HostedZoneId: 'Z123456' }],
  });
});
