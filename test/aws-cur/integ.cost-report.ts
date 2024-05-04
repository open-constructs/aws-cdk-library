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

    new ocf.aws_cur.CostReport(this, 'CostReport', {
      bucket,
    });
  }
}

const app = new cdk.App();
const testCase = new CostReportStack(app);
new IntegTest(app, 'CurReport', {
  testCases: [testCase],
});

app.synth();