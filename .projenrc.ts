import { ReleasableCommits, awscdk, github, javascript, release } from 'projen';
import { ArrowParens, NodePackageManager } from 'projen/lib/javascript';
import { SubPathExports } from './projenrc/sub-path-exports';

const cdkVersion = '2.268.0';
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Open Construct Foundation',
  authorAddress: 'thorsten.hoeger@taimos.de',
  cdkVersion: cdkVersion,
  defaultReleaseBranch: 'main',
  jsiiVersion: '~6.0.0',
  typescriptVersion: '~6.0.0',
  tsconfigDev: { compilerOptions: { types: ['node', 'jest'], rootDir: '.' } },
  jestOptions: { jestConfig: { maxWorkers: 1 } },
  constructsVersion: '10.8.1',
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
        types: ['feat', 'fix', 'chore', 'ci', 'docs', 'style', 'refactor', 'test', 'revert', 'Revert'],
      },
      contributorStatement:
        '_By submitting this pull request, I confirm that my contribution is made under the terms of the Apache-2.0 license_',
    },
  },
  pullRequestTemplateContents: [
    `### Issue # (if applicable)

Closes #<issue number here>.

### Reason for this change

<!--What is the bug or use case behind this change?-->

### Description of changes

<!--What code changes did you make? Have you made any important design decisions?-->

### Description of how you validated changes

<!--Have you added any unit tests and/or integration tests?-->

### Checklist

- [ ] My code adheres to the [CONTRIBUTING GUIDE](https://github.com/open-constructs/aws-cdk-library/blob/main/CONTRIBUTING.md)
- [ ] My pull request adheres to the [Pull Request Rule](https://github.com/open-constructs/aws-cdk-library/blob/main/CONTRIBUTING.md#pull-request)
  - **Do not omit the \`aws-\` part in the scope of the PR title if the PR relates to a specific AWS service module.**
  - e.g.) feat(**aws-s3**): description of the change`,
  ],
  releaseTrigger: release.ReleaseTrigger.continuous(),
  releasableCommits: ReleasableCommits.ofType(['feat', 'fix', 'revert', 'Revert']),
  gitpod: true,
  npmAccess: javascript.NpmAccess.PUBLIC,
  publishToPypi: {
    distName: 'open-constructs-aws-cdk',
    module: 'open_constructs_aws_cdk',
  },
  workflowNodeVersion: '24.x',
  minNodeVersion: '22.0.0',
  // publishToMaven: {
  //   mavenGroupId: 'org.open-constructs',
  //   mavenArtifactId: 'aws-cdk',
  //   javaPackage: 'org.open_constructs.aws_cdk',
  // },
  // publishToNuget: {
  //   packageId: 'OpenConstructs.AwsCdk',
  //   dotNetNamespace: 'OpenConstructs.AwsCdk',
  // },
  devDeps: ['@aws-cdk/integ-runner@2.205.1', `@aws-cdk/integ-tests-alpha@${cdkVersion}-alpha.0`, 'ts-jest@^29.4.12'],
  eslintOptions: {
    dirs: ['src', 'test'],
    prettier: true,
  },
  prettier: true,
  prettierOptions: {
    settings: {
      singleQuote: true,
      printWidth: 120,
      arrowParens: ArrowParens.AVOID,
    },
    ignoreFileOptions: {
      ignorePatterns: ['*.md'],
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

new SubPathExports(project);

// These releases support the jsii 6 / TypeScript 6 compiler family.
project.addDevDeps(
  'ts-jest@^29.4.12',
  'jsii-docgen@^10.12.6',
  '@typescript-eslint/parser@^8.69.0',
  '@typescript-eslint/eslint-plugin@^8.69.0',
);
project.npmignore?.addPatterns('/.plans/', '/cdk.context.json', '/cdk.out*/', '/.env*');

project.synth();
