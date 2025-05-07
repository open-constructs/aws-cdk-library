import { IntegTest } from '@aws-cdk/integ-tests-alpha';
import { App, Stack, Tags } from 'aws-cdk-lib';
import { BedrockApplicationInferenceProfile } from '../../src/aws-bedrock';

const app = new App();
const stack = new Stack(app, 'IntegBedrockInferenceProfileStack');

// Example with explicit name
const profileWithName = new BedrockApplicationInferenceProfile(stack, 'IntegInferenceProfile', {
  inferenceProfileName: 'IntegTestInferenceProfile',
  description: 'Integration test inference profile with explicit name',
  modelSource: {
    copyFrom: 'arn:aws:bedrock:us-east-1::foundation-model/anthropic.claude-3-5-sonnet-20240620-v1:0',
  },
});

// Add tags individually
Tags.of(profileWithName).add('Environment', 'integration');
Tags.of(profileWithName).add('Project', 'bedrock-testing');

// Example without explicit name - CloudFormation will generate a name
const profileWithoutName = new BedrockApplicationInferenceProfile(stack, 'IntegInferenceProfileNoName', {
  description: 'Integration test inference profile without explicit name',
  modelSource: {
    copyFrom: 'arn:aws:bedrock:us-east-1::foundation-model/anthropic.claude-3-5-sonnet-20240620-v1:0',
  },
});

Tags.of(profileWithoutName).add('GeneratedName', 'true');

new IntegTest(app, 'Integ', { testCases: [stack], regions: ['us-east-1'] });
