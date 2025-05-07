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
