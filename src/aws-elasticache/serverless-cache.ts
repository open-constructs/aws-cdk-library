import {
  IResource,
  Lazy,
  Names,
  Resource,
  Stack,
  aws_elasticache,
  aws_ec2,
  Token,
  aws_iam,
  ArnFormat,
} from 'aws-cdk-lib';
import { IKey } from 'aws-cdk-lib/aws-kms';
import { Construct } from 'constructs';
import { DailySnapshotTime } from './daily-snapshot-time';
import { IUserGroup } from './user-group';
import { Engine } from './util';

/**
 * A ElastiCache Serverless Cache
 */
export interface IServerlessCache extends IResource, aws_ec2.IConnectable {
  /**
   * The serverless cache ARN.
   *
   * @attribute
   */
  readonly serverlessCacheArn: string;

  /**
   * The serverless cache name.
   *
   * @attribute
   */
  readonly serverlessCacheName: string;

  /**
   * The DNS hostname of the cache node.
   *
   * @attribute
   */
  readonly endpointAddress: string;

  /**
   * The port number that the cache engine is listening on.
   *
   * @attribute
   */
  readonly endpointPort: number;

  /**
   * Grant the given identity the specified actions.
   */
  grant(grantee: aws_iam.IGrantable, ...actions: string[]): aws_iam.Grant;

  /**
   * Grant the given identity connection access to the cache.
   */
  grantConnect(grantee: aws_iam.IGrantable): aws_iam.Grant;
}

/**
 * The version number of the engine the serverless cache is compatible with.
 */
export enum MajorVersion {
  /**
   * Version 7
   */
  VER_7 = '7',
}

/**
 * Properties for defining a ElastiCache Serverless Cache.
 */
export interface ServerlessCacheProps {
  /**
   * The engine the serverless cache is compatible with.
   */
  readonly engine: Engine;

  /**
   * The unique identifier of the serverless cache.
   * The name can have up to 40 characters, and must not contain spaces.
   *
   * @default - auto generate
   */
  readonly serverlessCacheName?: string;

  /**
   * The daily time when a cache snapshot will be created.
   * This property must be set along with `snapshotRetentionLimit`.
   *
   * @default - ElastiCache automatically assigns the backup window if \`snapshotRetentionLimit\` is set. Otherwise, no snapshots are taken.
   * @see https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/backups-automatic.html
   */
  readonly dailySnapshotTime?: DailySnapshotTime;

  /**
   * A description of the serverless cache.
   * The description can have up to 255 characters and must not contain < and > characters.
   *
   * @default - no description
   */
  readonly description?: string;

  /**
   * The name of the final snapshot taken of a cache before the cache is deleted.
   *
   * @default - no final snapshot taken
   */
  readonly finalSnapshotName?: string;

  /**
   * The Customer Managed Key that is used to encrypt data at rest in the serverless cache.
   *
   * @default - use AWS managed key
   */
  readonly kmsKey?: IKey;

  /**
   * The version number of the engine the serverless cache is compatible with.
   *
   * @default MajorVersion.VER_7
   */
  readonly majorEngineVersion?: MajorVersion;

  /**
   * The security groups to associate with the serverless cache.
   *
   * @default - a new security group is created
   */
  readonly securityGroups?: aws_ec2.ISecurityGroup[];

  /**
   * The ARN of the snapshot from which to restore data into the new cache.
   *
   * @default - not restored
   */
  readonly snapshotArnsToRestore?: string[];

  /**
   * The number of serverless cache snapshots the system will retain.
   * To enable automatic backups, this property must be set.
   *
   * \`snapshotRetentionLimit\` must be between 1 and 35.
   *
   * @default - no automatic backups
   */
  readonly snapshotRetentionLimit?: number;

  /**
   * The VPC to place the serverless cache in.
   */
  readonly vpc: aws_ec2.IVpc;

  /**
   * Where to place the serverless cache within the VPC.
   *
   * @default - private subnets
   */
  readonly vpcSubnets?: aws_ec2.SubnetSelection;

  /**
   * The user group associated with the serverless cache. Available for Valkey and Redis OSS only.
   *
   * @default - no user group associated
   */
  readonly userGroup?: IUserGroup;
}

/**
 * Attributes for importing a ElastiCache Serverless Cache.
 */
export interface ServerlessCacheAttributes {
  /**
   * The serverless cache name.
   */
  readonly serverlessCacheName: string;
  /**
   * The DNS hostname of the cache node.
   */
  readonly endpointAddress: string;
  /**
   * The port number that the cache engine is listening on.
   */
  readonly endpointPort: number;
  /**
   * The security groups to associate with the serverless cache.
   */
  readonly securityGroups: aws_ec2.ISecurityGroup[];
}

/**
 * A new or imported serverless cache.
 */
