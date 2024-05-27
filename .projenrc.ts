import { ReleasableCommits, awscdk, github, javascript, release } from 'projen';
import { ArrowParens, NodePackageManager } from 'projen/lib/javascript';

let cdkVersion = '2.120.0';
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Open Construct Foundation',
  authorAddress: 'thorsten.hoeger@taimos.de',
  cdkVersion: cdkVersion,
  defaultReleaseBranch: 'main',
  jsiiVersion: '~5.3.0',
  constructsVersion: '10.3.0',
  name: '@open-constructs/aws-cdk',
  projenrcTs: true,
  repositoryUrl: 'https://github.com/open-constructs/aws-cdk-library.git',
  licensed: true,
  license: 'Apache-2.0',
  packageManager: NodePackageManager.NPM,
  experimentalIntegRunner: false, // we're using the AWS CDK-provided runner
  // autoApproveUpgrades: true,
  // autoApproveOptions: { allowedUsernames: ['hoegertn'] },
  depsUpgradeOptions: {
    workflowOptions: {
      schedule: javascript.UpgradeDependenciesSchedule.WEEKLY,
    },
  },
  githubOptions: {
    projenCredentials: github.GithubCredentials.fromApp(),
    pullRequestLintOptions: {
      semanticTitleOptions: {
        types: [
          'feat',
          'fix',
          'chore',
          'ci',
          'docs',
          'style',
          'refactor',
          'test',
          'revert',
          'Revert',
        ],
      },
    },
  },
  releaseTrigger: release.ReleaseTrigger.continuous(),
  releasableCommits: ReleasableCommits.ofType(['feat', 'fix', 'revert', 'Revert']),
  gitpod: true,
  npmAccess: javascript.NpmAccess.PUBLIC,
  publishToPypi: {
    distName: 'open-constructs-aws-cdk',
    module: 'open_constructs_aws_cdk',
  },
  workflowNodeVersion: '18.x',
  minNodeVersion: '18.0.0',
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
  eslintOptions: {
    dirs: ['src', 'test'],
    prettier: true,
  },
  prettier: true,
  prettierOptions: {
    settings: {
      singleQuote: true,
      printWidth: 100,
      arrowParens: ArrowParens.AVOID,
    },
  },
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
