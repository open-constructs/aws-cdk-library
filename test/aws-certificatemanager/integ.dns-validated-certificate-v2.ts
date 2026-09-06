import { ExpectedResult, IntegTest } from '@aws-cdk/integ-tests-alpha';
import { App, CfnOutput, ReferenceStrength, RemovalPolicy, Stack } from 'aws-cdk-lib';
import { Distribution, PriceClass } from 'aws-cdk-lib/aws-cloudfront';
import { HttpOrigin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { HostedZone } from 'aws-cdk-lib/aws-route53';
import { aws_certificatemanager } from '../../src';

const app = new App({ context: { '@aws-cdk/core:defaultCrossStackReferences': 'strong' } });
const account = process.env.CDK_DEFAULT_ACCOUNT;
const zoneId = process.env.OCF_CERTIFICATE_INTEG_ZONE_ID;
const zoneName = process.env.OCF_CERTIFICATE_INTEG_ZONE_NAME;
if (!zoneId || !zoneName) {
  throw new Error(
    'set OCF_CERTIFICATE_INTEG_ZONE_ID and OCF_CERTIFICATE_INTEG_ZONE_NAME to the approved public DNS fixture',
  );
}
const domainName = `ocf-certificate-integ.${zoneName.toLowerCase().replace(/\.$/, '')}`;
const owner = new Stack(app, 'CertificateIntegOwner', { env: { account, region: 'us-east-1' } });
const consumer = new Stack(app, 'CertificateIntegConsumer', { env: { account, region: 'eu-central-1' } });
const zone = HostedZone.fromHostedZoneAttributes(owner, 'Zone', { hostedZoneId: zoneId, zoneName });
const certificate = new aws_certificatemanager.DnsValidatedCertificateV2(consumer, 'Certificate', {
  domainName,
  hostedZone: zone,
  // The explicit owner supplies its us-east-1 region.
  certificateStack: owner,
  allowExport: false,
  removalPolicy: RemovalPolicy.DESTROY,
});
const distribution = new Distribution(consumer, 'Distribution', {
  certificate,
  domainNames: [domainName],
  priceClass: PriceClass.PRICE_CLASS_100,
  defaultBehavior: { origin: new HttpOrigin('origin.example.com') },
});
new CfnOutput(consumer, 'CertificateArn', { value: certificate.certificateArn });
new CfnOutput(consumer, 'DistributionId', { value: distribution.distributionId });
const assertionStack = new Stack(app, 'CertificateIntegAssertions', { env: { account, region: 'us-east-1' } });
const integ = new IntegTest(app, 'DnsValidatedCertificateV2Integ', { testCases: [owner, consumer], assertionStack });
integ.assertions
  .awsApiCall('ACM', 'describeCertificate', { CertificateArn: certificate.certificateArn })
  .expect(ExpectedResult.objectLike({ Certificate: { Status: 'ISSUED', DomainName: domainName } }));
integ.assertions
  .awsApiCall('CloudFront', 'getDistribution', {
    Id: Stack.consumeReference(distribution.distributionId, ReferenceStrength.WEAK),
  })
  .expect(
    ExpectedResult.objectLike({
      Distribution: {
        Status: 'Deployed',
        DistributionConfig: { ViewerCertificate: { ACMCertificateArn: certificate.certificateArn } },
      },
    }),
  );
app.synth();
