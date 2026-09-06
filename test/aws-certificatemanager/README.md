# Certificate integration fixture

This integration test requests a public certificate in `us-east-1`, attaches it to CloudFront from `eu-central-1`, and asserts ACM issuance and the deployed viewer certificate. Its HTTP origin is a synthetic endpoint; it does not test origin content. No deployment or snapshot is implied by successful local synthesis.

Run only this test after obtaining permission to deploy and clean up in the selected account, and permission to use a publicly delegated Route 53 zone in that account. Supply `CDK_DEFAULT_ACCOUNT`, `OCF_CERTIFICATE_INTEG_ZONE_ID`, and `OCF_CERTIFICATE_INTEG_ZONE_NAME`. The alias is `ocf-certificate-integ.<zone name>`; reserve it for this test and ensure no other distribution uses it. Use a fixture whose identifiers are approved for the public snapshot. Do not commit local environment files or credentials.

## Offline synthesis

These synthetic identifiers are for assembly inspection only. They cannot validate a real certificate. `CDK_OUTDIR` keeps the assembly outside the repository.

```bash
CDK_DEFAULT_ACCOUNT=123456789012 OCF_CERTIFICATE_INTEG_ZONE_ID=Z1234567890 OCF_CERTIFICATE_INTEG_ZONE_NAME=example.com CDK_OUTDIR=/tmp/ocf-certificate-integ-synth ./node_modules/.bin/ts-node --project tsconfig.dev.json test/aws-certificatemanager/integ.dns-validated-certificate-v2.ts
npm run integ -- --directory test/aws-certificatemanager --language typescript --list
```

Inspect `CertificateIntegOwner.template.json`, `CertificateIntegConsumer.template.json`, `CertificateIntegAssertions.template.json`, and `manifest.json`. Owner and consumer must contain no certificate-provider Lambda, role, policy, log group, or custom resource. Integration assertions have their own Lambda/IAM infrastructure in the assertion stack. The consumer must reference the owner's actual output with `Fn::GetStackOutput`, and the assembly must order the owner before consumer and both before assertions.

## Authorized deployment

Before deployment, verify the selected identity with `aws sts get-caller-identity`. Use `aws route53 get-hosted-zone` to verify the fixture's public status and compare its name servers with actual DNS delegation. Confirm bootstrap and CloudFormation permissions in both regions, and inspect existing CloudFront aliases. Save the complete hosted-zone record list before the run; ACM records can already be shared by other certificates.

Review the installed runner's help. For the first deployment of this new test, run:

```bash
npm run integ:update -- --directory test/aws-certificatemanager --language typescript --parallel-regions us-east-1 --max-workers 1 --strict --disable-update-workflow integ.dns-validated-certificate-v2.ts
npm run integ -- --directory test/aws-certificatemanager --language typescript --strict integ.dns-validated-certificate-v2.ts
```

Keep the runner's default cleanup enabled. The runner region is only `us-east-1`; the app already declares both actual regions. `--disable-update-workflow` is justified only for the initial test with no prior snapshot; subsequent changes need an assessment of update replay. A missing snapshot before the first deployment is expected. Do not create or edit a snapshot to stand in for a deployment.

Capture the certificate ARN and distribution ID from the consumer outputs while deployed. The owner's generated ARN output is a direct native resource reference; do not put the wrapper's weak ARN token into an output in its own owner, which would create a self-referencing stack-output lookup. Verify ACM `describe-certificate` reports `ISSUED`, CloudFront `get-distribution` reports `Deployed` with that viewer ARN, and `get-template` on the consumer preserves the native output reference. Save the runner assertions and exact versions/commands. If deployment fails, inspect CloudFormation events and finish scoped cleanup before retrying.

## Independent cleanup and snapshot review

After runner cleanup, independently verify deletion of `CertificateIntegOwner` in `us-east-1`, `CertificateIntegConsumer` in `eu-central-1`, and `CertificateIntegAssertions` in `us-east-1`. ACM must return `ResourceNotFoundException` for the recorded ARN; CloudFront must return `NoSuchDistribution` for the recorded ID. A clean snapshot comparison alone proves none of these deletions.

Compare Route 53 records with the saved pre-run list. Preserve the zone and every pre-existing record. Remove a test-created validation CNAME only when it is confirmed unshared and cleanup authorization covers it; otherwise record its retained owner. ACM validation CNAMEs are not automatically deleted with the certificate.

Review the runner-generated snapshot for account/region normalization, external fixture identifiers, local absolute paths, and unrelated assets. Do not replace deployed identifiers with invented placeholders and claim that modified snapshot was deployed. Include only the runner's verified snapshot and approved fixture data in the contribution.
