Constructs for the Amazon ElastiCache

# ElastiCache CDK Construct

This module has constructs for [Amazon ElastiCache](https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/WhatIs.html).

* The `User` and `UserGroup` constructs facilitate the creation and management of users for the cache.
* The `ServerlessCache` construct facilitates the creation and management of serverless cache.

## Basic Usage for user and user group

Setup required properties and create:

```ts
const newDefaultUser = new NoPasswordRequiredUser(this, 'DefaultUser', {
  userName: 'default',
});

const userGroup = new UserGroup(this, 'UserGroup', {
  users: [defaultUser],
});
```

### RBAC

In Valkey 7.2 and onward and Redis OSS 6.0 onward you can use a feature called Role-Based Access Control (RBAC). RBAC is also the only way to control access to serverless caches.

RBAC enables you to control cache access through user groups. These user groups are designed as a way to organize access to caches.

For more information, see [Role-Based Access Control (RBAC)](https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/Clusters.RBAC.html).

To enable RBAC for ElastiCache with Valkey or Redis OSS, you take the following steps:

- Create users.
- Create a user group and add users to the user group.
- Assign the user group to a cache.

### Create users

First, you need to create users by using `IamUser`, `PasswordUser` or `NoPasswordRequiredUser` construct.

With RBAC, you create users and assign them specific permissions by using `accessString` property.

