import { IResource, Resource, ResourceProps, Names } from 'aws-cdk-lib';
import { CfnApplicationInferenceProfile } from 'aws-cdk-lib/aws-bedrock';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import { InferenceProfileModelSourceProps } from './model-source';

type ConditionValue = string | number | boolean | string[] | number[];

/**
 * Options for granting permissions to invoke Bedrock foundation models via an inference profile
 */
export interface GrantInvokeOptions {
  /**
   * Whether to allow direct access to foundation models without requiring the use of this inference profile
   * @default false - Models can only be accessed via this inference profile
   */
  readonly allowModelsDirectAccess?: boolean;

  /**
   * Model ARN pattern used to restrict access to foundation models.
   * Useful when supporting multiple models.
   * @default 'arn:aws:bedrock:*::foundation-model/*' (all foundation models)
   */
  readonly foundationModelArn?: string;

  /**
   * Additional conditions to match resource tags for tag-based access control.
   * Keys are resource tag keys, values are principal tag variables or literal values.
   * @example {'UserEmail': '${aws:PrincipalTag/UserEmail}'}
   */
  readonly tagConditions?: Record<string, string>;
}

/**
 * Properties for defining a Bedrock Application Inference Profile
 */
export interface ApplicationInferenceProfileProps extends ResourceProps {
  /**
   * The name of the inference profile.
   *
   * @default - Assigned by CloudFormation (recommended).
   */
  readonly inferenceProfileName?: string;

  /**
   * The description of the inference profile.
   * @default - No description
   */
  readonly description?: string;

  /**
   * Contains configurations for the inference profile to copy as the resource.
   */
  readonly modelSource: InferenceProfileModelSourceProps;
}

/**
 * Interface representing a Bedrock Application Inference Profile
 */
export interface IApplicationInferenceProfile extends IResource {
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

  /**
   * Grants permissions to an IAM principal to invoke Bedrock foundation models
   *
   * By default, this grants permissions to invoke models only via the inference profile.
   * To allow direct model access, set allowModelsDirectAccess to true in the options.
   *
   * @param grantee The IAM principal to grant permissions to
   * @param options Additional options (such as allowing direct model access or tag conditions)
   */
  grantInvoke(grantee: iam.IGrantable, options?: GrantInvokeOptions): iam.Grant;
}

/**
 * Attributes for importing an existing Bedrock Application Inference Profile
 */
export interface ApplicationInferenceProfileAttributes {
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
export class ApplicationInferenceProfile extends Resource implements IApplicationInferenceProfile {
  /**
   * Import an existing Bedrock Application Inference Profile by ARN
   */
  public static fromInferenceProfileArn(
    scope: Construct,
    id: string,
    inferenceProfileArn: string,
  ): IApplicationInferenceProfile {
    return ApplicationInferenceProfile.fromInferenceProfileAttributes(scope, id, {
      inferenceProfileArn,
    });
  }

