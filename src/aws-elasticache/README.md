Constructs for the Amazon ElastiCache

# ElastiCache CDK Construct

This module has constructs for [Amazon ElastiCache](https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/WhatIs.html).

* The `User` and `UserGroup` construct facliatates the creation and mangement of user for cache.
* The `ServerlessCache` construct facilitates the creation and management of Serverless Cache.

## Basic Usage For ElastiCache User and UserGroup

Setup required properties and create:

```ts
declare const vpc: ec2.Vpc;

const user = User(this, 'User', {
  accessString: 'on ~* +@all',
  authenticationType: AuthenticationType.IAM,
});

const userGroup = new UserGroup(this, 'UserGroup', {
  users: [user],
});
```

## Basic Usage for ElastiCache Serverless Cache

Setup required properties and create:

```ts
declare const vpc: ec2.Vpc;

const servlerlessCache = new ServerlessCache(this, 'ServerlessCache', {
  engine: Engine.VALKEY,
  vpc,
});
```

### Connecting to ElastiCache Serverless Cache

To control who can access the serveless cache, use the `.connections` attribute.

Serverless Cache have a defult port 6379.

This example allows an EC2 instance to connect to the serverless cache:

```ts
declare const serverlessCacge: ServerlessCache;
declare const instance: ec2.Instance;

serverlessCacge.connections.allowDefaultPortFrom(instance);
```

The endpoint and the port to access your serveless cache will be available as the `.endpointAddress` and `.endpointPort` attributes:

```ts
declare const serverlessCacge: ServerlessCache;

const endpointAddress = serverlessCacge.endpointAddress;
const endpointPort = serverlessCacge.endpointPort;
```

### Snapshots and restore

You can enable automatic backups for Serverless Cache.
When automatic backups are enabled, ElastiCache creates a backup of the cache on a daily basis.

Also you can set the backup window for any time when it's most convenient. If you don't specify a backup window, ElastiCache assigns one automatically.

For more information, see [Scheduling automatic backups](https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/backups-automatic.html).

To enable automatic backups, set the `dailySnapshotTime` property to snapshot created time:

```ts
declare const vpc: ec2.Vpc;

const serverlessCache = new ServerlessCache(this, 'ServerlessCache', {
  engine: Engine.VALKEY,
  // Enable automatic backups and set the retention period to 6 days
  snapshotRetentionLimit: 6,
  // Set the daily snapshot created time to 12:00 AM UTC
  dailySnapshotTime: new DailySnapshotTime({ hour: 12, minute: 0 }),
  vpc,
});
```

You can create a final backup by setting `finalSnapshotName` property.

```ts
declare const vpc: ec2.Vpc;

const serverlessCache = new ServerlessCache(this, 'ServerlessCache', {
  engine: Engine.VALKEY,
  // Set the final snapshot name
  finalSnapshotName: 'my-finalsnapshot',
  vpc,
});
```

You can restore from snapshots by setting snapshot ARNs to `snapshotArnsToRestore` property:

```ts
declare const vpc: ec2.Vpc;

const serverlessCache = new ServerlessCache(this, 'ServerlessCache', {
  engine: Engine.VALKEY,
  // Set the snapshot to restore
  snapshotArnsToRestore: ['arn:aws:elasticache:us-east-1:123456789012:serverlesscachesnapshot:my-final-snapshot'],
  vpc,
});
```

### Cutomer Managed Key for encryption at rest

ElastiCache supports symmetric Customer Managed key (CMK) for encryption at rest.

For more information, see [Using customer managed keys from AWS KMS](https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/at-rest-encryption.html#using-customer-managed-keys-for-elasticache-security).

To use CMK, set your CMK to `kmstKey` propety:

```ts
declare const kmsKey: kms.Key;

const serverlessCache = new ServerlessCache(this, 'ServerlessCache', {
  engine: Engine.VALKEY,
  serverlessCacheName: 'my-serverless-cache',
  vpc,
  // set Cutomer Managed Key
  kmsKey,
});
```

### User Group

You can apply RBAC to a Serveless Cache with Valkey or Redis OSS by setting `userGroup` property.

For more information, see [Role-Based Access Control (RBAC)](https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/Clusters.RBAC.html).

```ts
declare const userGroup: UserGroup;

const serverlessCache = new ServerlessCache(this, 'ServerlessCache', {
  engine: Engine.VALKEY,
  serverlessCacheName: 'my-serverless-cache',
  vpc,
  // set User Group
  userGroup,
});
```

### Import an existing Serverless Cache

To import an existing ServerlessCache, use the `ServerlessCache.fromServerlessCacheAttributes` method:

```ts
declare const vpc: ec2.Vpc;
declare const securityGroup: ec2.SecurityGroup;

const importedServerlessCache = ServerlessCache.fromServerlessCacheAttributes(this, 'ImportedServerlessCache', {
  serverlessCacheName: 'my-serverless-cache',
  securityGroups: [securityGroup],
  endpointAddress: 'my-serverless-cache.endpoint.com',
  endpointPort: 6379,
});
```
