import { Stack, Tags } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { AccountPrincipal } from 'aws-cdk-lib/aws-iam';
import { Key } from 'aws-cdk-lib/aws-kms';
import { Domain } from '../../src/aws-codeartifact';

let stack: Stack;

beforeEach(() => {
  stack = testStack();
});

test('Domain: Instantiation works and defaults are adhered to', () => {
  // WHEN
  const domain = new Domain(stack, 'domain', {
    domainName: 'dummy',
  });
  Tags.of(domain).add('tag1', 'value1');

  Template.fromStack(stack).hasResource('AWS::CodeArtifact::Domain', {
    Properties: {
      DomainName: 'dummy',
      EncryptionKey: {
        'Fn::GetAtt': ['domainKey3A7D694C', 'Arn'],
      },
      PermissionsPolicyDocument: Match.absent(),
      Tags: [{ Key: 'tag1', Value: 'value1' }],
    },
  });
});

test('Domain: Can use provided key', () => {
  // WHEN
  const key = new Key(stack, 'key');
  const domain = new Domain(stack, 'domain', {
    domainName: 'dummy',
    encryptionKey: key,
  });
  Tags.of(domain).add('tag1', 'value1');

  Template.fromStack(stack).hasResource('AWS::CodeArtifact::Domain', {
    Properties: {
      DomainName: 'dummy',
      EncryptionKey: {
        'Fn::GetAtt': ['keyFEDD6EC0', 'Arn'],
      },
      PermissionsPolicyDocument: Match.absent(),
      Tags: [{ Key: 'tag1', Value: 'value1' }],
    },
  });
});

test('Domain: Can import Domain', () => {
  // WHEN
  const domain = Domain.fromDomainArn(stack, 'domain', 'arn:aws:codeartifact:us-east-1:12345:domain/dummy');

  expect(domain.domainArn).toEqual('arn:aws:codeartifact:us-east-1:12345:domain/dummy');
  expect(domain.domainName).toEqual('dummy');
  expect(domain.encryptionKey).toBeUndefined();
  expect(domain.domainOwner).toEqual('12345');
});

test('Domain: can grant access', () => {
  // GIVEN
  const domain = new Domain(stack, 'domain', {
    domainName: 'dummy',
  });
  const principal = new AccountPrincipal('123456789012');
  // WHEN
  domain.grantContribute(principal);

  Template.fromStack(stack).hasResource('AWS::CodeArtifact::Domain', {
    Properties: {
      DomainName: 'dummy',
      EncryptionKey: {
        'Fn::GetAtt': ['domainKey3A7D694C', 'Arn'],
      },
      PermissionsPolicyDocument: {
        Statement: [
          {
            Action: [
              'codeartifact:CreateRepository',
              'codeartifact:DescribeDomain',
              'codeartifact:GetAuthorizationToken',
              'codeartifact:GetDomainPermissionsPolicy',
              'codeartifact:ListRepositoriesInDomain',
              'sts:GetServiceBearerToken',
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
