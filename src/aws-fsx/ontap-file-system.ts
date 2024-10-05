import { Aws, Duration, SecretValue, Token, aws_ec2, aws_fsx } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { DailyAutomaticBackupStartTime } from './daily-automatic-backup-start-time';
import { MaintenanceTime } from './maintenance-time';

/**
 * The different kinds of file system deployments used by NetApp ONTAP.
 */
export enum OntapDeploymentType {
  /**
   * A high availability file system configured for Multi-AZ redundancy to tolerate temporary Availability Zone (AZ) unavailability.
   * This is a first-generation FSx for ONTAP file system.
   */
  MULTI_AZ_1 = 'MULTI_AZ_1',

  /**
   * A high availability file system configured for Multi-AZ redundancy to tolerate temporary AZ unavailability.
   * This is a second-generation FSx for ONTAP file system.
   */
  MULTI_AZ_2 = 'MULTI_AZ_2',

  /**
   * A file system configured for Single-AZ redundancy.
   * This is a first-generation FSx for ONTAP file system.
   */
  SINGLE_AZ_1 = 'SINGLE_AZ_1',

  /**
   * A file system configured with multiple high-availability (HA) pairs for Single-AZ redundancy.
   * This is a second-generation FSx for ONTAP file system.
   */
  SINGLE_AZ_2 = 'SINGLE_AZ_2',
}

/**
 * The throughput capacity per HA pair for an Amazon FSx for NetApp ONTAP file system.
 */
export abstract class ThroughputCapacityPerHaPair {
  /**
   * The deployment type of the throughput capacity.
   */
  public abstract readonly deploymentType: OntapDeploymentType;
  protected abstract readonly allowedCapacity: number[];
  protected constructor(public readonly capacity: number) {}
}

/**
 * The throughput capacity for the Single-AZ 1 deployment type.
 */
export class SingleAz1ThroughputCapacityPerHaPair extends ThroughputCapacityPerHaPair {
  /**
   * The throughput capacity of 128 MBps per HA pair.
   */
  public static readonly MB_PER_SEC_128 = new SingleAz1ThroughputCapacityPerHaPair(128);

  /**
   * The throughput capacity of 256 MBps per HA pair.
   */
  public static readonly MB_PER_SEC_256 = new SingleAz1ThroughputCapacityPerHaPair(256);

  /**
   * The throughput capacity of 512 MBps per HA pair.
   */
  public static readonly MB_PER_SEC_512 = new SingleAz1ThroughputCapacityPerHaPair(512);

  /**
   * The throughput capacity of 1024 MBps per HA pair.
   */
  public static readonly MB_PER_SEC_1024 = new SingleAz1ThroughputCapacityPerHaPair(1024);

  /**
   * The throughput capacity of 2048 MBps per HA pair.
   */
  public static readonly MB_PER_SEC_2048 = new SingleAz1ThroughputCapacityPerHaPair(2048);

  /**
   * The throughput capacity of 4096 MBps per HA pair.
   */
  public static readonly MB_PER_SEC_4096 = new SingleAz1ThroughputCapacityPerHaPair(4096);

  /**
   * The deployment type of the throughput capacity.
   */
  public readonly deploymentType = OntapDeploymentType.SINGLE_AZ_1;
  protected readonly allowedCapacity = [128, 256, 512, 1024, 2048, 4096];
}

/**
 * The throughput capacity for the Multi-AZ 1 deployment type.
 */
export class MultiAz1ThroughputCapacityPerHaPair extends ThroughputCapacityPerHaPair {
  /**
   * The throughput capacity of 128 MBps per HA pair.
   */
  public static readonly MB_PER_SEC_128 = new MultiAz1ThroughputCapacityPerHaPair(128);

  /**
   * The throughput capacity of 256 MBps per HA pair.
   */
  public static readonly MB_PER_SEC_256 = new MultiAz1ThroughputCapacityPerHaPair(256);

  /**
   * The throughput capacity of 512 MBps per HA pair.
   */
  public static readonly MB_PER_SEC_512 = new MultiAz1ThroughputCapacityPerHaPair(512);

