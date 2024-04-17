import { Stack, aws_cur, aws_iam, aws_s3 } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class ReportGranularity {

  public static readonly HOURLY: ReportGranularity = new ReportGranularity('HOURLY');
  public static readonly DAILY: ReportGranularity = new ReportGranularity('DAILY');
  public static readonly MONTHLY: ReportGranularity = new ReportGranularity('MONTHLY');

  private constructor(public readonly value: string) { }
}

export class CurFormat {

  public static readonly TEXT: CurFormat = new CurFormat('GZIP', 'textORCsv');
  public static readonly PARQUET: CurFormat = new CurFormat('Parquet', 'Parquet');

  private constructor(public readonly compression: string, public readonly format: string) { }
}

/**
 * Properties for defining a Cost and Usage Report.
 */
export interface CostReportProps {
  /**
   * The name of the cost report.
   *
   * @default - 'default-cur'
   */
  readonly costReportName?: string;

  /**
   * The bucket to place the cost report into.
   * If non is provided, a new bucket will be created.
   *
   * @default - a new bucket will be created.
   */
  readonly bucket?: aws_s3.IBucket;

  /**
   * The format to use for the cost and usage report.
   *
   * @default - TEXT
   */
  readonly format?: CurFormat;

  /**
   * The granularity of the line items in the report
   *
   * @default - HOURLY
   */
  readonly reportGranularity?: ReportGranularity;
}

/**
 * Represents a Cost Report construct in AWS CDK.
 * This class creates an AWS Cost and Usage Report, stored in an S3 bucket, and configures the necessary permissions.
 *
 * @example
 * const report = new CostReport(stack, 'MyReport', {
 *   costReportName: 'business-report',
 *   reportGranularity: ReportGranularity.MONTHLY,
 *   format: CurFormat.PARQUET
 * });
 */
export class CostReport extends Construct {
  constructor(scope: Construct, id: string, props: CostReportProps) {
    super(scope, id);

    const globalCURAccountId = '386209384616';

    const curBucket = props.bucket ?? new aws_s3.Bucket(this, 'Bucket', {
      blockPublicAccess: aws_s3.BlockPublicAccess.BLOCK_ALL,
      enforceSSL: true,
    });

    // Grant the global CUR Account write access to the bucket
    curBucket.grantPut(new aws_iam.AccountPrincipal(globalCURAccountId));
    curBucket.addToResourcePolicy(new aws_iam.PolicyStatement({
      effect: aws_iam.Effect.ALLOW,
      principals: [new aws_iam.AccountPrincipal(globalCURAccountId)],
      actions: ['s3:GetBucketAcl', 's3:GetBucketPolicy'],
      resources: [curBucket.bucketArn],
    }));

    const format = props.format ?? CurFormat.TEXT;

    new aws_cur.CfnReportDefinition(this, 'Resource', {
      compression: format.compression,
      format: format.format,
      refreshClosedReports: false,
      reportName: props.costReportName ?? 'default-cur',
      reportVersioning: 'CREATE_NEW_REPORT',
      s3Bucket: curBucket.bucketName,
      s3Prefix: 'reports',
      s3Region: Stack.of(this).region,
      timeUnit: props.reportGranularity?.value ?? 'HOURLY',
      additionalSchemaElements: ['RESOURCES'],
    });

  }
}