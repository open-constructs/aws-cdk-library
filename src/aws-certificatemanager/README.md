Constructs for the AWS Certificate Manager service

# DnsValidatedCertificateV2 CDK Construct

## Overview

The `DnsValidatedCertificateV2` construct creates a public [DNS-validated ACM certificate](https://docs.aws.amazon.com/acm/latest/userguide/dns-validation.html) with native CloudFormation resources, either in the containing stack or in another region.

Setting `certificateRegion` creates the certificate in a generated owner stack in that region, re-imports the Route 53 zone into it, and hands the ARN back through a weak [`Fn::GetStackOutput`](https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/intrinsic-function-reference-getstackoutput.html) reference. This covers CloudFront applications deployed outside `us-east-1` without certificate-provider Lambdas or custom resources.

```mermaid
flowchart LR
  Zone["Public Route 53 zone"]
  subgraph Owner["Generated certificate stack (us-east-1)"]
    ACM["ACM certificate"] --> Output["Certificate ARN output"]
  end
  subgraph Application["Application stack (eu-central-1)"]
    Reference["Fn::GetStackOutput"] --> Distribution["CloudFront distribution"]
  end
  Zone -->|"Validation CNAME"| ACM
  Output -->|"Weak reference"| Reference
```

Core CDK can already share a `Certificate` from an explicit owner stack through weak references. This construct adds automatic regional placement and checks the primary name and SANs against the hosted zone. The `V2` name follows the deprecated core `DnsValidatedCertificate`; this library has no V1.

## Usage

Import the necessary classes from AWS CDK and this construct:

```ts
import { App, Stack } from 'aws-cdk-lib';
import { HostedZone } from 'aws-cdk-lib/aws-route53';
import { DnsValidatedCertificateV2 } from '@open-constructs/aws-cdk/aws-certificatemanager';
```

### Basic Example

Without placement properties, the certificate is created in the containing stack:

```ts
const app = new App();
const stack = new Stack(app, 'ApiStack', {
  env: { account: '123456789012', region: 'eu-central-1' },
});
const zone = HostedZone.fromHostedZoneAttributes(stack, 'Zone', {
  hostedZoneId: 'Z23ABC4XYZL05B',
  zoneName: 'example.com',
});

new DnsValidatedCertificateV2(stack, 'Certificate', {
  domainName: 'api.example.com',
  subjectAlternativeNames: ['*.api.example.com'],
  hostedZone: zone,
});
```

### CloudFront Example

CloudFront requires its viewer certificate in [`us-east-1`](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cnames-and-https-requirements.html). Set `certificateRegion` to create the certificate there from an application stack in another region:

```ts
import { Distribution } from 'aws-cdk-lib/aws-cloudfront';
import { HttpOrigin } from 'aws-cdk-lib/aws-cloudfront-origins';

const app = new App();
const application = new Stack(app, 'Application', {
  env: { account: '123456789012', region: 'eu-central-1' },
});
const zone = HostedZone.fromHostedZoneAttributes(application, 'Zone', {
  hostedZoneId: 'Z23ABC4XYZL05B',
  zoneName: 'example.com',
});

const certificate = new DnsValidatedCertificateV2(application, 'ViewerCertificate', {
  domainName: 'www.example.com',
  hostedZone: zone,
  certificateRegion: 'us-east-1',
});

new Distribution(application, 'Distribution', {
  certificate,
  domainNames: ['www.example.com'],
  defaultBehavior: { origin: new HttpOrigin('origin.example.com') },
});
```

The generated owner stack is named after the containing stack and region, here `Application-certificates-us-east-1`. It uses the app's default synthesizer, so the target region must be bootstrapped with the app's qualifier.

### Explicit Certificate Stack

Continuing the CloudFront example, pass `certificateStack` when the owner needs its own name, synthesizer, tags, termination protection, or lifecycle. Its region determines the certificate region, and it must be in the same app or stage, account, and partition as the containing stack. `certificateStack` and `certificateRegion` cannot be combined.

```ts
const certificates = new Stack(app, 'Certificates', {
  env: { account: '123456789012', region: 'us-east-1' },
});

new DnsValidatedCertificateV2(application, 'OwnedCertificate', {
  domainName: 'www.example.com',
  hostedZone: zone,
  certificateStack: certificates,
});
```

A separate owner needs a concrete hosted zone ID, or a public hosted zone created in that owner. A certificate owned by a nested stack can only be consumed within its top-level stack tree; use a top-level `certificateStack` for wider sharing.

### Multiple Hosted Zones

Continuing the basic example, use `hostedZonesByDomain` instead of `hostedZone` when names belong to different zones. Every primary and SAN name needs an exact entry, including separate apex and wildcard keys. Names are matched case-insensitively without a trailing dot.

```ts
const netZone = HostedZone.fromHostedZoneAttributes(stack, 'NetZone', {
  hostedZoneId: 'Z0987654321ABC',
  zoneName: 'example.net',
});

new DnsValidatedCertificateV2(stack, 'MultiZoneCertificate', {
  domainName: 'www.example.com',
  subjectAlternativeNames: ['api.example.net'],
  hostedZonesByDomain: {
    'www.example.com': zone,
    'api.example.net': netZone,
  },
});
```

### Importing an Existing Certificate

`fromCertificateAttributes()` imports an existing certificate ARN without creating any resources:

```ts
const imported = DnsValidatedCertificateV2.fromCertificateAttributes(stack, 'Imported', {
  certificateArn: 'arn:aws:acm:us-east-1:123456789012:certificate/11111111-2222-3333-4444-555555555555',
});
```

### Additional Notes

- The construct sets weak cross-stack reference strength on its certificate, even when it stays in the containing stack. This overrides the app's `@aws-cdk/core:defaultCrossStackReferences` policy for stacks that reference this certificate.
- Weak references do not stop an in-use certificate from being replaced or deleted. Update consumers first; changing the owner alone does not refresh a deployed consumer.
- Removing the last certificate from a generated owner removes that stack from the cloud assembly but does not delete the deployed stack. Delete it separately.
- The hosted zone must be public, delegated, and in the certificate account. Imported zones cannot prove this at synthesis.
- ACM validation CNAMEs can be shared between certificates and are not removed by this construct.
