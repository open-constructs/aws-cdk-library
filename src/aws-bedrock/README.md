# AWS Bedrock Constructs

This module provides CDK constructs for AWS Bedrock service.

## Overview

AWS Bedrock is a fully managed service that offers a choice of high-performing foundation models (FMs) from leading AI companies like AI21 Labs, Anthropic, Cohere, Meta, Stability AI, and Amazon with a single API. These constructs help you easily integrate Bedrock capabilities into your CDK applications.

## Usage

```typescript
import { App, Stack } from 'aws-cdk-lib';
import { ApplicationInferenceProfile, ModelSource } from '@open-constructs/aws-cdk/aws-bedrock';

const app = new App();
const stack = new Stack(app, 'BedrockStack');

// Create a Bedrock Application Inference Profile
const inferenceProfile = new ApplicationInferenceProfile(stack, 'MyInferenceProfile', {
  inferenceProfileName: 'my-inference-profile',
  description: 'My Bedrock inference profile',
  // If no region is specified, the stack region is automatically used.
  modelSource: ModelSource.fromFoundationModel('anthropic.claude-3-5-sonnet-20240620-v1:0'),
});
```

### ModelSource

The `ModelSource` helper class provides methods to create model sources for inference profiles.

#### Using with Foundation Models

```typescript
import { ModelSource } from '@open-constructs/aws-cdk/aws-bedrock';
import { FoundationModelIdentifier } from 'aws-cdk-lib/aws-bedrock';

// Using a string model ID (using stack's region automatically)
const modelSource1 = ModelSource.fromFoundationModel('anthropic.claude-3-5-sonnet-20240620-v1:0');

// Using a string model ID (with explicit region)
const modelSource2 = ModelSource.fromFoundationModel('anthropic.claude-3-5-sonnet-20240620-v1:0', 'us-west-2');

// Using the FoundationModelIdentifier enum (using stack's region automatically)
const modelSource3 = ModelSource.fromFoundationModel(FoundationModelIdentifier.ANTHROPIC_CLAUDE_3_5_SONNET_20240620_V1_0);

// Using the FoundationModelIdentifier enum (with explicit region)
const modelSource4 = ModelSource.fromFoundationModel(FoundationModelIdentifier.ANTHROPIC_CLAUDE_3_5_SONNET_20240620_V1_0, 'us-west-2');
```

#### Using with Existing Inference Profiles

```typescript
import { ModelSource } from '@open-constructs/aws-cdk/aws-bedrock';

const modelSource = ModelSource.fromInferenceProfile('arn:aws:bedrock:us-west-2:123456789012:inference-profile/ip-12345');
```

### ApplicationInferenceProfile

The `ApplicationInferenceProfile` construct creates an AWS Bedrock Application Inference Profile, which allows you to improve resilience with cross-region inference.

#### Basic Example

```typescript
import { ApplicationInferenceProfile, ModelSource } from '@open-constructs/aws-cdk/aws-bedrock';

const inferenceProfile = new ApplicationInferenceProfile(this, 'MyInferenceProfile', {
  inferenceProfileName: 'my-inference-profile',
  description: 'My Bedrock inference profile',
  modelSource: ModelSource.fromFoundationModel('anthropic.claude-3-5-sonnet-20240620-v1:0'),
});
```

#### Advanced Example

```typescript
import { ApplicationInferenceProfile, ModelSource } from '@open-constructs/aws-cdk/aws-bedrock';
import { FoundationModelIdentifier } from 'aws-cdk-lib/aws-bedrock';

const inferenceProfile = new ApplicationInferenceProfile(this, 'MyInferenceProfile', {
  inferenceProfileName: 'my-inference-profile',
  description: 'My Bedrock inference profile',
  modelSource: ModelSource.fromFoundationModel(FoundationModelIdentifier.ANTHROPIC_CLAUDE_3_5_SONNET_20240620_V1_0),
});

// Tags can be added individually
import { Tags } from 'aws-cdk-lib';
Tags.of(inferenceProfile).add('Environment', 'Production');
Tags.of(inferenceProfile).add('Project', 'AI-Initiative');
```

#### Importing an existing Inference Profile

