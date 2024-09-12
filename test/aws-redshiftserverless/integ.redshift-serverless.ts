import { IntegTest } from '@aws-cdk/integ-tests-alpha';
import * as cdk from 'aws-cdk-lib';
import { Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import * as ocf from '../../src';

class RedshiftServerlessStack extends cdk.Stack {
  public readonly workgroup: ocf.aws_redshiftserverless.Workgroup;
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new cdk.aws_ec2.Vpc(this, 'VPC', {});

    const defaultRole = new Role(this, 'DefaultRole', {
      assumedBy: new ServicePrincipal('redshift.amazonaws.com'),
    });

    const anotherRole = new Role(this, 'AnotherRole', {
      assumedBy: new ServicePrincipal('redshift.amazonaws.com'),
    });

    const namespace = new ocf.aws_redshiftserverless.Namespace(this, 'Namespace', {
      adminUsername: 'adminuser',
      adminUserPassword: cdk.SecretValue.unsafePlainText('adminUserPassword123'),
      defaultIamRole: defaultRole,
      iamRoles: [defaultRole, anotherRole],
      dbName: 'mydatabase',
      logExports: [
        ocf.aws_redshiftserverless.LogExport.USER_LOG,
        ocf.aws_redshiftserverless.LogExport.CONNECTION_LOG,
        ocf.aws_redshiftserverless.LogExport.USER_ACTIVITY_LOG,
      ],
    });

    const workgroup = new ocf.aws_redshiftserverless.Workgroup(this, 'WorkGroup', {
      baseCapacity: 8,
      configParameters: {
        datestyle: 'ISO, MDY',
        enable_user_activity_logging: 'true',
        query_group: 'default',
        require_ssl: 'true',
        search_path: '$user, public',
        max_query_execution_time: '14440',
      },
      enhancedVpcRouting: true,
      namespace,
      publiclyAccessible: true,
      vpc,
      port: 5432,
    });
    this.workgroup = workgroup;
  }
}

const app = new cdk.App();
const env = {
  account: process.env.CDK_INTEG_ACCOUNT || process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_INTEG_REGION || process.env.CDK_DEFAULT_REGION,
};

const testCase = new RedshiftServerlessStack(app, 'RedshiftServerlessStack', { env });

new IntegTest(app, 'RedshiftServerless', {
  testCases: [testCase],
  enableLookups: true,
  stackUpdateWorkflow: false,
});

new cdk.CfnOutput(testCase, 'endpointAddress', { value: testCase.workgroup.endpointAddress });
