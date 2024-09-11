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


### Namespace <a name="Namespace" id="@open-constructs/aws-cdk.aws_redshiftserverless.Namespace"></a>

- *Implements:* @open-constructs/aws-cdk.aws_redshiftserverless.INamespace

Represents a Redshift Serverless Namespace construct in AWS CDK.

*Example*

```typescript
const nameSpace = new Namespace(
  stack,
  'Namespace',
  {
    namespaceName: 'my-namespace',
  },
);
```


#### Initializers <a name="Initializers" id="@open-constructs/aws-cdk.aws_redshiftserverless.Namespace.Initializer"></a>

```typescript
import { aws_redshiftserverless } from '@open-constructs/aws-cdk'

new aws_redshiftserverless.Namespace(scope: Construct, id: string, props: NamespaceProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.Namespace.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.Namespace.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.Namespace.Initializer.parameter.props">props</a></code> | <code>@open-constructs/aws-cdk.aws_redshiftserverless.NamespaceProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@open-constructs/aws-cdk.aws_redshiftserverless.Namespace.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@open-constructs/aws-cdk.aws_redshiftserverless.Namespace.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@open-constructs/aws-cdk.aws_redshiftserverless.Namespace.Initializer.parameter.props"></a>

- *Type:* @open-constructs/aws-cdk.aws_redshiftserverless.NamespaceProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.Namespace.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.Namespace.applyRemovalPolicy">applyRemovalPolicy</a></code> | Apply the given removal policy to this resource. |

---

##### `toString` <a name="toString" id="@open-constructs/aws-cdk.aws_redshiftserverless.Namespace.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `applyRemovalPolicy` <a name="applyRemovalPolicy" id="@open-constructs/aws-cdk.aws_redshiftserverless.Namespace.applyRemovalPolicy"></a>

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

###### `policy`<sup>Required</sup> <a name="policy" id="@open-constructs/aws-cdk.aws_redshiftserverless.Namespace.applyRemovalPolicy.parameter.policy"></a>

- *Type:* aws-cdk-lib.RemovalPolicy

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.Namespace.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.Namespace.isOwnedResource">isOwnedResource</a></code> | Returns true if the construct was created by CDK, and false otherwise. |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.Namespace.isResource">isResource</a></code> | Check whether the given construct is a Resource. |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.Namespace.fromNamespaceAttributes">fromNamespaceAttributes</a></code> | Import an existing namspace to the stack from its attributes. |

---

##### `isConstruct` <a name="isConstruct" id="@open-constructs/aws-cdk.aws_redshiftserverless.Namespace.isConstruct"></a>

```typescript
import { aws_redshiftserverless } from '@open-constructs/aws-cdk'

aws_redshiftserverless.Namespace.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="@open-constructs/aws-cdk.aws_redshiftserverless.Namespace.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isOwnedResource` <a name="isOwnedResource" id="@open-constructs/aws-cdk.aws_redshiftserverless.Namespace.isOwnedResource"></a>

```typescript
import { aws_redshiftserverless } from '@open-constructs/aws-cdk'

aws_redshiftserverless.Namespace.isOwnedResource(construct: IConstruct)
```

Returns true if the construct was created by CDK, and false otherwise.

###### `construct`<sup>Required</sup> <a name="construct" id="@open-constructs/aws-cdk.aws_redshiftserverless.Namespace.isOwnedResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

##### `isResource` <a name="isResource" id="@open-constructs/aws-cdk.aws_redshiftserverless.Namespace.isResource"></a>

```typescript
import { aws_redshiftserverless } from '@open-constructs/aws-cdk'

aws_redshiftserverless.Namespace.isResource(construct: IConstruct)
```

Check whether the given construct is a Resource.

###### `construct`<sup>Required</sup> <a name="construct" id="@open-constructs/aws-cdk.aws_redshiftserverless.Namespace.isResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

##### `fromNamespaceAttributes` <a name="fromNamespaceAttributes" id="@open-constructs/aws-cdk.aws_redshiftserverless.Namespace.fromNamespaceAttributes"></a>

```typescript
import { aws_redshiftserverless } from '@open-constructs/aws-cdk'

aws_redshiftserverless.Namespace.fromNamespaceAttributes(scope: Construct, id: string, attrs: NamespaceAttributes)
```

Import an existing namspace to the stack from its attributes.

###### `scope`<sup>Required</sup> <a name="scope" id="@open-constructs/aws-cdk.aws_redshiftserverless.Namespace.fromNamespaceAttributes.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `id`<sup>Required</sup> <a name="id" id="@open-constructs/aws-cdk.aws_redshiftserverless.Namespace.fromNamespaceAttributes.parameter.id"></a>

- *Type:* string

---

