import { IntegTest } from '@aws-cdk/integ-tests-alpha';
import { App, Stack, Tags } from 'aws-cdk-lib';
import { BedrockApplicationInferenceProfile } from '../../src/aws-bedrock';

const app = new App();
const stack = new Stack(app, 'IntegBedrockInferenceProfileStack');

const profile = new BedrockApplicationInferenceProfile(stack, 'IntegInferenceProfile', {
  inferenceProfileName: 'IntegTestInferenceProfile',
  description: 'Integration test inference profile',
  modelSource: {
    copyFrom: 'arn:aws:bedrock:us-east-1::foundation-model/anthropic.claude-3-5-sonnet-20240620-v1:0',
  },
});

// タグを個別に追加（新しい仕様）
Tags.of(profile).add('Environment', 'integration');
Tags.of(profile).add('Project', 'bedrock-testing');

new IntegTest(app, 'Integ', { testCases: [stack], regions: ['us-east-1'] });
