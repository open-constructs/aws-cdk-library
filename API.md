# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### CostReport <a name="CostReport" id="@open-constructs/aws-cdk.aws_cur.CostReport"></a>

Represents a Cost Report construct in AWS CDK.

This class creates an AWS Cost and Usage Report, stored in an S3 bucket, and configures the necessary permissions.

*Example*

```typescript
const report = new CostReport(stack, 'MyReport', {
  costReportName: 'business-report',
  reportGranularity: ReportGranularity.MONTHLY,
  format: CurFormat.PARQUET
});
```


#### Initializers <a name="Initializers" id="@open-constructs/aws-cdk.aws_cur.CostReport.Initializer"></a>

```typescript
import { aws_cur } from '@open-constructs/aws-cdk'

new aws_cur.CostReport(scope: Construct, id: string, props: CostReportProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_cur.CostReport.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@open-constructs/aws-cdk.aws_cur.CostReport.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@open-constructs/aws-cdk.aws_cur.CostReport.Initializer.parameter.props">props</a></code> | <code>@open-constructs/aws-cdk.aws_cur.CostReportProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@open-constructs/aws-cdk.aws_cur.CostReport.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@open-constructs/aws-cdk.aws_cur.CostReport.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@open-constructs/aws-cdk.aws_cur.CostReport.Initializer.parameter.props"></a>

- *Type:* @open-constructs/aws-cdk.aws_cur.CostReportProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_cur.CostReport.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@open-constructs/aws-cdk.aws_cur.CostReport.applyRemovalPolicy">applyRemovalPolicy</a></code> | Apply the given removal policy to this resource. |

---

##### `toString` <a name="toString" id="@open-constructs/aws-cdk.aws_cur.CostReport.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `applyRemovalPolicy` <a name="applyRemovalPolicy" id="@open-constructs/aws-cdk.aws_cur.CostReport.applyRemovalPolicy"></a>

```typescript
public applyRemovalPolicy(policy: RemovalPolicy): void
```

Apply the given removal policy to this resource.

The Removal Policy controls what happens to this resource when it stops
being managed by CloudFormation, either because you've removed it from the
CDK application or because you've made a change that requires the resource
to be replaced.

The resource can be deleted (`RemovalPolicy.DESTROY`), or left in your AWS
account for data recovery and cleanup later (`RemovalPolicy.RETAIN`).

###### `policy`<sup>Required</sup> <a name="policy" id="@open-constructs/aws-cdk.aws_cur.CostReport.applyRemovalPolicy.parameter.policy"></a>

- *Type:* aws-cdk-lib.RemovalPolicy

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_cur.CostReport.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@open-constructs/aws-cdk.aws_cur.CostReport.isOwnedResource">isOwnedResource</a></code> | Returns true if the construct was created by CDK, and false otherwise. |
| <code><a href="#@open-constructs/aws-cdk.aws_cur.CostReport.isResource">isResource</a></code> | Check whether the given construct is a Resource. |

---

##### `isConstruct` <a name="isConstruct" id="@open-constructs/aws-cdk.aws_cur.CostReport.isConstruct"></a>

```typescript
import { aws_cur } from '@open-constructs/aws-cdk'

aws_cur.CostReport.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="@open-constructs/aws-cdk.aws_cur.CostReport.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isOwnedResource` <a name="isOwnedResource" id="@open-constructs/aws-cdk.aws_cur.CostReport.isOwnedResource"></a>

```typescript
import { aws_cur } from '@open-constructs/aws-cdk'

aws_cur.CostReport.isOwnedResource(construct: IConstruct)
```

Returns true if the construct was created by CDK, and false otherwise.

###### `construct`<sup>Required</sup> <a name="construct" id="@open-constructs/aws-cdk.aws_cur.CostReport.isOwnedResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

##### `isResource` <a name="isResource" id="@open-constructs/aws-cdk.aws_cur.CostReport.isResource"></a>

```typescript
import { aws_cur } from '@open-constructs/aws-cdk'

aws_cur.CostReport.isResource(construct: IConstruct)
```

Check whether the given construct is a Resource.

###### `construct`<sup>Required</sup> <a name="construct" id="@open-constructs/aws-cdk.aws_cur.CostReport.isResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_cur.CostReport.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@open-constructs/aws-cdk.aws_cur.CostReport.property.env">env</a></code> | <code>aws-cdk-lib.ResourceEnvironment</code> | The environment this resource belongs to. |
| <code><a href="#@open-constructs/aws-cdk.aws_cur.CostReport.property.stack">stack</a></code> | <code>aws-cdk-lib.Stack</code> | The stack in which this resource is defined. |
| <code><a href="#@open-constructs/aws-cdk.aws_cur.CostReport.property.costReportName">costReportName</a></code> | <code>string</code> | The name of the cost report. |
| <code><a href="#@open-constructs/aws-cdk.aws_cur.CostReport.property.reportBucket">reportBucket</a></code> | <code>aws-cdk-lib.aws_s3.IBucket</code> | The S3 bucket that stores the cost report. |

---

##### `node`<sup>Required</sup> <a name="node" id="@open-constructs/aws-cdk.aws_cur.CostReport.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `env`<sup>Required</sup> <a name="env" id="@open-constructs/aws-cdk.aws_cur.CostReport.property.env"></a>

```typescript
public readonly env: ResourceEnvironment;
```

- *Type:* aws-cdk-lib.ResourceEnvironment

The environment this resource belongs to.

For resources that are created and managed by the CDK
(generally, those created by creating new class instances like Role, Bucket, etc.),
this is always the same as the environment of the stack they belong to;
however, for imported resources
(those obtained from static methods like fromRoleArn, fromBucketName, etc.),
that might be different than the stack they were imported into.

---

##### `stack`<sup>Required</sup> <a name="stack" id="@open-constructs/aws-cdk.aws_cur.CostReport.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- *Type:* aws-cdk-lib.Stack

The stack in which this resource is defined.

---

##### `costReportName`<sup>Required</sup> <a name="costReportName" id="@open-constructs/aws-cdk.aws_cur.CostReport.property.costReportName"></a>

```typescript
public readonly costReportName: string;
```

- *Type:* string

The name of the cost report.

---

##### `reportBucket`<sup>Required</sup> <a name="reportBucket" id="@open-constructs/aws-cdk.aws_cur.CostReport.property.reportBucket"></a>

```typescript
public readonly reportBucket: IBucket;
```

- *Type:* aws-cdk-lib.aws_s3.IBucket

The S3 bucket that stores the cost report.

---


### InstanceConnectEndpoint <a name="InstanceConnectEndpoint" id="@open-constructs/aws-cdk.aws_ec2.InstanceConnectEndpoint"></a>

- *Implements:* @open-constructs/aws-cdk.aws_ec2.IInstanceConnectEndpoint

Represents an EC2 Instance Connect Endpoint construct in AWS CDK.

*Example*

```typescript
declare const securityGroups: aws_ec2.ISecurityGroup[];
declare const vpc: aws_ec2.IVpc;

const instanceConnectEndpoint = new InstanceConnectEndpoint(
  stack,
  'InstanceConnectEndpoint',
  {
    clientToken: 'my-client-token',
    preserveClientIp: true,
    securityGroups,
    vpc,
  },
);
```


#### Initializers <a name="Initializers" id="@open-constructs/aws-cdk.aws_ec2.InstanceConnectEndpoint.Initializer"></a>