###### `attrs`<sup>Required</sup> <a name="attrs" id="@open-constructs/aws-cdk.aws_redshiftserverless.Namespace.fromNamespaceAttributes.parameter.attrs"></a>

- *Type:* @open-constructs/aws-cdk.aws_redshiftserverless.NamespaceAttributes

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.Namespace.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.Namespace.property.env">env</a></code> | <code>aws-cdk-lib.ResourceEnvironment</code> | The environment this resource belongs to. |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.Namespace.property.stack">stack</a></code> | <code>aws-cdk-lib.Stack</code> | The stack in which this resource is defined. |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.Namespace.property.namespaceArn">namespaceArn</a></code> | <code>string</code> | The namespace Arn. |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.Namespace.property.namespaceName">namespaceName</a></code> | <code>string</code> | The namespace name. |

---

##### `node`<sup>Required</sup> <a name="node" id="@open-constructs/aws-cdk.aws_redshiftserverless.Namespace.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `env`<sup>Required</sup> <a name="env" id="@open-constructs/aws-cdk.aws_redshiftserverless.Namespace.property.env"></a>

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

##### `stack`<sup>Required</sup> <a name="stack" id="@open-constructs/aws-cdk.aws_redshiftserverless.Namespace.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- *Type:* aws-cdk-lib.Stack

The stack in which this resource is defined.

---

##### `namespaceArn`<sup>Required</sup> <a name="namespaceArn" id="@open-constructs/aws-cdk.aws_redshiftserverless.Namespace.property.namespaceArn"></a>

```typescript
public readonly namespaceArn: string;
```

- *Type:* string

The namespace Arn.

---

##### `namespaceName`<sup>Required</sup> <a name="namespaceName" id="@open-constructs/aws-cdk.aws_redshiftserverless.Namespace.property.namespaceName"></a>

```typescript
public readonly namespaceName: string;
```

- *Type:* string

The namespace name.

---


### Workgroup <a name="Workgroup" id="@open-constructs/aws-cdk.aws_redshiftserverless.Workgroup"></a>

- *Implements:* @open-constructs/aws-cdk.aws_redshiftserverless.IWorkgroup

Represents a Redshift Serverless Workgroup construct in AWS CDK.

*Example*

```typescript
declare const namespace: Namespace;
declare const vpc: aws_ec2.IVpc;

const nameSpace = new Workgroup(
  stack,
  'Workgroup',
  {
    workgroupName: 'my-workgroup',
    namespace: namespace,
    vpc,
  },
);
```


#### Initializers <a name="Initializers" id="@open-constructs/aws-cdk.aws_redshiftserverless.Workgroup.Initializer"></a>

```typescript
import { aws_redshiftserverless } from '@open-constructs/aws-cdk'

new aws_redshiftserverless.Workgroup(scope: Construct, id: string, props: WorkgroupProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.Workgroup.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.Workgroup.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.Workgroup.Initializer.parameter.props">props</a></code> | <code>@open-constructs/aws-cdk.aws_redshiftserverless.WorkgroupProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@open-constructs/aws-cdk.aws_redshiftserverless.Workgroup.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@open-constructs/aws-cdk.aws_redshiftserverless.Workgroup.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@open-constructs/aws-cdk.aws_redshiftserverless.Workgroup.Initializer.parameter.props"></a>

- *Type:* @open-constructs/aws-cdk.aws_redshiftserverless.WorkgroupProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.Workgroup.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.Workgroup.applyRemovalPolicy">applyRemovalPolicy</a></code> | Apply the given removal policy to this resource. |

---

##### `toString` <a name="toString" id="@open-constructs/aws-cdk.aws_redshiftserverless.Workgroup.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `applyRemovalPolicy` <a name="applyRemovalPolicy" id="@open-constructs/aws-cdk.aws_redshiftserverless.Workgroup.applyRemovalPolicy"></a>

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

###### `policy`<sup>Required</sup> <a name="policy" id="@open-constructs/aws-cdk.aws_redshiftserverless.Workgroup.applyRemovalPolicy.parameter.policy"></a>

- *Type:* aws-cdk-lib.RemovalPolicy

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.Workgroup.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.Workgroup.isOwnedResource">isOwnedResource</a></code> | Returns true if the construct was created by CDK, and false otherwise. |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.Workgroup.isResource">isResource</a></code> | Check whether the given construct is a Resource. |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.Workgroup.fromWorkgroupAttributes">fromWorkgroupAttributes</a></code> | Import an existing workgroup to the stack from its attributes. |

---

##### `isConstruct` <a name="isConstruct" id="@open-constructs/aws-cdk.aws_redshiftserverless.Workgroup.isConstruct"></a>

```typescript
import { aws_redshiftserverless } from '@open-constructs/aws-cdk'

