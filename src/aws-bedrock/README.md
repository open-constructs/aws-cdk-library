# AWS Bedrock Constructs

This module provides CDK constructs for AWS Bedrock service.

## Overview

AWS Bedrock is a fully managed service that offers a choice of high-performing foundation models (FMs) from leading AI companies like AI21 Labs, Anthropic, Cohere, Meta, Stability AI, and Amazon with a single API. These constructs help you easily integrate Bedrock capabilities into your CDK applications.

## Installation

```bash
npm install @open-constructs/aws-cdk
```

## Usage

```typescript
import { App, Stack } from 'aws-cdk-lib';
import { BedrockApplicationInferenceProfile, ModelSource } from '@open-constructs/aws-cdk/aws-bedrock';

const app = new App();
const stack = new Stack(app, 'BedrockStack');

// Create a Bedrock Application Inference Profile
const inferenceProfile = new BedrockApplicationInferenceProfile(stack, 'MyInferenceProfile', {
  inferenceProfileName: 'my-inference-profile',
  description: 'My Bedrock inference profile',
  modelSource: ModelSource.fromFoundationModel('anthropic.claude-3-5-sonnet-20240620-v1:0', 'us-west-2'),
});
```

## Constructs

### ModelSource

The `ModelSource` helper class provides methods to create model sources for inference profiles.

#### Using with Foundation Models

```typescript
import { ModelSource } from '@open-constructs/aws-cdk/aws-bedrock';
import { FoundationModelIdentifier } from 'aws-cdk-lib/aws-bedrock';

// Using a string model ID
const modelSource1 = ModelSource.fromFoundationModel('anthropic.claude-3-5-sonnet-20240620-v1:0', 'us-west-2');

// Using the FoundationModelIdentifier enum
const modelSource2 = ModelSource.fromFoundationModel(FoundationModelIdentifier.ANTHROPIC_CLAUDE_3_5_SONNET_20240620_V1, 'us-west-2');
```

#### Using with Existing Inference Profiles

```typescript
import { ModelSource } from '@open-constructs/aws-cdk/aws-bedrock';

const modelSource = ModelSource.fromInferenceProfile('arn:aws:bedrock:us-west-2:123456789012:inference-profile/ip-12345');
```

### BedrockApplicationInferenceProfile

The `BedrockApplicationInferenceProfile` construct creates an AWS Bedrock Application Inference Profile, which allows you to improve resilience with cross-region inference.

#### Basic Example

```typescript
import { BedrockApplicationInferenceProfile, ModelSource } from '@open-constructs/aws-cdk/aws-bedrock';

const inferenceProfile = new BedrockApplicationInferenceProfile(this, 'MyInferenceProfile', {
  inferenceProfileName: 'my-inference-profile',
  description: 'My Bedrock inference profile',
  modelSource: ModelSource.fromFoundationModel('anthropic.claude-3-5-sonnet-20240620-v1:0', 'us-west-2'),
});
```

#### Advanced Example

```typescript
import { BedrockApplicationInferenceProfile, ModelSource } from '@open-constructs/aws-cdk/aws-bedrock';
import { FoundationModelIdentifier } from 'aws-cdk-lib/aws-bedrock';

const inferenceProfile = new BedrockApplicationInferenceProfile(this, 'MyInferenceProfile', {
  inferenceProfileName: 'my-inference-profile',
  description: 'My Bedrock inference profile',
  modelSource: ModelSource.fromFoundationModel(FoundationModelIdentifier.ANTHROPIC_CLAUDE_3_5_SONNET_20240620_V1, 'us-west-2'),
  tags: {
    Environment: 'Production',
    Project: 'AI-Initiative'
  }
});
```

#### Importing an existing Inference Profile

```typescript
import { BedrockApplicationInferenceProfile } from '@open-constructs/aws-cdk/aws-bedrock';

const existingInferenceProfile = BedrockApplicationInferenceProfile.fromInferenceProfileArn(
  this, 
  'ImportedInferenceProfile',
  'arn:aws:bedrock:us-west-2:123456789012:inference-profile/ip-12345'
);
```

### BedrockAppProfile

The `BedrockAppProfile` construct creates an AWS Bedrock Application Profile, which allows you to organize and manage your Bedrock resources.

#### Basic Example

```typescript
import { BedrockAppProfile, BedrockApplicationInferenceProfile } from '@open-constructs/aws-cdk/aws-bedrock';

// First, create or import inference profiles
const inferenceProfile1 = new BedrockApplicationInferenceProfile(this, 'InferenceProfile1', {
  // ... inference profile properties
});

const inferenceProfile2 = new BedrockApplicationInferenceProfile(this, 'InferenceProfile2', {
  // ... inference profile properties
});

// Create an application profile with the inference profiles
const appProfile = new BedrockAppProfile(this, 'MyAppProfile', {
  appProfileName: 'my-bedrock-app-profile',
  description: 'Application profile for my Bedrock application',
  inferenceProfiles: [inferenceProfile1, inferenceProfile2],
  tags: {
    Environment: 'Development',
    Project: 'AI-Initiative'
  }
});
```

#### Importing an existing Application Profile

```typescript
import { BedrockAppProfile } from '@open-constructs/aws-cdk/aws-bedrock';

const existingAppProfile = BedrockAppProfile.fromAppProfileArn(
  this, 
  'ImportedAppProfile',
  'arn:aws:bedrock:us-west-2:123456789012:application-profile/abcdef12-3456-7890-abcd-ef1234567890'
);
```