```typescript
import { aws_ec2 } from '@open-constructs/aws-cdk'

new aws_ec2.InstanceConnectEndpoint(scope: Construct, id: string, props: InstanceConnectEndpointProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_ec2.InstanceConnectEndpoint.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@open-constructs/aws-cdk.aws_ec2.InstanceConnectEndpoint.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@open-constructs/aws-cdk.aws_ec2.InstanceConnectEndpoint.Initializer.parameter.props">props</a></code> | <code>@open-constructs/aws-cdk.aws_ec2.InstanceConnectEndpointProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@open-constructs/aws-cdk.aws_ec2.InstanceConnectEndpoint.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@open-constructs/aws-cdk.aws_ec2.InstanceConnectEndpoint.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@open-constructs/aws-cdk.aws_ec2.InstanceConnectEndpoint.Initializer.parameter.props"></a>

- *Type:* @open-constructs/aws-cdk.aws_ec2.InstanceConnectEndpointProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_ec2.InstanceConnectEndpoint.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@open-constructs/aws-cdk.aws_ec2.InstanceConnectEndpoint.applyRemovalPolicy">applyRemovalPolicy</a></code> | Apply the given removal policy to this resource. |

---

##### `toString` <a name="toString" id="@open-constructs/aws-cdk.aws_ec2.InstanceConnectEndpoint.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `applyRemovalPolicy` <a name="applyRemovalPolicy" id="@open-constructs/aws-cdk.aws_ec2.InstanceConnectEndpoint.applyRemovalPolicy"></a>

```typescript
public applyRemovalPolicy(policy: RemovalPolicy): void
```

Apply the given removal policy to this resource.

The Removal Policy controls what happens to this resource when it stops
being managed by CloudFormation, either because you've removed it from the
CDK application or because you've made a change that requires the resource
to be replaced.

The resource can be deleted (`RemovalPolicy.DESTROY`), or left in your AWS
account for data recovery and cleanup later (`RemovalPolicy.RETAIN`).

###### `policy`<sup>Required</sup> <a name="policy" id="@open-constructs/aws-cdk.aws_ec2.InstanceConnectEndpoint.applyRemovalPolicy.parameter.policy"></a>

- *Type:* aws-cdk-lib.RemovalPolicy

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_ec2.InstanceConnectEndpoint.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@open-constructs/aws-cdk.aws_ec2.InstanceConnectEndpoint.isOwnedResource">isOwnedResource</a></code> | Returns true if the construct was created by CDK, and false otherwise. |
| <code><a href="#@open-constructs/aws-cdk.aws_ec2.InstanceConnectEndpoint.isResource">isResource</a></code> | Check whether the given construct is a Resource. |
| <code><a href="#@open-constructs/aws-cdk.aws_ec2.InstanceConnectEndpoint.fromInstanceConnectEndpointAttributes">fromInstanceConnectEndpointAttributes</a></code> | Import an existing endpoint to the stack from its attributes. |

---

##### `isConstruct` <a name="isConstruct" id="@open-constructs/aws-cdk.aws_ec2.InstanceConnectEndpoint.isConstruct"></a>

```typescript
import { aws_ec2 } from '@open-constructs/aws-cdk'

aws_ec2.InstanceConnectEndpoint.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="@open-constructs/aws-cdk.aws_ec2.InstanceConnectEndpoint.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isOwnedResource` <a name="isOwnedResource" id="@open-constructs/aws-cdk.aws_ec2.InstanceConnectEndpoint.isOwnedResource"></a>

```typescript
import { aws_ec2 } from '@open-constructs/aws-cdk'

aws_ec2.InstanceConnectEndpoint.isOwnedResource(construct: IConstruct)
```

Returns true if the construct was created by CDK, and false otherwise.

###### `construct`<sup>Required</sup> <a name="construct" id="@open-constructs/aws-cdk.aws_ec2.InstanceConnectEndpoint.isOwnedResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

##### `isResource` <a name="isResource" id="@open-constructs/aws-cdk.aws_ec2.InstanceConnectEndpoint.isResource"></a>

```typescript
import { aws_ec2 } from '@open-constructs/aws-cdk'

aws_ec2.InstanceConnectEndpoint.isResource(construct: IConstruct)
```

Check whether the given construct is a Resource.

###### `construct`<sup>Required</sup> <a name="construct" id="@open-constructs/aws-cdk.aws_ec2.InstanceConnectEndpoint.isResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

##### `fromInstanceConnectEndpointAttributes` <a name="fromInstanceConnectEndpointAttributes" id="@open-constructs/aws-cdk.aws_ec2.InstanceConnectEndpoint.fromInstanceConnectEndpointAttributes"></a>

```typescript
import { aws_ec2 } from '@open-constructs/aws-cdk'

aws_ec2.InstanceConnectEndpoint.fromInstanceConnectEndpointAttributes(scope: Construct, id: string, attrs: InstanceConnectEndpointAttributes)
```

Import an existing endpoint to the stack from its attributes.

###### `scope`<sup>Required</sup> <a name="scope" id="@open-constructs/aws-cdk.aws_ec2.InstanceConnectEndpoint.fromInstanceConnectEndpointAttributes.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `id`<sup>Required</sup> <a name="id" id="@open-constructs/aws-cdk.aws_ec2.InstanceConnectEndpoint.fromInstanceConnectEndpointAttributes.parameter.id"></a>

- *Type:* string

---

###### `attrs`<sup>Required</sup> <a name="attrs" id="@open-constructs/aws-cdk.aws_ec2.InstanceConnectEndpoint.fromInstanceConnectEndpointAttributes.parameter.attrs"></a>

- *Type:* @open-constructs/aws-cdk.aws_ec2.InstanceConnectEndpointAttributes

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_ec2.InstanceConnectEndpoint.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@open-constructs/aws-cdk.aws_ec2.InstanceConnectEndpoint.property.env">env</a></code> | <code>aws-cdk-lib.ResourceEnvironment</code> | The environment this resource belongs to. |
| <code><a href="#@open-constructs/aws-cdk.aws_ec2.InstanceConnectEndpoint.property.stack">stack</a></code> | <code>aws-cdk-lib.Stack</code> | The stack in which this resource is defined. |
| <code><a href="#@open-constructs/aws-cdk.aws_ec2.InstanceConnectEndpoint.property.connections">connections</a></code> | <code>aws-cdk-lib.aws_ec2.Connections</code> | The connection object associated with the EC2 Instance Connect Endpoint. |
| <code><a href="#@open-constructs/aws-cdk.aws_ec2.InstanceConnectEndpoint.property.instanceConnectEndpointId">instanceConnectEndpointId</a></code> | <code>string</code> | The ID of the EC2 Instance Connect Endpoint. |

---

##### `node`<sup>Required</sup> <a name="node" id="@open-constructs/aws-cdk.aws_ec2.InstanceConnectEndpoint.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `env`<sup>Required</sup> <a name="env" id="@open-constructs/aws-cdk.aws_ec2.InstanceConnectEndpoint.property.env"></a>

```typescript
public readonly env: ResourceEnvironment;
```

- *Type:* aws-cdk-lib.ResourceEnvironment

The environment this resource belongs to.

For resources that are created and managed by the CDK
(generally, those created by creating new class instances like Role, Bucket, etc.),
this is always the same as the environment of the stack they belong to;
however, for imported resources
(those obtained from static methods like fromRoleArn, fromBucketName, etc.),
that might be different than the stack they were imported into.

---

##### `stack`<sup>Required</sup> <a name="stack" id="@open-constructs/aws-cdk.aws_ec2.InstanceConnectEndpoint.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- *Type:* aws-cdk-lib.Stack

The stack in which this resource is defined.

---

##### `connections`<sup>Required</sup> <a name="connections" id="@open-constructs/aws-cdk.aws_ec2.InstanceConnectEndpoint.property.connections"></a>

```typescript
public readonly connections: Connections;
```

- *Type:* aws-cdk-lib.aws_ec2.Connections

The connection object associated with the EC2 Instance Connect Endpoint.

---

##### `instanceConnectEndpointId`<sup>Required</sup> <a name="instanceConnectEndpointId" id="@open-constructs/aws-cdk.aws_ec2.InstanceConnectEndpoint.property.instanceConnectEndpointId"></a>

```typescript
public readonly instanceConnectEndpointId: string;
```

- *Type:* string

The ID of the EC2 Instance Connect Endpoint.

---


### OntapFileSystem <a name="OntapFileSystem" id="@open-constructs/aws-cdk.aws_fsx.OntapFileSystem"></a>

The FSx for NetApp ONTAP File System implementation of IFileSystem.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-fsx-filesystem.html](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-fsx-filesystem.html)

#### Initializers <a name="Initializers" id="@open-constructs/aws-cdk.aws_fsx.OntapFileSystem.Initializer"></a>

