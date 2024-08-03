Constructs for the AWS FSx service

# Fsx for NetApp ONTAP File System CDK Construct

The `OntapFileSystem` construct facilitates the creation and management of [Amazon FSx for NetApp ONTAP](https://docs.aws.amazon.com/fsx/latest/ONTAPGuide/what-is-fsx-ontap.html) file systems within AWS CDK applications.

## Basic Usage for FSx for NetApp ONTAP

Setup required properties and create:

```ts
declare const vpc: ec2.Vpc;

const fileSystem = new OntapFileSystem(this, 'FsxOntapFileSystem', {
  ontapConfiguration: {
    deploymentType: OntapDeploymentType.SINGLE_AZ_2,
  },
  storageCapacityGiB: 1200,
  vpc,
  vpcSubnet: vpc.privateSubnets,
});
```

### Connecting to FSx for NetApp ONTAP

To control who can access the file system, use the `.connections` attribute.

This example allows an EC2 instance to connect to a file system on port 2049:

```ts
declare const fileSystem: OntapFileSystem;
declare const instance: ec2.Instance;

fileSystem.connections.allowFrom(instance, ec2.Port.tcp(2049));
```

### Deployment Type

The `OntapFileSystem` construct supports the following deployment types:

- `SINGLE_AZ_1`:  A file system configured for Single-AZ redundancy. This is a first-generation FSx for ONTAP file system.
- `SINGLE_AZ_2`: A file system configured with multiple high-availability (HA) pairs for Single-AZ redundancy. This is a second-generation FSx for ONTAP file system.
- `MULTI_AZ_1`:  A high availability file system configured for Multi-AZ redundancy to tolerate temporary Availability Zone (AZ) unavailability.  This is a first-generation FSx for ONTAP file system.
- `MULTI_AZ_2`: A high availability file system configured for Multi-AZ redundancy to tolerate temporary AZ unavailability. This is a second-generation FSx for ONTAP file system.

Only `SINGLE_AZ_2` allows setting HA pairs to a value other than 1.

### Backup

With FSx for ONTAP, you can protect your data by taking automatic daily backups and user-initiated backups of the volumes on your file system.
Creating regular backups for your volumes is a best practice that helps support your data retention and compliance needs.

You can restore volume backups to any existing FSx for ONTAP file system you have access to that is in the same AWS Region where the backup is stored.
Working with Amazon FSx backups makes it is easy to create, view, restore, and delete backups of your volumes.

To enable automatic backups, set the `automaticBackupRetention` property to a non-zero value in the `ontapConfiguration`:

```ts
declare const vpc: ec2.Vpc;

const fileSystem = new OntapFileSystem(this, 'FsxOntapFileSystem', {
  ontapConfiguration: {
    deploymentType: OntapDeploymentType.SINGLE_AZ_2,
    // Enable automatic backups and set the retention period to 3 days
    automaticBackupRetention: cdk.Duration.days(3),
    // Set the backup window to 1:00 AM UTC
    dailyAutomaticBackupStartTime: new fsx.DailyAutomaticBackupStartTime({
      hour: 1,
      minute: 0,
    }),
  },
  storageCapacityGiB: 1200,
  vpc,
  vpcSubnet: vpc.privateSubnets,
});
```

### File system storage capacity and IOPS

When you create an FSx for ONTAP file system, you specify the storage capacity of the SSD tier.

For second-generation Single-AZ file systems,
the storage capacity that you specify is spread evenly among the storage pools of each high-availability (HA) pair;
these storage pools are called aggregates.

For each GiB of SSD storage that you provision,
Amazon FSx automatically provisions 3 SSD input/output operations per second (IOPS) for the file system,
up to a maximum of 160,000 SSD IOPS per file system.

For second-generation Single-AZ file systems, your SSD IOPS are spread evenly across each of your file system's aggregates.
You have the option to specify a level of provisioned SSD IOPS above the automatic 3 SSD IOPS per GiB.

For more information, see [File system storage capacity and IOPS](https://docs.aws.amazon.com/fsx/latest/ONTAPGuide/storage-capacity-and-IOPS.html).

To specify the storage capacity and level of provisioned SSD IOPS, set the `storageCapacityGiB` in the `OntapFileSystemProps` and `diskIops` property in the `ontapConfiguration`:

```ts
declare const vpc: ec2.Vpc;

const fileSystem = new OntapFileSystem(this, 'FsxOntapFileSystem', {
  ontapConfiguration: {
    deploymentType: OntapDeploymentType.SINGLE_AZ_2,
    // Set the level of provisioned SSD IOPS to 12,288
    diskIops: 12288,
    haPairs: 2,
  },
  // Set the storage capacity to 2 TiB
  storageCapacityGiB: 2048,
  vpc,
  vpcSubnet: vpc.privateSubnets,
});
```

**Note**:

- The storage capacity has a minimum and maximum value based on the HA pairs. The minimum value is `1,024 * haPairs` GiB and the maximum value is smaller one between `524,288 * haPairs` and `1,048,576` GiB.
- The level of provisioned SSD IOPS has a minimum and maximum value based on the storage capacity. The minimum value is `3 * storageCapacityGiB * haPairs` IOPS and the maximum value is `200,000 * haPairs` IOPS.

### Multi-AZ file systems

Multi-AZ file systems support all the availability and durability features of Single-AZ file systems.
In addition, they are designed to provide continuous availability to data even when an Availability Zone is unavailable.

Multi-AZ deployments have a single HA pair of file servers,
the standby file server is deployed in a different Availability Zone from the active file server in the same AWS Region.
Any changes written to your file system are synchronously replicated across Availability Zones to the standby.

To create a Multi-AZ file system, set the `deploymentType` to `MULTI_AZ_X` and specify `endpointIpAddressRange`, `routeTables` and `preferredSubnet` in the `ontapConfiguration`:

```ts
declare const vpc: ec2.Vpc;

const fileSystem = new OntapFileSystem(this, 'FsxOntapFileSystem', {
  ontapConfiguration: {
    deploymentType: OntapDeploymentType.MULTI_AZ_2,
    // The IP address range in which the endpoints to access your file system will be created.
    endpointIpAddressRange: '192.168.39.0/24',
    // The route tables in which Amazon FSx creates the rules for routing traffic to the correct file server.
    // You should specify all virtual private cloud (VPC) route tables associated with the subnets in which your clients are located.
    routeTables: [vpc.privateSubnets.routeTable],
    // The subnet in which you want the preferred file server to be located.
    preferredSubnet: vpc.privateSubnets[0],
  },
  storageCapacityGiB: 1200,
  vpc,
  vpcSubnet: vpc.privateSubnets,
});
```

**Note**:

- `preferredSubnet` must be the part of the `vpcSubnet`.
- Amazon FSx manages VPC route tables for Multi-AZ file systems using tag-based authentication. These route tables are tagged with Key: `AmazonFSx`; Value: `ManagedByAmazonFSx`.

### Throughput Capacity

FSx for ONTAP configures throughput capacity when you create the file system.
You can modify your file system's throughput capacity at any time.

Keep in mind that your file system requires a specific configuration to achieve the maximum amount of throughput capacity.

For more information, see [Managing throughput capacity](https://docs.aws.amazon.com/fsx/latest/ONTAPGuide/managing-throughput-capacity.html).

To specify the throughput capacity, set the `throughputCapacity`  or `throughputCapacityPreHaPair` property in the `ontapConfiguration`. These properties are mutually exclusive and cannot be specified together.

`throughputCapacity` sets the total throughput amount, and `throughputCapacityPreHaPair` sets the throughput amount per HA pair. Setting `throughputCapacity` to `X` and setting `throughputCapacityPreHaPair` to `X / HA pair` have the same meaning.

This example sets the throughput capacity to 1536 MiB/s per HA pair:

```ts
declare const vpc: ec2.Vpc;

const fileSystem = new OntapFileSystem(this, 'FsxOntapFileSystem', {
  ontapConfiguration: {
    deploymentType: OntapDeploymentType.SINGLE_AZ_2,
    haPairs: 4,
    // Set the throughput capacity to 1536 MiB/s
    throughputCapacity: 6144,
    // This is equivalent to setting throughputCapacity to 1536 MiB/s
    // throughputCapacityPerHaPair: 1536,
  },
  storageCapacityGiB: 4096,
  vpc,
  vpcSubnet: vpc.privateSubnets,
});
```

### Maintenance Window

As a fully-managed service, FSx for ONTAP regularly performs maintenance on and updates to your file system.
This maintenance has no impact for most workloads.

For workloads that are performance-sensitive,
on rare occasions you may notice a brief (<60 seconds) impact on performance when maintenance is occurring;
Amazon FSx enables you to use the maintenance window to control when any such potential maintenance activity occurs.

To set the maintenance window, specify the `maintenanceWindow` property in the `ontapConfiguration`:

```ts
declare const vpc: ec2.Vpc;

const fileSystem = new OntapFileSystem(this, 'FsxOntapFileSystem', {
  ontapConfiguration: {
    deploymentType: OntapDeploymentType.SINGLE_AZ_2,
    // Set the weekly maintenance window to SUNDAY 1:00 AM UTC
    weeklyMaintenanceStartTime: new MaintenanceTime({
      day: fsx.Weekday.SUNDAY,
      hour: 1,
      minute: 0,
    }),
  },
  storageCapacityGiB: 1200,
  vpc,
  vpcSubnet: vpc.privateSubnets,
});
```

### Import an existing file system

To import an existing FSx for ONTAP file system, use the `OntapFileSystem.fromOntapFileSystemAttributes` method:

```ts
declare const existingFileSystem: fsx.IFileSystemBase;
declare const vpc: ec2.Vpc;

const fileSystem = OntapFileSystem.fromOntapFileSystemAttributes(this, 'FsxOntapFileSystem', {
  dnsName: existingFileSystem.dnsName,
  fileSystemId: existingFileSystem.fileSystemId,
  securityGroup: existingFileSystem.securityGroup,
});
```
