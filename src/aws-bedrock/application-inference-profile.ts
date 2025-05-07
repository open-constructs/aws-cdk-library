import { Arn, ArnFormat, IResource, Resource, ResourceProps, Tags } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CfnApplicationInferenceProfile } from 'aws-cdk-lib/aws-bedrock';
import { InferenceProfileModelSourceProps } from './model-source';

/**
 * Properties for defining a Bedrock Application Inference Profile
 */
export interface BedrockApplicationInferenceProfileProps extends ResourceProps {
  /**
   * The name of the inference profile.
   */
  readonly inferenceProfileName: string;

  /**
   * The description of the inference profile.
   * @default - No description
   */
  readonly description?: string;

  /**
   * Contains configurations for the inference profile to copy as the resource.
   */
  readonly modelSource: InferenceProfileModelSourceProps;

  /**
   * Tags to be attached to the inference profile.
   * @default - No tags
   */
  readonly tags?: { [key: string]: string };
}

/**
 * Interface representing a Bedrock Application Inference Profile
 */
export interface IBedrockApplicationInferenceProfile extends IResource {
  /**
   * The ARN of the inference profile.
   * @attribute
   */
  readonly inferenceProfileArn: string;

  /**
   * The ID of the inference profile.
   * @attribute
   */
  readonly inferenceProfileId: string;
}

/**
 * Attributes for importing an existing Bedrock Application Inference Profile
 */
export interface BedrockApplicationInferenceProfileAttributes {
  /**
   * The ARN of the inference profile.
   */
  readonly inferenceProfileArn: string;

  /**
   * The ID of the inference profile.
   * @default - Derived from ARN
   */
  readonly inferenceProfileId?: string;
}

/**
 * A CDK construct for AWS Bedrock Application Inference Profile
 * 
 * Use the ModelSource field to specify the inference profile to copy into the resource.
 * For more information about using inference profiles in Amazon Bedrock, see 
 * Improve resilience with cross-region inference.
 */
export class BedrockApplicationInferenceProfile extends Resource implements IBedrockApplicationInferenceProfile {
  /**
   * Import an existing Bedrock Application Inference Profile by ARN
   */
  public static fromInferenceProfileArn(
    scope: Construct, 
    id: string, 
    inferenceProfileArn: string
  ): IBedrockApplicationInferenceProfile {
    const inferenceProfileId = Arn.extractResourceName(inferenceProfileArn, ArnFormat.SLASH_RESOURCE_NAME);

    class Import extends Resource implements IBedrockApplicationInferenceProfile {
      public readonly inferenceProfileArn = inferenceProfileArn;
      public readonly inferenceProfileId = inferenceProfileId;
    }

    return new Import(scope, id);
  }

  /**
   * Import an existing Bedrock Application Inference Profile using attributes
   */
  public static fromInferenceProfileAttributes(
    scope: Construct,
    id: string,
    attrs: BedrockApplicationInferenceProfileAttributes,
  ): IBedrockApplicationInferenceProfile {
    const inferenceProfileId = attrs.inferenceProfileId ?? 
      Arn.extractResourceName(attrs.inferenceProfileArn, ArnFormat.SLASH_RESOURCE_NAME);

    class Import extends Resource implements IBedrockApplicationInferenceProfile {
      public readonly inferenceProfileArn = attrs.inferenceProfileArn;
      public readonly inferenceProfileId = inferenceProfileId;
    }

    return new Import(scope, id);
  }

  /**
   * The ARN of the inference profile.
   */
  public readonly inferenceProfileArn: string;

  /**
   * The ID of the inference profile.
   */
  public readonly inferenceProfileId: string;

  /**
   * The CloudFormation resource of the inference profile.
   */
  private readonly resource: CfnApplicationInferenceProfile;

  constructor(scope: Construct, id: string, props: BedrockApplicationInferenceProfileProps) {
    super(scope, id, props);

    // Create the CloudFormation resource
    this.resource = new CfnApplicationInferenceProfile(this, 'Resource', {
      inferenceProfileName: props.inferenceProfileName,
      description: props.description,
      modelSource: {
        copyFrom: props.modelSource.copyFrom,
      },
    });

    // Apply tags if provided
    if (props.tags) {
      for (const [key, value] of Object.entries(props.tags)) {
        Tags.of(this).add(key, value);
      }
    }

    // Set the ARN and ID
    this.inferenceProfileId = this.resource.attrInferenceProfileId;
    this.inferenceProfileArn = this.resource.attrInferenceProfileArn;
  }
}