import { Stack, Tags } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { AccountPrincipal } from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import { Domain, Repository } from '../../src/aws-codeartifact';

let stack: Stack;
let domain: Domain;

beforeEach(() => {
  stack = testStack();
  domain = new Domain(stack, 'domain', { domainName: 'dummy-domain' });
});

describe('Repository.fromRepositoryArn', () => {
  let scope: Construct;

  beforeEach(() => {
    scope = new Construct(stack, 'Scope');
  });

  it('should create a repository from a valid ARN', () => {
    const validArn = 'arn:aws:codeartifact:us-west-2:123456789012:repository/my-domain/my-repo';
    expect(() => {
      Repository.fromRepositoryArn(scope, 'ValidRepo', validArn);
    }).not.toThrow();
  });

  it('should throw an error for an ARN with incorrect resource type', () => {
    const invalidArn = 'arn:aws:codeartifact:us-west-2:123456789012:not-a-repository/my-domain/my-repo';
    expect(() => {
      Repository.fromRepositoryArn(scope, 'InvalidRepo', invalidArn);
    }).toThrow('Expected a repository ARN, but got');
  });

  it('should throw an error for an ARN without an account', () => {
    const invalidArn = 'arn:aws:codeartifact:us-west-2::repository/my-domain/my-repo';
    expect(() => {
      Repository.fromRepositoryArn(scope, 'InvalidRepo', invalidArn);
    }).toThrow('Expected a repository ARN, but got');
  });

  it('should throw an error for an ARN without a resource name', () => {
    const invalidArn = 'arn:aws:codeartifact:us-west-2:123456789012:repository';
    expect(() => {
      Repository.fromRepositoryArn(scope, 'InvalidRepo', invalidArn);
    }).toThrow('Expected a repository ARN, but got');
  });

  it('should throw an error for an ARN with incorrect resource name format', () => {
    const invalidArn = 'arn:aws:codeartifact:us-west-2:123456789012:repository/my-repo';
    expect(() => {
      Repository.fromRepositoryArn(scope, 'InvalidRepo', invalidArn);
    }).toThrow('Expected a repository ARN with a domain and repository name');
  });

  it('should throw an error for an ARN with too many parts in the resource name', () => {
    const invalidArn = 'arn:aws:codeartifact:us-west-2:123456789012:repository/my-domain/my-repo/extra-part';
    expect(() => {
      Repository.fromRepositoryArn(scope, 'InvalidRepo', invalidArn);
    }).toThrow('Expected a repository ARN with a domain and repository name');
  });
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
      DomainName: { 'Fn::GetAtt': ['domainFBFFA2F6', 'Name'] },
      DomainOwner: { 'Fn::GetAtt': ['domainFBFFA2F6', 'Owner'] },
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
