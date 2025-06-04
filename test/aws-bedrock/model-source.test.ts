import { ModelSource } from '../../src/aws-bedrock';

describe('ModelSource', () => {
  test('fromFoundationModel with model ID', () => {
    const modelId = 'amazon.titan-text-express-v1';
    const modelSource = ModelSource.fromFoundationModel(modelId, 'us-west-2');

    expect(modelSource.copyFrom).toEqual(`arn:aws:bedrock:us-west-2::foundation-model/${modelId}`);
  });

  test('fromFoundationModel without region uses Aws.REGION', () => {
    const modelId = 'amazon.titan-text-express-v1';

    const modelSource = ModelSource.fromFoundationModel(modelId);

    // When region is not provided, Aws.REGION is used which is a CDK token
    expect(modelSource.copyFrom).toContain('foundation-model/amazon.titan-text-express-v1');
    expect(modelSource.copyFrom).toContain('${Token[AWS.Region.');
  });

  test('fromFoundationModel with different regions', () => {
    const modelId = 'anthropic.claude-3-sonnet-20240229-v1:0';
    const regions = ['us-east-1', 'ap-southeast-1', 'eu-central-1'];

    regions.forEach(region => {
      const modelSource = ModelSource.fromFoundationModel(modelId, region);
      expect(modelSource.copyFrom).toEqual(`arn:aws:bedrock:${region}::foundation-model/${modelId}`);
    });
  });

  test('fromInferenceProfile', () => {
    const inferenceProfileArn = 'arn:aws:bedrock:us-west-2:123456789012:inference-profile/ip-12345';
    const modelSource = ModelSource.fromInferenceProfile(inferenceProfileArn);

    expect(modelSource.copyFrom).toEqual(inferenceProfileArn);
  });
});