```typescript
import { aws_fsx } from '@open-constructs/aws-cdk'

new aws_fsx.OntapFileSystem(scope: Construct, id: string, props: OntapFileSystemProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.OntapFileSystem.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.OntapFileSystem.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.OntapFileSystem.Initializer.parameter.props">props</a></code> | <code>@open-constructs/aws-cdk.aws_fsx.OntapFileSystemProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@open-constructs/aws-cdk.aws_fsx.OntapFileSystem.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@open-constructs/aws-cdk.aws_fsx.OntapFileSystem.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@open-constructs/aws-cdk.aws_fsx.OntapFileSystem.Initializer.parameter.props"></a>

- *Type:* @open-constructs/aws-cdk.aws_fsx.OntapFileSystemProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.OntapFileSystem.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.OntapFileSystem.applyRemovalPolicy">applyRemovalPolicy</a></code> | Apply the given removal policy to this resource. |

---

##### `toString` <a name="toString" id="@open-constructs/aws-cdk.aws_fsx.OntapFileSystem.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `applyRemovalPolicy` <a name="applyRemovalPolicy" id="@open-constructs/aws-cdk.aws_fsx.OntapFileSystem.applyRemovalPolicy"></a>

```typescript
public applyRemovalPolicy(policy: RemovalPolicy): void
```

Apply the given removal policy to this resource.

The Removal Policy controls what happens to this resource when it stops
being managed by CloudFormation, either because you've removed it from the
CDK application or because you've made a change that requires the resource
to be replaced.

The resource can be deleted (`RemovalPolicy.DESTROY`), or left in your AWS
account for data recovery and cleanup later (`RemovalPolicy.RETAIN`).

###### `policy`<sup>Required</sup> <a name="policy" id="@open-constructs/aws-cdk.aws_fsx.OntapFileSystem.applyRemovalPolicy.parameter.policy"></a>

- *Type:* aws-cdk-lib.RemovalPolicy

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.OntapFileSystem.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.OntapFileSystem.isOwnedResource">isOwnedResource</a></code> | Returns true if the construct was created by CDK, and false otherwise. |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.OntapFileSystem.isResource">isResource</a></code> | Check whether the given construct is a Resource. |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.OntapFileSystem.fromOntapFileSystemAttributes">fromOntapFileSystemAttributes</a></code> | Import an existing FSx for NetApp ONTAP file system from the given properties. |

---

##### `isConstruct` <a name="isConstruct" id="@open-constructs/aws-cdk.aws_fsx.OntapFileSystem.isConstruct"></a>

```typescript
import { aws_fsx } from '@open-constructs/aws-cdk'

aws_fsx.OntapFileSystem.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="@open-constructs/aws-cdk.aws_fsx.OntapFileSystem.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isOwnedResource` <a name="isOwnedResource" id="@open-constructs/aws-cdk.aws_fsx.OntapFileSystem.isOwnedResource"></a>

```typescript
import { aws_fsx } from '@open-constructs/aws-cdk'

aws_fsx.OntapFileSystem.isOwnedResource(construct: IConstruct)
```

Returns true if the construct was created by CDK, and false otherwise.

###### `construct`<sup>Required</sup> <a name="construct" id="@open-constructs/aws-cdk.aws_fsx.OntapFileSystem.isOwnedResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

##### `isResource` <a name="isResource" id="@open-constructs/aws-cdk.aws_fsx.OntapFileSystem.isResource"></a>

```typescript
import { aws_fsx } from '@open-constructs/aws-cdk'

aws_fsx.OntapFileSystem.isResource(construct: IConstruct)
```

Check whether the given construct is a Resource.

###### `construct`<sup>Required</sup> <a name="construct" id="@open-constructs/aws-cdk.aws_fsx.OntapFileSystem.isResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

##### `fromOntapFileSystemAttributes` <a name="fromOntapFileSystemAttributes" id="@open-constructs/aws-cdk.aws_fsx.OntapFileSystem.fromOntapFileSystemAttributes"></a>

```typescript
import { aws_fsx } from '@open-constructs/aws-cdk'

aws_fsx.OntapFileSystem.fromOntapFileSystemAttributes(scope: Construct, id: string, attrs: FileSystemAttributes)
```

Import an existing FSx for NetApp ONTAP file system from the given properties.

###### `scope`<sup>Required</sup> <a name="scope" id="@open-constructs/aws-cdk.aws_fsx.OntapFileSystem.fromOntapFileSystemAttributes.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `id`<sup>Required</sup> <a name="id" id="@open-constructs/aws-cdk.aws_fsx.OntapFileSystem.fromOntapFileSystemAttributes.parameter.id"></a>

- *Type:* string

---

###### `attrs`<sup>Required</sup> <a name="attrs" id="@open-constructs/aws-cdk.aws_fsx.OntapFileSystem.fromOntapFileSystemAttributes.parameter.attrs"></a>

- *Type:* aws-cdk-lib.aws_fsx.FileSystemAttributes

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.OntapFileSystem.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.OntapFileSystem.property.env">env</a></code> | <code>aws-cdk-lib.ResourceEnvironment</code> | The environment this resource belongs to. |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.OntapFileSystem.property.stack">stack</a></code> | <code>aws-cdk-lib.Stack</code> | The stack in which this resource is defined. |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.OntapFileSystem.property.connections">connections</a></code> | <code>aws-cdk-lib.aws_ec2.Connections</code> | The security groups/rules used to allow network connections to the file system. |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.OntapFileSystem.property.dnsName">dnsName</a></code> | <code>string</code> | The management endpoint DNS name assigned to this file system. |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.OntapFileSystem.property.fileSystemId">fileSystemId</a></code> | <code>string</code> | The ID that AWS assigns to the file system. |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.OntapFileSystem.property.interClusterDnsName">interClusterDnsName</a></code> | <code>string</code> | The inter cluster endpoint DNS name assigned to this file system. |

---

##### `node`<sup>Required</sup> <a name="node" id="@open-constructs/aws-cdk.aws_fsx.OntapFileSystem.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `env`<sup>Required</sup> <a name="env" id="@open-constructs/aws-cdk.aws_fsx.OntapFileSystem.property.env"></a>

```typescript
public readonly env: ResourceEnvironment;
```

- *Type:* aws-cdk-lib.ResourceEnvironment

The environment this resource belongs to.

For resources that are created and managed by the CDK
(generally, those created by creating new class instances like Role, Bucket, etc.),
this is always the same as the environment of the stack they belong to;
however, for imported resources
(those obtained from static methods like fromRoleArn, fromBucketName, etc.),
that might be different than the stack they were imported into.

---

##### `stack`<sup>Required</sup> <a name="stack" id="@open-constructs/aws-cdk.aws_fsx.OntapFileSystem.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- *Type:* aws-cdk-lib.Stack

The stack in which this resource is defined.

---

##### `connections`<sup>Required</sup> <a name="connections" id="@open-constructs/aws-cdk.aws_fsx.OntapFileSystem.property.connections"></a>

```typescript
public readonly connections: Connections;
```

- *Type:* aws-cdk-lib.aws_ec2.Connections

The security groups/rules used to allow network connections to the file system.

---

##### `dnsName`<sup>Required</sup> <a name="dnsName" id="@open-constructs/aws-cdk.aws_fsx.OntapFileSystem.property.dnsName"></a>

```typescript
public readonly dnsName: string;
```

- *Type:* string

The management endpoint DNS name assigned to this file system.

---

##### `fileSystemId`<sup>Required</sup> <a name="fileSystemId" id="@open-constructs/aws-cdk.aws_fsx.OntapFileSystem.property.fileSystemId"></a>

```typescript
public readonly fileSystemId: string;
```

- *Type:* string

The ID that AWS assigns to the file system.

---

##### `interClusterDnsName`<sup>Required</sup> <a name="interClusterDnsName" id="@open-constructs/aws-cdk.aws_fsx.OntapFileSystem.property.interClusterDnsName"></a>

```typescript
public readonly interClusterDnsName: string;
```

- *Type:* string

The inter cluster endpoint DNS name assigned to this file system.

---


## Structs <a name="Structs" id="Structs"></a>

### CostReportProps <a name="CostReportProps" id="@open-constructs/aws-cdk.aws_cur.CostReportProps"></a>

Properties for defining a Cost and Usage Report.

#### Initializer <a name="Initializer" id="@open-constructs/aws-cdk.aws_cur.CostReportProps.Initializer"></a>

