import { ReleasableCommits, awscdk, github, javascript, release } from 'projen';
import { JobPermission } from 'projen/lib/github/workflows-model';
import { NodePackageManager } from 'projen/lib/javascript';

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
  depsUpgradeOptions: { workflowOptions: { schedule: javascript.UpgradeDependenciesSchedule.WEEKLY } },
  githubOptions: {
    projenCredentials: github.GithubCredentials.fromApp(),
    pullRequestLintOptions: {
      semanticTitleOptions: {
        types: ['feat', 'fix', 'chore', 'ci', 'docs', 'style', 'refactor', 'test', 'revert', 'Revert'],
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

const workflow = project.github!.addWorkflow('upgrade-aws-cdk');
workflow.on({
  schedule: [{ cron: '0 0 * * *' }],
  workflowDispatch: {},
});
workflow.addJob('create-pr', {
  permissions: {
    contents: JobPermission.WRITE,
    pullRequests: JobPermission.WRITE,
  },
  runsOn: ['ubuntu-latest'],
  steps: [
    {
      uses: 'actions/checkout@v4',
    },
    {
      name: 'Install dependencies',
      run: 'yarn install',
    },
    {
      name: 'Get latest AWS CDK version',
      run: "echo aws_cdk_version=`curl -s https://api.github.com/repos/aws/aws-cdk/releases/latest  | jq -r .tag_name | sed 's/v//'` >> $GITHUB_ENV",
    },
    {
      name: 'Overwrite the AWS CDK version in .projenrc.ts with the latest',
      run: 'sed -i "s/cdkVersion\\s=\\s\'[0-9|\\.]*\'/cdkVersion = \'${{ env.aws_cdk_version }}\'/" .projenrc.ts',
    },
    {
      name: 'Synth project',
      run: 'yarn projen',
      env: { CI: 'false' },
    },
    {
      name: 'Create Pull Request',
      uses: 'peter-evans/create-pull-request@v6',
      with: {
        'commit-message':
          'chore(deps): upgrade AWS CDK to v${{ env.aws_cdk_version }}',
        'title': 'chore(deps): upgrade AWS CDK to v${{ env.aws_cdk_version }}',
        'body': 'Upgrade project AWS CDK version.',
        'base': 'main',
        'branch': 'github-actions/upgrade-aws-cdk',
        'delete-branch': true,
      },
    },
  ],
});

project.synth();