aws_redshiftserverless.Workgroup.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="@open-constructs/aws-cdk.aws_redshiftserverless.Workgroup.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isOwnedResource` <a name="isOwnedResource" id="@open-constructs/aws-cdk.aws_redshiftserverless.Workgroup.isOwnedResource"></a>

```typescript
import { aws_redshiftserverless } from '@open-constructs/aws-cdk'

aws_redshiftserverless.Workgroup.isOwnedResource(construct: IConstruct)
```

Returns true if the construct was created by CDK, and false otherwise.

###### `construct`<sup>Required</sup> <a name="construct" id="@open-constructs/aws-cdk.aws_redshiftserverless.Workgroup.isOwnedResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

##### `isResource` <a name="isResource" id="@open-constructs/aws-cdk.aws_redshiftserverless.Workgroup.isResource"></a>

```typescript
import { aws_redshiftserverless } from '@open-constructs/aws-cdk'

aws_redshiftserverless.Workgroup.isResource(construct: IConstruct)
```

Check whether the given construct is a Resource.

###### `construct`<sup>Required</sup> <a name="construct" id="@open-constructs/aws-cdk.aws_redshiftserverless.Workgroup.isResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

##### `fromWorkgroupAttributes` <a name="fromWorkgroupAttributes" id="@open-constructs/aws-cdk.aws_redshiftserverless.Workgroup.fromWorkgroupAttributes"></a>

```typescript
import { aws_redshiftserverless } from '@open-constructs/aws-cdk'

aws_redshiftserverless.Workgroup.fromWorkgroupAttributes(scope: Construct, id: string, attrs: WorkgroupAttributes)
```

Import an existing workgroup to the stack from its attributes.

###### `scope`<sup>Required</sup> <a name="scope" id="@open-constructs/aws-cdk.aws_redshiftserverless.Workgroup.fromWorkgroupAttributes.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `id`<sup>Required</sup> <a name="id" id="@open-constructs/aws-cdk.aws_redshiftserverless.Workgroup.fromWorkgroupAttributes.parameter.id"></a>

- *Type:* string

---

###### `attrs`<sup>Required</sup> <a name="attrs" id="@open-constructs/aws-cdk.aws_redshiftserverless.Workgroup.fromWorkgroupAttributes.parameter.attrs"></a>

- *Type:* @open-constructs/aws-cdk.aws_redshiftserverless.WorkgroupAttributes

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.Workgroup.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.Workgroup.property.env">env</a></code> | <code>aws-cdk-lib.ResourceEnvironment</code> | The environment this resource belongs to. |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.Workgroup.property.stack">stack</a></code> | <code>aws-cdk-lib.Stack</code> | The stack in which this resource is defined. |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.Workgroup.property.connections">connections</a></code> | <code>aws-cdk-lib.aws_ec2.Connections</code> | The connection object associated with the EC2 Instance Connect Endpoint. |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.Workgroup.property.endpointAddress">endpointAddress</a></code> | <code>string</code> | The workgroup endpoint address. |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.Workgroup.property.port">port</a></code> | <code>number</code> | The workgroup port. |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.Workgroup.property.workgroupArn">workgroupArn</a></code> | <code>string</code> | The workgroup Arn. |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.Workgroup.property.workgroupName">workgroupName</a></code> | <code>string</code> | The workgroup name. |

---

##### `node`<sup>Required</sup> <a name="node" id="@open-constructs/aws-cdk.aws_redshiftserverless.Workgroup.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `env`<sup>Required</sup> <a name="env" id="@open-constructs/aws-cdk.aws_redshiftserverless.Workgroup.property.env"></a>

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

##### `stack`<sup>Required</sup> <a name="stack" id="@open-constructs/aws-cdk.aws_redshiftserverless.Workgroup.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- *Type:* aws-cdk-lib.Stack

The stack in which this resource is defined.

---

##### `connections`<sup>Required</sup> <a name="connections" id="@open-constructs/aws-cdk.aws_redshiftserverless.Workgroup.property.connections"></a>

```typescript
public readonly connections: Connections;
```

- *Type:* aws-cdk-lib.aws_ec2.Connections

The connection object associated with the EC2 Instance Connect Endpoint.

---

##### `endpointAddress`<sup>Required</sup> <a name="endpointAddress" id="@open-constructs/aws-cdk.aws_redshiftserverless.Workgroup.property.endpointAddress"></a>

```typescript
public readonly endpointAddress: string;
```

- *Type:* string

The workgroup endpoint address.

---

##### `port`<sup>Required</sup> <a name="port" id="@open-constructs/aws-cdk.aws_redshiftserverless.Workgroup.property.port"></a>

```typescript
public readonly port: number;
```

- *Type:* number