  /**
   * The throughput capacity of 1024 MBps per HA pair.
   */
  public static readonly MB_PER_SEC_1024 = new MultiAz1ThroughputCapacityPerHaPair(1024);

  /**
   * The throughput capacity of 2048 MBps per HA pair.
   */
  public static readonly MB_PER_SEC_2048 = new MultiAz1ThroughputCapacityPerHaPair(2048);

  /**
   * The throughput capacity of 4096 MBps per HA pair.
   */
  public static readonly MB_PER_SEC_4096 = new MultiAz1ThroughputCapacityPerHaPair(4096);

  /**
   * The deployment type of the throughput capacity.
   */
  public readonly deploymentType = OntapDeploymentType.MULTI_AZ_1;
  protected readonly allowedCapacity = [128, 256, 512, 1024, 2048, 4096];
}

/**
 * The throughput capacity for the Single-AZ 2 deployment type.
 */
export class SingleAz2ThroughputCapacityPerHaPair extends ThroughputCapacityPerHaPair {
  /**
   * The throughput capacity of 1536 MBps per HA pair.
   */
  public static readonly MB_PER_SEC_1536 = new SingleAz2ThroughputCapacityPerHaPair(1536);

  /**
   * The throughput capacity of 3072 MBps per HA pair.
   */
  public static readonly MB_PER_SEC_3072 = new SingleAz2ThroughputCapacityPerHaPair(3072);

  /**
   * The throughput capacity of 6144 MBps per HA pair.
   */
  public static readonly MB_PER_SEC_6144 = new SingleAz2ThroughputCapacityPerHaPair(6144);

  /**
   * The deployment type of the throughput capacity.
   */
  public readonly deploymentType = OntapDeploymentType.SINGLE_AZ_2;
  protected readonly allowedCapacity = [1536, 3072, 6144];
}

/**
 * The throughput capacity for the Multi-AZ 2 deployment type.
 */
export class MultiAz2ThroughputCapacityPerHaPair extends ThroughputCapacityPerHaPair {
  /**
   * The throughput capacity of 384 MBps per HA pair.
   */
  public static readonly MB_PER_SEC_384 = new MultiAz2ThroughputCapacityPerHaPair(384);

  /**
   * The throughput capacity of 768 MBps per HA pair.
   */
  public static readonly MB_PER_SEC_768 = new MultiAz2ThroughputCapacityPerHaPair(768);

  /**
   * The throughput capacity of 1536 MBps per HA pair.
   */
  public static readonly MB_PER_SEC_1536 = new MultiAz2ThroughputCapacityPerHaPair(1536);

  /**
   * The throughput capacity of 3072 MBps per HA pair.
   */
  public static readonly MB_PER_SEC_3072 = new MultiAz2ThroughputCapacityPerHaPair(3072);

  /**
   * The throughput capacity of 6144 MBps per HA pair.
   */
  public static readonly MB_PER_SEC_6144 = new MultiAz2ThroughputCapacityPerHaPair(6144);

  /**
   * The deployment type of the throughput capacity.
   */
  public readonly deploymentType = OntapDeploymentType.MULTI_AZ_2;
  protected readonly allowedCapacity = [384, 768, 1536, 3072, 6144];
}

/**
 * The configuration for the Amazon FSx for NetApp ONTAP file system.
 *
 * @see https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-fsx-filesystem-ontapconfiguration.html
 */
export interface OntapConfiguration {
  /**
   * The number of days to retain automatic backups.
   *
   * Setting this property to 0 disables automatic backups.
   * You can retain automatic backups for a maximum of 90 days.
   *
   * @default - 30 days
   */
  readonly automaticBackupRetention?: Duration;

  /**
   * Start time for 30-minute daily automatic backup window in Coordinated Universal Time (UTC).
   *
   * @default - no backup window
   */
  readonly dailyAutomaticBackupStartTime?: DailyAutomaticBackupStartTime;

  /**
   * The FSx for ONTAP file system deployment type to use in creating the file system.
   *
   * @default OntapDeploymentType.MULTI_AZ_2
   */
  readonly deploymentType?: OntapDeploymentType;

