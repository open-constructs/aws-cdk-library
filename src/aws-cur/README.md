Constructs for the AWS Cost and Usage reports

# CostReport CDK Construct

## Overview

The `CostReport` construct facilitates the creation and management of AWS Cost and Usage Reports (CUR)
within AWS CDK applications. This construct automates the setup of the necessary S3 bucket for storing
the reports and configures permissions for AWS billing to write to this bucket. You can specify
various properties of the report like name, format, and granularity.

## Usage

Import the necessary classes and enums from AWS CDK and this construct:

```typescript
import { App, Stack } from 'aws-cdk-lib';
import { CostReport, ReportGranularity, CurFormat } from '@open-constructs/aws-cdk/aws-cur';
```

### Basic Example
Here's how you can create a monthly cost and usage report in Parquet format:

```typescript
const app = new App();
const stack = new Stack(app, 'CostReportStack', { env: { region: 'us-east-1' } });

new CostReport(stack, 'MyCostReport', {
  costReportName: 'monthly-business-report',
  reportGranularity: ReportGranularity.MONTHLY,
  format: CurFormat.PARQUET,
});
```

### Advanced Example

Creating a report with a custom S3 bucket and hourly granularity:

```typescript
import { Bucket } from 'aws-cdk-lib/aws-s3';

const customBucket = new Bucket(stack, 'MyCustomBucket');

new CostReport(stack, 'MyDetailedCostReport', {
  costReportName: 'detailed-hourly-report',
  bucket: customBucket,
  reportGranularity: ReportGranularity.HOURLY,
  format: CurFormat.TEXT_OR_CSV,
});
```

### Additional Notes

The construct automatically handles the permissions required for AWS billing services to access the S3 bucket.
