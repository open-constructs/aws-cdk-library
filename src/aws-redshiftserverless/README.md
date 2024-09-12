Constructs for thw Amazon Redshift Serverlss

# Redshift Serverless CDK Construct

## Overview

The `Namespace` construct and the `Workgroup` construct facilitate the creation and management of [Redshift Serverless Workgroups and namespaces](https://docs.aws.amazon.com/redshift/latest/mgmt/serverless-workgroup-namespace.html) within AWS CDK applications.

## Usage

Import the necessary classes from AWS CDK and this construct and create a VPC for the workgroup:

```ts
import { App, Stack } from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Namespace, Workgroup } from '@open-constructs/aws-cdk/aws-redshiftserverless';

const app = new App();
const stack = new Stack(app, 'RedshiftServerlessStack',{
  account: '012345678901'
  region: 'us-east-1',
});
const vpc = new ec2.Vpc(stack, 'MyVpc');
```

**Note** If you want to use `Vpc` Construct to create a VPC for `Workgroup`, you must specify `account` and `region` in `Stack`.
`Workgroup` needs at least three subnets, and they must span across three Availability Zones.

The environment-agnostic stacks will be created with access to only 2 AZs (Ref: [`maxAzs` property docs](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ec2.Vpc.html#maxazs))

For more infomation about Redshift Serverles's limitations, see [Considerations when using Amazon Redshift Serverless](https://docs.aws.amazon.com/redshift/latest/mgmt/serverless-usage-considerations.html).

### Basic Example

Here's how you can create a namespace and a workgroup:

```ts
import { SecretValue } from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
declare const defaultIamRole: iam.IRole;
declare const anotherIamRole: iam.IRole;

const namespace = new redshiftserverless.Namespace(stack, 'Namespace', {
  namespaceName: 'my-namespace',
  defaultIamRole: myIamRole, // Specify a default IAM role
  iamRoles: [defaultIamRole, anotherIamRole], // Assign IAM roles list which must include default IAM Role
});

const workgroup = new redshiftserverless.Workgroup(stack, 'MyWorkgroup', {
  workgroupName: 'my-workgroup',
  namespace,
  vpc,
});
```

### Advanced Example

Creating a namespace and a workgroup with custom settings:

```ts

declare const workgroupSecurityGroup: ec2.ISecurityGroup;


const namespace = new redshiftserverless.Namespace(stack, 'MyCustomNamespace', {
  namespaceName: 'my-custom-namespace',
  dbName: 'mydb', // Spacify user-defined database name
  adminUsername: 'admin', // Specify user-defined admin username
  adminUserpassword: SecretValue.unsafePlainText('My-password-123!'), // Spacify user-defined admin password
  logExports: [redshiftserverless.LogExport.USER_LOG], // Log export settings
});

const workgroup = new redshiftserverless.Workgroup(stack, 'MyCustomWorkgroup', {
  workgroupName: 'my-custom-workgroup',
  namespace,
  vpc,
  baseCapacity: 32, // Specify Base Capacity uses to serve queries
  securityGroups: [workgroupSecurityGroup], // Specify user-defined security groups
});
```

### Import an existing endpoint:
You can import existing namespaces and workgroups:

```ts
declare const securityGroup: ec2.ISecurityGroup;

const importedNamespace = redshiftserverless.Namespace.fromNamespaceAttributes(stack, 'ImportedNamespace', {
  namespaceId: 'my-namespace-id',
  namespaceName: 'my-namespace-name',
});

const importedWorkgroup = redshiftserverless.Workgroup.fromWorkgroupAttributes(stack, 'ImportedWorkgroup', {
  workgroupName: 'my-workgroup',
  workgroupId: 'my-workgroup-id',
  endpointAddress: 'my-workgroup.endpoint.com',
  port: 5439,
  securityGroups: [securityGroup],
});
```
