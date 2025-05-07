import { App, Stack } from 'aws-cdk-lib';
import { BedrockApplicationInferenceProfile } from '../../src/aws-bedrock';

const app = new App();
const stack = new Stack(app, 'IntegBedrockInferenceProfileStack');

new BedrockApplicationInferenceProfile(stack, 'IntegInferenceProfile', {
  inferenceProfileName: 'IntegTestInferenceProfile',
  description: 'Integration test inference profile',
  modelSource: {
    copyFrom: 'arn:aws:bedrock:us-west-2::foundation-model/anthropic.claude-3-5-sonnet-20240620-v1:0',
  },
  tags: {
    Environment: 'integration',
    Project: 'bedrock-testing',
  },
});

app.synth();