  /**
   * The total number of SSD IOPS provisioned for the file system.
   *
   * The minimum and maximum values for this property depend on the value of HAPairs and StorageCapacity.
   * The minimum value is calculated as StorageCapacity * 3 * HAPairs (3 IOPS per GB of StorageCapacity).
   * The maximum value is calculated as 200,000 * HAPairs.
   *
   * @default - 3 IOPS * GB of storage capacity * HAPairs
   */
  readonly diskIops?: number;

  /**
   * The IP address range in which the endpoints to access your file system will be created.
   *
   * You can have overlapping endpoint IP addresses for file systems deployed in the same VPC/route tables, as long as they don't overlap with any subnet.
   *
   * @default - an unused IP address range from the 198.19.* range
   */
  readonly endpointIpAddressRange?: string;

  /**
   * The ONTAP administrative password for the `fsxadmin` user with which you administer your file system using the NetApp ONTAP CLI and REST API.
   *
   * If you don't specify a password, Amazon FSx will not set one. In that case, the user will not be able to log in.
   *
   * You can change the admin password at any time through the management console.
   *
   * @default - do not set an admin password
   */
  readonly fsxAdminPassword?: SecretValue;

  /**
   * How many high-availability (HA) pairs of file servers will power your file system.
   *
   * First-generation file systems are powered by 1 HA pair.
   * Second-generation multi-AZ file systems are powered by 1 HA pair.
   * Second generation single-AZ file systems are powered by up to 12 HA pairs.
   *
   * The value of this property affects the values of `storageCapacity`, `iops`, and `throughputCapacity`.
   *
   * Block storage protocol support (iSCSI and NVMe over TCP) is disabled on file systems with more than 6 HA pairs.
   *
   * @see https://docs.aws.amazon.com/fsx/latest/ONTAPGuide/administering-file-systems.html#HA-pairs
   * @see https://docs.aws.amazon.com/fsx/latest/ONTAPGuide/supported-fsx-clients.html#using-block-storage
   *
   * @default 1
   */
  readonly haPairs?: number;

  /**
   * The subnet in which you want the preferred file server to be located.
   *
   * This value is required when `deploymentType` is set to `MULTI_AZ_1` or `MULTI_AZ_2`.
   *
   * @default - no default value (This value is not used for single-AZ file systems, but it is required for multi-AZ file systems)
   */
  readonly preferredSubnet?: aws_ec2.ISubnet;

  /**
   * The route tables in which Amazon FSx creates the rules for routing traffic to the correct file server.
   *
   * You should specify all virtual private cloud (VPC) route tables associated with the subnets in which your clients are located.
   *
   * Amazon FSx manages VPC route tables for Multi-AZ file systems using tag-based authentication.
   * These route tables are tagged with Key: AmazonFSx; Value: ManagedByAmazonFSx.
   *
   * @see https://docs.aws.amazon.com/fsx/latest/ONTAPGuide/unable-to-access.html#vpc-route-tables-not-tagged
   *
   * @default - Amazon FSx selects your VPC's default route table.
   */
  readonly routeTables?: aws_ec2.IRouteTable[];

  /**
   * The throughput capacity per HA pair for the file system.
   *
   * @see https://docs.aws.amazon.com/fsx/latest/ONTAPGuide/managing-throughput-capacity.html
   *
   * @default - Amazon FSx determines the throughput capacity based on the storage capacity
   */
  readonly throughputCapacityPerHaPair?: ThroughputCapacityPerHaPair;

  /**
   * The preferred day and time to perform weekly maintenance.
   *
   * @default - automatically set by Amazon FSx
   */
  readonly weeklyMaintenanceStartTime?: MaintenanceTime;
}

/**
 * Properties specific to the NetApp ONTAP version of the FSx file system.
 */
export interface OntapFileSystemProps extends aws_fsx.FileSystemProps {
  /**
   * Additional configuration for FSx specific to NetApp ONTAP.
   */
  readonly ontapConfiguration: OntapConfiguration;

  /**
   * The subnet that the file system will be accessible from.
   *
   * For MULTI_AZ_1 deployment types,
   * provide exactly two subnets, one for the preferred file server and one for the standby file server.
   *
   * Specify one of these subnets as the preferred subnet using `OntapConfiguration.preferredSubnet` property for multi-AZ file system.
   */
  readonly vpcSubnets: aws_ec2.ISubnet[];
}

