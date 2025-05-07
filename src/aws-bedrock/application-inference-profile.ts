import { IResource, Resource, ResourceProps, Tags } from 'aws-cdk-lib';
import { CfnApplicationInferenceProfile } from 'aws-cdk-lib/aws-bedrock';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import { InferenceProfileModelSourceProps } from './model-source';

/**
 * オプションのインターフェースで、推論プロファイル経由のみのアクセス権限付与に追加の条件を指定します
 */
export interface GrantInvokeViaProfileOnlyOptions {
  /**
   * 基盤モデルへのアクセスを制限するために使用するモデルARNパターン
   * 複数のモデルをサポートする場合に便利です
   * @default 'arn:aws:bedrock:*::foundation-model/*' (すべての基盤モデル)
   */
  readonly foundationModelArn?: string;

  /**
   * タグベースのアクセス制御用にリソースタグと一致させる追加の条件
   * キーはリソースタグキー、値はプリンシパルタグ変数またはリテラル値
   * @example {'UserEmail': '${aws:PrincipalTag/UserEmail}'}
   */
  readonly tagConditions?: Record<string, string>;
}

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

  /**
   * 推論プロファイル経由でのみBedrock基盤モデルの呼び出しを許可する権限をIAMプリンシパルに付与します
   *
   * @param grantee 権限を付与するIAMプリンシパル
   * @param options 追加のオプション（タグ条件など）
   */
  grantInvokeViaProfileOnly(grantee: iam.IGrantable, options?: GrantInvokeViaProfileOnlyOptions): iam.Grant;
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
    inferenceProfileArn: string,
  ): IBedrockApplicationInferenceProfile {
    return BedrockApplicationInferenceProfile.fromInferenceProfileAttributes(scope, id, {
      inferenceProfileArn,
    });
  }

  /**
   * Import an existing Bedrock Application Inference Profile using attributes
   */
  public static fromInferenceProfileAttributes(
    scope: Construct,
    id: string,
    attrs: BedrockApplicationInferenceProfileAttributes,
  ): IBedrockApplicationInferenceProfile {
    // Extract resource ID from the ARN (the last part after '/')
    const inferenceProfileId = attrs.inferenceProfileId ?? attrs.inferenceProfileArn.split('/').pop()!;

    class Import extends Resource implements IBedrockApplicationInferenceProfile {
      public readonly inferenceProfileArn = attrs.inferenceProfileArn;
      public readonly inferenceProfileId = inferenceProfileId;

      public grantInvokeViaProfileOnly(
        grantee: iam.IGrantable,
        options: GrantInvokeViaProfileOnlyOptions = {},
      ): iam.Grant {
        const foundationModelArn = options.foundationModelArn || 'arn:aws:bedrock:*::foundation-model/*';

        // 1. 推論プロファイル自体へのアクセス権限
        const grant = iam.Grant.addToPrincipal({
          grantee,
          actions: ['bedrock:InvokeModel*'],
          resourceArns: [this.inferenceProfileArn],
          scope: this,
        });

        // 2. 基盤モデルへの条件付きアクセス権限
        const conditions: Record<string, Record<string, any>> = {
          ArnEquals: {
            'bedrock:InferenceProfileArn': this.inferenceProfileArn,
          },
        };

        // タグ条件が提供されている場合、それらを条件に追加
        if (options.tagConditions && Object.keys(options.tagConditions).length > 0) {
          conditions.StringLike = {};

          for (const [tagKey, tagValue] of Object.entries(options.tagConditions)) {
            conditions.StringLike[`aws:ResourceTag/${tagKey}`] = tagValue;
          }
        }

        // プリンシパルポリシーに追加する新しいステートメント
        const statement = new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: ['bedrock:InvokeModel*'],
          resources: [foundationModelArn],
          conditions,
        });

        grantee.grantPrincipal.addToPrincipalPolicy(statement);

        return grant;
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

  /**
   * 推論プロファイル経由でのみBedrock基盤モデルの呼び出しを許可する権限をIAMプリンシパルに付与します
   *
   * このメソッドは記事で説明されているセキュアな設計パターンを実装します:
   * 1. 推論プロファイル自体へのInvokeModel権限を付与
   * 2. 基盤モデルへのInvokeModel権限を条件付きで付与（推論プロファイル経由の呼び出しのみ許可）
   *
   * @param grantee 権限を付与するIAMプリンシパル
   * @param options 追加のオプション（タグ条件など）
   * @returns 付与された権限
   */
  public grantInvokeViaProfileOnly(grantee: iam.IGrantable, options: GrantInvokeViaProfileOnlyOptions = {}): iam.Grant {
    const foundationModelArn = options.foundationModelArn || 'arn:aws:bedrock:*::foundation-model/*';

    // 1. 推論プロファイル自体へのアクセス権限
    const grant = iam.Grant.addToPrincipal({
      grantee,
      actions: ['bedrock:InvokeModel*'],
      resourceArns: [this.inferenceProfileArn],
      scope: this,
    });

    // 2. 基盤モデルへの条件付きアクセス権限
    const conditions: Record<string, Record<string, any>> = {
      ArnEquals: {
        'bedrock:InferenceProfileArn': this.inferenceProfileArn,
      },
    };

    // タグ条件が提供されている場合、それらを条件に追加
    if (options.tagConditions && Object.keys(options.tagConditions).length > 0) {
      conditions.StringLike = {};

      for (const [tagKey, tagValue] of Object.entries(options.tagConditions)) {
        conditions.StringLike[`aws:ResourceTag/${tagKey}`] = tagValue;
      }
    }

    // プリンシパルポリシーに追加する新しいステートメント
    const statement = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['bedrock:InvokeModel*'],
      resources: [foundationModelArn],
      conditions,
    });

    grantee.grantPrincipal.addToPrincipalPolicy(statement);

    return grant;
  }
}