```typescript
import { aws_cur } from '@open-constructs/aws-cdk'

const costReportProps: aws_cur.CostReportProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_cur.CostReportProps.property.bucket">bucket</a></code> | <code>aws-cdk-lib.aws_s3.IBucket</code> | The bucket to place the cost report into. |
| <code><a href="#@open-constructs/aws-cdk.aws_cur.CostReportProps.property.costReportName">costReportName</a></code> | <code>string</code> | The name of the cost report. |
| <code><a href="#@open-constructs/aws-cdk.aws_cur.CostReportProps.property.enableDefaultUniqueReportName">enableDefaultUniqueReportName</a></code> | <code>boolean</code> | Whether to generate a unique report name automatically if the `costReportName` property is not specified. |
| <code><a href="#@open-constructs/aws-cdk.aws_cur.CostReportProps.property.format">format</a></code> | <code>@open-constructs/aws-cdk.aws_cur.CurFormat</code> | The format to use for the cost and usage report. |
| <code><a href="#@open-constructs/aws-cdk.aws_cur.CostReportProps.property.reportGranularity">reportGranularity</a></code> | <code>@open-constructs/aws-cdk.aws_cur.ReportGranularity</code> | The granularity of the line items in the report. |

---

##### `bucket`<sup>Optional</sup> <a name="bucket" id="@open-constructs/aws-cdk.aws_cur.CostReportProps.property.bucket"></a>

```typescript
public readonly bucket: IBucket;
```

- *Type:* aws-cdk-lib.aws_s3.IBucket
- *Default:* a new bucket will be created.

The bucket to place the cost report into.

If non is provided, a new bucket will be created.

---

##### `costReportName`<sup>Optional</sup> <a name="costReportName" id="@open-constructs/aws-cdk.aws_cur.CostReportProps.property.costReportName"></a>

```typescript
public readonly costReportName: string;
```

- *Type:* string
- *Default:* a unique name automatically generated if `enableDefaultUniqueReportName` is true, otherwise 'default-cur'.

The name of the cost report.

The name must be unique, is case sensitive, and can't include spaces.

The length of this name must be between 1 and 256.

---

##### `enableDefaultUniqueReportName`<sup>Optional</sup> <a name="enableDefaultUniqueReportName" id="@open-constructs/aws-cdk.aws_cur.CostReportProps.property.enableDefaultUniqueReportName"></a>

```typescript
public readonly enableDefaultUniqueReportName: boolean;
```

- *Type:* boolean
- *Default:* false

Whether to generate a unique report name automatically if the `costReportName` property is not specified.

The default value of the `costReportName` is normally ‘default-cur’, but setting this flag
to true will generate a unique default value.

This flag is ignored if the `costReportName` property is specified.

---

##### `format`<sup>Optional</sup> <a name="format" id="@open-constructs/aws-cdk.aws_cur.CostReportProps.property.format"></a>

```typescript
public readonly format: CurFormat;
```

- *Type:* @open-constructs/aws-cdk.aws_cur.CurFormat
- *Default:* TEXT_OR_CSV

The format to use for the cost and usage report.

---

##### `reportGranularity`<sup>Optional</sup> <a name="reportGranularity" id="@open-constructs/aws-cdk.aws_cur.CostReportProps.property.reportGranularity"></a>

```typescript
public readonly reportGranularity: ReportGranularity;
```

- *Type:* @open-constructs/aws-cdk.aws_cur.ReportGranularity
- *Default:* HOURLY

The granularity of the line items in the report.

---

### DailyAutomaticBackupStartTimeProps <a name="DailyAutomaticBackupStartTimeProps" id="@open-constructs/aws-cdk.aws_fsx.DailyAutomaticBackupStartTimeProps"></a>

Properties required for setting up a daily automatic backup time.

#### Initializer <a name="Initializer" id="@open-constructs/aws-cdk.aws_fsx.DailyAutomaticBackupStartTimeProps.Initializer"></a>

```typescript
import { aws_fsx } from '@open-constructs/aws-cdk'

const dailyAutomaticBackupStartTimeProps: aws_fsx.DailyAutomaticBackupStartTimeProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.DailyAutomaticBackupStartTimeProps.property.hour">hour</a></code> | <code>number</code> | The hour of the day (from 0-23) for automatic backup starts. |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.DailyAutomaticBackupStartTimeProps.property.minute">minute</a></code> | <code>number</code> | The minute of the hour (from 0-59) for automatic backup starts. |

---

##### `hour`<sup>Required</sup> <a name="hour" id="@open-constructs/aws-cdk.aws_fsx.DailyAutomaticBackupStartTimeProps.property.hour"></a>

```typescript
public readonly hour: number;
```

- *Type:* number

The hour of the day (from 0-23) for automatic backup starts.

---

##### `minute`<sup>Required</sup> <a name="minute" id="@open-constructs/aws-cdk.aws_fsx.DailyAutomaticBackupStartTimeProps.property.minute"></a>

```typescript
public readonly minute: number;
```

- *Type:* number

The minute of the hour (from 0-59) for automatic backup starts.

---

### InstanceConnectEndpointAttributes <a name="InstanceConnectEndpointAttributes" id="@open-constructs/aws-cdk.aws_ec2.InstanceConnectEndpointAttributes"></a>

Attributes for importing an EC2 Instance Connect Endpoint.

#### Initializer <a name="Initializer" id="@open-constructs/aws-cdk.aws_ec2.InstanceConnectEndpointAttributes.Initializer"></a>

```typescript
import { aws_ec2 } from '@open-constructs/aws-cdk'

const instanceConnectEndpointAttributes: aws_ec2.InstanceConnectEndpointAttributes = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_ec2.InstanceConnectEndpointAttributes.property.instanceConnectEndpointId">instanceConnectEndpointId</a></code> | <code>string</code> | The ID of the EC2 Instance Connect Endpoint. |
| <code><a href="#@open-constructs/aws-cdk.aws_ec2.InstanceConnectEndpointAttributes.property.securityGroups">securityGroups</a></code> | <code>aws-cdk-lib.aws_ec2.ISecurityGroup[]</code> | The security groups associated with the EC2 Instance Connect Endpoint. |

---

##### `instanceConnectEndpointId`<sup>Required</sup> <a name="instanceConnectEndpointId" id="@open-constructs/aws-cdk.aws_ec2.InstanceConnectEndpointAttributes.property.instanceConnectEndpointId"></a>

```typescript
public readonly instanceConnectEndpointId: string;
```

- *Type:* string

The ID of the EC2 Instance Connect Endpoint.

---

##### `securityGroups`<sup>Required</sup> <a name="securityGroups" id="@open-constructs/aws-cdk.aws_ec2.InstanceConnectEndpointAttributes.property.securityGroups"></a>

```typescript
public readonly securityGroups: ISecurityGroup[];
```

- *Type:* aws-cdk-lib.aws_ec2.ISecurityGroup[]

The security groups associated with the EC2 Instance Connect Endpoint.

---

### InstanceConnectEndpointProps <a name="InstanceConnectEndpointProps" id="@open-constructs/aws-cdk.aws_ec2.InstanceConnectEndpointProps"></a>

Properties for defining an EC2 Instance Connect Endpoint.

#### Initializer <a name="Initializer" id="@open-constructs/aws-cdk.aws_ec2.InstanceConnectEndpointProps.Initializer"></a>

```typescript
import { aws_ec2 } from '@open-constructs/aws-cdk'

const instanceConnectEndpointProps: aws_ec2.InstanceConnectEndpointProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_ec2.InstanceConnectEndpointProps.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.IVpc</code> | The VPC in which the EC2 Instance Connect Endpoint is created. |
| <code><a href="#@open-constructs/aws-cdk.aws_ec2.InstanceConnectEndpointProps.property.clientToken">clientToken</a></code> | <code>string</code> | Unique, case-sensitive identifier that you provide to ensure the idempotency of the request. |
| <code><a href="#@open-constructs/aws-cdk.aws_ec2.InstanceConnectEndpointProps.property.preserveClientIp">preserveClientIp</a></code> | <code>boolean</code> | Indicates whether your client's IP address is preserved as the source. |
| <code><a href="#@open-constructs/aws-cdk.aws_ec2.InstanceConnectEndpointProps.property.securityGroups">securityGroups</a></code> | <code>aws-cdk-lib.aws_ec2.ISecurityGroup[]</code> | The security groups to associate with the EC2 Instance Connect Endpoint. |

---

##### `vpc`<sup>Required</sup> <a name="vpc" id="@open-constructs/aws-cdk.aws_ec2.InstanceConnectEndpointProps.property.vpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* aws-cdk-lib.aws_ec2.IVpc

The VPC in which the EC2 Instance Connect Endpoint is created.

---

##### `clientToken`<sup>Optional</sup> <a name="clientToken" id="@open-constructs/aws-cdk.aws_ec2.InstanceConnectEndpointProps.property.clientToken"></a>

```typescript
public readonly clientToken: string;
```

- *Type:* string

Unique, case-sensitive identifier that you provide to ensure the idempotency of the request.

