import { IntegTest } from '@aws-cdk/integ-tests-alpha';
import { App, Stack, Tags } from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
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

// Example of granting permissions using both new and existing methods
const role = new iam.Role(stack, 'ExampleRole', {
  assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
  description: 'Example role for testing inference profile permissions',
});

// Example 1: Grant access to invoke models only via profile (default behavior)
profileWithName.grantInvoke(role);

// Example 2: Grant access to invoke models directly
profileWithoutName.grantInvoke(role, {
  allowModelsDirectAccess: true,
});

// Example 3: Profile-only access with specific model pattern
profileWithoutRegion.grantInvoke(role, {
  foundationModelArn: 'arn:aws:bedrock:*::foundation-model/anthropic.*',
});

new IntegTest(app, 'Integ', { testCases: [stack], regions: ['us-east-1'] });