/**
 * The FSx for NetApp ONTAP File System implementation of IFileSystem.
 *
 * @see https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-fsx-filesystem.html
 *
 * @resource AWS::FSx::FileSystem
 */
export class OntapFileSystem extends aws_fsx.FileSystemBase {
  /**
   * Import an existing FSx for NetApp ONTAP file system from the given properties.
   */
  public static fromOntapFileSystemAttributes(
    scope: Construct,
    id: string,
    attrs: aws_fsx.FileSystemAttributes,
  ): aws_fsx.IFileSystem {
    class Import extends aws_fsx.FileSystemBase {
      public readonly dnsName = attrs.dnsName;
      public readonly fileSystemId = attrs.fileSystemId;
      public readonly connections = OntapFileSystem.configureConnections(attrs.securityGroup);
    }

    return new Import(scope, id);
  }

  /**
   * Configures a Connections object.
   */
  protected static configureConnections(securityGroup: aws_ec2.ISecurityGroup): aws_ec2.Connections {
    const connections = new aws_ec2.Connections({
      securityGroups: [securityGroup],
    });

    return connections;
  }

  /**
   * The default FSx file system type used by FSx for NetApp ONTAP.
   */
  private static readonly DEFAULT_FILE_SYSTEM_TYPE: string = 'ONTAP';

  /**
   * The security groups/rules used to allow network connections to the file system.
   */
  public readonly connections: aws_ec2.Connections;

  /**
   * The management endpoint DNS name assigned to this file system.
   */
  public readonly dnsName: string;

  /**
   * The inter cluster endpoint DNS name assigned to this file system.
   */
  public readonly interClusterDnsName: string;

  /**
   * The ID that AWS assigns to the file system.
   */
  public readonly fileSystemId: string;

  /**
   * The encapsulated L1 file system.
   */
  private readonly fileSystem: aws_fsx.CfnFileSystem;

  /**
   * The deployment type of the file system.
   */
  private readonly deploymentType: OntapDeploymentType;

  constructor(scope: Construct, id: string, props: OntapFileSystemProps) {
    super(scope, id);

    this.deploymentType = props.ontapConfiguration.deploymentType ?? OntapDeploymentType.MULTI_AZ_2;

    this.validateProps(props);

    const securityGroup = props.securityGroup || this.createSecurityGroup(props.vpc);
    this.connections = OntapFileSystem.configureConnections(securityGroup);
    this.fileSystem = this.createOntapFileSystem(securityGroup, props);

    this.fileSystem.applyRemovalPolicy(props.removalPolicy);

    this.fileSystemId = this.fileSystem.ref;
    const baseDnsName = `${this.fileSystemId}.fsx.${this.env.region}.${Aws.URL_SUFFIX}`;
    this.dnsName = `management.${baseDnsName}`;
    this.interClusterDnsName = `intercluster.${baseDnsName}`;
  }

  protected createSecurityGroup(vpc: aws_ec2.IVpc): aws_ec2.SecurityGroup {
    return new aws_ec2.SecurityGroup(this, 'FsxOntapSecurityGroup', {
      vpc,
    });
  }