For more information, see [Specifying Permissions Using an Access String](https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/Clusters.RBAC.html#Access-string).

You can create an IAM-enabled user by using `IamUser` construct:

```ts
const user = new IamUser(this, 'User', {
  // set user id
  userId: 'my-user',

  // set access string
  accessString: 'on ~* +@all',
});
```

> NOTE: You can't set username in `IamUser` construct because IAM-enabled users must have matching user id and username. For more information, see [Limitations](https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/auth-iam.html). The construct automatically sets the username to be the same as the user id.

If you want to create a password authenticated user, use `PasswordUser` construct:

```ts
const user = new PasswordUser(this, 'User', {
  // set user id
  userId: 'my-user-id',

  // set access string
  accessString: 'on ~* +@all',

  // set username
  userName: 'my-user-name',

  // set up to two passwords
  passwords: [
    cdk.SecretValue.unsafePlainText('adminUserPassword123'),
    cdk.SecretValue.unsafePlainText('anotherAdminUserPassword123'),
  ],
});
```

If the `passwords` property is not specified, a single password will be automatically generated and stored in AWS Secrets Manager.

```ts
const user = new PasswordUser(this, 'User', {
  userId: 'my-user-id',
  accessString: 'on ~* +@all',
  userName: 'my-user-name',
  // `passwords` property is not specified and a single password will be generated
});

// you can access the ISecret object
user.generatedSecret
```

You can also create a no password required user by using `NoPasswordRequiredUser` construct:

```ts
const user = new NoPasswordRequiredUser(this, 'User', {
  // set user id
  userId: 'my-user-id',

  // set access string
  accessString: 'on ~* +@all',

  // set username
  userName: 'my-user-name',
});
```

### Default user

ElastiCache automatically creates a default user with both a user ID and username set to `default`. This default user cannot be modified or deleted. The user is created as a no password authentication user.

This user is intended for compatibility with the default behavior of previous Redis OSS versions and has an access string that permits it to call all commands and access all keys.

To use this automatically created default user in CDK, you can import it using `NoPasswordRequiredUser.fromUserAttributes` method. For more information on import methods, see the [Import an existing user and user group](#import-an-existing-user-and-user-group) section.

To add proper access control to a cache, replace the default user with a new one that is either disabled by setting the `accessString` to `off -@all` or secured with a strong password.

To change the default user, create a new default user with the username set to `default`. You can then swap it with the original default user.

For more information, see [Applying RBAC to a Cache for ElastiCache with Valkey or Redis OSS](https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/Clusters.RBAC.html#rbac-using).

If you want to create a new default user, `userName` must be `default` and `userId` must not be `default` by using `NoPasswordRequiredUser` or `PasswordUser`:

```ts
// use the original `default` user by using import method
const defaultUser = NoPasswordRequiredUser.fromUserAttributes(this, 'DefaultUser', {
  // userId and userName must be 'default'
  userId: 'default',
  userName: 'default',
});

// create a new default user
const newDefaultUser = new NoPasswordRequiredUser(this, 'NewDefaultUser', {
  // new default user id must not be 'default'
  userId: 'new-default',
  // default username must be 'default'
  userName: 'default',
});
```

> NOTE: You can't create a new default user using `IamUser` because an IAM-enabled user's username and user ID cannot be different.

### Add users to the user group

Next, use the `UserGroup` construct to create a user group and add users to it.
Ensure that you include either the original default user or a new default user:

```ts
declare const newDefaultUser: User;
declare const user: User;
declare const anotherUser: User;

const userGroup = new UserGroup(this, 'UserGroup', {
  // add users including default user
  users: [newDefaultUser, user],
});

// you can also add a user by using addUser method
userGroup.addUser(anotherUser);
```

### Assign user group

Finally, assign a user group to cache:

```ts
declare const vpc: ec2.Vpc;
declare const userGroup: UserGroup;

const serverlessCache = new ServerlessCache(this, 'ServerlessCache', {
  engine: Engine.VALKEY,
  majorEngineVersion: MajorVersion.VER_8,
  serverlessCacheName: 'my-serverless-cache',
  vpc,
  // assign User Group
  userGroup,
});

```

### Grant permissions to IAM-enabled users

If you create IAM-enabled users, `"elasticache:Connect"` action must be allowed for the users and cache.

> NOTE: You don't need grant permissions to no password required users or password authentication users.

For more information, see [Authenticating with IAM](https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/auth-iam.html).

To grant permissions, you can use the `grantConnect` method in `IamUser` and `ServerlessCache` constructs:

```ts
declare const user: IamUser;
declare const serverlessCache: ServerlessCache;
declare const role: iam.Role;

// grant "elasticache:Connect" action permissions to role
user.grantConnect(role);
serverlessCache.grantConnect(role);
```

### Import an existing user and user group

You can import an existing user and user group by using import methods:

```ts
const importedIamUser = IamUser.fromUserId(this, 'ImportedIamUser', 'my-iam-user-id');

const importedPasswordUser = PasswordUser.fromUserAttributes(stack, 'ImportedPasswordUser', {
  userId: 'my-password-user-id',
  userName: 'my-password-user-name',
});

const importedNoPasswordRequiredUser = NoPasswordRequiredUser.fromUserAttributes(stack, 'ImportedNoPasswordUser', {
  userId: 'my-no-password-user-id',
  userName: 'my-no-password-user-name',
});

const importedUserGroup = UserGroup.fromUserGroupId(this, 'ImportedUserGroup', 'my-user-group-id');
```

## Basic Usage for serverless cache

Setup required properties and create:

```ts
declare const vpc: ec2.Vpc;

const serverlessCache = new ServerlessCache(this, 'ServerlessCache', {
  engine: Engine.VALKEY,
  vpc,
  majorEngineVersion: MajorVersion.VER_8,
});
```

### Connecting to serverless cache

To control who can access the serverless cache by the security groups, use the `.connections` attribute.

The serverless cache has a default port `6379`.

This example allows an EC2 instance to connect to the serverless cache:

```ts
declare const serverlessCache: ServerlessCache;
declare const instance: ec2.Instance;

// allow the EC2 instance to connect to serverless cache on default port 6379
serverlessCache.connections.allowDefaultPortFrom(instance);
```

The endpoint and the port to access your serverless cache will be available as the `.endpointAddress` and `.endpointPort` attributes:

```ts
declare const serverlessCache: ServerlessCache;

const endpointAddress = serverlessCache.endpointAddress;
const endpointPort = serverlessCache.endpointPort;
```

### Cache usage limits

You can choose to configure a maximum usage on both cache data storage and ECPU/second for your cache to control cache costs.
Doing so will ensure that your cache usage never exceeds the configured maximum.

For more infomation, see [Setting scaling limits to manage costs](https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/Scaling.html#Pre-Scaling).

```ts
declare const vpc: ec2.Vpc;

const serverlessCache = new ServerlessCache(this, 'ServerlessCache', {
  engine: Engine.VALKEY,
  vpc,
  cacheUsageLimits: {
    // cache data storage limits (GB)
    dataStorage: DataStorage.gb({ min: 1, max: 5000 }), // min: 1GB, max: 5000GB
    // ECPU limits (ECPU/second)
    ecpuPerSecond: ECPUPerSecond.of({ min: 1000, max: 15000000 }), // min: 1000, max: 15000000
  },
});
```

### Snapshots and restore

You can enable automatic backups for serverless cache.
When automatic backups are enabled, ElastiCache creates a backup of the cache on a daily basis.

Also you can set the backup window for any time when it's most convenient.
If you don't specify a backup window, ElastiCache assigns one automatically.

For more information, see [Scheduling automatic backups](https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/backups-automatic.html).

To enable automatic backups, set the `snapshotRetentionLimit` property. You can also specify the snapshot creation time by setting `dailySnapshotTime` property:

```ts
declare const vpc: ec2.Vpc;

const serverlessCache = new ServerlessCache(this, 'ServerlessCache', {
  engine: Engine.VALKEY,
  // enable automatic backups and set the retention period to 6 days
  snapshotRetentionLimit: 6,
  // set the backup window to 12:00 AM UTC
  dailySnapshotTime: new DailySnapshotTime({ hour: 12, minute: 0 }),
  vpc,
  majorEngineVersion: MajorVersion.VER_8,
});
```

You can create a final backup by setting `finalSnapshotName` property.

```ts
declare const vpc: ec2.Vpc;

const serverlessCache = new ServerlessCache(this, 'ServerlessCache', {
  engine: Engine.VALKEY,
  // set the final snapshot name
  finalSnapshotName: 'my-finalsnapshot',
  vpc,
  majorEngineVersion: MajorVersion.VER_8,
});
```

You can restore from snapshots by setting snapshot ARNs to `snapshotArnsToRestore` property:

```ts
declare const vpc: ec2.Vpc;

const serverlessCache = new ServerlessCache(this, 'ServerlessCache', {
  engine: Engine.VALKEY,
  // set the snapshot to restore
  snapshotArnsToRestore: ['arn:aws:elasticache:us-east-1:123456789012:serverlesscachesnapshot:my-final-snapshot'],
  vpc,
  majorEngineVersion: MajorVersion.VER_8,
});
```

### Customer Managed Key for encryption at rest

ElastiCache supports symmetric Customer Managed key (CMK) for encryption at rest.

For more information, see [Using customer managed keys from AWS KMS](https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/at-rest-encryption.html#using-customer-managed-keys-for-elasticache-security).

To use CMK, set your CMK to the `kmsKey` property:

```ts
declare const kmsKey: kms.Key;

const serverlessCache = new ServerlessCache(this, 'ServerlessCache', {
  engine: Engine.VALKEY,
  serverlessCacheName: 'my-serverless-cache',
  vpc,
  // set Customer Managed Key
  kmsKey,
  majorEngineVersion: MajorVersion.VER_8,
});
```

### Metrics

You can monitor your serverless cache using CloudWatch Metrics via the `metric` method.

For more information about serverless cache metrics, see [Serverless metrics and events for Valkey and Redis OSS](https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/serverless-metrics-events-redis.html) and [Serverless metrics and events for Memcached](https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/serverless-metrics-events.memcached.html).

```ts
declare const serverlessCache: ServerlessCache;

// The 5 minutes average of the total number of successful read-only key lookups in the cache over 5 minutes.
const cacheHits = serverlessCache.metric('CacheHits', { statistic: 'sum' });

// The 5 minutes average of the total number of bytes used by the data stored in your cache over 5 minutes.
const bytesUsedForCache = serverlessCache.metricBytesUsedForCache();

// The 5 minutes average of the total number of ElastiCacheProcessingUnits (ECPUs) consumed by the requests executed on your cache.
const elastiCacheProcessingUnits = serverlessCache.metricElastiCacheProcessingUnits();

// Create an alarm for ECPUs.
elastiCacheProcessingUnits.createAlarm(this, 'ElastiCacheProcessingUnitsAlarm', {
  threshold: 50,
  evaluationPeriods: 1,
});
```

### Import an existing serverless cache

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
