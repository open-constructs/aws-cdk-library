import { IntegTest } from '@aws-cdk/integ-tests-alpha';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ocf from '../../src';

class ImportDefaultUserStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const importedDefaultUser = ocf.aws_elasticache.NoPasswordRequiredUser.fromUserAttributes(
      this,
      'ImportedDefaultUser',
      {
        userId: 'default',
        userName: 'default',
      },
    );

    new ocf.aws_elasticache.UserGroup(this, 'UserGroupForImportDefaultUser', {
      userGroupId: 'user-group-for-default-user',
      users: [importedDefaultUser],
    });
  }
}

const app = new cdk.App();

const testCase = new ImportDefaultUserStack(app, 'ImportDefaultUserStack');

new IntegTest(app, 'ImportDefaultUserTest', {
  testCases: [testCase],
});
