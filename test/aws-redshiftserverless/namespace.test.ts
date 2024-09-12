import { App, SecretValue, Stack } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { LogExport, Namespace } from '../../src/aws-redshiftserverless';
import { Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { Key } from 'aws-cdk-lib/aws-kms';

describe('Redshift Serverless Namespace', () => {
  let app: App;
  let stack: Stack;

  beforeEach(() => {
    app = new App();
    stack = new Stack(app, 'TestStack');
  });

  test('Create namsepace with minimal properties ', () => {
    new Namespace(stack, 'Namespace', {});

    Template.fromStack(stack).hasResourceProperties('AWS::RedshiftServerless::Namespace', {
      NamespaceName: Match.anyValue(),
    });
  });

  test('Create namsepace with max properties ', () => {
    const defaultIamRole = new Role(stack, 'DefaultRole', {
      assumedBy: new ServicePrincipal('redshift.amazonaws.com'),
    });

    const anotherRole = new Role(stack, 'AnotherRole', {
      assumedBy: new ServicePrincipal('redshift.amazonaws.com'),
    });

    const kmsKey = new Key(stack, 'CMK');

    new Namespace(stack, 'Namespace', {
      adminUsername: 'my-admin',
      adminUserPassword: SecretValue.unsafePlainText('My-password-123!'),
      dbName: 'my-database',
      defaultIamRole,
      finalSnapshotName: 'my-final-snapshot',
      finalSnapshotRetentionPeriod: 7,
      iamRoles: [defaultIamRole, anotherRole],
      logExports: [LogExport.USER_LOG, LogExport.CONNECTION_LOG, LogExport.USER_ACTIVITY_LOG],
      kmsKey,
      namespaceName: 'my-namespace',
    });

    Template.fromStack(stack).hasResourceProperties('AWS::RedshiftServerless::Namespace', {
      AdminUsername: 'my-admin',
      AdminUserPassword: 'My-password-123!',
      DbName: 'my-database',
      DefaultIamRoleArn: stack.resolve(defaultIamRole.roleArn),
      FinalSnapshotName: 'my-final-snapshot',
      FinalSnapshotRetentionPeriod: 7,
      IamRoles: [stack.resolve(defaultIamRole.roleArn), stack.resolve(anotherRole.roleArn)],
      KmsKeyId: stack.resolve(kmsKey.keyId),
      LogExports: ['userlog', 'connectionlog', 'useractivitylog'],
      NamespaceName: 'my-namespace',
    });
  });

  describe('test import method', () => {
    test('import from namespaceId', () => {
      const existingNamespace = Namespace.fromNamespaceAttributes(stack, 'ImportedNamespace', {
        namespaceId: 'my-namespace-id',
        namespaceName: 'my-namespace-name'
      });

      expect(existingNamespace.namespaceId).toEqual('my-namespace-id');
      expect(existingNamespace.namespaceArn).toEqual(Stack.of(stack).formatArn({
        resource: 'redshift-serverless',
        service: 'namespace',
        resourceName: 'my-namespace-id',
      }));
    });

  })

  describe('validateAdmin test', () => {
    test('throws when adminUsername is set without adminUserPassword', () => {
      expect(() => {
        new Namespace(stack, 'Namespace', {
          adminUsername: 'my-admin'
        });
      }).toThrow('You must specify both `adminUsername` and `adminUserPassword`, or neither.');
    });

    test('throws when adminUserPassword is set without adminUsername', () => {
      expect(() => {
        new Namespace(stack, 'Namespace', {
          adminUserPassword: SecretValue.unsafePlainText('My-password-123!'),
        });
      }).toThrow('You must specify both `adminUsername` and `adminUserPassword`, or neither.');
    });

    test.each(['123abc', 'invalid$name'])('throws when adminUsername is invalid, got %s', (adminUsername) => {
      expect(() => {
        new Namespace(stack, 'Namespace', {
          adminUsername,
          adminUserPassword: SecretValue.unsafePlainText('My-password-123!'),
        });
      }).toThrow(`\`adminUsername\` must start with a letter and can only contain letters, numbers, and the special characters: _, +, ., @, -, got: ${adminUsername}.`);
    });
  })

  describe('validateDbName test', () => {
    test.each(['123abc', 'invalid$name'])('throws when dbName is invalid, got %s', (dbName) => {
      expect(() => {
        new Namespace(stack, 'Namespace', {
          dbName,
        });
      }).toThrow(`\`dbName\` must start with a letter, can only contain letters, numbers, and the special characters: _, +, ., @, -, and must not exceed 127 characters, got: ${dbName}.`);
    });
  })

  describe('validateFinalSnapshot test', () => {
    test.each(['123abc', 'UpperName', 'invalid$name', 'end-with-a-hyphen-', 'two--consecutive-hyphens', 'a'.repeat(256)])('throws when finalSnapshotName is invalid, got %s', (finalSnapshotName) => {
      expect(() => {
        new Namespace(stack, 'Namespace', {
          finalSnapshotName,
        });
      }).toThrow(`\`finalSnapshotName\` must be between 1 and 255, consist only of lowercase alphanumeric characters or hyphens, with the first character as a letter, and it can't end with a hyphen or contain two consecutive hyphens, got: ${finalSnapshotName}.`);
    });

    test('throws when finalSnapshotRetentionPeriod is set without finalSnapshotName', () => {
      expect(() => {
        new Namespace(stack, 'Namespace', {
          finalSnapshotRetentionPeriod: 10,
        });
      }).toThrow('You must set \`finalSnapshotName`\ when you specify \`finalSnapshotRetentionPeriod\`.');
    });

    test.each([0, 3654])('throws when finalSnapshotRetentionPeriod is invalid, got %d', (finalSnapshotRetentionPeriod) => {
      expect(() => {
        new Namespace(stack, 'Namespace', {
          finalSnapshotName: 'my-final-snapshot',
          finalSnapshotRetentionPeriod,
        });
      }).toThrow(`\`finalSnapshotRetentionPeriod\` must be between 1 and 3653, got: ${finalSnapshotRetentionPeriod}.`);
    });
  })

  describe('validateDefaultIamRole test', () => {
    test('throws when defaultIamRole role is not included in iamRoles', () => {
      expect(() => {
        const defaultIamRole = new Role(stack, 'DefaultRole', {
          assumedBy: new ServicePrincipal('redshift.amazonaws.com'),
        });

        const anotherRole = new Role(stack, 'AnotherRole', {
          assumedBy: new ServicePrincipal('redshift.amazonaws.com'),
        });

        new Namespace(stack, 'Namespace', {
          defaultIamRole,
          iamRoles: [anotherRole],
        });
      }).toThrow('\`defaultIamRole\` must be included in \`iamRoles\`.');
    });
  })

  describe('validateNamespaceName test', () => {
    test.each(['UpperName', 'invalid$name', 'a'.repeat(2), 'a'.repeat(65)])('throws when namespaceName is invalid, got %s', (namespaceName) => {
      expect(() => {
        new Namespace(stack, 'Namespace', {
          namespaceName,
        });
      }).toThrow(`\`namespaceName\` must be between 3 and 64 characters, consist only of lowercase alphanumeric characters or hyphens, got: ${namespaceName}.`);
    });
  })
});