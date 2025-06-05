import * as cdk from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import * as bedrock from 'aws-cdk-lib/aws-bedrock';
import * as iam from 'aws-cdk-lib/aws-iam';
import { ApplicationInferenceProfile } from '../../src/aws-bedrock';
import { ModelSource } from '../../src/aws-bedrock/model-source';

describe('ApplicationInferenceProfile', () => {
  let app: cdk.App;
  let stack: cdk.Stack;

  beforeEach(() => {
    app = new cdk.App();
    stack = new cdk.Stack(app, 'TestStack');
  });

  test('creates inference profile with model source, explicit name, and region', () => {
    // GIVEN
    const modelId = 'anthropic.claude-3-5-sonnet-20240620-v1:0';
    const modelSource = ModelSource.fromFoundationModel(modelId, 'us-west-2');

    // WHEN
    new ApplicationInferenceProfile(stack, 'TestProfile', {
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

  test('creates inference profile without explicit name but with region', () => {
    // GIVEN
    const modelId = 'anthropic.claude-3-5-sonnet-20240620-v1:0';
    const modelSource = ModelSource.fromFoundationModel(modelId, 'us-west-2');

    // WHEN
    new ApplicationInferenceProfile(stack, 'TestProfileWithoutName', {
      description: 'Test inference profile without explicit name',
      modelSource,
    });

    // THEN
    const template = Template.fromStack(stack);
    template.hasResourceProperties('AWS::Bedrock::ApplicationInferenceProfile', {
      Description: 'Test inference profile without explicit name',
      ModelSource: {
        CopyFrom: `arn:aws:bedrock:us-west-2::foundation-model/${modelId}`,
      },
    });
  });

  test('creates inference profile with model source and without region', () => {
    // GIVEN
    const modelId = 'anthropic.claude-3-5-sonnet-20240620-v1:0';
    const modelSource = ModelSource.fromFoundationModel(modelId); // No region specified

    // WHEN
    new ApplicationInferenceProfile(stack, 'TestProfileWithoutRegion', {
      inferenceProfileName: 'test-profile-no-region',
      description: 'Test inference profile without region specified',
      modelSource,
    });

    // THEN
    const template = Template.fromStack(stack);
    template.hasResourceProperties('AWS::Bedrock::ApplicationInferenceProfile', {
      InferenceProfileName: 'test-profile-no-region',
      Description: 'Test inference profile without region specified',
      ModelSource: {
        CopyFrom: {
          'Fn::Join': [
            '',
            [
              'arn:aws:bedrock:',
              { Ref: 'AWS::Region' },
              '::foundation-model/anthropic.claude-3-5-sonnet-20240620-v1:0',
            ],
          ],
        },
      },
    });
  });

  describe('grantInvoke', () => {
    test('defaults to profile-only access', () => {
      // GIVEN
      const modelId = 'anthropic.claude-3-5-sonnet-20240620-v1:0';
      const modelSource = ModelSource.fromFoundationModel(modelId, 'us-west-2');

      const profile = new ApplicationInferenceProfile(stack, 'TestProfile', {
        inferenceProfileName: 'test-profile',
        description: 'Test inference profile',
        modelSource,
      });

      const role = new iam.Role(stack, 'TestRole', {
        assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      });

      // WHEN
      profile.grantInvoke(role); // Default behavior (no direct access)

      // THEN
      const template = Template.fromStack(stack);

      // Verify that IAM policy is generated
      template.resourceCountIs('AWS::IAM::Policy', 1);

      // Check the generated IAM policy
      template.hasResourceProperties('AWS::IAM::Policy', {
        PolicyDocument: {
          Statement: Match.arrayWith([
            // InvokeModel permission to the inference profile itself
            Match.objectLike({
              Action: [
                'bedrock:InvokeModel',
                'bedrock:InvokeModelWithResponseStream',
                'bedrock:Converse',
                'bedrock:ConverseStream',
              ],
              Effect: 'Allow',
              Resource: {
                'Fn::GetAtt': Match.arrayWith([Match.stringLikeRegexp('TestProfile'), 'InferenceProfileArn']),
              },
            }),
            // Conditional InvokeModel permission to foundation models
            Match.objectLike({
              Action: [
                'bedrock:InvokeModel',
                'bedrock:InvokeModelWithResponseStream',
                'bedrock:Converse',
                'bedrock:ConverseStream',
              ],
              Effect: 'Allow',
              Resource: Match.objectLike({
                'Fn::Join': ['', ['arn:', { Ref: 'AWS::Partition' }, ':bedrock:*::foundation-model/*']],
              }),
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

    test('with default options grants profile-only permissions', () => {
      // GIVEN
      const modelId = 'anthropic.claude-3-5-sonnet-20240620-v1:0';
      const modelSource = ModelSource.fromFoundationModel(modelId, 'us-west-2');

      const profile = new ApplicationInferenceProfile(stack, 'TestProfile', {
        inferenceProfileName: 'test-profile',
        description: 'Test inference profile',
        modelSource,
      });

      const role = new iam.Role(stack, 'TestRole', {
        assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      });

      // WHEN - explicit allowModelsDirectAccess: false is equivalent to grantInvokeViaProfileOnly
      profile.grantInvoke(role, { allowModelsDirectAccess: false });

      // THEN
      const template = Template.fromStack(stack);

      // Verify that IAM policy is generated
      template.resourceCountIs('AWS::IAM::Policy', 1);

      // Check the generated IAM policy
      template.hasResourceProperties('AWS::IAM::Policy', {
        PolicyDocument: {
          Statement: Match.arrayWith([
            // InvokeModel permission to the inference profile itself
            Match.objectLike({
              Action: [
                'bedrock:InvokeModel',
                'bedrock:InvokeModelWithResponseStream',
                'bedrock:Converse',
                'bedrock:ConverseStream',
              ],
              Effect: 'Allow',
              Resource: {
                'Fn::GetAtt': Match.arrayWith([Match.stringLikeRegexp('TestProfile'), 'InferenceProfileArn']),
              },
            }),
            // Conditional InvokeModel permission to foundation models
            Match.objectLike({
              Action: [
                'bedrock:InvokeModel',
                'bedrock:InvokeModelWithResponseStream',
                'bedrock:Converse',
                'bedrock:ConverseStream',
              ],
              Effect: 'Allow',
              Resource: Match.objectLike({
                'Fn::Join': ['', ['arn:', { Ref: 'AWS::Partition' }, ':bedrock:*::foundation-model/*']],
              }),
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

    test('with allowModelsDirectAccess=true grants direct access', () => {
      // GIVEN
      const modelId = 'anthropic.claude-3-5-sonnet-20240620-v1:0';
      const modelSource = ModelSource.fromFoundationModel(modelId, 'us-west-2');

      const profile = new ApplicationInferenceProfile(stack, 'TestDirectAccessProfile', {
        inferenceProfileName: 'test-direct-access',
        description: 'Test inference profile with direct model access',
        modelSource,
      });

      const role = new iam.Role(stack, 'TestDirectAccessRole', {
        assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      });

      // WHEN - grant with direct access
      profile.grantInvoke(role, {
        allowModelsDirectAccess: true,
      });

      // THEN
      const template = Template.fromStack(stack);

      // Check the generated IAM policy
      template.hasResourceProperties('AWS::IAM::Policy', {
        PolicyDocument: {
          Statement: Match.arrayWith([
            // InvokeModel permission to the inference profile itself
            Match.objectLike({
              Action: [
                'bedrock:InvokeModel',
                'bedrock:InvokeModelWithResponseStream',
                'bedrock:Converse',
                'bedrock:ConverseStream',
              ],
              Effect: 'Allow',
              Resource: {
                'Fn::GetAtt': Match.arrayWith([
                  Match.stringLikeRegexp('TestDirectAccessProfile'),
                  'InferenceProfileArn',
                ]),
              },
            }),
            // Direct (unconditional) InvokeModel permission to foundation models
            Match.objectLike({
              Action: [
                'bedrock:InvokeModel',
                'bedrock:InvokeModelWithResponseStream',
                'bedrock:Converse',
                'bedrock:ConverseStream',
              ],
              Effect: 'Allow',
              Resource: Match.objectLike({
                'Fn::Join': ['', ['arn:', { Ref: 'AWS::Partition' }, ':bedrock:*::foundation-model/*']],
              }),
              // No Condition field expected
            }),
          ]),
        },
      });
    });

    test('with tag conditions (profile-only access)', () => {
      // GIVEN
      const modelId = 'anthropic.claude-3-5-sonnet-20240620-v1:0';
      const modelSource = ModelSource.fromFoundationModel(modelId, 'us-west-2');

      const profile = new ApplicationInferenceProfile(stack, 'TestProfile', {
        inferenceProfileName: 'test-profile',
        description: 'Test inference profile',
        modelSource,
      });
      cdk.Tags.of(profile).add('UserEmail', 'user@example.com');

      const role = new iam.Role(stack, 'TestRole', {
        assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      });

      // WHEN - grant with tag conditions (using default profile-only access)
      profile.grantInvoke(role, {
        tagConditions: {
          UserEmail: '${aws:PrincipalTag/UserEmail}',
        },
      });

      // THEN
      const template = Template.fromStack(stack);

      // Verify that IAM policy is generated
      template.resourceCountIs('AWS::IAM::Policy', 1);

      // Check the generated IAM policy - including tag conditions
      template.hasResourceProperties('AWS::IAM::Policy', {
        PolicyDocument: {
          Statement: Match.arrayWith([
            // Conditional InvokeModel permission to foundation models (with tag conditions)
            Match.objectLike({
              Action: [
                'bedrock:InvokeModel',
                'bedrock:InvokeModelWithResponseStream',
                'bedrock:Converse',
                'bedrock:ConverseStream',
              ],
              Effect: 'Allow',
              Resource: Match.objectLike({
                'Fn::Join': ['', ['arn:', { Ref: 'AWS::Partition' }, ':bedrock:*::foundation-model/*']],
              }),
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

    test('with allowModelsDirectAccess=true and specific model ARN', () => {
      // GIVEN
      const modelId = 'anthropic.claude-3-5-sonnet-20240620-v1:0';
      const modelSource = ModelSource.fromFoundationModel(modelId, 'us-west-2');

      const profile = new ApplicationInferenceProfile(stack, 'TestSpecificModelProfile', {
        inferenceProfileName: 'test-specific-model',
        description: 'Test inference profile with specific model ARN',
        modelSource,
      });

      const role = new iam.Role(stack, 'TestSpecificModelRole', {
        assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      });

      const foundationModel = bedrock.FoundationModel.fromFoundationModelId(
        stack,
        'TestSpecificModel',
        bedrock.FoundationModelIdentifier.ANTHROPIC_CLAUDE_3_5_SONNET_20240620_V1_0,
      );

      // WHEN - grant with direct access and specific model ARN
      profile.grantInvoke(role, {
        allowModelsDirectAccess: true,
        foundationModel: foundationModel,
      });

      // THEN
      const template = Template.fromStack(stack);

      // Check the generated IAM policy
      template.hasResourceProperties('AWS::IAM::Policy', {
        PolicyDocument: {
          Statement: Match.arrayWith([
            // Direct InvokeModel permission to specific foundation model
            Match.objectLike({
              Action: [
                'bedrock:InvokeModel',
                'bedrock:InvokeModelWithResponseStream',
                'bedrock:Converse',
                'bedrock:ConverseStream',
              ],
              Effect: 'Allow',
              Resource: {
                'Fn::Join': [
                  '',
                  [
                    'arn:',
                    { Ref: 'AWS::Partition' },
                    ':bedrock:',
                    { Ref: 'AWS::Region' },
                    '::foundation-model/anthropic.claude-3-5-sonnet-20240620-v1:0',
                  ],
                ],
              },
              // No Condition field expected
            }),
          ]),
        },
      });
    });

    test('with tag conditions but allowing direct access', () => {
      // GIVEN
      const modelId = 'anthropic.claude-3-5-sonnet-20240620-v1:0';
      const modelSource = ModelSource.fromFoundationModel(modelId, 'us-west-2');

      const profile = new ApplicationInferenceProfile(stack, 'TestTagsDirectProfile', {
        inferenceProfileName: 'test-tags-direct',
        description: 'Test profile with tags and direct access',
        modelSource,
      });
      cdk.Tags.of(profile).add('Environment', 'test');

      const role = new iam.Role(stack, 'TestTagsDirectRole', {
        assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      });

      // WHEN - grant with tag conditions AND direct access
      // Tag conditions should be ignored when direct access is granted
      profile.grantInvoke(role, {
        allowModelsDirectAccess: true,
        tagConditions: {
          Environment: 'test',
        },
      });

      // THEN
      const template = Template.fromStack(stack);

      // Check the generated IAM policy
      template.hasResourceProperties('AWS::IAM::Policy', {
        PolicyDocument: {
          Statement: Match.arrayWith([
            // Direct InvokeModel permission to foundation models (no conditions despite tag conditions)
            Match.objectLike({
              Action: [
                'bedrock:InvokeModel',
                'bedrock:InvokeModelWithResponseStream',
                'bedrock:Converse',
                'bedrock:ConverseStream',
              ],
              Effect: 'Allow',
              Resource: Match.objectLike({
                'Fn::Join': ['', ['arn:', { Ref: 'AWS::Partition' }, ':bedrock:*::foundation-model/*']],
              }),
              // No Condition field should be present
            }),
          ]),
        },
      });
    });

    test('with specific model ARN and profile-only access', () => {
      // GIVEN
      const modelId = 'anthropic.claude-3-5-sonnet-20240620-v1:0';
      const modelSource = ModelSource.fromFoundationModel(modelId, 'us-west-2');

      const profile = new ApplicationInferenceProfile(stack, 'TestSpecificModelProfileOnly', {
        inferenceProfileName: 'test-specific-model-profile-only',
        description: 'Test inference profile with specific model ARN and profile-only access',
        modelSource,
      });

      const role = new iam.Role(stack, 'TestSpecificModelProfileOnlyRole', {
        assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      });

      const foundationModel = bedrock.FoundationModel.fromFoundationModelId(
        stack,
        'TestSpecificModelProfileOnly',
        bedrock.FoundationModelIdentifier.ANTHROPIC_CLAUDE_3_5_SONNET_20240620_V1_0,
      );

      // WHEN - grant with profile-only access and specific model ARN
      profile.grantInvoke(role, {
        allowModelsDirectAccess: false,
        foundationModel: foundationModel,
      });

      // THEN
      const template = Template.fromStack(stack);

      // Check the generated IAM policy
      template.hasResourceProperties('AWS::IAM::Policy', {
        PolicyDocument: {
          Statement: Match.arrayWith([
            // Access to specific model only via inference profile (conditional access)
            Match.objectLike({
              Action: [
                'bedrock:InvokeModel',
                'bedrock:InvokeModelWithResponseStream',
                'bedrock:Converse',
                'bedrock:ConverseStream',
              ],
              Effect: 'Allow',
              Resource: {
                'Fn::Join': [
                  '',
                  [
                    'arn:',
                    { Ref: 'AWS::Partition' },
                    ':bedrock:',
                    { Ref: 'AWS::Region' },
                    '::foundation-model/anthropic.claude-3-5-sonnet-20240620-v1:0',
                  ],
                ],
              },
              Condition: {
                ArnEquals: {
                  'bedrock:InferenceProfileArn': {
                    'Fn::GetAtt': Match.arrayWith([
                      Match.stringLikeRegexp('TestSpecificModelProfileOnly'),
                      'InferenceProfileArn',
                    ]),
                  },
                },
              },
            }),
          ]),
        },
      });
    });

    test('with specific model ARN and tag conditions', () => {
      // GIVEN
      const modelId = 'anthropic.claude-3-5-sonnet-20240620-v1:0';
      const modelSource = ModelSource.fromFoundationModel(modelId, 'us-west-2');

      const profile = new ApplicationInferenceProfile(stack, 'TestSpecificModelWithTags', {
        inferenceProfileName: 'test-specific-model-with-tags',
        description: 'Test inference profile with specific model ARN and tag conditions',
        modelSource,
      });
      cdk.Tags.of(profile).add('Project', 'demo');

      const role = new iam.Role(stack, 'TestSpecificModelWithTagsRole', {
        assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      });

      const specificModel = bedrock.FoundationModel.fromFoundationModelId(
        stack,
        'SpecificModelWithTags',
        bedrock.FoundationModelIdentifier.ANTHROPIC_CLAUDE_3_5_SONNET_20240620_V1_0,
      );

      // WHEN - grant with tag conditions and specific model ARN
      profile.grantInvoke(role, {
        foundationModel: specificModel,
        tagConditions: {
          Project: '${aws:PrincipalTag/Project}',
        },
      });

      // THEN
      const template = Template.fromStack(stack);

      // Check the generated IAM policy
      template.hasResourceProperties('AWS::IAM::Policy', {
        PolicyDocument: {
          Statement: Match.arrayWith([
            // Access to specific model with tag conditions
            Match.objectLike({
              Action: [
                'bedrock:InvokeModel',
                'bedrock:InvokeModelWithResponseStream',
                'bedrock:Converse',
                'bedrock:ConverseStream',
              ],
              Effect: 'Allow',
              Resource: {
                'Fn::Join': [
                  '',
                  [
                    'arn:',
                    { Ref: 'AWS::Partition' },
                    ':bedrock:',
                    { Ref: 'AWS::Region' },
                    '::foundation-model/anthropic.claude-3-5-sonnet-20240620-v1:0',
                  ],
                ],
              },
              Condition: Match.objectLike({
                ArnEquals: {
                  'bedrock:InferenceProfileArn': {
                    'Fn::GetAtt': Match.arrayWith([
                      Match.stringLikeRegexp('TestSpecificModelWithTags'),
                      'InferenceProfileArn',
                    ]),
                  },
                },
                StringLike: {
                  'aws:ResourceTag/Project': '${aws:PrincipalTag/Project}',
                },
              }),
            }),
          ]),
        },
      });
    });

    test('with multiple tag conditions', () => {
      // GIVEN
      const modelId = 'anthropic.claude-3-5-sonnet-20240620-v1:0';
      const modelSource = ModelSource.fromFoundationModel(modelId, 'us-west-2');

      const profile = new ApplicationInferenceProfile(stack, 'TestMultipleTagsProfile', {
        inferenceProfileName: 'test-multiple-tags',
        description: 'Test inference profile with multiple tag conditions',
        modelSource,
      });
      cdk.Tags.of(profile).add('Department', 'Engineering');
      cdk.Tags.of(profile).add('CostCenter', '12345');
      cdk.Tags.of(profile).add('Environment', 'Test');

      const role = new iam.Role(stack, 'TestMultipleTagsRole', {
        assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      });

      // WHEN - grant with multiple tag conditions
      profile.grantInvoke(role, {
        tagConditions: {
          Department: '${aws:PrincipalTag/Department}',
          CostCenter: '${aws:PrincipalTag/CostCenter}',
          Environment: 'Test',
        },
      });

      // THEN
      const template = Template.fromStack(stack);

      // Check the generated IAM policy with multiple StringLike conditions
      template.hasResourceProperties('AWS::IAM::Policy', {
        PolicyDocument: {
          Statement: Match.arrayWith([
            Match.objectLike({
              Action: [
                'bedrock:InvokeModel',
                'bedrock:InvokeModelWithResponseStream',
                'bedrock:Converse',
                'bedrock:ConverseStream',
              ],
              Effect: 'Allow',
              Resource: Match.objectLike({
                'Fn::Join': ['', ['arn:', { Ref: 'AWS::Partition' }, ':bedrock:*::foundation-model/*']],
              }),
              Condition: Match.objectLike({
                StringLike: {
                  'aws:ResourceTag/Department': '${aws:PrincipalTag/Department}',
                  'aws:ResourceTag/CostCenter': '${aws:PrincipalTag/CostCenter}',
                  'aws:ResourceTag/Environment': 'Test',
                },
              }),
            }),
          ]),
        },
      });
    });

    test('with empty tag conditions object', () => {
      // GIVEN
      const modelId = 'anthropic.claude-3-5-sonnet-20240620-v1:0';
      const modelSource = ModelSource.fromFoundationModel(modelId, 'us-west-2');

      const profile = new ApplicationInferenceProfile(stack, 'TestEmptyTagsProfile', {
        inferenceProfileName: 'test-empty-tags',
        description: 'Test inference profile with empty tag conditions object',
        modelSource,
      });

      const role = new iam.Role(stack, 'TestEmptyTagsRole', {
        assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      });

      // WHEN - grant with empty tag conditions object
      profile.grantInvoke(role, {
        tagConditions: {},
      });

      // THEN
      const template = Template.fromStack(stack);

      // Check that policy doesn't include StringLike condition
      template.hasResourceProperties('AWS::IAM::Policy', {
        PolicyDocument: {
          Statement: Match.arrayWith([
            Match.objectLike({
              Action: [
                'bedrock:InvokeModel',
                'bedrock:InvokeModelWithResponseStream',
                'bedrock:Converse',
                'bedrock:ConverseStream',
              ],
              Effect: 'Allow',
              Resource: Match.objectLike({
                'Fn::Join': ['', ['arn:', { Ref: 'AWS::Partition' }, ':bedrock:*::foundation-model/*']],
              }),
              Condition: {
                ArnEquals: {
                  'bedrock:InferenceProfileArn': {
                    'Fn::GetAtt': Match.arrayWith([
                      Match.stringLikeRegexp('TestEmptyTagsProfile'),
                      'InferenceProfileArn',
                    ]),
                  },
                },
                // No StringLike condition should be present
              },
            }),
          ]),
        },
      });
    });

    test('on imported inference profile with all options', () => {
      // GIVEN
      const importedProfile = ApplicationInferenceProfile.fromInferenceProfileArn(
        stack,
        'ImportedProfile',
        'arn:aws:bedrock:us-west-2:123456789012:inference-profile/test-imported-profile',
      );

      const role = new iam.Role(stack, 'TestImportedProfileRole', {
        assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      });

      const specificModel = bedrock.FoundationModel.fromFoundationModelId(
        stack,
        'ImportedSpecificModel',
        bedrock.FoundationModelIdentifier.ANTHROPIC_CLAUDE_3_5_SONNET_20240620_V1_0,
      );

      // WHEN - grant with all possible options on imported profile
      importedProfile.grantInvoke(role, {
        allowModelsDirectAccess: false,
        foundationModel: specificModel,
        tagConditions: {
          Department: '${aws:PrincipalTag/Department}',
        },
      });

      // THEN
      const template = Template.fromStack(stack);

      // Check generated IAM policy for imported profile
      template.hasResourceProperties('AWS::IAM::Policy', {
        PolicyDocument: {
          Statement: Match.arrayWith([
            // Access to the imported profile
            Match.objectLike({
              Action: Match.arrayEquals([
                'bedrock:InvokeModel',
                'bedrock:InvokeModelWithResponseStream',
                'bedrock:Converse',
                'bedrock:ConverseStream',
              ]),
              Effect: 'Allow',
              Resource: 'arn:aws:bedrock:us-west-2:123456789012:inference-profile/test-imported-profile',
            }),
            // Conditional access to specific model with tag condition
            Match.objectLike({
              Action: [
                'bedrock:InvokeModel',
                'bedrock:InvokeModelWithResponseStream',
                'bedrock:Converse',
                'bedrock:ConverseStream',
              ],
              Effect: 'Allow',
              Resource: Match.objectLike({
                'Fn::Join': Match.arrayWith([
                  '',
                  Match.arrayWith([
                    'arn:',
                    { Ref: 'AWS::Partition' },
                    ':bedrock:',
                    { Ref: 'AWS::Region' },
                    '::foundation-model/anthropic.claude-3-5-sonnet-20240620-v1:0',
                  ]),
                ]),
              }),
              Condition: Match.objectLike({
                ArnEquals: {
                  'bedrock:InferenceProfileArn':
                    'arn:aws:bedrock:us-west-2:123456789012:inference-profile/test-imported-profile',
                },
                StringLike: {
                  'aws:ResourceTag/Department': '${aws:PrincipalTag/Department}',
                },
              }),
            }),
          ]),
        },
      });
    });

    test('with FoundationModel instead of string ARN', () => {
      // GIVEN
      const modelId = 'anthropic.claude-3-5-sonnet-20240620-v1:0';
      const modelSource = ModelSource.fromFoundationModel(modelId, 'us-west-2');

      const profile = new ApplicationInferenceProfile(stack, 'TestIModelProfile', {
        inferenceProfileName: 'test-imodel',
        description: 'Test inference profile with FoundationModel',
        modelSource,
      });

      const role = new iam.Role(stack, 'TestIModelRole', {
        assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      });

      // Create a FoundationModel instance
      const foundationModel = bedrock.FoundationModel.fromFoundationModelId(
        stack,
        'TestModel',
        bedrock.FoundationModelIdentifier.ANTHROPIC_CLAUDE_3_5_SONNET_20240620_V1_0,
      );

      // WHEN - grant with FoundationModel
      profile.grantInvoke(role, {
        foundationModel: foundationModel,
      });

      // THEN
      const template = Template.fromStack(stack);

      // Check the generated IAM policy
      template.hasResourceProperties('AWS::IAM::Policy', {
        PolicyDocument: {
          Statement: Match.arrayWith([
            // Conditional InvokeModel permission to specific foundation model
            Match.objectLike({
              Action: [
                'bedrock:InvokeModel',
                'bedrock:InvokeModelWithResponseStream',
                'bedrock:Converse',
                'bedrock:ConverseStream',
              ],
              Effect: 'Allow',
              Resource: {
                'Fn::Join': [
                  '',
                  [
                    'arn:',
                    { Ref: 'AWS::Partition' },
                    ':bedrock:',
                    { Ref: 'AWS::Region' },
                    '::foundation-model/anthropic.claude-3-5-sonnet-20240620-v1:0',
                  ],
                ],
              },
              Condition: Match.objectLike({
                ArnEquals: {
                  'bedrock:InferenceProfileArn': {
                    'Fn::GetAtt': Match.arrayWith([Match.stringLikeRegexp('TestIModelProfile'), 'InferenceProfileArn']),
                  },
                },
              }),
            }),
          ]),
        },
      });
    });

    test('with FoundationModel and allowModelsDirectAccess', () => {
      // GIVEN
      const modelId = 'amazon.titan-text-express-v1';
      const modelSource = ModelSource.fromFoundationModel(modelId, 'us-east-1');

      const profile = new ApplicationInferenceProfile(stack, 'TestIModelDirectProfile', {
        inferenceProfileName: 'test-imodel-direct',
        description: 'Test inference profile with FoundationModel and direct access',
        modelSource,
      });

      const role = new iam.Role(stack, 'TestIModelDirectRole', {
        assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      });

      // Create a FoundationModel instance
      const foundationModel = bedrock.FoundationModel.fromFoundationModelId(
        stack,
        'TestTitanModel',
        bedrock.FoundationModelIdentifier.AMAZON_TITAN_TEXT_G1_EXPRESS_V1,
      );

      // WHEN - grant with FoundationModel and direct access
      profile.grantInvoke(role, {
        foundationModel: foundationModel,
        allowModelsDirectAccess: true,
      });

      // THEN
      const template = Template.fromStack(stack);

      // Check the generated IAM policy
      template.hasResourceProperties('AWS::IAM::Policy', {
        PolicyDocument: {
          Statement: Match.arrayWith([
            // InvokeModel permission to the inference profile itself
            Match.objectLike({
              Action: [
                'bedrock:InvokeModel',
                'bedrock:InvokeModelWithResponseStream',
                'bedrock:Converse',
                'bedrock:ConverseStream',
              ],
              Effect: 'Allow',
              Resource: {
                'Fn::GetAtt': Match.arrayWith([
                  Match.stringLikeRegexp('TestIModelDirectProfile'),
                  'InferenceProfileArn',
                ]),
              },
            }),
            // Direct InvokeModel permission to specific foundation model
            Match.objectLike({
              Action: [
                'bedrock:InvokeModel',
                'bedrock:InvokeModelWithResponseStream',
                'bedrock:Converse',
                'bedrock:ConverseStream',
              ],
              Effect: 'Allow',
              Resource: {
                'Fn::Join': [
                  '',
                  [
                    'arn:',
                    { Ref: 'AWS::Partition' },
                    ':bedrock:',
                    { Ref: 'AWS::Region' },
                    '::foundation-model/amazon.titan-text-express-v1',
                  ],
                ],
              },
              // No Condition field expected for direct access
            }),
          ]),
        },
      });
    });

    test('backwards compatibility - still accepts string ARN', () => {
      // GIVEN
      const modelId = 'meta.llama3-70b-instruct-v1:0';
      const modelSource = ModelSource.fromFoundationModel(modelId, 'us-west-2');

      const profile = new ApplicationInferenceProfile(stack, 'TestBackwardCompatProfile', {
        inferenceProfileName: 'test-backward-compat',
        description: 'Test inference profile with string ARN for backward compatibility',
        modelSource,
      });

      const role = new iam.Role(stack, 'TestBackwardCompatRole', {
        assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      });

      const specificModel = bedrock.FoundationModel.fromFoundationModelId(
        stack,
        'SpecificModelBackwardCompat',
        bedrock.FoundationModelIdentifier.META_LLAMA_3_70_INSTRUCT_V1,
      );

      // WHEN - grant with FoundationModel object
      profile.grantInvoke(role, {
        foundationModel: specificModel,
      });

      // THEN
      const template = Template.fromStack(stack);

      // Check the generated IAM policy
      template.hasResourceProperties('AWS::IAM::Policy', {
        PolicyDocument: {
          Statement: Match.arrayWith([
            // Conditional InvokeModel permission to specific foundation model
            Match.objectLike({
              Action: [
                'bedrock:InvokeModel',
                'bedrock:InvokeModelWithResponseStream',
                'bedrock:Converse',
                'bedrock:ConverseStream',
              ],
              Effect: 'Allow',
              Resource: Match.objectLike({
                'Fn::Join': Match.arrayWith([
                  '',
                  Match.arrayWith([
                    'arn:',
                    { Ref: 'AWS::Partition' },
                    ':bedrock:',
                    { Ref: 'AWS::Region' },
                    '::foundation-model/meta.llama3-70b-instruct-v1:0',
                  ]),
                ]),
              }),
              Condition: Match.objectLike({
                ArnEquals: {
                  'bedrock:InferenceProfileArn': {
                    'Fn::GetAtt': Match.arrayWith([
                      Match.stringLikeRegexp('TestBackwardCompatProfile'),
                      'InferenceProfileArn',
                    ]),
                  },
                },
              }),
            }),
          ]),
        },
      });
    });
  });
});
