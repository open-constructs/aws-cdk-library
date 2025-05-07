import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { BedrockApplicationInferenceProfile } from '../../src/aws-bedrock';

describe('BedrockApplicationInferenceProfile', () => {
  test('creates a basic inference profile', () => {
    // GIVEN
    const app = new App();
    const stack = new Stack(app, 'TestStack');

    // WHEN
    new BedrockApplicationInferenceProfile(stack, 'TestInferenceProfile', {
      inferenceProfileName: 'TestInferenceProfileName',
      description: 'Test inference profile description',
      modelSource: {
        copyFrom: 'arn:aws:bedrock:us-west-2::foundation-model/anthropic.claude-3-5-sonnet-20240620-v1:0',
      },
    });

    // THEN
    const template = Template.fromStack(stack);
    template.hasResourceProperties('AWS::Bedrock::ApplicationInferenceProfile', {
      InferenceProfileName: 'TestInferenceProfileName',
      Description: 'Test inference profile description',
      ModelSource: {
        CopyFrom: 'arn:aws:bedrock:us-west-2::foundation-model/anthropic.claude-3-5-sonnet-20240620-v1:0',
      },
    });
  });

  test('creates an inference profile with tags', () => {
    // GIVEN
    const app = new App();
    const stack = new Stack(app, 'TestStack');

    // WHEN
    new BedrockApplicationInferenceProfile(stack, 'TestInferenceProfile', {
      inferenceProfileName: 'TestInferenceProfileName',
      modelSource: {
        copyFrom: 'arn:aws:bedrock:us-west-2::foundation-model/anthropic.claude-3-5-sonnet-20240620-v1:0',
      },
      tags: {
        Environment: 'test',
        Project: 'bedrock-testing',
      },
    });

    // THEN
    const template = Template.fromStack(stack);
    template.hasResourceProperties('AWS::Bedrock::ApplicationInferenceProfile', {
      InferenceProfileName: 'TestInferenceProfileName',
      ModelSource: {
        CopyFrom: 'arn:aws:bedrock:us-west-2::foundation-model/anthropic.claude-3-5-sonnet-20240620-v1:0',
      },
      Tags: [
        {
          Key: 'Environment',
          Value: 'test',
        },
        {
          Key: 'Project',
          Value: 'bedrock-testing',
        },
      ],
    });
  });

  test('can import inference profile by ARN', () => {
    // GIVEN
    const app = new App();
    const stack = new Stack(app, 'TestStack');
    const inferenceProfileArn = 'arn:aws:bedrock:us-west-2:123456789012:inference-profile/ip-12345';

    // WHEN
    const importedProfile = BedrockApplicationInferenceProfile.fromInferenceProfileArn(
      stack,
      'ImportedProfile',
      inferenceProfileArn,
    );

    // THEN
    expect(importedProfile.inferenceProfileArn).toEqual(inferenceProfileArn);
    expect(importedProfile.inferenceProfileId).toEqual('ip-12345');
  });

  test('can import inference profile by attributes', () => {
    // GIVEN
    const app = new App();
    const stack = new Stack(app, 'TestStack');
    const inferenceProfileArn = 'arn:aws:bedrock:us-west-2:123456789012:inference-profile/ip-12345';
    const inferenceProfileId = 'ip-12345';

    // WHEN
    const importedProfile = BedrockApplicationInferenceProfile.fromInferenceProfileAttributes(
      stack,
      'ImportedProfile',
      {
        inferenceProfileArn,
        inferenceProfileId,
      },
    );

    // THEN
    expect(importedProfile.inferenceProfileArn).toEqual(inferenceProfileArn);
    expect(importedProfile.inferenceProfileId).toEqual(inferenceProfileId);
  });
});