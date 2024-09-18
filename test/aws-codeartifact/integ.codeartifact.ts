import { IntegTest } from '@aws-cdk/integ-tests-alpha';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ocf from '../../src';

class CodeartifactStack extends cdk.Stack {
  constructor(scope: Construct) {
    super(scope, 'codeartifact', { env: { region: 'eu-central-1' } });

    const domain = new ocf.aws_codeartifact.Domain(this, 'domain', {
      domainName: 'test-domain',
    });

    new ocf.aws_codeartifact.Repository(this, 'repository', {
      domain,
      repositoryName: 'repo1',
    });
  }
}

const app = new cdk.App();
const testCase = new CodeartifactStack(app);
new IntegTest(app, 'ocf-integ-test', {
  testCases: [testCase],
});

app.synth();
