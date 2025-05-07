import { ModelSource } from '../../src/aws-bedrock';

describe('ModelSource', () => {
  test('fromFoundationModel with model ID', () => {
    const modelId = 'amazon.titan-text-express-v1';
    const modelSource = ModelSource.fromFoundationModel(modelId, 'us-west-2');

    expect(modelSource.copyFrom).toEqual(`arn:aws:bedrock:us-west-2::foundation-model/${modelId}`);
  });

  test('fromInferenceProfile', () => {
    const inferenceProfileArn = 'arn:aws:bedrock:us-west-2:123456789012:inference-profile/ip-12345';
    const modelSource = ModelSource.fromInferenceProfile(inferenceProfileArn);

    expect(modelSource.copyFrom).toEqual(inferenceProfileArn);
  });
});