The workgroup port.

---

##### `workgroupArn`<sup>Required</sup> <a name="workgroupArn" id="@open-constructs/aws-cdk.aws_redshiftserverless.Workgroup.property.workgroupArn"></a>

```typescript
public readonly workgroupArn: string;
```

- *Type:* string

The workgroup Arn.

---

##### `workgroupName`<sup>Required</sup> <a name="workgroupName" id="@open-constructs/aws-cdk.aws_redshiftserverless.Workgroup.property.workgroupName"></a>

```typescript
public readonly workgroupName: string;
```

- *Type:* string

The workgroup name.

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

### NamespaceAttributes <a name="NamespaceAttributes" id="@open-constructs/aws-cdk.aws_redshiftserverless.NamespaceAttributes"></a>

Attributes for importing a Redshift Serverless Namespace.

#### Initializer <a name="Initializer" id="@open-constructs/aws-cdk.aws_redshiftserverless.NamespaceAttributes.Initializer"></a>

```typescript
import { aws_redshiftserverless } from '@open-constructs/aws-cdk'

const namespaceAttributes: aws_redshiftserverless.NamespaceAttributes = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.NamespaceAttributes.property.namespaceArn">namespaceArn</a></code> | <code>string</code> | The namespace Arn. |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.NamespaceAttributes.property.namespaceName">namespaceName</a></code> | <code>string</code> | The namespace name. |

---

##### `namespaceArn`<sup>Required</sup> <a name="namespaceArn" id="@open-constructs/aws-cdk.aws_redshiftserverless.NamespaceAttributes.property.namespaceArn"></a>

```typescript
public readonly namespaceArn: string;
```

- *Type:* string

The namespace Arn.

---

##### `namespaceName`<sup>Required</sup> <a name="namespaceName" id="@open-constructs/aws-cdk.aws_redshiftserverless.NamespaceAttributes.property.namespaceName"></a>

```typescript
public readonly namespaceName: string;
```

- *Type:* string

The namespace name.

---

### NamespaceProps <a name="NamespaceProps" id="@open-constructs/aws-cdk.aws_redshiftserverless.NamespaceProps"></a>

Properties for defining a Redshift Serverless Namespace.

#### Initializer <a name="Initializer" id="@open-constructs/aws-cdk.aws_redshiftserverless.NamespaceProps.Initializer"></a>

```typescript
import { aws_redshiftserverless } from '@open-constructs/aws-cdk'

const namespaceProps: aws_redshiftserverless.NamespaceProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.NamespaceProps.property.adminUsername">adminUsername</a></code> | <code>string</code> | The username of the administrator for the primary database created in the namespace. |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.NamespaceProps.property.adminUserPassword">adminUserPassword</a></code> | <code>aws-cdk-lib.SecretValue</code> | The password of the administrator for the primary database created in the namespace. |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.NamespaceProps.property.dbName">dbName</a></code> | <code>string</code> | The name of the primary database created in the namespace. |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.NamespaceProps.property.defaultIamRole">defaultIamRole</a></code> | <code>aws-cdk-lib.aws_iam.IRole</code> | The IAM role to set as a default in the namespace. |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.NamespaceProps.property.finalSnapshotName">finalSnapshotName</a></code> | <code>string</code> | The name of the snapshot to be created before the namespace is deleted. |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.NamespaceProps.property.finalSnapshotRetentionPeriod">finalSnapshotRetentionPeriod</a></code> | <code>number</code> | How long to retain the final snapshot. |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.NamespaceProps.property.iamRoles">iamRoles</a></code> | <code>aws-cdk-lib.aws_iam.IRole[]</code> | A list of IAM roles to associate with the namespace. |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.NamespaceProps.property.kmsKey">kmsKey</a></code> | <code>aws-cdk-lib.aws_kms.IKey</code> | A Customer Managed Key used to encrypt your data. |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.NamespaceProps.property.logExports">logExports</a></code> | <code>@open-constructs/aws-cdk.aws_redshiftserverless.LogExport[]</code> | The types of logs the namespace can export. |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.NamespaceProps.property.namespaceName">namespaceName</a></code> | <code>string</code> | The name of the cost report. |

---

##### `adminUsername`<sup>Optional</sup> <a name="adminUsername" id="@open-constructs/aws-cdk.aws_redshiftserverless.NamespaceProps.property.adminUsername"></a>

```typescript
public readonly adminUsername: string;
```

- *Type:* string
- *Default:* no admin user

The username of the administrator for the primary database created in the namespace.

---

##### `adminUserPassword`<sup>Optional</sup> <a name="adminUserPassword" id="@open-constructs/aws-cdk.aws_redshiftserverless.NamespaceProps.property.adminUserPassword"></a>

