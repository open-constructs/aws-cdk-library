Constructs for the Amazon ElastiCache

# ElastiCache CDK Construct

This module has constructs for [Amazon ElastiCache](https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/WhatIs.html).

* The `User` and `UserGroup` construct facliatates the creation and mangement of user for cache.
* The `ServerlessCache` construct facilitates the creation and management of Serverless Cache.

## Basic Usage for ElastiCache User and User Group

Setup required properties and create:

```ts
const user = User(this, 'User', {
  accessString: 'on ~* +@all',
  authenticationType: AuthenticationType.IAM,
});

const userGroup = new UserGroup(this, 'UserGroup', {
  users: [user],
});
```

### RBAC

From Valkey 7.2 and onward and Redis OSS 6.0 onwards, you can use a feature called Role-Based Access Control (RBAC). RBAC is also the only way to control access to serverless caches.

RBAC enables you to control cache access through user groups. These user groups are designed as a way to organize access to caches.

For more information, see [Role-Based Access Control (RBAC)](https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/Clusters.RBAC.html).

To enable RBAC for ElastiCache with Valkey or Redis OSS, you take the following steps:

- Create users.
- Create a user group and add users to the user group.
- Assign the user group to a cache.

### Create Users

First, you need to create users by using `User` construct.

With RBAC, you create users and assign them specific permissions by using `accessString` property.

For more information, see [**Specifying Permissions Using an Access String](https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/Clusters.RBAC.html#Access-string).

Also you can choose authentication type by setting `authenticationType` property:

```ts
const user = User(this, 'User', {
  // set access string
  accessString: 'on ~* +@all',
  // set IAM authentication
  authenticationType: AuthenticationType.IAM,
});
```

If you set `authenticationType` to `AuthenticationType.PASSWORD`, you can set one or two passwords:

```ts
const user = User(this, 'User', {
  accessString: 'on ~* +@all',
  // set password authentication
  authenticationType: AuthenticationType.PASSWORD,

  // set two passwords
  passwords: [
    cdk.SecretValue.unsafePlainText('adminUserPassword123'),
    cdk.SecretValue.unsafePlainText('hogehogeadminUserPassword123'),
  ],

});
```

### Add Users to the User Group

Next, create a user group by using `UserGroup` Construct and add users to the group:

```ts
declare const user: User;
declare const anotherUser: User;

const userGroup = new UserGroup(this, 'UserGroup', {
  // add a user
  users: [user],
});

// you can also add a user by using addUser method
userGroup.addUser(anotherUser);
```

ElastiCache automatically configures a default user with user ID and user name `default` and adds it to all user groups.
You can't modify or delete this user.

This user is intended for compatibility with the default behavior of previous Redis OSS versions and has an access string that permits it to call all commands and access all keys.

To add proper access control to a cache, replace this default user with a new one that isn't enabled or uses a strong password. To change the default user, create a new user with the user name set to `default`. You can then swap it with the original default user.

For more information, see [**Creating Users and User Groups with the Console and CLI**](https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/Clusters.RBAC.html#Users-management).

### Assign User Group

Finally, assign a User Group to Cache:

```ts
declare const userGroup: UserGroup;

const serverlessCache = new ServerlessCache(this, 'ServerlessCache', {
  engine: Engine.VALKEY,
  serverlessCacheName: 'my-serverless-cache',
  vpc,
  // assign User Group
  userGroup,
});

```

### Grant permissions to use IAM authentication

If you use IAM authentication, “elasticache:Connect” action must be allowed for User and Cache.

For more information, see [Authenticating with IAM]([https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/auth-iam.html](https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/auth-iam.html)).

For grant permissions, you can use `grantConnect` method in `User` and `ServerlessCache` Construct:

```ts
declare const user: User;
declare const serverlessCache: ServerlessCache;
declare const role: iam.Role;

// grant “elasticache:Connect” action permissions to Role
user.grantConnect(role);
serverlessCache.grantConncet(role);
```

### Import an existing user and user group

To import an existing  user and user group, use the `User.fromUserId` and `UserGroup.fromUserGroupId` method:

```ts
const importedUser = User.fromUserId(stack, 'ImportedUser', 'my-user-id');
const importedUserGroup = UserGroup.fromUserGroupId(this, 'ImportedUser', 'my-user-group-id');
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

Serverless Cache have a defult port `6379`.

This example allows an EC2 instance to connect to the serverless cache:

```ts
declare const serverlessCacge: ServerlessCache;
declare const instance: ec2.Instance;

// Allow the EC2 instance to connect to Serverless Cache on default port 6379
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