  /**
   * Import an existing Bedrock Application Inference Profile using attributes
   */
  public static fromInferenceProfileAttributes(
    scope: Construct,
    id: string,
    attrs: ApplicationInferenceProfileAttributes,
  ): IApplicationInferenceProfile {
    // Extract resource ID from the ARN (the last part after '/')
    const inferenceProfileId = attrs.inferenceProfileId ?? attrs.inferenceProfileArn.split('/').pop()!;

    class Import extends Resource implements IApplicationInferenceProfile {
      public readonly inferenceProfileArn = attrs.inferenceProfileArn;
      public readonly inferenceProfileId = inferenceProfileId;

      /**
       * Internal implementation of grant logic
       */
      private _grantInvokeImplementation(grantee: iam.IGrantable, options: GrantInvokeOptions = {}): iam.Grant {
        const foundationModelArn = options.foundationModelArn || 'arn:aws:bedrock:*::foundation-model/*';
        const allowDirectAccess = options.allowModelsDirectAccess ?? false;

        // 1. Access permission to the inference profile itself
        const grant = iam.Grant.addToPrincipal({
          grantee,
          actions: ['bedrock:InvokeModel*'],
          resourceArns: [this.inferenceProfileArn],
          scope: this,
        });

        // 2. Access permissions to foundation models (conditional or direct)
        if (!allowDirectAccess) {
          // Conditional access permissions to foundation models (via inference profile only)
          const conditions: Record<string, Record<string, ConditionValue>> = {
            ArnEquals: {
              'bedrock:InferenceProfileArn': this.inferenceProfileArn,
            },
          };

          // If tag conditions are provided, add them to the conditions
          if (options.tagConditions && Object.keys(options.tagConditions).length > 0) {
            conditions.StringLike = {} as Record<string, ConditionValue>;

            for (const [tagKey, tagValue] of Object.entries(options.tagConditions)) {
              conditions.StringLike[`aws:ResourceTag/${tagKey}`] = tagValue as string;
            }
          }

          // New statement to be added to the principal policy
          const statement = new iam.PolicyStatement({
            effect: iam.Effect.ALLOW,
            actions: ['bedrock:InvokeModel*'],
            resources: [foundationModelArn],
            conditions,
          });

          grantee.grantPrincipal.addToPrincipalPolicy(statement);
        } else {
          // Direct access permissions to foundation models (no conditions)
          const statement = new iam.PolicyStatement({
            effect: iam.Effect.ALLOW,
            actions: ['bedrock:InvokeModel*'],
            resources: [foundationModelArn],
          });

          grantee.grantPrincipal.addToPrincipalPolicy(statement);
        }

        return grant;
      }

      /**
       * Grants permissions to an IAM principal to invoke Bedrock foundation models
       *
       * By default, this grants permissions to invoke models only via the inference profile.
       * To allow direct model access, set allowModelsDirectAccess to true in the options.
       */
      public grantInvoke(grantee: iam.IGrantable, options: GrantInvokeOptions = {}): iam.Grant {
        return this._grantInvokeImplementation(grantee, options);
      }
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

  constructor(scope: Construct, id: string, props: ApplicationInferenceProfileProps) {
    super(scope, id, {
      physicalName: props.inferenceProfileName,
    });

    // Create the CloudFormation resource
    this.resource = new CfnApplicationInferenceProfile(this, 'Resource', {
      // CloudFormation requires an inferenceProfileName, so if not provided, use Names.uniqueResourceName to generate a unique name
      // that follows AWS naming conventions (e.g. MyStack-ResourceName-UniqueHash)
      inferenceProfileName: props.inferenceProfileName ?? Names.uniqueResourceName(this, {
        separator: '-',
        maxLength: 64
      }),
      description: props.description,
      modelSource: {
        copyFrom: props.modelSource.copyFrom,
      },
    });

    // Set the ARN and ID
    this.inferenceProfileId = this.resource.attrInferenceProfileId;
    this.inferenceProfileArn = this.resource.attrInferenceProfileArn;
  }

  /**
   * Internal implementation of grant logic
   */
  private _grantInvokeImplementation(grantee: iam.IGrantable, options: GrantInvokeOptions = {}): iam.Grant {
    const foundationModelArn = options.foundationModelArn || 'arn:aws:bedrock:*::foundation-model/*';
    const allowDirectAccess = options.allowModelsDirectAccess ?? false;

    // 1. Access permission to the inference profile itself
    const grant = iam.Grant.addToPrincipal({
      grantee,
      actions: ['bedrock:InvokeModel*'],
      resourceArns: [this.inferenceProfileArn],
      scope: this,
    });

    // 2. Access permissions to foundation models (conditional or direct)
    if (!allowDirectAccess) {
      // Conditional access permissions to foundation models (via inference profile only)
      const conditions: Record<string, Record<string, ConditionValue>> = {
        ArnEquals: {
          'bedrock:InferenceProfileArn': this.inferenceProfileArn,
        },
      };

      // If tag conditions are provided, add them to the conditions
      if (options.tagConditions && Object.keys(options.tagConditions).length > 0) {
        conditions.StringLike = {} as Record<string, ConditionValue>;

        for (const [tagKey, tagValue] of Object.entries(options.tagConditions)) {
          conditions.StringLike[`aws:ResourceTag/${tagKey}`] = tagValue as string;
        }
      }

      // New statement to be added to the principal policy
      const statement = new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ['bedrock:InvokeModel*'],
        resources: [foundationModelArn],
        conditions,
      });

      grantee.grantPrincipal.addToPrincipalPolicy(statement);
    } else {
      // Direct access permissions to foundation models (no conditions)
      const statement = new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ['bedrock:InvokeModel*'],
        resources: [foundationModelArn],
      });

      grantee.grantPrincipal.addToPrincipalPolicy(statement);
    }

    return grant;
  }

  /**
   * Grants permissions to an IAM principal to invoke Bedrock foundation models
   *
   * By default, this grants permissions to invoke models only via the inference profile.
   * To allow direct model access, set allowModelsDirectAccess to true in the options.
   *
   * @param grantee The IAM principal to grant permissions to
   * @param options Additional options (such as allowing direct model access or tag conditions)
   * @returns The granted permission
   */
  public grantInvoke(grantee: iam.IGrantable, options: GrantInvokeOptions = {}): iam.Grant {
    return this._grantInvokeImplementation(grantee, options);
  }
}
