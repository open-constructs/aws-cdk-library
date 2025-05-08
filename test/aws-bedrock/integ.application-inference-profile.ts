import { IntegTest } from '@aws-cdk/integ-tests-alpha';
import { App, Stack, Tags } from 'aws-cdk-lib';
import { ApplicationInferenceProfile } from '../../src/aws-bedrock';
import { ModelSource } from '../../src/aws-bedrock/model-source';

const app = new App();
const stack = new Stack(app, 'IntegBedrockInferenceProfileStack');

// Example with explicit name and region
const profileWithName = new ApplicationInferenceProfile(stack, 'IntegInferenceProfile', {
  inferenceProfileName: 'IntegTestInferenceProfile',
  description: 'Integration test inference profile with explicit name',
  modelSource: ModelSource.fromFoundationModel('anthropic.claude-3-5-sonnet-20240620-v1:0', 'us-east-1'),
});

// Add tags individually
Tags.of(profileWithName).add('Environment', 'integration');
Tags.of(profileWithName).add('Project', 'bedrock-testing');

// Example without explicit name - CloudFormation will generate a name
const profileWithoutName = new ApplicationInferenceProfile(stack, 'IntegInferenceProfileNoName', {
  description: 'Integration test inference profile without explicit name',
  modelSource: ModelSource.fromFoundationModel('anthropic.claude-3-5-sonnet-20240620-v1:0', 'us-east-1'),
});

// Example without specifying region - will use the stack's region
const profileWithoutRegion = new ApplicationInferenceProfile(stack, 'IntegInferenceProfileNoRegion', {
  inferenceProfileName: 'IntegTestInferenceProfileNoRegion',
  description: 'Integration test inference profile without specifying region',
  modelSource: ModelSource.fromFoundationModel('anthropic.claude-3-5-sonnet-20240620-v1:0'),
});

Tags.of(profileWithoutRegion).add('AutoRegion', 'true');

Tags.of(profileWithoutName).add('GeneratedName', 'true');

new IntegTest(app, 'Integ', { testCases: [stack], regions: ['us-east-1'] });