export abstract class SeverlessCacheBase extends Resource implements IServerlessCache {
  /**
   * Imports an existing ServerlessCache from attributes
   */
  public static fromServerlessCacheAttributes(
    scope: Construct,
    id: string,
    attrs: ServerlessCacheAttributes,
  ): IServerlessCache {
    class Import extends SeverlessCacheBase implements IServerlessCache {
      public readonly serverlessCacheName = attrs.serverlessCacheName;
      public readonly endpointAddress = attrs.endpointAddress;
      public readonly endpointPort = attrs.endpointPort;
      public readonly connections = new aws_ec2.Connections({
        securityGroups: attrs.securityGroups,
        defaultPort: aws_ec2.Port.tcp(attrs.endpointPort),
      });
      public readonly serverlessCacheArn = Stack.of(this).formatArn({
        service: 'elasticache',
        resource: 'serverlesscache',
        resourceName: attrs.serverlessCacheName,
      });
    }
    return new Import(scope, id);
  }
  /**
   * The serverless cache ARN.
   */
  public abstract readonly serverlessCacheArn: string;

  /**
   * The serverless cache name.
   */
  public abstract readonly serverlessCacheName: string;

  /**
   * The DNS hostname of the cache node.
   */
  public abstract readonly endpointAddress: string;

  /**
   * The port number that the cache engine is listening on.
   */
  public abstract readonly endpointPort: number;

  /**
   * The connection object associated with the ElastiCache Serverless Cache.
   */
  public abstract readonly connections: aws_ec2.Connections;

  /**
   * Grant the given identity the specified actions.
   * @param grantee the identity to be granted the actions
   * @param actions the data-access actions
   *
   * @see https://docs.aws.amazon.com/service-authorization/latest/reference/list_amazonelasticache.html
   */
  public grant(grantee: aws_iam.IGrantable, ...actions: string[]): aws_iam.Grant {
    return aws_iam.Grant.addToPrincipal({
      grantee,
      actions,
      resourceArns: [
        Stack.of(this).formatArn({
          service: 'elasticache',
          resource: 'serverlesscache',
          resourceName: this.serverlessCacheName,
          arnFormat: ArnFormat.COLON_RESOURCE_NAME,
        }),
      ],
    });
  }

  /**
   * Permits an IAM principal to perform connect to the serverless cache.
   *
   * Actions: Connect
   *
   * @param grantee The principal to grant access to.
   * @see https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/auth-iam.html
   */
  public grantConnect(grantee: aws_iam.IGrantable): aws_iam.Grant {
    return this.grant(grantee, 'elasticache:Connect');
  }
}

/**
 * Represents a ElastiCache Serverless Cache construct in AWS CDK.
 *
 * @example
 * declare const vpc: aws_ec2.IVpc;
 *
 * const serverlessCache = new ServerlessCache(
 *   stack,
 *   'ServerlessCache',
 *   {
 *     serverlessCacheName: 'my-serverlessCache',
 *     engine: Engine.VALKEY,
 *     vpc,
 *   },
 * );
 */
export class ServerlessCache extends SeverlessCacheBase implements IServerlessCache {
  /**
   * The serverless cache ARN
   */
  readonly serverlessCacheArn: string;
  /**
   * The serverless cache name
   */
  readonly serverlessCacheName: string;
  /**
   * The DNS hostname of the cache node
   */
  readonly endpointAddress: string;
  /**
   * The port number that the cache engine is listening on
   */
  readonly endpointPort: number;
  /**
   * The DNS hostname of the cache node
   */
  readonly readerEndpointAddress: string;
  /**
   * The port number that the cache engine is listening on
   */
  readonly readerEndpointPort: number;

  /**
   * The connection object associated with the ElastiCache Serverless Cache.
   */
  public readonly connections: aws_ec2.Connections;

  private readonly props: ServerlessCacheProps;
  private readonly securityGroups: aws_ec2.ISecurityGroup[];
  private readonly vpcSubnets: aws_ec2.SubnetSelection;

