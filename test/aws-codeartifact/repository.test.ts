import { Stack, Tags } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { AccountPrincipal } from 'aws-cdk-lib/aws-iam';
import { Domain, Repository } from '../../src/aws-codeartifact';

let stack: Stack;
let domain: Domain;

beforeEach(() => {
  stack = testStack();
  domain = new Domain(stack, 'domain', { domainName: 'dummy-domain' });
});

test('repository: Instantiation works and defaults are adhered to', () => {
  // WHEN

  const repository = new Repository(stack, 'repository', {
    repositoryName: 'dummy-repo',
    domain: domain,
  });
  Tags.of(repository).add('tag1', 'value1');

  Template.fromStack(stack).hasResource('AWS::CodeArtifact::Repository', {
    Properties: {
      RepositoryName: 'dummy-repo',
      DomainName: { 'Fn::GetAtt': ['domainFBFFA2F6', 'Name'] },
      DomainOwner: { 'Fn::GetAtt': ['domainFBFFA2F6', 'Owner'] },
      PermissionsPolicyDocument: Match.absent(),
      Tags: [{ Key: 'tag1', Value: 'value1' }],
    },
  });
});

test('repository: can grant access', () => {
  // GIVEN
  const repository = new Repository(stack, 'repository', {
    repositoryName: 'dummy-repo',
    domain,
  });
  const principal = new AccountPrincipal('123456789012');
  // WHEN
  repository.grantRead(principal);

  Template.fromStack(stack).hasResource('AWS::CodeArtifact::Repository', {
    Properties: {
      RepositoryName: 'dummy-repo',
      PermissionsPolicyDocument: {
        Statement: [
          {
            Action: [
              'codeartifact:DescribePackageVersion',
              'codeartifact:DescribeRepository',
              'codeartifact:GetPackageVersionReadme',
              'codeartifact:GetRepositoryEndpoint',
              'codeartifact:ListPackageVersionAssets',
              'codeartifact:ListPackageVersionDependencies',
              'codeartifact:ListPackageVersions',
              'codeartifact:ListPackages',
              'codeartifact:ReadFromRepository',
            ],
            Effect: 'Allow',
            Principal: {
              AWS: {
                'Fn::Join': ['', ['arn:', { Ref: 'AWS::Partition' }, ':iam::123456789012:root']],
              },
            },
            Resource: '*',
          },
        ],
        Version: '2012-10-17',
      },
      Tags: Match.absent(),
    },
  });
});

function testStack() {
  const newTestStack = new Stack(undefined, undefined, { env: { account: '12345', region: 'us-test-1' } });
  newTestStack.node.setContext('availability-zones:12345:us-test-1', ['us-test-1a', 'us-test-1b']);
  return newTestStack;
}
