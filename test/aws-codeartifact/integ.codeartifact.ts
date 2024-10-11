import { IntegTest } from '@aws-cdk/integ-tests-alpha';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ocf from '../../src';

class CodeArtifactStack extends cdk.Stack {
  constructor(scope: Construct) {
    super(scope, 'CodeArtifactDomainAndRepository');

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
const testCase = new CodeArtifactStack(app);
new IntegTest(app, 'CodeArtifactDomainAndRepositoryInteg', {
  testCases: [testCase],
});

app.synth();