  protected createOntapFileSystem(
    fileSystemSecurityGroup: aws_ec2.ISecurityGroup,
    props: OntapFileSystemProps,
  ): aws_fsx.CfnFileSystem {
    const ontapConfiguration = props.ontapConfiguration;

    const fileSystem = new aws_fsx.CfnFileSystem(this, 'Resource', {
      fileSystemType: OntapFileSystem.DEFAULT_FILE_SYSTEM_TYPE,
      subnetIds: props.vpcSubnets.map(subnet => subnet.subnetId),
      backupId: props.backupId,
      kmsKeyId: props.kmsKey?.keyId,
      ontapConfiguration: {
        automaticBackupRetentionDays: ontapConfiguration.automaticBackupRetention?.toDays() ?? 30,
        dailyAutomaticBackupStartTime: ontapConfiguration.dailyAutomaticBackupStartTime?.toTimestamp(),
        deploymentType: this.deploymentType,
        diskIopsConfiguration: {
          mode: ontapConfiguration.diskIops ? 'USER_PROVISIONED' : 'AUTOMATIC',
          iops: ontapConfiguration.diskIops,
        },
        endpointIpAddressRange: ontapConfiguration.endpointIpAddressRange,
        fsxAdminPassword: ontapConfiguration.fsxAdminPassword?.unsafeUnwrap(),
        haPairs: ontapConfiguration.haPairs,
        preferredSubnetId: ontapConfiguration.preferredSubnet?.subnetId,
        routeTableIds: ontapConfiguration.routeTables?.map(routeTable => routeTable.routeTableId),
        throughputCapacityPerHaPair: ontapConfiguration.throughputCapacityPerHaPair?.capacity,
        weeklyMaintenanceStartTime: ontapConfiguration.weeklyMaintenanceStartTime?.toTimestamp(),
      },
      securityGroupIds: [fileSystemSecurityGroup.securityGroupId],
      storageCapacity: props.storageCapacityGiB,
    });

    return fileSystem;
  }

  /**
   * Validates the props provided for a new FSx for Ontap file system.
   */
  private validateProps(props: OntapFileSystemProps) {
    const ontapConfiguration = props.ontapConfiguration;

    this.validateHaPairs(ontapConfiguration.haPairs);
    this.validateAutomaticBackupRetention(ontapConfiguration.automaticBackupRetention);
    this.validateDailyAutomaticBackupStartTime(
      ontapConfiguration.automaticBackupRetention,
      ontapConfiguration.dailyAutomaticBackupStartTime,
    );
    this.validateDiskIops(props.storageCapacityGiB, ontapConfiguration.diskIops, ontapConfiguration.haPairs);
    this.validateEndpointIpAddressRange(ontapConfiguration.endpointIpAddressRange);
    this.validateSubnets(props.vpcSubnets, ontapConfiguration.preferredSubnet);
    this.validateRouteTables(ontapConfiguration.routeTables);
    this.validateThroughputCapacity(ontapConfiguration.throughputCapacityPerHaPair);
    this.validateStorageCapacity(ontapConfiguration.haPairs, props.storageCapacityGiB);
  }

  private validateAutomaticBackupRetention(automaticBackupRetention?: Duration): void {
    if (
      automaticBackupRetention == null ||
      automaticBackupRetention.isUnresolved() ||
      automaticBackupRetention.toMilliseconds() === 0
    ) {
      return;
    }
    if (automaticBackupRetention.toMilliseconds() < Duration.days(1).toMilliseconds()) {
      throw new Error('automaticBackupRetention must be between 1 and 90 days or 0 for disabled');
    }
    if (automaticBackupRetention.toDays() > 90) {
      throw new Error(
        `automaticBackupRetention must be between 1 and 90 days or 0 for disabled. got: ${automaticBackupRetention.toDays()} days`,
      );
    }
  }

  private validateDailyAutomaticBackupStartTime(
    automaticBackupRetention?: Duration,
    dailyAutomaticBackupStartTime?: DailyAutomaticBackupStartTime,
  ): void {
    if (!dailyAutomaticBackupStartTime) {
      return;
    }

    const automaticBackupDisabled = !automaticBackupRetention || automaticBackupRetention.toDays() === 0;

    if (dailyAutomaticBackupStartTime && automaticBackupDisabled) {
      throw new Error(
        "'automaticBackupRetention' period must be set a non-zero day when 'dailyAutomaticBackupStartTime' is set",
      );
    }
  }

  private validateDiskIops(storageCapacityGiB: number, diskIops?: number, haPairs: number = 1): void {
    if (
      diskIops == null ||
      Token.isUnresolved(diskIops) ||
      Token.isUnresolved(storageCapacityGiB) ||
      Token.isUnresolved(haPairs)
    ) {
      return;
    }

    const minDiskIops = storageCapacityGiB * 3 * haPairs;
    const maxDiskIops = 200_000 * haPairs;

    if (!Number.isInteger(diskIops) || diskIops < minDiskIops || diskIops > maxDiskIops) {
      throw new Error(`\'diskIops\' must be an integer between ${minDiskIops} and ${maxDiskIops}, got ${diskIops}`);
    }
  }

