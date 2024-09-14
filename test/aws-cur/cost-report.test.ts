
import { App, CfnElement, Stack, aws_s3 } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { CostReport, ReportGranularity, CurFormat } from '../../src/aws-cur';

describe('CostReport', () => {
  let app: App;
  let stack: Stack;

  beforeEach(() => {
    app = new App();
    stack = new Stack(app, 'TestStack', { env: { region: 'us-east-1' } });
  });

  test('default configuration', () => {
    new CostReport(stack, 'MyCostReport', {});

    const template = Template.fromStack(stack);

    // Check if S3 bucket is created
    template.resourceCountIs('AWS::S3::Bucket', 1);

    // Check if the CUR report definition is created
    template.resourceCountIs('AWS::CUR::ReportDefinition', 1);

    // Validate properties of the CUR report
    template.hasResourceProperties('AWS::CUR::ReportDefinition', {
      ReportName: 'default-cur',
      TimeUnit: 'HOURLY',
      Format: 'textORcsv',
      Compression: 'GZIP',
    });
  });

  test('custom configuration', () => {
    new CostReport(stack, 'MyCustomCostReport', {
      costReportName: 'custom-cur',
      reportGranularity: ReportGranularity.DAILY,
      format: CurFormat.PARQUET,
    });

    const template = Template.fromStack(stack);

    // Check the CUR report properties for custom settings
    template.hasResourceProperties('AWS::CUR::ReportDefinition', {
      ReportName: 'custom-cur',
      TimeUnit: 'DAILY',
      Format: 'Parquet',
      Compression: 'Parquet',
    });
  });

  test('bucket provided', () => {
    const bucket = new aws_s3.Bucket(stack, 'ProvidedBucket');

    new CostReport(stack, 'ReportWithExistingBucket', {
      costReportName: 'with-existing-bucket',
      bucket: bucket,
      reportGranularity: ReportGranularity.MONTHLY,
    });

    const template = Template.fromStack(stack);

    // Validate that no new bucket is created
    template.resourceCountIs('AWS::S3::Bucket', 1); // Only the provided one

    // Ensure the bucket policy allows access to the CUR account
    template.hasResourceProperties('AWS::S3::BucketPolicy', {
      Bucket: {
        Ref: stack.resolve((bucket.node.defaultChild as CfnElement).logicalId),
      },
      PolicyDocument: {
        Statement: Match.arrayWith([
          Match.objectLike({
            Principal: {
              Service: 'billingreports.amazonaws.com',
            },
            Action: ['s3:GetBucketAcl', 's3:GetBucketPolicy'],
          }),
        ]),
      },
    });
  });

  test('multiple reports', () => {
    new CostReport(stack, 'Report1', {
      costReportName: 'report1',
    });
    new CostReport(stack, 'Report2', {
      costReportName: 'report2',
    });

    const template = Template.fromStack(stack);

    template.resourceCountIs('AWS::CUR::ReportDefinition', 2);
  });

  test('multiple reports with bucket', () => {
    const bucket = new aws_s3.Bucket(stack, 'MyBucket');

    new CostReport(stack, 'Report1', {
      costReportName: 'report1',
      bucket: bucket,
    });
    new CostReport(stack, 'Report2', {
      costReportName: 'report2',
      bucket: bucket,
    });

    const template = Template.fromStack(stack);

    template.resourceCountIs('AWS::CUR::ReportDefinition', 2);
  });

  test('regions other than us-east-1', () => {
    const regionOtherStack = new Stack(app, 'OtherRegionStack', { env: { region: 'ap-northeast-1' } });

    expect(() => new CostReport(regionOtherStack, 'MyCustomCostReport', {
      costReportName: 'custom-cur',
      reportGranularity: ReportGranularity.DAILY,
      format: CurFormat.PARQUET,
    })).toThrow(`The \`CostReport\` construct is only available in the us-east-1 region, got: ${regionOtherStack.region} region`);
  });

  test('skip validation if region is token', () => {
    // Credential's default region is used if it is not specified.
    const stackWithRegionToken = new Stack(app, 'OtherRegionStack');

    expect(() => new CostReport(stackWithRegionToken, 'MyCustomCostReport', {
      costReportName: 'custom-cur',
      reportGranularity: ReportGranularity.DAILY,
      format: CurFormat.PARQUET,
    })).not.toThrow();
  });

});