> [https://docs.aws.amazon.com/ja_jp/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-instanceconnectendpoint.html#cfn-ec2-instanceconnectendpoint-clienttoken](https://docs.aws.amazon.com/ja_jp/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-instanceconnectendpoint.html#cfn-ec2-instanceconnectendpoint-clienttoken)

---

##### `preserveClientIp`<sup>Optional</sup> <a name="preserveClientIp" id="@open-constructs/aws-cdk.aws_ec2.InstanceConnectEndpointProps.property.preserveClientIp"></a>

```typescript
public readonly preserveClientIp: boolean;
```

- *Type:* boolean
- *Default:* true

Indicates whether your client's IP address is preserved as the source.

> [https://docs.aws.amazon.com/ja_jp/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-instanceconnectendpoint.html#cfn-ec2-instanceconnectendpoint-preserveclientip](https://docs.aws.amazon.com/ja_jp/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-instanceconnectendpoint.html#cfn-ec2-instanceconnectendpoint-preserveclientip)

---

##### `securityGroups`<sup>Optional</sup> <a name="securityGroups" id="@open-constructs/aws-cdk.aws_ec2.InstanceConnectEndpointProps.property.securityGroups"></a>

```typescript
public readonly securityGroups: ISecurityGroup[];
```

- *Type:* aws-cdk-lib.aws_ec2.ISecurityGroup[]
- *Default:* a new security group is created

The security groups to associate with the EC2 Instance Connect Endpoint.

---

### MaintenanceTimeProps <a name="MaintenanceTimeProps" id="@open-constructs/aws-cdk.aws_fsx.MaintenanceTimeProps"></a>

Properties required for setting up a weekly maintenance time.

#### Initializer <a name="Initializer" id="@open-constructs/aws-cdk.aws_fsx.MaintenanceTimeProps.Initializer"></a>

```typescript
import { aws_fsx } from '@open-constructs/aws-cdk'

const maintenanceTimeProps: aws_fsx.MaintenanceTimeProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.MaintenanceTimeProps.property.day">day</a></code> | <code>aws-cdk-lib.aws_fsx.Weekday</code> | The day of the week for maintenance to be performed. |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.MaintenanceTimeProps.property.hour">hour</a></code> | <code>number</code> | The hour of the day (from 0-23) for maintenance to be performed. |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.MaintenanceTimeProps.property.minute">minute</a></code> | <code>number</code> | The minute of the hour (from 0-59) for maintenance to be performed. |

---

##### `day`<sup>Required</sup> <a name="day" id="@open-constructs/aws-cdk.aws_fsx.MaintenanceTimeProps.property.day"></a>

```typescript
public readonly day: Weekday;
```

- *Type:* aws-cdk-lib.aws_fsx.Weekday

The day of the week for maintenance to be performed.

---

##### `hour`<sup>Required</sup> <a name="hour" id="@open-constructs/aws-cdk.aws_fsx.MaintenanceTimeProps.property.hour"></a>

```typescript
public readonly hour: number;
```

- *Type:* number

The hour of the day (from 0-23) for maintenance to be performed.

---

##### `minute`<sup>Required</sup> <a name="minute" id="@open-constructs/aws-cdk.aws_fsx.MaintenanceTimeProps.property.minute"></a>

```typescript
public readonly minute: number;
```

- *Type:* number

The minute of the hour (from 0-59) for maintenance to be performed.

---

### OntapConfiguration <a name="OntapConfiguration" id="@open-constructs/aws-cdk.aws_fsx.OntapConfiguration"></a>

The configuration for the Amazon FSx for NetApp ONTAP file system.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-fsx-filesystem-ontapconfiguration.html](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-fsx-filesystem-ontapconfiguration.html)

#### Initializer <a name="Initializer" id="@open-constructs/aws-cdk.aws_fsx.OntapConfiguration.Initializer"></a>

```typescript
import { aws_fsx } from '@open-constructs/aws-cdk'

const ontapConfiguration: aws_fsx.OntapConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.OntapConfiguration.property.deploymentType">deploymentType</a></code> | <code>@open-constructs/aws-cdk.aws_fsx.OntapDeploymentType</code> | The FSx for ONTAP file system deployment type to use in creating the file system. |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.OntapConfiguration.property.automaticBackupRetention">automaticBackupRetention</a></code> | <code>aws-cdk-lib.Duration</code> | The number of days to retain automatic backups. |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.OntapConfiguration.property.dailyAutomaticBackupStartTime">dailyAutomaticBackupStartTime</a></code> | <code>@open-constructs/aws-cdk.aws_fsx.DailyAutomaticBackupStartTime</code> | Start time for 30-minute daily automatic backup window in Coordinated Universal Time (UTC). |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.OntapConfiguration.property.diskIops">diskIops</a></code> | <code>number</code> | The total number of SSD IOPS provisioned for the file system. |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.OntapConfiguration.property.endpointIpAddressRange">endpointIpAddressRange</a></code> | <code>string</code> | The IP address range in which the endpoints to access your file system will be created. |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.OntapConfiguration.property.fsxAdminPassword">fsxAdminPassword</a></code> | <code>string</code> | The ONTAP administrative password for the `fsxadmin` user with which you administer your file system using the NetApp ONTAP CLI and REST API. |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.OntapConfiguration.property.haPairs">haPairs</a></code> | <code>number</code> | How many high-availability (HA) pairs of file servers will power your file system. |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.OntapConfiguration.property.preferredSubnet">preferredSubnet</a></code> | <code>aws-cdk-lib.aws_ec2.ISubnet</code> | The subnet in which you want the preferred file server to be located. |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.OntapConfiguration.property.routeTables">routeTables</a></code> | <code>aws-cdk-lib.aws_ec2.IRouteTable[]</code> | The route tables in which Amazon FSx creates the rules for routing traffic to the correct file server. |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.OntapConfiguration.property.throughputCapacity">throughputCapacity</a></code> | <code>number</code> | The throughput capacity for the file system that you're creating in megabytes per second (MBps). |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.OntapConfiguration.property.throughputCapacityPerHaPair">throughputCapacityPerHaPair</a></code> | <code>number</code> | The throughput capacity per HA pair, rather than the total throughput for the file system. |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.OntapConfiguration.property.weeklyMaintenanceStartTime">weeklyMaintenanceStartTime</a></code> | <code>@open-constructs/aws-cdk.aws_fsx.MaintenanceTime</code> | The preferred day and time to perform weekly maintenance. |

---

##### `deploymentType`<sup>Required</sup> <a name="deploymentType" id="@open-constructs/aws-cdk.aws_fsx.OntapConfiguration.property.deploymentType"></a>

```typescript
public readonly deploymentType: OntapDeploymentType;
```

- *Type:* @open-constructs/aws-cdk.aws_fsx.OntapDeploymentType

The FSx for ONTAP file system deployment type to use in creating the file system.

---

##### `automaticBackupRetention`<sup>Optional</sup> <a name="automaticBackupRetention" id="@open-constructs/aws-cdk.aws_fsx.OntapConfiguration.property.automaticBackupRetention"></a>

```typescript
public readonly automaticBackupRetention: Duration;
```

- *Type:* aws-cdk-lib.Duration
- *Default:* disable automatic backups

The number of days to retain automatic backups.

Setting this property to 0 disables automatic backups.
You can retain automatic backups for a maximum of 90 days.

---

##### `dailyAutomaticBackupStartTime`<sup>Optional</sup> <a name="dailyAutomaticBackupStartTime" id="@open-constructs/aws-cdk.aws_fsx.OntapConfiguration.property.dailyAutomaticBackupStartTime"></a>

```typescript
public readonly dailyAutomaticBackupStartTime: DailyAutomaticBackupStartTime;
```

- *Type:* @open-constructs/aws-cdk.aws_fsx.DailyAutomaticBackupStartTime
- *Default:* no backup window

Start time for 30-minute daily automatic backup window in Coordinated Universal Time (UTC).

---

##### `diskIops`<sup>Optional</sup> <a name="diskIops" id="@open-constructs/aws-cdk.aws_fsx.OntapConfiguration.property.diskIops"></a>

```typescript
public readonly diskIops: number;
```

- *Type:* number
- *Default:* 3 IOPS * GB of storage capacity * HAPairs

The total number of SSD IOPS provisioned for the file system.

The minimum and maximum values for this property depend on the value of HAPairs and StorageCapacity.
The minimum value is calculated as StorageCapacity * 3 * HAPairs (3 IOPS per GB of StorageCapacity).
The maximum value is calculated as 200,000 * HAPairs.

---

##### `endpointIpAddressRange`<sup>Optional</sup> <a name="endpointIpAddressRange" id="@open-constructs/aws-cdk.aws_fsx.OntapConfiguration.property.endpointIpAddressRange"></a>

```typescript
public readonly endpointIpAddressRange: string;
```

- *Type:* string
- *Default:* an unused IP address range from the 198.19.* range

The IP address range in which the endpoints to access your file system will be created.

You can have overlapping endpoint IP addresses for file systems deployed in the same VPC/route tables, as long as they don't overlap with any subnet.

---

##### `fsxAdminPassword`<sup>Optional</sup> <a name="fsxAdminPassword" id="@open-constructs/aws-cdk.aws_fsx.OntapConfiguration.property.fsxAdminPassword"></a>

```typescript
public readonly fsxAdminPassword: string;
```

- *Type:* string
- *Default:* do not set an admin password

The ONTAP administrative password for the `fsxadmin` user with which you administer your file system using the NetApp ONTAP CLI and REST API.

If you don't specify a password, Amazon FSx will not set one. In that case, the user will not be able to log in.

You can change the admin password at any time through the management console.

---

##### `haPairs`<sup>Optional</sup> <a name="haPairs" id="@open-constructs/aws-cdk.aws_fsx.OntapConfiguration.property.haPairs"></a>

```typescript
public readonly haPairs: number;
```

- *Type:* number
- *Default:* 1 HA pair

How many high-availability (HA) pairs of file servers will power your file system.

First-generation file systems are powered by 1 HA pair.
Second-generation multi-AZ file systems are powered by 1 HA pair.
Second generation single-AZ file systems are powered by up to 12 HA pairs.

The value of this property affects the values of `storageCapacity`, `iops`, and `throughputCapacity`.

Block storage protocol support (iSCSI and NVMe over TCP) is disabled on file systems with more than 6 HA pairs.

> [https://docs.aws.amazon.com/fsx/latest/ONTAPGuide/supported-fsx-clients.html#using-block-storage](https://docs.aws.amazon.com/fsx/latest/ONTAPGuide/supported-fsx-clients.html#using-block-storage)

---

##### `preferredSubnet`<sup>Optional</sup> <a name="preferredSubnet" id="@open-constructs/aws-cdk.aws_fsx.OntapConfiguration.property.preferredSubnet"></a>

```typescript
public readonly preferredSubnet: ISubnet;
```

- *Type:* aws-cdk-lib.aws_ec2.ISubnet
- *Default:* no default value (This value is not used for single-AZ file systems, but it is required for multi-AZ file systems)

The subnet in which you want the preferred file server to be located.

This value is required when `deploymentType` is set to `MULTI_AZ_1` or `MULTI_AZ_2`.

---

##### `routeTables`<sup>Optional</sup> <a name="routeTables" id="@open-constructs/aws-cdk.aws_fsx.OntapConfiguration.property.routeTables"></a>

```typescript
public readonly routeTables: IRouteTable[];
```

- *Type:* aws-cdk-lib.aws_ec2.IRouteTable[]
- *Default:* Amazon FSx selects your VPC's default route table.

The route tables in which Amazon FSx creates the rules for routing traffic to the correct file server.

You should specify all virtual private cloud (VPC) route tables associated with the subnets in which your clients are located.

Amazon FSx manages VPC route tables for Multi-AZ file systems using tag-based authentication.
These route tables are tagged with Key: AmazonFSx; Value: ManagedByAmazonFSx.

> [https://docs.aws.amazon.com/fsx/latest/ONTAPGuide/unable-to-access.html#vpc-route-tables-not-tagged](https://docs.aws.amazon.com/fsx/latest/ONTAPGuide/unable-to-access.html#vpc-route-tables-not-tagged)

---

##### `throughputCapacity`<sup>Optional</sup> <a name="throughputCapacity" id="@open-constructs/aws-cdk.aws_fsx.OntapConfiguration.property.throughputCapacity"></a>

```typescript
public readonly throughputCapacity: number;
```

- *Type:* number
- *Default:* recommended throughput capacity based on the storage capacity

The throughput capacity for the file system that you're creating in megabytes per second (MBps).

You can define either the `throughputCapacityPerHaPair` or the `throughputCapacity` when creating a file system, but not both.

> [https://docs.aws.amazon.com/fsx/latest/ONTAPGuide/managing-throughput-capacity.html](https://docs.aws.amazon.com/fsx/latest/ONTAPGuide/managing-throughput-capacity.html)

---

##### `throughputCapacityPerHaPair`<sup>Optional</sup> <a name="throughputCapacityPerHaPair" id="@open-constructs/aws-cdk.aws_fsx.OntapConfiguration.property.throughputCapacityPerHaPair"></a>

```typescript
public readonly throughputCapacityPerHaPair: number;
```

- *Type:* number
- *Default:* recommended throughput capacity based on the storage capacity

The throughput capacity per HA pair, rather than the total throughput for the file system.

You can define either the `throughputCapacityPerHaPair` or the `throughputCapacity` when creating a file system, but not both.

For SINGLE_AZ_1 and MULTI_AZ_1 file systems, valid values are 128, 256, 512, 1024, 2048, or 4096 MBps.
For SINGLE_AZ_2, valid values are 1536, 3072, or 6144 MBps.
For MULTI_AZ_2, valid values are 384, 768, 1536, 3072, or 6144 MBps.

---

##### `weeklyMaintenanceStartTime`<sup>Optional</sup> <a name="weeklyMaintenanceStartTime" id="@open-constructs/aws-cdk.aws_fsx.OntapConfiguration.property.weeklyMaintenanceStartTime"></a>

```typescript
public readonly weeklyMaintenanceStartTime: MaintenanceTime;
```

- *Type:* @open-constructs/aws-cdk.aws_fsx.MaintenanceTime
- *Default:* automatically set by Amazon FSx

The preferred day and time to perform weekly maintenance.

---

### OntapFileSystemProps <a name="OntapFileSystemProps" id="@open-constructs/aws-cdk.aws_fsx.OntapFileSystemProps"></a>

Properties specific to the NetApp ONTAP version of the FSx file system.

#### Initializer <a name="Initializer" id="@open-constructs/aws-cdk.aws_fsx.OntapFileSystemProps.Initializer"></a>

```typescript
import { aws_fsx } from '@open-constructs/aws-cdk'

const ontapFileSystemProps: aws_fsx.OntapFileSystemProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.OntapFileSystemProps.property.storageCapacityGiB">storageCapacityGiB</a></code> | <code>number</code> | The storage capacity of the file system being created. |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.OntapFileSystemProps.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.IVpc</code> | The VPC to launch the file system in. |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.OntapFileSystemProps.property.backupId">backupId</a></code> | <code>string</code> | The ID of the backup. |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.OntapFileSystemProps.property.kmsKey">kmsKey</a></code> | <code>aws-cdk-lib.aws_kms.IKey</code> | The KMS key used for encryption to protect your data at rest. |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.OntapFileSystemProps.property.removalPolicy">removalPolicy</a></code> | <code>aws-cdk-lib.RemovalPolicy</code> | Policy to apply when the file system is removed from the stack. |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.OntapFileSystemProps.property.securityGroup">securityGroup</a></code> | <code>aws-cdk-lib.aws_ec2.ISecurityGroup</code> | Security Group to assign to this file system. |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.OntapFileSystemProps.property.ontapConfiguration">ontapConfiguration</a></code> | <code>@open-constructs/aws-cdk.aws_fsx.OntapConfiguration</code> | Additional configuration for FSx specific to NetApp ONTAP. |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.OntapFileSystemProps.property.vpcSubnets">vpcSubnets</a></code> | <code>aws-cdk-lib.aws_ec2.ISubnet[]</code> | The subnet that the file system will be accessible from. |

---

##### `storageCapacityGiB`<sup>Required</sup> <a name="storageCapacityGiB" id="@open-constructs/aws-cdk.aws_fsx.OntapFileSystemProps.property.storageCapacityGiB"></a>

```typescript
public readonly storageCapacityGiB: number;
```

- *Type:* number

The storage capacity of the file system being created.

For Windows file systems, valid values are 32 GiB to 65,536 GiB.
For SCRATCH_1 deployment types, valid values are 1,200, 2,400, 3,600, then continuing in increments of 3,600 GiB.
For SCRATCH_2 and PERSISTENT_1 types, valid values are 1,200, 2,400, then continuing in increments of 2,400 GiB.

---

##### `vpc`<sup>Required</sup> <a name="vpc" id="@open-constructs/aws-cdk.aws_fsx.OntapFileSystemProps.property.vpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* aws-cdk-lib.aws_ec2.IVpc

The VPC to launch the file system in.

---

##### `backupId`<sup>Optional</sup> <a name="backupId" id="@open-constructs/aws-cdk.aws_fsx.OntapFileSystemProps.property.backupId"></a>

```typescript
public readonly backupId: string;
```

- *Type:* string
- *Default:* no backup will be used.

The ID of the backup.

Specifies the backup to use if you're creating a file system from an existing backup.

---

##### `kmsKey`<sup>Optional</sup> <a name="kmsKey" id="@open-constructs/aws-cdk.aws_fsx.OntapFileSystemProps.property.kmsKey"></a>

```typescript
public readonly kmsKey: IKey;
```

- *Type:* aws-cdk-lib.aws_kms.IKey
- *Default:* the aws/fsx default KMS key for the AWS account being deployed into.

The KMS key used for encryption to protect your data at rest.

---

##### `removalPolicy`<sup>Optional</sup> <a name="removalPolicy" id="@open-constructs/aws-cdk.aws_fsx.OntapFileSystemProps.property.removalPolicy"></a>

```typescript
public readonly removalPolicy: RemovalPolicy;
```

- *Type:* aws-cdk-lib.RemovalPolicy
- *Default:* RemovalPolicy.RETAIN

Policy to apply when the file system is removed from the stack.

---

##### `securityGroup`<sup>Optional</sup> <a name="securityGroup" id="@open-constructs/aws-cdk.aws_fsx.OntapFileSystemProps.property.securityGroup"></a>

```typescript
public readonly securityGroup: ISecurityGroup;
```

- *Type:* aws-cdk-lib.aws_ec2.ISecurityGroup
- *Default:* creates new security group which allows all outbound traffic.

Security Group to assign to this file system.

---

##### `ontapConfiguration`<sup>Required</sup> <a name="ontapConfiguration" id="@open-constructs/aws-cdk.aws_fsx.OntapFileSystemProps.property.ontapConfiguration"></a>

```typescript
public readonly ontapConfiguration: OntapConfiguration;
```

- *Type:* @open-constructs/aws-cdk.aws_fsx.OntapConfiguration

Additional configuration for FSx specific to NetApp ONTAP.

---

##### `vpcSubnets`<sup>Required</sup> <a name="vpcSubnets" id="@open-constructs/aws-cdk.aws_fsx.OntapFileSystemProps.property.vpcSubnets"></a>

```typescript
public readonly vpcSubnets: ISubnet[];
```

- *Type:* aws-cdk-lib.aws_ec2.ISubnet[]

The subnet that the file system will be accessible from.

For MULTI_AZ_1 deployment types,
this subnet is for the standby file server and you have to specify a `prefferredSubnet` for the preffered file server.

---

## Classes <a name="Classes" id="Classes"></a>

### CurFormat <a name="CurFormat" id="@open-constructs/aws-cdk.aws_cur.CurFormat"></a>

Enum for the possible formats of a cost report.

#### Initializers <a name="Initializers" id="@open-constructs/aws-cdk.aws_cur.CurFormat.Initializer"></a>

```typescript
import { aws_cur } from '@open-constructs/aws-cdk'

new aws_cur.CurFormat(compression: string, format: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_cur.CurFormat.Initializer.parameter.compression">compression</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@open-constructs/aws-cdk.aws_cur.CurFormat.Initializer.parameter.format">format</a></code> | <code>string</code> | *No description.* |

---

##### `compression`<sup>Required</sup> <a name="compression" id="@open-constructs/aws-cdk.aws_cur.CurFormat.Initializer.parameter.compression"></a>

- *Type:* string

---

##### `format`<sup>Required</sup> <a name="format" id="@open-constructs/aws-cdk.aws_cur.CurFormat.Initializer.parameter.format"></a>

- *Type:* string

---


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_cur.CurFormat.for">for</a></code> | Returns a CurFormat instance for the given compression and format string values. |

---

##### `for` <a name="for" id="@open-constructs/aws-cdk.aws_cur.CurFormat.for"></a>

```typescript
import { aws_cur } from '@open-constructs/aws-cdk'

aws_cur.CurFormat.for(compression: string, format: string)
```

Returns a CurFormat instance for the given compression and format string values.

###### `compression`<sup>Required</sup> <a name="compression" id="@open-constructs/aws-cdk.aws_cur.CurFormat.for.parameter.compression"></a>

- *Type:* string

The compression string value.

---

###### `format`<sup>Required</sup> <a name="format" id="@open-constructs/aws-cdk.aws_cur.CurFormat.for.parameter.format"></a>

- *Type:* string

The format string value.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_cur.CurFormat.property.compression">compression</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@open-constructs/aws-cdk.aws_cur.CurFormat.property.format">format</a></code> | <code>string</code> | *No description.* |

---

##### `compression`<sup>Required</sup> <a name="compression" id="@open-constructs/aws-cdk.aws_cur.CurFormat.property.compression"></a>

```typescript
public readonly compression: string;
```

- *Type:* string

---

##### `format`<sup>Required</sup> <a name="format" id="@open-constructs/aws-cdk.aws_cur.CurFormat.property.format"></a>

```typescript
public readonly format: string;
```

- *Type:* string

---

#### Constants <a name="Constants" id="Constants"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_cur.CurFormat.property.PARQUET">PARQUET</a></code> | <code>@open-constructs/aws-cdk.aws_cur.CurFormat</code> | Parquet format. |
| <code><a href="#@open-constructs/aws-cdk.aws_cur.CurFormat.property.TEXT_OR_CSV">TEXT_OR_CSV</a></code> | <code>@open-constructs/aws-cdk.aws_cur.CurFormat</code> | GZIP compressed text or CSV format. |

---

##### `PARQUET`<sup>Required</sup> <a name="PARQUET" id="@open-constructs/aws-cdk.aws_cur.CurFormat.property.PARQUET"></a>

```typescript
public readonly PARQUET: CurFormat;
```

- *Type:* @open-constructs/aws-cdk.aws_cur.CurFormat

Parquet format.

---

##### `TEXT_OR_CSV`<sup>Required</sup> <a name="TEXT_OR_CSV" id="@open-constructs/aws-cdk.aws_cur.CurFormat.property.TEXT_OR_CSV"></a>

```typescript
public readonly TEXT_OR_CSV: CurFormat;
```

- *Type:* @open-constructs/aws-cdk.aws_cur.CurFormat

GZIP compressed text or CSV format.

---

### DailyAutomaticBackupStartTime <a name="DailyAutomaticBackupStartTime" id="@open-constructs/aws-cdk.aws_fsx.DailyAutomaticBackupStartTime"></a>

Class for scheduling a daily automatic backup time.

#### Initializers <a name="Initializers" id="@open-constructs/aws-cdk.aws_fsx.DailyAutomaticBackupStartTime.Initializer"></a>

```typescript
import { aws_fsx } from '@open-constructs/aws-cdk'

new aws_fsx.DailyAutomaticBackupStartTime(props: DailyAutomaticBackupStartTimeProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.DailyAutomaticBackupStartTime.Initializer.parameter.props">props</a></code> | <code>@open-constructs/aws-cdk.aws_fsx.DailyAutomaticBackupStartTimeProps</code> | *No description.* |

---

##### `props`<sup>Required</sup> <a name="props" id="@open-constructs/aws-cdk.aws_fsx.DailyAutomaticBackupStartTime.Initializer.parameter.props"></a>

- *Type:* @open-constructs/aws-cdk.aws_fsx.DailyAutomaticBackupStartTimeProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.DailyAutomaticBackupStartTime.toTimestamp">toTimestamp</a></code> | Converts an hour, and minute into HH:MM string. |

---

##### `toTimestamp` <a name="toTimestamp" id="@open-constructs/aws-cdk.aws_fsx.DailyAutomaticBackupStartTime.toTimestamp"></a>

```typescript
public toTimestamp(): string
```

Converts an hour, and minute into HH:MM string.




### MaintenanceTime <a name="MaintenanceTime" id="@open-constructs/aws-cdk.aws_fsx.MaintenanceTime"></a>

Class for scheduling a weekly maintenance time.

#### Initializers <a name="Initializers" id="@open-constructs/aws-cdk.aws_fsx.MaintenanceTime.Initializer"></a>

```typescript
import { aws_fsx } from '@open-constructs/aws-cdk'

new aws_fsx.MaintenanceTime(props: MaintenanceTimeProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.MaintenanceTime.Initializer.parameter.props">props</a></code> | <code>@open-constructs/aws-cdk.aws_fsx.MaintenanceTimeProps</code> | *No description.* |

---

##### `props`<sup>Required</sup> <a name="props" id="@open-constructs/aws-cdk.aws_fsx.MaintenanceTime.Initializer.parameter.props"></a>

- *Type:* @open-constructs/aws-cdk.aws_fsx.MaintenanceTimeProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.MaintenanceTime.toTimestamp">toTimestamp</a></code> | Converts a day, hour, and minute into a timestamp as used by FSx for Lustre's weeklyMaintenanceStartTime field. |

---

##### `toTimestamp` <a name="toTimestamp" id="@open-constructs/aws-cdk.aws_fsx.MaintenanceTime.toTimestamp"></a>

```typescript
public toTimestamp(): string
```

Converts a day, hour, and minute into a timestamp as used by FSx for Lustre's weeklyMaintenanceStartTime field.




### ReportGranularity <a name="ReportGranularity" id="@open-constructs/aws-cdk.aws_cur.ReportGranularity"></a>

Enum for the possible granularities of a cost report.

#### Initializers <a name="Initializers" id="@open-constructs/aws-cdk.aws_cur.ReportGranularity.Initializer"></a>

```typescript
import { aws_cur } from '@open-constructs/aws-cdk'

new aws_cur.ReportGranularity(value: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_cur.ReportGranularity.Initializer.parameter.value">value</a></code> | <code>string</code> | *No description.* |

---

##### `value`<sup>Required</sup> <a name="value" id="@open-constructs/aws-cdk.aws_cur.ReportGranularity.Initializer.parameter.value"></a>

- *Type:* string

---


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_cur.ReportGranularity.for">for</a></code> | Returns a ReportGranularity instance for the given granularity string value. |

---

##### `for` <a name="for" id="@open-constructs/aws-cdk.aws_cur.ReportGranularity.for"></a>

```typescript
import { aws_cur } from '@open-constructs/aws-cdk'

aws_cur.ReportGranularity.for(granularity: string)
```

Returns a ReportGranularity instance for the given granularity string value.

###### `granularity`<sup>Required</sup> <a name="granularity" id="@open-constructs/aws-cdk.aws_cur.ReportGranularity.for.parameter.granularity"></a>

- *Type:* string

The granularity string value to create an instance for.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_cur.ReportGranularity.property.value">value</a></code> | <code>string</code> | *No description.* |

---

##### `value`<sup>Required</sup> <a name="value" id="@open-constructs/aws-cdk.aws_cur.ReportGranularity.property.value"></a>

```typescript
public readonly value: string;
```

- *Type:* string

---

#### Constants <a name="Constants" id="Constants"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_cur.ReportGranularity.property.DAILY">DAILY</a></code> | <code>@open-constructs/aws-cdk.aws_cur.ReportGranularity</code> | Daily granularity. |
| <code><a href="#@open-constructs/aws-cdk.aws_cur.ReportGranularity.property.HOURLY">HOURLY</a></code> | <code>@open-constructs/aws-cdk.aws_cur.ReportGranularity</code> | Hourly granularity. |
| <code><a href="#@open-constructs/aws-cdk.aws_cur.ReportGranularity.property.MONTHLY">MONTHLY</a></code> | <code>@open-constructs/aws-cdk.aws_cur.ReportGranularity</code> | Weekly granularity. |

---

##### `DAILY`<sup>Required</sup> <a name="DAILY" id="@open-constructs/aws-cdk.aws_cur.ReportGranularity.property.DAILY"></a>

```typescript
public readonly DAILY: ReportGranularity;
```

- *Type:* @open-constructs/aws-cdk.aws_cur.ReportGranularity

Daily granularity.

---

##### `HOURLY`<sup>Required</sup> <a name="HOURLY" id="@open-constructs/aws-cdk.aws_cur.ReportGranularity.property.HOURLY"></a>

```typescript
public readonly HOURLY: ReportGranularity;
```

- *Type:* @open-constructs/aws-cdk.aws_cur.ReportGranularity

Hourly granularity.

---

##### `MONTHLY`<sup>Required</sup> <a name="MONTHLY" id="@open-constructs/aws-cdk.aws_cur.ReportGranularity.property.MONTHLY"></a>

```typescript
public readonly MONTHLY: ReportGranularity;
```

- *Type:* @open-constructs/aws-cdk.aws_cur.ReportGranularity

Weekly granularity.

---

## Protocols <a name="Protocols" id="Protocols"></a>

### IInstanceConnectEndpoint <a name="IInstanceConnectEndpoint" id="@open-constructs/aws-cdk.aws_ec2.IInstanceConnectEndpoint"></a>

- *Extends:* aws-cdk-lib.aws_ec2.IConnectable, aws-cdk-lib.IResource

- *Implemented By:* @open-constructs/aws-cdk.aws_ec2.InstanceConnectEndpoint, @open-constructs/aws-cdk.aws_ec2.IInstanceConnectEndpoint

An EC2 Instance Connect Endpoint.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_ec2.IInstanceConnectEndpoint.property.connections">connections</a></code> | <code>aws-cdk-lib.aws_ec2.Connections</code> | The network connections associated with this resource. |
| <code><a href="#@open-constructs/aws-cdk.aws_ec2.IInstanceConnectEndpoint.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@open-constructs/aws-cdk.aws_ec2.IInstanceConnectEndpoint.property.env">env</a></code> | <code>aws-cdk-lib.ResourceEnvironment</code> | The environment this resource belongs to. |
| <code><a href="#@open-constructs/aws-cdk.aws_ec2.IInstanceConnectEndpoint.property.stack">stack</a></code> | <code>aws-cdk-lib.Stack</code> | The stack in which this resource is defined. |
| <code><a href="#@open-constructs/aws-cdk.aws_ec2.IInstanceConnectEndpoint.property.instanceConnectEndpointId">instanceConnectEndpointId</a></code> | <code>string</code> | The ID of the EC2 Instance Connect Endpoint. |

---

##### `connections`<sup>Required</sup> <a name="connections" id="@open-constructs/aws-cdk.aws_ec2.IInstanceConnectEndpoint.property.connections"></a>

```typescript
public readonly connections: Connections;
```

- *Type:* aws-cdk-lib.aws_ec2.Connections

The network connections associated with this resource.

---

##### `node`<sup>Required</sup> <a name="node" id="@open-constructs/aws-cdk.aws_ec2.IInstanceConnectEndpoint.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `env`<sup>Required</sup> <a name="env" id="@open-constructs/aws-cdk.aws_ec2.IInstanceConnectEndpoint.property.env"></a>

```typescript
public readonly env: ResourceEnvironment;
```

- *Type:* aws-cdk-lib.ResourceEnvironment

The environment this resource belongs to.

For resources that are created and managed by the CDK
(generally, those created by creating new class instances like Role, Bucket, etc.),
this is always the same as the environment of the stack they belong to;
however, for imported resources
(those obtained from static methods like fromRoleArn, fromBucketName, etc.),
that might be different than the stack they were imported into.

---

##### `stack`<sup>Required</sup> <a name="stack" id="@open-constructs/aws-cdk.aws_ec2.IInstanceConnectEndpoint.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- *Type:* aws-cdk-lib.Stack

The stack in which this resource is defined.

---

##### `instanceConnectEndpointId`<sup>Required</sup> <a name="instanceConnectEndpointId" id="@open-constructs/aws-cdk.aws_ec2.IInstanceConnectEndpoint.property.instanceConnectEndpointId"></a>

```typescript
public readonly instanceConnectEndpointId: string;
```

- *Type:* string

The ID of the EC2 Instance Connect Endpoint.

---

## Enums <a name="Enums" id="Enums"></a>

### OntapDeploymentType <a name="OntapDeploymentType" id="@open-constructs/aws-cdk.aws_fsx.OntapDeploymentType"></a>

The different kinds of file system deployments used by NetApp ONTAP.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.OntapDeploymentType.MULTI_AZ_1">MULTI_AZ_1</a></code> | A high availability file system configured for Multi-AZ redundancy to tolerate temporary Availability Zone (AZ) unavailability. |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.OntapDeploymentType.MULTI_AZ_2">MULTI_AZ_2</a></code> | A high availability file system configured for Multi-AZ redundancy to tolerate temporary AZ unavailability. |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.OntapDeploymentType.SINGLE_AZ_1">SINGLE_AZ_1</a></code> | A file system configured for Single-AZ redundancy. |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.OntapDeploymentType.SINGLE_AZ_2">SINGLE_AZ_2</a></code> | A file system configured with multiple high-availability (HA) pairs for Single-AZ redundancy. |

---

##### `MULTI_AZ_1` <a name="MULTI_AZ_1" id="@open-constructs/aws-cdk.aws_fsx.OntapDeploymentType.MULTI_AZ_1"></a>

A high availability file system configured for Multi-AZ redundancy to tolerate temporary Availability Zone (AZ) unavailability.

This is a first-generation FSx for ONTAP file system.

---


##### `MULTI_AZ_2` <a name="MULTI_AZ_2" id="@open-constructs/aws-cdk.aws_fsx.OntapDeploymentType.MULTI_AZ_2"></a>

A high availability file system configured for Multi-AZ redundancy to tolerate temporary AZ unavailability.

This is a second-generation FSx for ONTAP file system.

---


##### `SINGLE_AZ_1` <a name="SINGLE_AZ_1" id="@open-constructs/aws-cdk.aws_fsx.OntapDeploymentType.SINGLE_AZ_1"></a>

A file system configured for Single-AZ redundancy.

This is a first-generation FSx for ONTAP file system.

---


##### `SINGLE_AZ_2` <a name="SINGLE_AZ_2" id="@open-constructs/aws-cdk.aws_fsx.OntapDeploymentType.SINGLE_AZ_2"></a>

A file system configured with multiple high-availability (HA) pairs for Single-AZ redundancy.

This is a second-generation FSx for ONTAP file system.

---