  constructor(scope: Construct, id: string, props: ServerlessCacheProps) {
    super(scope, id, {
      physicalName:
        props.serverlessCacheName ??
        Lazy.string({
          produce: () => Names.uniqueResourceName(this, { maxLength: 40 }).toLowerCase(),
        }),
    });
    this.props = props;

    this.securityGroups = props.securityGroups ?? [
      this.createSecurityGroup(this, 'SecurityGroup', {
        vpc: this.props.vpc,
        description: 'Automatic generated security group for ElastiCache Serverless Security Group',
      }),
    ];

    this.vpcSubnets = props.vpcSubnets ?? {
      subnetType: aws_ec2.SubnetType.PRIVATE_WITH_EGRESS,
    };

    this.validateServerlessCacheName();
    this.validateDescription();
    this.validateAutomaticBackupSettings();
    this.validateFinalSnapshotName();
    this.validateUserGroup();

    const serverlessCache = this.createResource(this, 'Resource', {
      engine: this.props.engine,
      serverlessCacheName: this.physicalName,
      dailySnapshotTime: props.dailySnapshotTime?.toTimestamp(),
      description: this.props.description,
      finalSnapshotName: this.props.finalSnapshotName,
      kmsKeyId: this.props.kmsKey?.keyArn,
      majorEngineVersion: this.props.majorEngineVersion,
      securityGroupIds: this.securityGroups.map(sg => sg.securityGroupId),
      subnetIds: this.props.vpc.selectSubnets(this.vpcSubnets).subnetIds,
      snapshotArnsToRestore: this.props.snapshotArnsToRestore,
      snapshotRetentionLimit: this.props.snapshotRetentionLimit,
      userGroupId: this.props.userGroup?.userGroupId,
    });

    this.serverlessCacheArn = serverlessCache.attrArn;
    this.serverlessCacheName = serverlessCache.serverlessCacheName;

    this.endpointAddress = serverlessCache.attrEndpointAddress;
    this.endpointPort = serverlessCache.attrEndpointPort;

    this.readerEndpointAddress = serverlessCache.attrReaderEndpointAddress;
    this.readerEndpointPort = serverlessCache.attrReaderEndpointPort;

    this.connections = new aws_ec2.Connections({
      securityGroups: this.securityGroups,
      defaultPort: aws_ec2.Port.tcp(this.endpointPort),
    });
  }

  protected createResource(
    scope: Construct,
    id: string,
    props: aws_elasticache.CfnServerlessCacheProps,
  ): aws_elasticache.CfnServerlessCache {
    return new aws_elasticache.CfnServerlessCache(scope, id, props);
  }

  protected createSecurityGroup(
    scope: Construct,
    id: string,
    props: aws_ec2.SecurityGroupProps,
  ): aws_ec2.SecurityGroup {
    return new aws_ec2.SecurityGroup(scope, id, props);
  }

  /**
   * Validates a serverless cache name.
   */
  private validateServerlessCacheName(): void {
    const serverlessCacheName = this.props.serverlessCacheName;

    if (Token.isUnresolved(serverlessCacheName) || serverlessCacheName === undefined) {
      return;
    }

    if (/\s/.test(serverlessCacheName)) {
      throw new Error(`\`serverlessCacheName\` must not contain spaces, got: ${serverlessCacheName}.`);
    }

    if (serverlessCacheName.length < 1 || serverlessCacheName.length > 40) {
      throw new Error(
        `\`serverlessCacheName\` must be between 1 and 40 characters, got: ${serverlessCacheName.length} characters.`,
      );
    }
  }

  /**
   * Validates a description.
   */
  private validateDescription(): void {
    const description = this.props.description;

    if (Token.isUnresolved(description) || description === undefined) {
      return;
    }

    if (/<|>/.test(description)) {
      throw new Error(`\`description\` must not contain < and >, got: ${description}`);
    }

    if (description.length > 255) {
      throw new Error(`\`description\` must not exceed 255 characters, got: ${description.length} characters.`);
    }
  }

  /**
   * Validates an automatic backup settings.
   */
  private validateAutomaticBackupSettings(): void {
    const dailySnapshotTime = this.props.dailySnapshotTime;
    const snapshotRetentionLimit = this.props.snapshotRetentionLimit;

    if (Token.isUnresolved(snapshotRetentionLimit)) {
      return;
    }

    if (dailySnapshotTime !== undefined && snapshotRetentionLimit === undefined) {
      throw new Error('`snapshotRetentionLimit` must be specified when `dailySnapshotTime` is set.');
    }

    if (snapshotRetentionLimit !== undefined) {
      if (snapshotRetentionLimit < 1 || snapshotRetentionLimit > 35) {
        throw new Error(`\`snapshotRetentionLimit\` must be between 1 and 35, got: ${snapshotRetentionLimit}.`);
      }
    }
  }

  /**
   * Validates final snapshot name.
   */
  private validateFinalSnapshotName(): void {
    const finalSnapshotName = this.props.finalSnapshotName;

    if (Token.isUnresolved(finalSnapshotName)) return;

    if (finalSnapshotName !== undefined) {
      if (!/^[a-z][a-z0-9]*(-[a-z0-9]+)*$/.test(finalSnapshotName)) {
        throw new Error(
          `\`finalSnapshotName\` must consist only of lowercase alphanumeric characters or hyphens, with the first character as a letter, and it can't end with a hyphen or contain two consecutive hyphens, got: ${finalSnapshotName}.`,
        );
      }

      if (finalSnapshotName.length > 255) {
        throw new Error(
          `\`finalSnapshotName\` must not exceed 255 characters, got: ${finalSnapshotName.length} characters.`,
        );
      }
    }
  }

  /**
   * Validates an engine and an user group combination.
   */
  private validateUserGroup(): void {
    if (this.props.userGroup === undefined) return;

    if (![Engine.REDIS, Engine.VALKEY].includes(this.props.engine)) {
      throw new Error(`\`userGroup\` is available for Valkey and Redis OSS only, got engine: ${this.props.engine}.`);
    }
  }
}