```typescript
public readonly adminUserPassword: SecretValue;
```

- *Type:* aws-cdk-lib.SecretValue
- *Default:* no admin user

The password of the administrator for the primary database created in the namespace.

---

##### `dbName`<sup>Optional</sup> <a name="dbName" id="@open-constructs/aws-cdk.aws_redshiftserverless.NamespaceProps.property.dbName"></a>

```typescript
public readonly dbName: string;
```

- *Type:* string
- *Default:* dev

The name of the primary database created in the namespace.

---

##### `defaultIamRole`<sup>Optional</sup> <a name="defaultIamRole" id="@open-constructs/aws-cdk.aws_redshiftserverless.NamespaceProps.property.defaultIamRole"></a>

```typescript
public readonly defaultIamRole: IRole;
```

- *Type:* aws-cdk-lib.aws_iam.IRole
- *Default:* no default IAM role

The IAM role to set as a default in the namespace.

---

##### `finalSnapshotName`<sup>Optional</sup> <a name="finalSnapshotName" id="@open-constructs/aws-cdk.aws_redshiftserverless.NamespaceProps.property.finalSnapshotName"></a>

```typescript
public readonly finalSnapshotName: string;
```

- *Type:* string
- *Default:* no final snapshot

The name of the snapshot to be created before the namespace is deleted.

---

##### `finalSnapshotRetentionPeriod`<sup>Optional</sup> <a name="finalSnapshotRetentionPeriod" id="@open-constructs/aws-cdk.aws_redshiftserverless.NamespaceProps.property.finalSnapshotRetentionPeriod"></a>

```typescript
public readonly finalSnapshotRetentionPeriod: number;
```

- *Type:* number
- *Default:* Retained indefinitely if finalSnapshotName is specified, otherwise no final snapshot

How long to retain the final snapshot.

---

##### `iamRoles`<sup>Optional</sup> <a name="iamRoles" id="@open-constructs/aws-cdk.aws_redshiftserverless.NamespaceProps.property.iamRoles"></a>

```typescript
public readonly iamRoles: IRole[];
```

- *Type:* aws-cdk-lib.aws_iam.IRole[]
- *Default:* no IAM role associated

A list of IAM roles to associate with the namespace.

---

##### `kmsKey`<sup>Optional</sup> <a name="kmsKey" id="@open-constructs/aws-cdk.aws_redshiftserverless.NamespaceProps.property.kmsKey"></a>

```typescript
public readonly kmsKey: IKey;
```

- *Type:* aws-cdk-lib.aws_kms.IKey
- *Default:* use AWS managed key

A Customer Managed Key used to encrypt your data.

---

##### `logExports`<sup>Optional</sup> <a name="logExports" id="@open-constructs/aws-cdk.aws_redshiftserverless.NamespaceProps.property.logExports"></a>

```typescript
public readonly logExports: LogExport[];
```

- *Type:* @open-constructs/aws-cdk.aws_redshiftserverless.LogExport[]
- *Default:* no logs export

The types of logs the namespace can export.

---

##### `namespaceName`<sup>Optional</sup> <a name="namespaceName" id="@open-constructs/aws-cdk.aws_redshiftserverless.NamespaceProps.property.namespaceName"></a>

```typescript
public readonly namespaceName: string;
```

- *Type:* string

The name of the cost report.

---

### WorkgroupAttributes <a name="WorkgroupAttributes" id="@open-constructs/aws-cdk.aws_redshiftserverless.WorkgroupAttributes"></a>

Attributes for importing a Redshift Serverless Workgroup.

#### Initializer <a name="Initializer" id="@open-constructs/aws-cdk.aws_redshiftserverless.WorkgroupAttributes.Initializer"></a>

