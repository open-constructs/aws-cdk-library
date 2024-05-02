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

---

##### `toString` <a name="toString" id="@open-constructs/aws-cdk.aws_cur.CostReport.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_cur.CostReport.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

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

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_cur.CostReport.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@open-constructs/aws-cdk.aws_cur.CostReport.property.reportBucket">reportBucket</a></code> | <code>aws-cdk-lib.aws_s3.IBucket</code> | The S3 bucket that stores the cost report. |

---

##### `node`<sup>Required</sup> <a name="node" id="@open-constructs/aws-cdk.aws_cur.CostReport.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

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
- *Default:* 'default-cur'

The name of the cost report.

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

### InstanceConnectEndpointAttributes <a name="InstanceConnectEndpointAttributes" id="@open-constructs/aws-cdk.aws_ec2.InstanceConnectEndpointAttributes"></a>

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

##### `securityGroups`<sup>Optional</sup> <a name="securityGroups" id="@open-constructs/aws-cdk.aws_ec2.InstanceConnectEndpointAttributes.property.securityGroups"></a>

```typescript
public readonly securityGroups: ISecurityGroup[];
```

- *Type:* aws-cdk-lib.aws_ec2.ISecurityGroup[]
- *Default:* no security groups

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

