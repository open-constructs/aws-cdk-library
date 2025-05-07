import { FoundationModelIdentifier } from 'aws-cdk-lib/aws-bedrock';

/**
 * Properties for the InferenceProfileModelSource
 */
export interface InferenceProfileModelSourceProps {
  /**
   * The ARN of the model or system-defined inference profile that is the source for the inference profile.
   * 
   * Pattern: ^arn:aws(|-us-gov|-cn|-iso|-iso-b):bedrock:(|[0-9a-z-]{0,20}):(|[0-9]{12}):(inference-profile|foundation-model)/[a-zA-Z0-9-:.]+$
   */
  readonly copyFrom: string;
}

/**
 * Helper class to create model sources for inference profiles
 */
export class ModelSource {
  /**
   * Creates a model source from a foundation model identifier
   * 
   * @param modelId The foundation model identifier
   * @param region The AWS region where the model is located
   * @param version Optional version identifier for the model
   * @returns An InferenceProfileModelSourceProps object
   */
  public static fromFoundationModel(
    modelId: FoundationModelIdentifier,
    region: string = 'us-west-2',
  ): InferenceProfileModelSourceProps {

    // Otherwise, construct the ARN
    const modelIdString = typeof modelId === 'string' ? modelId : modelId.toString();
    
    return {
      copyFrom: `arn:aws:bedrock:${region}::foundation-model/${modelIdString}`,
    };
  }

  /**
   * Creates a model source from an existing inference profile
   * 
   * @param inferenceProfileArn The ARN of the existing inference profile
   * @returns An InferenceProfileModelSourceProps object
   */
  public static fromInferenceProfile(inferenceProfileArn: string): InferenceProfileModelSourceProps {
    return { copyFrom: inferenceProfileArn };
  }

}