import { FoundationModelIdentifier } from 'aws-cdk-lib/aws-bedrock';
import { InferenceProfileModelSource } from '../../src/aws-bedrock';

describe('InferenceProfileModelSource', () => {
  test('fromFoundationModel with FoundationModelIdentifier', () => {
    const modelSource = InferenceProfileModelSource.fromFoundationModel(
      FoundationModelIdentifier.ANTHROPIC_CLAUDE_3_SONNET,
      'us-west-2'
    );
    
    expect(modelSource.copyFrom).toEqual(
      'arn:aws:bedrock:us-west-2::foundation-model/anthropic.claude-3-5-sonnet'
    );
  });

  test('fromFoundationModel with string identifier', () => {
    const modelSource = InferenceProfileModelSource.fromFoundationModel(
      'anthropic.claude-3-5-sonnet-20240620-v1',
      'us-west-2',
      '0'
    );
    
    expect(modelSource.copyFrom).toEqual(
      'arn:aws:bedrock:us-west-2::foundation-model/anthropic.claude-3-5-sonnet-20240620-v1:0'
    );
  });

  test('fromFoundationModel with full ARN', () => {
    const fullArn = 'arn:aws:bedrock:us-east-1::foundation-model/anthropic.claude-3-5-sonnet-20240620-v1:0';
    const modelSource = InferenceProfileModelSource.fromFoundationModel(fullArn);
    
    expect(modelSource.copyFrom).toEqual(fullArn);
  });

  test('fromInferenceProfile', () => {
    const inferenceProfileArn = 'arn:aws:bedrock:us-west-2:123456789012:inference-profile/ip-12345';
    const modelSource = InferenceProfileModelSource.fromInferenceProfile(inferenceProfileArn);
    
    expect(modelSource.copyFrom).toEqual(inferenceProfileArn);
  });

  test('claude3Sonnet', () => {
    const modelSource = InferenceProfileModelSource.claude3Sonnet();
    
    expect(modelSource.copyFrom).toEqual(
      'arn:aws:bedrock:us-west-2::foundation-model/anthropic.claude-3-5-sonnet-20240620-v1:0'
    );
  });

  test('claude3Haiku', () => {
    const modelSource = InferenceProfileModelSource.claude3Haiku('us-east-1');
    
    expect(modelSource.copyFrom).toEqual(
      'arn:aws:bedrock:us-east-1::foundation-model/anthropic.claude-3-haiku-20240620-v1:0'
    );
  });

  test('claude3Opus', () => {
    const modelSource = InferenceProfileModelSource.claude3Opus('us-east-1', '20240620-v1:1');
    
    expect(modelSource.copyFrom).toEqual(
      'arn:aws:bedrock:us-east-1::foundation-model/anthropic.claude-3-opus-20240620-v1:1'
    );
  });
});