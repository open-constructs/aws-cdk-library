import { Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

class MyConstruct extends Construct {
  constructor(scope: Construct, id: string, props: { role?: Role }) {
    super(scope, id);
    const role =
      props.role ??
      new Role(this, 'DefaultRole', {
        assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
      });

    new Function(this, 'Resource', {
      code: Code.fromInline('module.exports.handler = async () => "hello world";'),
      handler: 'main.handler',
      runtime: Runtime.NODEJS_20_X,
      role: role,
    });
  }
}

describe('Lambda Function Role', () => {
  test('Uses provided Role for Lambda Function', () => {
    // GIVEN
    const stack = new Stack();

    // WHEN
    const providedRole = new Role(stack, 'RoleToUse', {
      assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
    });
    const construct = new MyConstruct(stack, 'MyConstruct', {
      role: providedRole,
    });

    // THEN
    const lambdaFunction = construct.node.defaultChild as Function;
    expect(lambdaFunction.role).toEqual(providedRole);
  });

  test('Creates a new role when none provided', () => {
    // GIVEN
    const stack = new Stack();

    // WHEN
    new MyConstruct(stack, 'MyConstruct', {});

    // THEN
    const assert = Template.fromStack(stack);
    assert.hasResourceProperties('AWS::IAM::Role', {
      AssumeRolePolicyDocument: {
        Statement: [
          {
            Action: 'sts:AssumeRole',
            Effect: 'Allow',
            Principal: {
              Service: 'lambda.amazonaws.com',
            },
          },
        ],
        Version: '2012-10-17',
      },
    });
  });
});
