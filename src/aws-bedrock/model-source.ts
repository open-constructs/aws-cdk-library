import { Aws } from 'aws-cdk-lib';
import { FoundationModelIdentifier } from 'aws-cdk-lib/aws-bedrock';

/**
 * Helper class to create model sources for inference profiles
 */
export class ModelSource {
  /**
   * Creates a model source from a foundation model identifier
   *
   * @param modelId The foundation model identifier or string ID
   * @param region The AWS region where the model is located. If not provided, the current stack's region will be used.
   * @returns A ModelSource object
   */
  public static fromFoundationModel(
    modelId: FoundationModelIdentifier | string,
    region?: string,
  ): ModelSource {
    // Convert to string if it's an enum
    const modelIdString = typeof modelId === 'string' ? modelId : modelId.toString();

    // If region is not provided, use the stack's region
    const regionValue = region || Aws.REGION;

    return new ModelSource(
      `arn:aws:bedrock:${regionValue}::foundation-model/${modelIdString}`
    );
  }

  /**
   * Creates a model source from an existing inference profile
   *
   * @param inferenceProfileArn The ARN of the existing inference profile
   * @returns A ModelSource object
   */
  public static fromInferenceProfile(inferenceProfileArn: string): ModelSource {
    return new ModelSource(inferenceProfileArn);
  }

  /**
   * The ARN of the model or system-defined inference profile that is the source for the inference profile.
   *
   * Pattern: ^arn:aws(|-us-gov|-cn|-iso|-iso-b):bedrock:(|[0-9a-z-]{0,20}):(|[0-9]{12}):(inference-profile|foundation-model)/[a-zA-Z0-9-:.]+$
   */
  public readonly copyFrom: string;

  /**
   * Private constructor - use static factory methods instead
   * @param copyFrom The ARN to copy from
   */
  private constructor(copyFrom: string) {
    this.copyFrom = copyFrom;
  }
}