```typescript
import { ApplicationInferenceProfile } from '@open-constructs/aws-cdk/aws-bedrock';

const existingInferenceProfile = ApplicationInferenceProfile.fromInferenceProfileArn(
  this, 
  'ImportedInferenceProfile',
  'arn:aws:bedrock:us-west-2:123456789012:inference-profile/ip-12345'
);
```

#### Granting permissions to invoke models

The `grantInvoke` method allows you to grant permissions to IAM principals to invoke Bedrock models through an inference profile. You can configure whether to allow direct model access or restrict access to only go through the inference profile.

##### Basic usage - Profile-only access (recommended)

```typescript
import { ApplicationInferenceProfile, ModelSource } from '@open-constructs/aws-cdk/aws-bedrock';
import * as iam from 'aws-cdk-lib/aws-iam';

// Create a role
const role = new iam.Role(this, 'AIServiceRole', {
  assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
});

// Create an inference profile
const inferenceProfile = new ApplicationInferenceProfile(this, 'MyInferenceProfile', {
  inferenceProfileName: 'my-inference-profile',
  description: 'My Bedrock inference profile',
  modelSource: ModelSource.fromFoundationModel('anthropic.claude-3-5-sonnet-20240620-v1:0'),
});

// Grant permissions to invoke models ONLY through the inference profile (default behavior)
inferenceProfile.grantInvoke(role);
// This will automatically add permissions to invoke the foundation model with the condition
// that it must be accessed through this inference profile
```

##### Using IModel for type-safe model specification

```typescript
import { ApplicationInferenceProfile, ModelSource } from '@open-constructs/aws-cdk/aws-bedrock';
import { FoundationModel } from 'aws-cdk-lib/aws-bedrock';
import * as iam from 'aws-cdk-lib/aws-iam';

// Create a FoundationModel construct
const claudeModel = FoundationModel.fromFoundationModelId(
  this,
  'ClaudeModel',
  'anthropic.claude-3-5-sonnet-20240620-v1:0'
);

// Create an inference profile
const inferenceProfile = new ApplicationInferenceProfile(this, 'MyInferenceProfile', {
  inferenceProfileName: 'my-inference-profile',
  modelSource: ModelSource.fromFoundationModel('anthropic.claude-3-5-sonnet-20240620-v1:0'),
});

// Grant permissions with a specific model using FoundationModel
inferenceProfile.grantInvoke(role, {
  foundationModel: claudeModel, // Uses FoundationModel for type safety
});
```

##### Allowing direct model access

```typescript
// Grant permissions with direct model access (not recommended for production)
inferenceProfile.grantInvoke(role, {
  allowModelsDirectAccess: true,
  foundationModel: claudeModel, // Optional: restrict to specific model
});
```

#### Advanced permissions with tag-based access control

You can use tag-based access control (ABAC) with inference profiles for more granular permissions:

```typescript
import { ApplicationInferenceProfile, ModelSource } from '@open-constructs/aws-cdk/aws-bedrock';
import * as iam from 'aws-cdk-lib/aws-iam';

// Create a user-specific inference profile and add tags
const userInferenceProfile = new ApplicationInferenceProfile(this, 'UserInferenceProfile', {
  inferenceProfileName: 'user-inference-profile',
  modelSource: ModelSource.fromFoundationModel('anthropic.claude-3-5-sonnet-20240620-v1:0'),
});

// Tags can be added individually
import { Tags } from 'aws-cdk-lib';
Tags.of(userInferenceProfile).add('UserEmail', 'user@example.com');
Tags.of(userInferenceProfile).add('Department', 'Engineering');

// Create a role for identity federation
const userRole = new iam.Role(this, 'UserRole', {
  assumedBy: new iam.FederatedPrincipal('cognito-identity.amazonaws.com', {}),
});

// Grant permissions with tag conditions matching principal tags to resource tags
userInferenceProfile.grantInvoke(userRole, {
  tagConditions: {
    'UserEmail': '${aws:PrincipalTag/UserEmail}',
    'Department': '${aws:PrincipalTag/Department}'
  }
});
```

This setup ensures users can only access inference profiles that match their identity attributes, following the principle of least privilege and enabling effective cost management.
