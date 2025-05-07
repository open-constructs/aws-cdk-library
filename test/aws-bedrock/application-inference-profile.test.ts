import * as cdk from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import * as iam from 'aws-cdk-lib/aws-iam';
import { BedrockApplicationInferenceProfile } from '../../src/aws-bedrock';
import { ModelSource } from '../../src/aws-bedrock/model-source';

describe('BedrockApplicationInferenceProfile', () => {
  let app: cdk.App;
  let stack: cdk.Stack;

  beforeEach(() => {
    app = new cdk.App();
    stack = new cdk.Stack(app, 'TestStack');
  });

  test('creates inference profile with model source', () => {
    // GIVEN
    const modelId = 'anthropic.claude-3-5-sonnet-20240620-v1:0';
    const modelSource = ModelSource.fromFoundationModel(modelId, 'us-west-2');

    // WHEN
    new BedrockApplicationInferenceProfile(stack, 'TestProfile', {
      inferenceProfileName: 'test-profile',
      description: 'Test inference profile',
      modelSource,
    });

    // THEN
    const template = Template.fromStack(stack);
    template.hasResourceProperties('AWS::Bedrock::ApplicationInferenceProfile', {
      InferenceProfileName: 'test-profile',
      Description: 'Test inference profile',
      ModelSource: {
        CopyFrom: `arn:aws:bedrock:us-west-2::foundation-model/${modelId}`,
      },
    });
  });

  test('grantInvokeViaProfileOnly grants correct permissions', () => {
    // GIVEN
    const modelId = 'anthropic.claude-3-5-sonnet-20240620-v1:0';
    const modelSource = ModelSource.fromFoundationModel(modelId, 'us-west-2');

    const profile = new BedrockApplicationInferenceProfile(stack, 'TestProfile', {
      inferenceProfileName: 'test-profile',
      description: 'Test inference profile',
      modelSource,
    });

    const role = new iam.Role(stack, 'TestRole', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
    });

    // WHEN
    profile.grantInvokeViaProfileOnly(role);

    // THEN
    const template = Template.fromStack(stack);

    // IAMポリシーが生成されていることを確認
    template.resourceCountIs('AWS::IAM::Policy', 1);

    // 生成されたIAMポリシーのチェック
    template.hasResourceProperties('AWS::IAM::Policy', {
      PolicyDocument: {
        Statement: Match.arrayWith([
          // 推論プロファイル自体へのInvokeModel権限
          Match.objectLike({
            Action: Match.anyValue(), // 'bedrock:InvokeModel*' または ['bedrock:InvokeModel*']
            Effect: 'Allow',
            Resource: {
              'Fn::GetAtt': Match.arrayWith([Match.stringLikeRegexp('TestProfile'), 'InferenceProfileArn']),
            },
          }),
          // 基盤モデルへの条件付きInvokeModel権限
          Match.objectLike({
            Action: Match.anyValue(), // 'bedrock:InvokeModel*' または ['bedrock:InvokeModel*']
            Effect: 'Allow',
            Resource: 'arn:aws:bedrock:*::foundation-model/*',
            Condition: {
              ArnEquals: {
                'bedrock:InferenceProfileArn': {
                  'Fn::GetAtt': Match.arrayWith([Match.stringLikeRegexp('TestProfile'), 'InferenceProfileArn']),
                },
              },
            },
          }),
        ]),
      },
    });
  });

  test('grantInvokeViaProfileOnly with tag conditions', () => {
    // GIVEN
    const modelId = 'anthropic.claude-3-5-sonnet-20240620-v1:0';
    const modelSource = ModelSource.fromFoundationModel(modelId, 'us-west-2');

    const profile = new BedrockApplicationInferenceProfile(stack, 'TestProfile', {
      inferenceProfileName: 'test-profile',
      description: 'Test inference profile',
      modelSource,
    });
    cdk.Tags.of(profile).add('UserEmail', 'user@example.com');

    const role = new iam.Role(stack, 'TestRole', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
    });

    // WHEN - タグ条件を含むgrant
    profile.grantInvokeViaProfileOnly(role, {
      tagConditions: {
        UserEmail: '${aws:PrincipalTag/UserEmail}',
      },
    });

    // THEN
    const template = Template.fromStack(stack);

    // IAMポリシーが生成されていることを確認
    template.resourceCountIs('AWS::IAM::Policy', 1);

    // 生成されたIAMポリシーのチェック - タグ条件を含む
    template.hasResourceProperties('AWS::IAM::Policy', {
      PolicyDocument: {
        Statement: Match.arrayWith([
          // 基盤モデルへの条件付きInvokeModel権限 (タグ条件付き)
          Match.objectLike({
            Action: Match.anyValue(), // 'bedrock:InvokeModel*' または ['bedrock:InvokeModel*']
            Effect: 'Allow',
            Resource: 'arn:aws:bedrock:*::foundation-model/*',
            Condition: Match.objectLike({
              ArnEquals: {
                'bedrock:InferenceProfileArn': {
                  'Fn::GetAtt': Match.arrayWith([Match.stringLikeRegexp('TestProfile'), 'InferenceProfileArn']),
                },
              },
              StringLike: {
                'aws:ResourceTag/UserEmail': '${aws:PrincipalTag/UserEmail}',
              },
            }),
          }),
        ]),
      },
    });
  });
});
