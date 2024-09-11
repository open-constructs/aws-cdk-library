import { App, Stack } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { Namespace } from '../../src/aws-redshiftserverless';

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

  // WIP: add more tests
});