import { Stack, aws_cur, aws_iam, aws_s3 } from 'aws-cdk-lib';
import { Construct } from 'constructs';

/**
 * Enum for the possible granularities of a cost report
 */
export class ReportGranularity {
  /** Hourly granularity */
  public static readonly HOURLY: ReportGranularity = new ReportGranularity(
    'HOURLY',
  );
  /** Daily granularity */
  public static readonly DAILY: ReportGranularity = new ReportGranularity(
    'DAILY',
  );
  /** Weekly granularity */
  public static readonly MONTHLY: ReportGranularity = new ReportGranularity(
    'MONTHLY',
  );

  /**
   * Returns a ReportGranularity instance for the given granularity string value.
   *
   * @param granularity - The granularity string value to create an instance for.
   * @returns A ReportGranularity instance.
   */
  public static for(granularity: string): ReportGranularity {
    return new ReportGranularity(granularity);
  }

  protected constructor(public readonly value: string) {}
}

/**
 * Enum for the possible formats of a cost report
 */
export class CurFormat {
  /** GZIP compressed text or CSV format */
  public static readonly TEXT_OR_CSV: CurFormat = new CurFormat(
    'GZIP',
    'textORcsv',
  );
  /** Parquet format */
  public static readonly PARQUET: CurFormat = new CurFormat(
    'Parquet',
    'Parquet',
  );

  /**
   * Returns a CurFormat instance for the given compression and format string values.
   *
   * @param compression - The compression string value
   * @param format - The format string value
   * @returns A CurFormat instance.
   */
  public static for(compression: string, format: string): CurFormat {
    return new CurFormat(compression, format);
  }

  protected constructor(
    public readonly compression: string,
    public readonly format: string,
  ) {}
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
   * @default - TEXT_OR_CSV
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
  /** The S3 bucket that stores the cost report */
  public readonly reportBucket: aws_s3.IBucket;

  constructor(scope: Construct, id: string, props: CostReportProps) {
    super(scope, id);

    const currentStack = Stack.of(this);

    if (currentStack.region !== 'us-east-1') {
      throw new Error(
        `The \`CostReport\` construct is only available in the us-east-1 region, got: ${currentStack.region} region`,
      );
    }

    this.reportBucket =
      props.bucket ??
      this.createReportBucket(this, 'Bucket', {
        blockPublicAccess: aws_s3.BlockPublicAccess.BLOCK_ALL,
        enforceSSL: true,
      });

    const billingPrincipal = new aws_iam.ServicePrincipal(
      'billingreports.amazonaws.com',
    ).withConditions({
      StringEquals: {
        'aws:SourceArn': `arn:aws:cur:${currentStack.region}:${currentStack.account}:definition/*`,
        'aws:SourceAccount': currentStack.account,
      },
    });
    // Grant the global CUR Account write access to the bucket
    this.reportBucket.grantPut(billingPrincipal);
    this.reportBucket.addToResourcePolicy(
      new aws_iam.PolicyStatement({
        effect: aws_iam.Effect.ALLOW,
        principals: [billingPrincipal],
        actions: ['s3:GetBucketAcl', 's3:GetBucketPolicy'],
        resources: [this.reportBucket.bucketArn],
      }),
    );

    const format = props.format ?? CurFormat.TEXT_OR_CSV;

    const reportDefinition = this.createReportDefinition(this, 'Resource', {
      compression: format.compression,
      format: format.format,
      refreshClosedReports: false,
      reportName: props.costReportName ?? 'default-cur',
      reportVersioning: 'CREATE_NEW_REPORT',
      s3Bucket: this.reportBucket.bucketName,
      s3Prefix: 'reports',
      s3Region: currentStack.region,
      timeUnit: props.reportGranularity?.value ?? 'HOURLY',
      additionalSchemaElements: ['RESOURCES'],
    });
    reportDefinition.node.addDependency(this.reportBucket.policy!);
  }

  protected createReportBucket(
    scope: Construct,
    id: string,
    props: aws_s3.BucketProps,
  ): aws_s3.IBucket {
    return new aws_s3.Bucket(scope, id, props);
  }

  protected createReportDefinition(
    scope: Construct,
    id: string,
    props: aws_cur.CfnReportDefinitionProps,
  ): aws_cur.CfnReportDefinition {
    return new aws_cur.CfnReportDefinition(scope, id, props);
  }
}