```typescript
import { aws_redshiftserverless } from '@open-constructs/aws-cdk'

const workgroupAttributes: aws_redshiftserverless.WorkgroupAttributes = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.WorkgroupAttributes.property.endpointAddress">endpointAddress</a></code> | <code>string</code> | The workgroup endpoint address. |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.WorkgroupAttributes.property.port">port</a></code> | <code>number</code> | The workgroup port. |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.WorkgroupAttributes.property.securityGroups">securityGroups</a></code> | <code>aws-cdk-lib.aws_ec2.ISecurityGroup[]</code> | The security groups associated with the Redshift Serverless Workgroup. |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.WorkgroupAttributes.property.workgroupArn">workgroupArn</a></code> | <code>string</code> | The workgroup Arn. |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.WorkgroupAttributes.property.workgroupName">workgroupName</a></code> | <code>string</code> | The workgroup name. |

---

##### `endpointAddress`<sup>Required</sup> <a name="endpointAddress" id="@open-constructs/aws-cdk.aws_redshiftserverless.WorkgroupAttributes.property.endpointAddress"></a>

```typescript
public readonly endpointAddress: string;
```

- *Type:* string

The workgroup endpoint address.

---

##### `port`<sup>Required</sup> <a name="port" id="@open-constructs/aws-cdk.aws_redshiftserverless.WorkgroupAttributes.property.port"></a>

```typescript
public readonly port: number;
```

- *Type:* number

The workgroup port.

---

##### `securityGroups`<sup>Required</sup> <a name="securityGroups" id="@open-constructs/aws-cdk.aws_redshiftserverless.WorkgroupAttributes.property.securityGroups"></a>

```typescript
public readonly securityGroups: ISecurityGroup[];
```

- *Type:* aws-cdk-lib.aws_ec2.ISecurityGroup[]

The security groups associated with the Redshift Serverless Workgroup.

---

##### `workgroupArn`<sup>Required</sup> <a name="workgroupArn" id="@open-constructs/aws-cdk.aws_redshiftserverless.WorkgroupAttributes.property.workgroupArn"></a>

```typescript
public readonly workgroupArn: string;
```

- *Type:* string

The workgroup Arn.

---

##### `workgroupName`<sup>Required</sup> <a name="workgroupName" id="@open-constructs/aws-cdk.aws_redshiftserverless.WorkgroupAttributes.property.workgroupName"></a>

```typescript
public readonly workgroupName: string;
```

- *Type:* string

The workgroup name.

---

### WorkgroupProps <a name="WorkgroupProps" id="@open-constructs/aws-cdk.aws_redshiftserverless.WorkgroupProps"></a>

Properties for defining a Redshift Serverless Workgroup.

#### Initializer <a name="Initializer" id="@open-constructs/aws-cdk.aws_redshiftserverless.WorkgroupProps.Initializer"></a>

```typescript
import { aws_redshiftserverless } from '@open-constructs/aws-cdk'

const workgroupProps: aws_redshiftserverless.WorkgroupProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.WorkgroupProps.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.IVpc</code> | The VPC to place the workgroup in. |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.WorkgroupProps.property.baseCapacity">baseCapacity</a></code> | <code>number</code> | The base compute capacity of the workgroup in Redshift Processing Units (RPUs). |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.WorkgroupProps.property.configParameters">configParameters</a></code> | <code>{[ key: string ]: string}</code> | A list of parameters to set for finer control over a database. |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.WorkgroupProps.property.enhancedVpcRouting">enhancedVpcRouting</a></code> | <code>boolean</code> | The value that specifies whether to enable enhanced virtual private cloud (VPC) routing, which forces Amazon Redshift Serverless to route traffic through your VPC. |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.WorkgroupProps.property.namespace">namespace</a></code> | <code>@open-constructs/aws-cdk.aws_redshiftserverless.INamespace</code> | The namespace the workgroup is associated with. |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.WorkgroupProps.property.port">port</a></code> | <code>number</code> | The custom port to use when connecting to a workgroup. |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.WorkgroupProps.property.publiclyAccessible">publiclyAccessible</a></code> | <code>boolean</code> | A value that specifies whether the workgroup can be accessible from a public network. |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.WorkgroupProps.property.securityGroups">securityGroups</a></code> | <code>aws-cdk-lib.aws_ec2.ISecurityGroup[]</code> | The name of the primary database created in the workgroup. |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.WorkgroupProps.property.vpcSubnets">vpcSubnets</a></code> | <code>aws-cdk-lib.aws_ec2.SubnetSelection</code> | Where to place the workgroup within the VPC. |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.WorkgroupProps.property.workgroupName">workgroupName</a></code> | <code>string</code> | The name of the cost report. |

---

##### `vpc`<sup>Required</sup> <a name="vpc" id="@open-constructs/aws-cdk.aws_redshiftserverless.WorkgroupProps.property.vpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* aws-cdk-lib.aws_ec2.IVpc

The VPC to place the workgroup in.

---

##### `baseCapacity`<sup>Optional</sup> <a name="baseCapacity" id="@open-constructs/aws-cdk.aws_redshiftserverless.WorkgroupProps.property.baseCapacity"></a>

```typescript
public readonly baseCapacity: number;
```

- *Type:* number
- *Default:* 8

The base compute capacity of the workgroup in Redshift Processing Units (RPUs).

---

##### `configParameters`<sup>Optional</sup> <a name="configParameters" id="@open-constructs/aws-cdk.aws_redshiftserverless.WorkgroupProps.property.configParameters"></a>

