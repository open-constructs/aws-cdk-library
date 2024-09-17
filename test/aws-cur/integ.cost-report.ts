import { IntegTest } from '@aws-cdk/integ-tests-alpha';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ocf from '../../src';

class CostReportStack extends cdk.Stack {
  constructor(scope: Construct) {
    super(scope, 'cur-report', { env: { region: 'us-east-1' } });

    const bucket = new cdk.aws_s3.Bucket(this, 'ReportBucket', {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      blockPublicAccess: cdk.aws_s3.BlockPublicAccess.BLOCK_ALL,
    });

    const report1 = new ocf.aws_cur.CostReport(this, 'CostReport', {
      bucket,
    });
    const report2 = new ocf.aws_cur.CostReport(this, 'CostReportWithDefaultName', {
      bucket,
      enableDefaultUniqueReportName: true,
    });

    new cdk.CfnOutput(this, 'CostReportName1', {
      value: report1.costReportName,
    });
    new cdk.CfnOutput(this, 'CostReportName2', {
      value: report2.costReportName,
    });
  }
}

const app = new cdk.App();
const testCase = new CostReportStack(app);
new IntegTest(app, 'CurReport', {
  testCases: [testCase],
});

app.synth();
