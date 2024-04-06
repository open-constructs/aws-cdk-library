import { awscdk, github, javascript, release } from 'projen';

let cdkVersion = '2.120.0';
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Open Construct Foundation',
  authorAddress: 'thorsten.hoeger@taimos.de',
  cdkVersion: cdkVersion,
  defaultReleaseBranch: 'main',
  jsiiVersion: '~5.3.0',
  name: '@open-constructs/aws-cdk',
  projenrcTs: true,
  repositoryUrl: 'https://github.com/open-constructs/aws-cdk-library.git',
  licensed: true,
  license: 'Apache-2.0',
  experimentalIntegRunner: false, // we're using the AWS CDK-provided runner
  // autoApproveUpgrades: true,
  // autoApproveOptions: { allowedUsernames: ['hoegertn'] },
  depsUpgradeOptions: { workflowOptions: { schedule: javascript.UpgradeDependenciesSchedule.WEEKLY } },
  githubOptions: {
    projenCredentials: github.GithubCredentials.fromApp(),
  },
  releaseTrigger: release.ReleaseTrigger.manual(),
  gitpod: true,
  publishToPypi: {
    distName: 'open-constructs-aws-cdk',
    module: 'open_constructs_aws_cdk',
  },
  // publishToMaven: {
  //   mavenGroupId: 'org.open-constructs',
  //   mavenArtifactId: 'aws-cdk',
  //   javaPackage: 'org.open_constructs.aws_cdk',
  // },
  // publishToNuget: {
  //   packageId: 'OpenConstructs.AwsCdk',
  //   dotNetNamespace: 'OpenConstructs.AwsCdk',
  // },
  devDeps: [
    `@aws-cdk/integ-runner@${cdkVersion}-alpha.0`,
    `@aws-cdk/integ-tests-alpha@${cdkVersion}-alpha.0`,
  ],
});

project.addTask('integ', {
  exec: 'integ-runner',
  description: 'Run integration tests',
  receiveArgs: true,
});

project.addTask('integ:update', {
  exec: 'integ-runner --update-on-failed',
  description: 'Run integration tests and update on any failed tests',
  receiveArgs: true,
});

project.synth();