```typescript
public readonly configParameters: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* no config parameters

A list of parameters to set for finer control over a database.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshiftserverless-workgroup.html#cfn-redshiftserverless-workgroup-configparameters](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshiftserverless-workgroup.html#cfn-redshiftserverless-workgroup-configparameters)

---

##### `enhancedVpcRouting`<sup>Optional</sup> <a name="enhancedVpcRouting" id="@open-constructs/aws-cdk.aws_redshiftserverless.WorkgroupProps.property.enhancedVpcRouting"></a>

```typescript
public readonly enhancedVpcRouting: boolean;
```

- *Type:* boolean
- *Default:* false

The value that specifies whether to enable enhanced virtual private cloud (VPC) routing, which forces Amazon Redshift Serverless to route traffic through your VPC.

---

##### `namespace`<sup>Optional</sup> <a name="namespace" id="@open-constructs/aws-cdk.aws_redshiftserverless.WorkgroupProps.property.namespace"></a>

```typescript
public readonly namespace: INamespace;
```

- *Type:* @open-constructs/aws-cdk.aws_redshiftserverless.INamespace
- *Default:* the workgroup is not associated with any namespace

The namespace the workgroup is associated with.

---

##### `port`<sup>Optional</sup> <a name="port" id="@open-constructs/aws-cdk.aws_redshiftserverless.WorkgroupProps.property.port"></a>

```typescript
public readonly port: number;
```

- *Type:* number
- *Default:* 5439

The custom port to use when connecting to a workgroup.

Valid port ranges are 5431-5455 and 8191-8215.

---

##### `publiclyAccessible`<sup>Optional</sup> <a name="publiclyAccessible" id="@open-constructs/aws-cdk.aws_redshiftserverless.WorkgroupProps.property.publiclyAccessible"></a>

```typescript
public readonly publiclyAccessible: boolean;
```

- *Type:* boolean
- *Default:* false

A value that specifies whether the workgroup can be accessible from a public network.

---

##### `securityGroups`<sup>Optional</sup> <a name="securityGroups" id="@open-constructs/aws-cdk.aws_redshiftserverless.WorkgroupProps.property.securityGroups"></a>

```typescript
public readonly securityGroups: ISecurityGroup[];
```

- *Type:* aws-cdk-lib.aws_ec2.ISecurityGroup[]
- *Default:* no database created

The name of the primary database created in the workgroup.

---

##### `vpcSubnets`<sup>Optional</sup> <a name="vpcSubnets" id="@open-constructs/aws-cdk.aws_redshiftserverless.WorkgroupProps.property.vpcSubnets"></a>

```typescript
public readonly vpcSubnets: SubnetSelection;
```

- *Type:* aws-cdk-lib.aws_ec2.SubnetSelection
- *Default:* private subnets

Where to place the workgroup within the VPC.

---

##### `workgroupName`<sup>Optional</sup> <a name="workgroupName" id="@open-constructs/aws-cdk.aws_redshiftserverless.WorkgroupProps.property.workgroupName"></a>

```typescript
public readonly workgroupName: string;
```

- *Type:* string
- *Default:* auto generate

The name of the cost report.

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

### INamespace <a name="INamespace" id="@open-constructs/aws-cdk.aws_redshiftserverless.INamespace"></a>

- *Extends:* aws-cdk-lib.IResource

- *Implemented By:* @open-constructs/aws-cdk.aws_redshiftserverless.Namespace, @open-constructs/aws-cdk.aws_redshiftserverless.INamespace

A Redshift Serverless Namespace.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.INamespace.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.INamespace.property.env">env</a></code> | <code>aws-cdk-lib.ResourceEnvironment</code> | The environment this resource belongs to. |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.INamespace.property.stack">stack</a></code> | <code>aws-cdk-lib.Stack</code> | The stack in which this resource is defined. |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.INamespace.property.namespaceArn">namespaceArn</a></code> | <code>string</code> | The namespace Arn. |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.INamespace.property.namespaceName">namespaceName</a></code> | <code>string</code> | The namespace name. |

---

##### `node`<sup>Required</sup> <a name="node" id="@open-constructs/aws-cdk.aws_redshiftserverless.INamespace.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `env`<sup>Required</sup> <a name="env" id="@open-constructs/aws-cdk.aws_redshiftserverless.INamespace.property.env"></a>

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

##### `stack`<sup>Required</sup> <a name="stack" id="@open-constructs/aws-cdk.aws_redshiftserverless.INamespace.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- *Type:* aws-cdk-lib.Stack

The stack in which this resource is defined.

---

##### `namespaceArn`<sup>Required</sup> <a name="namespaceArn" id="@open-constructs/aws-cdk.aws_redshiftserverless.INamespace.property.namespaceArn"></a>

```typescript
public readonly namespaceArn: string;
```

- *Type:* string

The namespace Arn.

---

##### `namespaceName`<sup>Required</sup> <a name="namespaceName" id="@open-constructs/aws-cdk.aws_redshiftserverless.INamespace.property.namespaceName"></a>

```typescript
public readonly namespaceName: string;
```

- *Type:* string

The namespace name.

---

### IWorkgroup <a name="IWorkgroup" id="@open-constructs/aws-cdk.aws_redshiftserverless.IWorkgroup"></a>

- *Extends:* aws-cdk-lib.IResource, aws-cdk-lib.aws_ec2.IConnectable

- *Implemented By:* @open-constructs/aws-cdk.aws_redshiftserverless.Workgroup, @open-constructs/aws-cdk.aws_redshiftserverless.IWorkgroup

A Redshift Serverless Workgroup.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.IWorkgroup.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.IWorkgroup.property.env">env</a></code> | <code>aws-cdk-lib.ResourceEnvironment</code> | The environment this resource belongs to. |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.IWorkgroup.property.stack">stack</a></code> | <code>aws-cdk-lib.Stack</code> | The stack in which this resource is defined. |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.IWorkgroup.property.connections">connections</a></code> | <code>aws-cdk-lib.aws_ec2.Connections</code> | The network connections associated with this resource. |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.IWorkgroup.property.endpointAddress">endpointAddress</a></code> | <code>string</code> | The workgroup endpoint address. |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.IWorkgroup.property.port">port</a></code> | <code>number</code> | The workgroup port. |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.IWorkgroup.property.workgroupArn">workgroupArn</a></code> | <code>string</code> | The workgroup Arn. |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.IWorkgroup.property.workgroupName">workgroupName</a></code> | <code>string</code> | The workgroup name. |

---

##### `node`<sup>Required</sup> <a name="node" id="@open-constructs/aws-cdk.aws_redshiftserverless.IWorkgroup.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `env`<sup>Required</sup> <a name="env" id="@open-constructs/aws-cdk.aws_redshiftserverless.IWorkgroup.property.env"></a>

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

##### `stack`<sup>Required</sup> <a name="stack" id="@open-constructs/aws-cdk.aws_redshiftserverless.IWorkgroup.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- *Type:* aws-cdk-lib.Stack

The stack in which this resource is defined.

---

##### `connections`<sup>Required</sup> <a name="connections" id="@open-constructs/aws-cdk.aws_redshiftserverless.IWorkgroup.property.connections"></a>

```typescript
public readonly connections: Connections;
```

- *Type:* aws-cdk-lib.aws_ec2.Connections

The network connections associated with this resource.

---

##### `endpointAddress`<sup>Required</sup> <a name="endpointAddress" id="@open-constructs/aws-cdk.aws_redshiftserverless.IWorkgroup.property.endpointAddress"></a>

```typescript
public readonly endpointAddress: string;
```

- *Type:* string

The workgroup endpoint address.

---

##### `port`<sup>Required</sup> <a name="port" id="@open-constructs/aws-cdk.aws_redshiftserverless.IWorkgroup.property.port"></a>

```typescript
public readonly port: number;
```

- *Type:* number

The workgroup port.

---

##### `workgroupArn`<sup>Required</sup> <a name="workgroupArn" id="@open-constructs/aws-cdk.aws_redshiftserverless.IWorkgroup.property.workgroupArn"></a>

```typescript
public readonly workgroupArn: string;
```

- *Type:* string

The workgroup Arn.

---

##### `workgroupName`<sup>Required</sup> <a name="workgroupName" id="@open-constructs/aws-cdk.aws_redshiftserverless.IWorkgroup.property.workgroupName"></a>

```typescript
public readonly workgroupName: string;
```

- *Type:* string

The workgroup name.

---

## Enums <a name="Enums" id="Enums"></a>

### LogExport <a name="LogExport" id="@open-constructs/aws-cdk.aws_redshiftserverless.LogExport"></a>

The types of logs the namespace can export.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.LogExport.USER_LOG">USER_LOG</a></code> | User log. |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.LogExport.CONNECTION_LOG">CONNECTION_LOG</a></code> | Connection log. |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.LogExport.USER_ACTIVITY_LOG">USER_ACTIVITY_LOG</a></code> | User activity log. |

---

##### `USER_LOG` <a name="USER_LOG" id="@open-constructs/aws-cdk.aws_redshiftserverless.LogExport.USER_LOG"></a>

User log.

---


##### `CONNECTION_LOG` <a name="CONNECTION_LOG" id="@open-constructs/aws-cdk.aws_redshiftserverless.LogExport.CONNECTION_LOG"></a>

Connection log.

---


##### `USER_ACTIVITY_LOG` <a name="USER_ACTIVITY_LOG" id="@open-constructs/aws-cdk.aws_redshiftserverless.LogExport.USER_ACTIVITY_LOG"></a>

User activity log.

---