  private validateEndpointIpAddressRange(endpointIpAddressRange?: string): void {
    if (endpointIpAddressRange == null || Token.isUnresolved(endpointIpAddressRange)) {
      return;
    }
    if (
      this.deploymentType !== OntapDeploymentType.MULTI_AZ_1 &&
      this.deploymentType !== OntapDeploymentType.MULTI_AZ_2
    ) {
      throw new Error("'endpointIpAddressRange' can only be specified for multi-AZ file systems");
    }
    if (!/^[^\u0000\u0085\u2028\u2029\r\n]{9,17}$/.test(endpointIpAddressRange)) {
      throw new Error(
        "'endpointIpAddressRange' must be between 9 and 17 characters long and not contain any of the following characters: \\u0000, \\u0085, \\u2028, \\u2029, \\r, or \\n",
      );
    }
  }

  private validateHaPairs(haPairs?: number): void {
    if (haPairs == null || Token.isUnresolved(haPairs)) {
      return;
    }
    if (!Number.isInteger(haPairs) || haPairs < 1 || haPairs > 12) {
      throw new Error(`\'haPairs\' must be an integer between 1 and 12, got ${haPairs}`);
    }
    if (
      haPairs > 1 &&
      [OntapDeploymentType.SINGLE_AZ_1, OntapDeploymentType.MULTI_AZ_1, OntapDeploymentType.MULTI_AZ_2].includes(
        this.deploymentType,
      )
    ) {
      throw new Error(`\'haPairs\' must be 1 for deployment type ${this.deploymentType}, got ${haPairs}`);
    }
  }

  private validateSubnets(vpcSubnets: aws_ec2.ISubnet[], preferredSubnet?: aws_ec2.ISubnet): void {
    if (
      (this.deploymentType === OntapDeploymentType.MULTI_AZ_1 ||
        this.deploymentType === OntapDeploymentType.MULTI_AZ_2) &&
      !preferredSubnet
    ) {
      throw new Error("'preferredSubnet' must be specified for multi-AZ file systems");
    }
    if (
      (this.deploymentType === OntapDeploymentType.SINGLE_AZ_1 ||
        this.deploymentType === OntapDeploymentType.SINGLE_AZ_2) &&
      preferredSubnet
    ) {
      throw new Error("'preferredSubnet' can only be specified for multi-AZ file systems");
    }
    if (preferredSubnet && !vpcSubnets.includes(preferredSubnet)) {
      throw new Error("'preferredSubnet' must be one of the specified 'vpcSubnets'");
    }
  }

  private validateRouteTables(routeTables?: aws_ec2.IRouteTable[]): void {
    if (routeTables == null || routeTables.length === 0) {
      return;
    }
    if (
      this.deploymentType !== OntapDeploymentType.MULTI_AZ_1 &&
      this.deploymentType !== OntapDeploymentType.MULTI_AZ_2
    ) {
      throw new Error("'routeTables' can only be specified for multi-AZ file systems");
    }
  }

  private validateThroughputCapacity(throughputCapacityPerHaPair?: ThroughputCapacityPerHaPair): void {
    if (throughputCapacityPerHaPair == null) {
      return;
    }
    if (throughputCapacityPerHaPair.deploymentType !== this.deploymentType) {
      throw new Error(
        `'throughputCapacityPerHaPair' must be compatible with the deployment type, deployment type: ${this.deploymentType}, deployment type from throughput capacity: ${throughputCapacityPerHaPair.deploymentType}`,
      );
    }
  }

  private validateStorageCapacity(haPairs: number = 1, storageCapacityGiB: number): void {
    if (Token.isUnresolved(storageCapacityGiB) || Token.isUnresolved(haPairs)) {
      return;
    }
    if (
      !Number.isInteger(storageCapacityGiB) ||
      storageCapacityGiB < 1024 * haPairs ||
      storageCapacityGiB > Math.min(1_048_576, 524_288 * haPairs)
    ) {
      throw new Error(
        `storageCapacityGiB must be an integer between ${1024 * haPairs} and ${Math.min(1_048_576, 524_288 * haPairs)}, got ${storageCapacityGiB}`,
      );
    }
  }
}
