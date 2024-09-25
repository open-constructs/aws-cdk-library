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


### Domain <a name="Domain" id="@open-constructs/aws-cdk.aws_codeartifact.Domain"></a>

- *Implements:* @open-constructs/aws-cdk.aws_codeartifact.IDomain, aws-cdk-lib.ITaggableV2

Deploys a CodeArtifact domain.

#### Initializers <a name="Initializers" id="@open-constructs/aws-cdk.aws_codeartifact.Domain.Initializer"></a>

```typescript
import { aws_codeartifact } from '@open-constructs/aws-cdk'

new aws_codeartifact.Domain(scope: Construct, id: string, props: DomainProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.Domain.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.Domain.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.Domain.Initializer.parameter.props">props</a></code> | <code>@open-constructs/aws-cdk.aws_codeartifact.DomainProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@open-constructs/aws-cdk.aws_codeartifact.Domain.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@open-constructs/aws-cdk.aws_codeartifact.Domain.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@open-constructs/aws-cdk.aws_codeartifact.Domain.Initializer.parameter.props"></a>

- *Type:* @open-constructs/aws-cdk.aws_codeartifact.DomainProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.Domain.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.Domain.applyRemovalPolicy">applyRemovalPolicy</a></code> | Apply the given removal policy to this resource. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.Domain.addToResourcePolicy">addToResourcePolicy</a></code> | Adds a statement to the Codeartifact domain resource policy. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.Domain.grant">grant</a></code> | Grants permissions to the specified grantee on this CodeArtifact domain. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.Domain.grantContribute">grantContribute</a></code> | Grants contribute permissions to the specified grantee on this CodeArtifact domain. |

---

##### `toString` <a name="toString" id="@open-constructs/aws-cdk.aws_codeartifact.Domain.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `applyRemovalPolicy` <a name="applyRemovalPolicy" id="@open-constructs/aws-cdk.aws_codeartifact.Domain.applyRemovalPolicy"></a>

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

###### `policy`<sup>Required</sup> <a name="policy" id="@open-constructs/aws-cdk.aws_codeartifact.Domain.applyRemovalPolicy.parameter.policy"></a>

- *Type:* aws-cdk-lib.RemovalPolicy

---

##### `addToResourcePolicy` <a name="addToResourcePolicy" id="@open-constructs/aws-cdk.aws_codeartifact.Domain.addToResourcePolicy"></a>

```typescript
public addToResourcePolicy(statement: PolicyStatement): AddToResourcePolicyResult
```

Adds a statement to the Codeartifact domain resource policy.

###### `statement`<sup>Required</sup> <a name="statement" id="@open-constructs/aws-cdk.aws_codeartifact.Domain.addToResourcePolicy.parameter.statement"></a>

- *Type:* aws-cdk-lib.aws_iam.PolicyStatement

The policy statement to add.

---

##### `grant` <a name="grant" id="@open-constructs/aws-cdk.aws_codeartifact.Domain.grant"></a>

```typescript
public grant(grantee: IGrantable, actions: ...string[]): Grant
```

Grants permissions to the specified grantee on this CodeArtifact domain.

It handles both same-environment and cross-environment scenarios:
- For same-environment grants, it adds the permissions to the principal or resource.
- For cross-environment grants, it adds the permissions to both the principal and the resource.

###### `grantee`<sup>Required</sup> <a name="grantee" id="@open-constructs/aws-cdk.aws_codeartifact.Domain.grant.parameter.grantee"></a>

- *Type:* aws-cdk-lib.aws_iam.IGrantable

The principal to grant permissions to.

---

###### `actions`<sup>Required</sup> <a name="actions" id="@open-constructs/aws-cdk.aws_codeartifact.Domain.grant.parameter.actions"></a>

- *Type:* ...string[]

The actions to grant.

These should be valid CodeArtifact actions.

---

##### `grantContribute` <a name="grantContribute" id="@open-constructs/aws-cdk.aws_codeartifact.Domain.grantContribute"></a>

```typescript
public grantContribute(grantee: IGrantable): Grant
```

Grants contribute permissions to the specified grantee on this CodeArtifact domain.

###### `grantee`<sup>Required</sup> <a name="grantee" id="@open-constructs/aws-cdk.aws_codeartifact.Domain.grantContribute.parameter.grantee"></a>

- *Type:* aws-cdk-lib.aws_iam.IGrantable

The principal to grant contribute permissions to.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.Domain.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.Domain.isOwnedResource">isOwnedResource</a></code> | Returns true if the construct was created by CDK, and false otherwise. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.Domain.isResource">isResource</a></code> | Check whether the given construct is a Resource. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.Domain.fromDomainArn">fromDomainArn</a></code> | Creates an IDomain object from an existing CodeArtifact domain ARN. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.Domain.fromDomainAttributes">fromDomainAttributes</a></code> | Creates a Domain object from existing domain attributes. |

---

##### `isConstruct` <a name="isConstruct" id="@open-constructs/aws-cdk.aws_codeartifact.Domain.isConstruct"></a>

```typescript
import { aws_codeartifact } from '@open-constructs/aws-cdk'

aws_codeartifact.Domain.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="@open-constructs/aws-cdk.aws_codeartifact.Domain.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isOwnedResource` <a name="isOwnedResource" id="@open-constructs/aws-cdk.aws_codeartifact.Domain.isOwnedResource"></a>

```typescript
import { aws_codeartifact } from '@open-constructs/aws-cdk'

aws_codeartifact.Domain.isOwnedResource(construct: IConstruct)
```

Returns true if the construct was created by CDK, and false otherwise.

###### `construct`<sup>Required</sup> <a name="construct" id="@open-constructs/aws-cdk.aws_codeartifact.Domain.isOwnedResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

##### `isResource` <a name="isResource" id="@open-constructs/aws-cdk.aws_codeartifact.Domain.isResource"></a>

```typescript
import { aws_codeartifact } from '@open-constructs/aws-cdk'

aws_codeartifact.Domain.isResource(construct: IConstruct)
```

Check whether the given construct is a Resource.

###### `construct`<sup>Required</sup> <a name="construct" id="@open-constructs/aws-cdk.aws_codeartifact.Domain.isResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

##### `fromDomainArn` <a name="fromDomainArn" id="@open-constructs/aws-cdk.aws_codeartifact.Domain.fromDomainArn"></a>

```typescript
import { aws_codeartifact } from '@open-constructs/aws-cdk'

aws_codeartifact.Domain.fromDomainArn(scope: Construct, id: string, domainArn: string)
```

Creates an IDomain object from an existing CodeArtifact domain ARN.

###### `scope`<sup>Required</sup> <a name="scope" id="@open-constructs/aws-cdk.aws_codeartifact.Domain.fromDomainArn.parameter.scope"></a>

- *Type:* constructs.Construct

The parent construct.

---

###### `id`<sup>Required</sup> <a name="id" id="@open-constructs/aws-cdk.aws_codeartifact.Domain.fromDomainArn.parameter.id"></a>

- *Type:* string

The construct id.

---

###### `domainArn`<sup>Required</sup> <a name="domainArn" id="@open-constructs/aws-cdk.aws_codeartifact.Domain.fromDomainArn.parameter.domainArn"></a>

- *Type:* string

The ARN (Amazon Resource Name) of the existing CodeArtifact domain.

---

##### `fromDomainAttributes` <a name="fromDomainAttributes" id="@open-constructs/aws-cdk.aws_codeartifact.Domain.fromDomainAttributes"></a>

```typescript
import { aws_codeartifact } from '@open-constructs/aws-cdk'

aws_codeartifact.Domain.fromDomainAttributes(scope: Construct, id: string, attrs: DomainAttributes)
```

Creates a Domain object from existing domain attributes.

###### `scope`<sup>Required</sup> <a name="scope" id="@open-constructs/aws-cdk.aws_codeartifact.Domain.fromDomainAttributes.parameter.scope"></a>

- *Type:* constructs.Construct

The parent construct.

---

###### `id`<sup>Required</sup> <a name="id" id="@open-constructs/aws-cdk.aws_codeartifact.Domain.fromDomainAttributes.parameter.id"></a>

- *Type:* string

The construct id.

---

###### `attrs`<sup>Required</sup> <a name="attrs" id="@open-constructs/aws-cdk.aws_codeartifact.Domain.fromDomainAttributes.parameter.attrs"></a>

- *Type:* @open-constructs/aws-cdk.aws_codeartifact.DomainAttributes

The attributes of the domain to import.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.Domain.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.Domain.property.env">env</a></code> | <code>aws-cdk-lib.ResourceEnvironment</code> | The environment this resource belongs to. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.Domain.property.stack">stack</a></code> | <code>aws-cdk-lib.Stack</code> | The stack in which this resource is defined. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.Domain.property.cdkTagManager">cdkTagManager</a></code> | <code>aws-cdk-lib.TagManager</code> | TagManager to set, remove and format tags. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.Domain.property.domainArn">domainArn</a></code> | <code>string</code> | The ARN (Amazon Resource Name) of this CodeArtifact domain. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.Domain.property.domainName">domainName</a></code> | <code>string</code> | The name of this CodeArtifact domain. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.Domain.property.domainOwner">domainOwner</a></code> | <code>string</code> | The AWS account ID that owns this domain. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.Domain.property.domainEncryptionKey">domainEncryptionKey</a></code> | <code>string</code> | The ARN of the key used to encrypt the Domain. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.Domain.property.encryptionKey">encryptionKey</a></code> | <code>aws-cdk-lib.aws_kms.IKey</code> | The AWS KMS encryption key associated with this domain, if any. |

---

##### `node`<sup>Required</sup> <a name="node" id="@open-constructs/aws-cdk.aws_codeartifact.Domain.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `env`<sup>Required</sup> <a name="env" id="@open-constructs/aws-cdk.aws_codeartifact.Domain.property.env"></a>

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

##### `stack`<sup>Required</sup> <a name="stack" id="@open-constructs/aws-cdk.aws_codeartifact.Domain.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- *Type:* aws-cdk-lib.Stack

The stack in which this resource is defined.

---

##### `cdkTagManager`<sup>Required</sup> <a name="cdkTagManager" id="@open-constructs/aws-cdk.aws_codeartifact.Domain.property.cdkTagManager"></a>

```typescript
public readonly cdkTagManager: TagManager;
```

- *Type:* aws-cdk-lib.TagManager

TagManager to set, remove and format tags.

---

##### `domainArn`<sup>Required</sup> <a name="domainArn" id="@open-constructs/aws-cdk.aws_codeartifact.Domain.property.domainArn"></a>

```typescript
public readonly domainArn: string;
```

- *Type:* string

The ARN (Amazon Resource Name) of this CodeArtifact domain.

---

##### `domainName`<sup>Required</sup> <a name="domainName" id="@open-constructs/aws-cdk.aws_codeartifact.Domain.property.domainName"></a>

```typescript
public readonly domainName: string;
```

- *Type:* string

The name of this CodeArtifact domain.

---

##### `domainOwner`<sup>Required</sup> <a name="domainOwner" id="@open-constructs/aws-cdk.aws_codeartifact.Domain.property.domainOwner"></a>

```typescript
public readonly domainOwner: string;
```

- *Type:* string

The AWS account ID that owns this domain.

---

##### `domainEncryptionKey`<sup>Optional</sup> <a name="domainEncryptionKey" id="@open-constructs/aws-cdk.aws_codeartifact.Domain.property.domainEncryptionKey"></a>

```typescript
public readonly domainEncryptionKey: string;
```

- *Type:* string

The ARN of the key used to encrypt the Domain.

---

##### `encryptionKey`<sup>Optional</sup> <a name="encryptionKey" id="@open-constructs/aws-cdk.aws_codeartifact.Domain.property.encryptionKey"></a>

```typescript
public readonly encryptionKey: IKey;
```

- *Type:* aws-cdk-lib.aws_kms.IKey

The AWS KMS encryption key associated with this domain, if any.

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


### Repository <a name="Repository" id="@open-constructs/aws-cdk.aws_codeartifact.Repository"></a>

- *Implements:* @open-constructs/aws-cdk.aws_codeartifact.IRepository, aws-cdk-lib.ITaggableV2

Deploys a CodeArtifact repository.

#### Initializers <a name="Initializers" id="@open-constructs/aws-cdk.aws_codeartifact.Repository.Initializer"></a>

```typescript
import { aws_codeartifact } from '@open-constructs/aws-cdk'

new aws_codeartifact.Repository(scope: Construct, id: string, props: RepositoryProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.Repository.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.Repository.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.Repository.Initializer.parameter.props">props</a></code> | <code>@open-constructs/aws-cdk.aws_codeartifact.RepositoryProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@open-constructs/aws-cdk.aws_codeartifact.Repository.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@open-constructs/aws-cdk.aws_codeartifact.Repository.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@open-constructs/aws-cdk.aws_codeartifact.Repository.Initializer.parameter.props"></a>

- *Type:* @open-constructs/aws-cdk.aws_codeartifact.RepositoryProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.Repository.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.Repository.applyRemovalPolicy">applyRemovalPolicy</a></code> | Apply the given removal policy to this resource. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.Repository.addToResourcePolicy">addToResourcePolicy</a></code> | Adds a statement to the CodeArtifact repository resource policy. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.Repository.grant">grant</a></code> | Grants permissions to the specified grantee on this CodeArtifact repository. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.Repository.grantRead">grantRead</a></code> | Grants read permissions to the specified grantee on this CodeArtifact repository. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.Repository.grantReadAndPublish">grantReadAndPublish</a></code> | Grants read and publish permissions to the specified grantee on this CodeArtifact repository. |

---

##### `toString` <a name="toString" id="@open-constructs/aws-cdk.aws_codeartifact.Repository.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `applyRemovalPolicy` <a name="applyRemovalPolicy" id="@open-constructs/aws-cdk.aws_codeartifact.Repository.applyRemovalPolicy"></a>

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

###### `policy`<sup>Required</sup> <a name="policy" id="@open-constructs/aws-cdk.aws_codeartifact.Repository.applyRemovalPolicy.parameter.policy"></a>

- *Type:* aws-cdk-lib.RemovalPolicy

---

##### `addToResourcePolicy` <a name="addToResourcePolicy" id="@open-constructs/aws-cdk.aws_codeartifact.Repository.addToResourcePolicy"></a>

```typescript
public addToResourcePolicy(statement: PolicyStatement): AddToResourcePolicyResult
```

Adds a statement to the CodeArtifact repository resource policy.

###### `statement`<sup>Required</sup> <a name="statement" id="@open-constructs/aws-cdk.aws_codeartifact.Repository.addToResourcePolicy.parameter.statement"></a>

- *Type:* aws-cdk-lib.aws_iam.PolicyStatement

The policy statement to add.

---

##### `grant` <a name="grant" id="@open-constructs/aws-cdk.aws_codeartifact.Repository.grant"></a>

```typescript
public grant(grantee: IGrantable, actions: ...string[]): Grant
```

Grants permissions to the specified grantee on this CodeArtifact repository.

###### `grantee`<sup>Required</sup> <a name="grantee" id="@open-constructs/aws-cdk.aws_codeartifact.Repository.grant.parameter.grantee"></a>

- *Type:* aws-cdk-lib.aws_iam.IGrantable

The principal to grant permissions to.

---

###### `actions`<sup>Required</sup> <a name="actions" id="@open-constructs/aws-cdk.aws_codeartifact.Repository.grant.parameter.actions"></a>

- *Type:* ...string[]

The actions to grant.

---

##### `grantRead` <a name="grantRead" id="@open-constructs/aws-cdk.aws_codeartifact.Repository.grantRead"></a>

```typescript
public grantRead(grantee: IGrantable): Grant
```

Grants read permissions to the specified grantee on this CodeArtifact repository.

###### `grantee`<sup>Required</sup> <a name="grantee" id="@open-constructs/aws-cdk.aws_codeartifact.Repository.grantRead.parameter.grantee"></a>

- *Type:* aws-cdk-lib.aws_iam.IGrantable

The principal to grant read permissions to.

---

##### `grantReadAndPublish` <a name="grantReadAndPublish" id="@open-constructs/aws-cdk.aws_codeartifact.Repository.grantReadAndPublish"></a>

```typescript
public grantReadAndPublish(grantee: IGrantable): Grant
```

Grants read and publish permissions to the specified grantee on this CodeArtifact repository.

###### `grantee`<sup>Required</sup> <a name="grantee" id="@open-constructs/aws-cdk.aws_codeartifact.Repository.grantReadAndPublish.parameter.grantee"></a>

- *Type:* aws-cdk-lib.aws_iam.IGrantable

The principal to grant read and publish permissions to.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.Repository.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.Repository.isOwnedResource">isOwnedResource</a></code> | Returns true if the construct was created by CDK, and false otherwise. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.Repository.isResource">isResource</a></code> | Check whether the given construct is a Resource. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.Repository.fromRepositoryArn">fromRepositoryArn</a></code> | Creates an IRepository object from an existing repository ARN. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.Repository.fromRepositoryAttributes">fromRepositoryAttributes</a></code> | Creates an IRepository object from existing repository attributes. |

---

##### `isConstruct` <a name="isConstruct" id="@open-constructs/aws-cdk.aws_codeartifact.Repository.isConstruct"></a>

```typescript
import { aws_codeartifact } from '@open-constructs/aws-cdk'

aws_codeartifact.Repository.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="@open-constructs/aws-cdk.aws_codeartifact.Repository.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isOwnedResource` <a name="isOwnedResource" id="@open-constructs/aws-cdk.aws_codeartifact.Repository.isOwnedResource"></a>

```typescript
import { aws_codeartifact } from '@open-constructs/aws-cdk'

aws_codeartifact.Repository.isOwnedResource(construct: IConstruct)
```

Returns true if the construct was created by CDK, and false otherwise.

###### `construct`<sup>Required</sup> <a name="construct" id="@open-constructs/aws-cdk.aws_codeartifact.Repository.isOwnedResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

##### `isResource` <a name="isResource" id="@open-constructs/aws-cdk.aws_codeartifact.Repository.isResource"></a>

```typescript
import { aws_codeartifact } from '@open-constructs/aws-cdk'

aws_codeartifact.Repository.isResource(construct: IConstruct)
```

Check whether the given construct is a Resource.

###### `construct`<sup>Required</sup> <a name="construct" id="@open-constructs/aws-cdk.aws_codeartifact.Repository.isResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

##### `fromRepositoryArn` <a name="fromRepositoryArn" id="@open-constructs/aws-cdk.aws_codeartifact.Repository.fromRepositoryArn"></a>

```typescript
import { aws_codeartifact } from '@open-constructs/aws-cdk'

aws_codeartifact.Repository.fromRepositoryArn(scope: Construct, id: string, repositoryArn: string)
```

Creates an IRepository object from an existing repository ARN.

###### `scope`<sup>Required</sup> <a name="scope" id="@open-constructs/aws-cdk.aws_codeartifact.Repository.fromRepositoryArn.parameter.scope"></a>

- *Type:* constructs.Construct

The parent construct in which to create this repository reference.

---

###### `id`<sup>Required</sup> <a name="id" id="@open-constructs/aws-cdk.aws_codeartifact.Repository.fromRepositoryArn.parameter.id"></a>

- *Type:* string

The identifier of the construct.

---

###### `repositoryArn`<sup>Required</sup> <a name="repositoryArn" id="@open-constructs/aws-cdk.aws_codeartifact.Repository.fromRepositoryArn.parameter.repositoryArn"></a>

- *Type:* string

The ARN of the repository to import.

---

##### `fromRepositoryAttributes` <a name="fromRepositoryAttributes" id="@open-constructs/aws-cdk.aws_codeartifact.Repository.fromRepositoryAttributes"></a>

```typescript
import { aws_codeartifact } from '@open-constructs/aws-cdk'

aws_codeartifact.Repository.fromRepositoryAttributes(scope: Construct, id: string, attrs: RepositoryAttributes)
```

Creates an IRepository object from existing repository attributes.

###### `scope`<sup>Required</sup> <a name="scope" id="@open-constructs/aws-cdk.aws_codeartifact.Repository.fromRepositoryAttributes.parameter.scope"></a>

- *Type:* constructs.Construct

The parent construct in which to create this repository reference.

---

###### `id`<sup>Required</sup> <a name="id" id="@open-constructs/aws-cdk.aws_codeartifact.Repository.fromRepositoryAttributes.parameter.id"></a>

- *Type:* string

The identifier of the construct.

---

###### `attrs`<sup>Required</sup> <a name="attrs" id="@open-constructs/aws-cdk.aws_codeartifact.Repository.fromRepositoryAttributes.parameter.attrs"></a>

- *Type:* @open-constructs/aws-cdk.aws_codeartifact.RepositoryAttributes

The attributes of the repository to import.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.Repository.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.Repository.property.env">env</a></code> | <code>aws-cdk-lib.ResourceEnvironment</code> | The environment this resource belongs to. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.Repository.property.stack">stack</a></code> | <code>aws-cdk-lib.Stack</code> | The stack in which this resource is defined. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.Repository.property.cdkTagManager">cdkTagManager</a></code> | <code>aws-cdk-lib.TagManager</code> | TagManager to set, remove and format tags. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.Repository.property.domain">domain</a></code> | <code>@open-constructs/aws-cdk.aws_codeartifact.IDomain</code> | The domain that contains this repository. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.Repository.property.repositoryArn">repositoryArn</a></code> | <code>string</code> | The ARN (Amazon Resource Name) of this CodeArtifact repository. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.Repository.property.repositoryDomainName">repositoryDomainName</a></code> | <code>string</code> | The domain that contains this repository. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.Repository.property.repositoryDomainOwner">repositoryDomainOwner</a></code> | <code>string</code> | The domain owner of this repository. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.Repository.property.repositoryName">repositoryName</a></code> | <code>string</code> | The name of this CodeArtifact repository. |

---

##### `node`<sup>Required</sup> <a name="node" id="@open-constructs/aws-cdk.aws_codeartifact.Repository.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `env`<sup>Required</sup> <a name="env" id="@open-constructs/aws-cdk.aws_codeartifact.Repository.property.env"></a>

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

##### `stack`<sup>Required</sup> <a name="stack" id="@open-constructs/aws-cdk.aws_codeartifact.Repository.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- *Type:* aws-cdk-lib.Stack

The stack in which this resource is defined.

---

##### `cdkTagManager`<sup>Required</sup> <a name="cdkTagManager" id="@open-constructs/aws-cdk.aws_codeartifact.Repository.property.cdkTagManager"></a>

```typescript
public readonly cdkTagManager: TagManager;
```

- *Type:* aws-cdk-lib.TagManager

TagManager to set, remove and format tags.

---

##### `domain`<sup>Required</sup> <a name="domain" id="@open-constructs/aws-cdk.aws_codeartifact.Repository.property.domain"></a>

```typescript
public readonly domain: IDomain;
```

- *Type:* @open-constructs/aws-cdk.aws_codeartifact.IDomain

The domain that contains this repository.

---

##### `repositoryArn`<sup>Required</sup> <a name="repositoryArn" id="@open-constructs/aws-cdk.aws_codeartifact.Repository.property.repositoryArn"></a>

```typescript
public readonly repositoryArn: string;
```

- *Type:* string

The ARN (Amazon Resource Name) of this CodeArtifact repository.

---

##### `repositoryDomainName`<sup>Required</sup> <a name="repositoryDomainName" id="@open-constructs/aws-cdk.aws_codeartifact.Repository.property.repositoryDomainName"></a>

```typescript
public readonly repositoryDomainName: string;
```

- *Type:* string

The domain that contains this repository.

---

##### `repositoryDomainOwner`<sup>Required</sup> <a name="repositoryDomainOwner" id="@open-constructs/aws-cdk.aws_codeartifact.Repository.property.repositoryDomainOwner"></a>

```typescript
public readonly repositoryDomainOwner: string;
```

- *Type:* string

The domain owner of this repository.

---

##### `repositoryName`<sup>Required</sup> <a name="repositoryName" id="@open-constructs/aws-cdk.aws_codeartifact.Repository.property.repositoryName"></a>

```typescript
public readonly repositoryName: string;
```

- *Type:* string

The name of this CodeArtifact repository.

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

### DomainAttributes <a name="DomainAttributes" id="@open-constructs/aws-cdk.aws_codeartifact.DomainAttributes"></a>

Interface representing the attributes of a CodeArtifact domain.

#### Initializer <a name="Initializer" id="@open-constructs/aws-cdk.aws_codeartifact.DomainAttributes.Initializer"></a>

```typescript
import { aws_codeartifact } from '@open-constructs/aws-cdk'

const domainAttributes: aws_codeartifact.DomainAttributes = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.DomainAttributes.property.domainArn">domainArn</a></code> | <code>string</code> | The ARN (Amazon Resource Name) of the CodeArtifact domain. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.DomainAttributes.property.domainName">domainName</a></code> | <code>string</code> | The name of the CodeArtifact domain. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.DomainAttributes.property.domainOwner">domainOwner</a></code> | <code>string</code> | The AWS account ID that owns the domain. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.DomainAttributes.property.encryptionKey">encryptionKey</a></code> | <code>aws-cdk-lib.aws_kms.IKey</code> | The AWS KMS encryption key associated with the domain, if any. |

---

##### `domainArn`<sup>Required</sup> <a name="domainArn" id="@open-constructs/aws-cdk.aws_codeartifact.DomainAttributes.property.domainArn"></a>

```typescript
public readonly domainArn: string;
```

- *Type:* string

The ARN (Amazon Resource Name) of the CodeArtifact domain.

---

##### `domainName`<sup>Required</sup> <a name="domainName" id="@open-constructs/aws-cdk.aws_codeartifact.DomainAttributes.property.domainName"></a>

```typescript
public readonly domainName: string;
```

- *Type:* string

The name of the CodeArtifact domain.

---

##### `domainOwner`<sup>Required</sup> <a name="domainOwner" id="@open-constructs/aws-cdk.aws_codeartifact.DomainAttributes.property.domainOwner"></a>

```typescript
public readonly domainOwner: string;
```

- *Type:* string

The AWS account ID that owns the domain.

---

##### `encryptionKey`<sup>Optional</sup> <a name="encryptionKey" id="@open-constructs/aws-cdk.aws_codeartifact.DomainAttributes.property.encryptionKey"></a>

```typescript
public readonly encryptionKey: IKey;
```

- *Type:* aws-cdk-lib.aws_kms.IKey

The AWS KMS encryption key associated with the domain, if any.

---

### DomainProps <a name="DomainProps" id="@open-constructs/aws-cdk.aws_codeartifact.DomainProps"></a>

Construction properties for `Domain`.

#### Initializer <a name="Initializer" id="@open-constructs/aws-cdk.aws_codeartifact.DomainProps.Initializer"></a>

```typescript
import { aws_codeartifact } from '@open-constructs/aws-cdk'

const domainProps: aws_codeartifact.DomainProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.DomainProps.property.domainName">domainName</a></code> | <code>string</code> | The name of the Domain. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.DomainProps.property.encryptionKey">encryptionKey</a></code> | <code>aws-cdk-lib.aws_kms.IKey</code> | The key used to encrypt the Domain. |

---

##### `domainName`<sup>Required</sup> <a name="domainName" id="@open-constructs/aws-cdk.aws_codeartifact.DomainProps.property.domainName"></a>

```typescript
public readonly domainName: string;
```

- *Type:* string

The name of the Domain.

---

##### `encryptionKey`<sup>Optional</sup> <a name="encryptionKey" id="@open-constructs/aws-cdk.aws_codeartifact.DomainProps.property.encryptionKey"></a>

```typescript
public readonly encryptionKey: IKey;
```

- *Type:* aws-cdk-lib.aws_kms.IKey

The key used to encrypt the Domain.

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

### RepositoryAttributes <a name="RepositoryAttributes" id="@open-constructs/aws-cdk.aws_codeartifact.RepositoryAttributes"></a>

Represents the attributes of an existing CodeArtifact repository.

#### Initializer <a name="Initializer" id="@open-constructs/aws-cdk.aws_codeartifact.RepositoryAttributes.Initializer"></a>

```typescript
import { aws_codeartifact } from '@open-constructs/aws-cdk'

const repositoryAttributes: aws_codeartifact.RepositoryAttributes = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.RepositoryAttributes.property.domain">domain</a></code> | <code>@open-constructs/aws-cdk.aws_codeartifact.IDomain</code> | The CodeArtifact domain associated with this repository. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.RepositoryAttributes.property.repositoryArn">repositoryArn</a></code> | <code>string</code> | The ARN (Amazon Resource Name) of the CodeArtifact repository. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.RepositoryAttributes.property.repositoryName">repositoryName</a></code> | <code>string</code> | The name of the CodeArtifact repository. |

---

##### `domain`<sup>Required</sup> <a name="domain" id="@open-constructs/aws-cdk.aws_codeartifact.RepositoryAttributes.property.domain"></a>

```typescript
public readonly domain: IDomain;
```

- *Type:* @open-constructs/aws-cdk.aws_codeartifact.IDomain

The CodeArtifact domain associated with this repository.

---

##### `repositoryArn`<sup>Required</sup> <a name="repositoryArn" id="@open-constructs/aws-cdk.aws_codeartifact.RepositoryAttributes.property.repositoryArn"></a>

```typescript
public readonly repositoryArn: string;
```

- *Type:* string

The ARN (Amazon Resource Name) of the CodeArtifact repository.

---

##### `repositoryName`<sup>Required</sup> <a name="repositoryName" id="@open-constructs/aws-cdk.aws_codeartifact.RepositoryAttributes.property.repositoryName"></a>

```typescript
public readonly repositoryName: string;
```

- *Type:* string

The name of the CodeArtifact repository.

---

### RepositoryProps <a name="RepositoryProps" id="@open-constructs/aws-cdk.aws_codeartifact.RepositoryProps"></a>

Properties for creating a new CodeArtifact repository.

#### Initializer <a name="Initializer" id="@open-constructs/aws-cdk.aws_codeartifact.RepositoryProps.Initializer"></a>

```typescript
import { aws_codeartifact } from '@open-constructs/aws-cdk'

const repositoryProps: aws_codeartifact.RepositoryProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.RepositoryProps.property.domain">domain</a></code> | <code>@open-constructs/aws-cdk.aws_codeartifact.IDomain</code> | The domain that contains the repository. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.RepositoryProps.property.repositoryName">repositoryName</a></code> | <code>string</code> | The name of the repository. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.RepositoryProps.property.description">description</a></code> | <code>string</code> | The description of the repository. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.RepositoryProps.property.externalConnection">externalConnection</a></code> | <code>@open-constructs/aws-cdk.aws_codeartifact.RepositoryConnection</code> | The connections to external repositories (like npmjs, pypi, etc.). |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.RepositoryProps.property.upstreams">upstreams</a></code> | <code>@open-constructs/aws-cdk.aws_codeartifact.IRepository[]</code> | A list of upstream Codeartifact repositories to associate with the repository. |

---

##### `domain`<sup>Required</sup> <a name="domain" id="@open-constructs/aws-cdk.aws_codeartifact.RepositoryProps.property.domain"></a>

```typescript
public readonly domain: IDomain;
```

- *Type:* @open-constructs/aws-cdk.aws_codeartifact.IDomain

The domain that contains the repository.

---

##### `repositoryName`<sup>Required</sup> <a name="repositoryName" id="@open-constructs/aws-cdk.aws_codeartifact.RepositoryProps.property.repositoryName"></a>

```typescript
public readonly repositoryName: string;
```

- *Type:* string

The name of the repository.

---

##### `description`<sup>Optional</sup> <a name="description" id="@open-constructs/aws-cdk.aws_codeartifact.RepositoryProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

The description of the repository.

---

##### `externalConnection`<sup>Optional</sup> <a name="externalConnection" id="@open-constructs/aws-cdk.aws_codeartifact.RepositoryProps.property.externalConnection"></a>

```typescript
public readonly externalConnection: RepositoryConnection;
```

- *Type:* @open-constructs/aws-cdk.aws_codeartifact.RepositoryConnection

The connections to external repositories (like npmjs, pypi, etc.).

You can use the AWS CLI to connect your CodeArtifact repository to an external repository by adding an external connection directly to the repository.
This will allow users connected to the CodeArtifact repository, or any of its downstream repositories, to fetch packages from the configured external repository.
Each CodeArtifact repository can only have one external connection.

---

##### `upstreams`<sup>Optional</sup> <a name="upstreams" id="@open-constructs/aws-cdk.aws_codeartifact.RepositoryProps.property.upstreams"></a>

```typescript
public readonly upstreams: IRepository[];
```

- *Type:* @open-constructs/aws-cdk.aws_codeartifact.IRepository[]
- *Default:* No upstream repositories

A list of upstream Codeartifact repositories to associate with the repository.

The order of the upstream repositories in the list determines their priority order when CodeArtifact looks for a requested package version.
see https://docs.aws.amazon.com/codeartifact/latest/ug/repo-upstream-behavior.html#package-retention-intermediate-repositories

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

### IDomain <a name="IDomain" id="@open-constructs/aws-cdk.aws_codeartifact.IDomain"></a>

- *Extends:* aws-cdk-lib.IResource

- *Implemented By:* @open-constructs/aws-cdk.aws_codeartifact.Domain, @open-constructs/aws-cdk.aws_codeartifact.IDomain

Represents a Codeartifact Domain.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.IDomain.addToResourcePolicy">addToResourcePolicy</a></code> | Adds a statement to the Codeartifact domain resource policy. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.IDomain.grant">grant</a></code> | Grants permissions to the specified grantee on this CodeArtifact domain. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.IDomain.grantContribute">grantContribute</a></code> | Grants contribute permissions to the specified grantee on this CodeArtifact domain. |

---

##### `addToResourcePolicy` <a name="addToResourcePolicy" id="@open-constructs/aws-cdk.aws_codeartifact.IDomain.addToResourcePolicy"></a>

```typescript
public addToResourcePolicy(statement: PolicyStatement): AddToResourcePolicyResult
```

Adds a statement to the Codeartifact domain resource policy.

###### `statement`<sup>Required</sup> <a name="statement" id="@open-constructs/aws-cdk.aws_codeartifact.IDomain.addToResourcePolicy.parameter.statement"></a>

- *Type:* aws-cdk-lib.aws_iam.PolicyStatement

The policy statement to add.

---

##### `grant` <a name="grant" id="@open-constructs/aws-cdk.aws_codeartifact.IDomain.grant"></a>

```typescript
public grant(grantee: IGrantable, actions: ...string[]): Grant
```

Grants permissions to the specified grantee on this CodeArtifact domain.

It handles both same-environment and cross-environment scenarios:
- For same-environment grants, it adds the permissions to the principal or resource.
- For cross-environment grants, it adds the permissions to both the principal and the resource.

###### `grantee`<sup>Required</sup> <a name="grantee" id="@open-constructs/aws-cdk.aws_codeartifact.IDomain.grant.parameter.grantee"></a>

- *Type:* aws-cdk-lib.aws_iam.IGrantable

The principal to grant permissions to.

---

###### `actions`<sup>Required</sup> <a name="actions" id="@open-constructs/aws-cdk.aws_codeartifact.IDomain.grant.parameter.actions"></a>

- *Type:* ...string[]

The actions to grant.

These should be valid CodeArtifact actions.

---

##### `grantContribute` <a name="grantContribute" id="@open-constructs/aws-cdk.aws_codeartifact.IDomain.grantContribute"></a>

```typescript
public grantContribute(grantee: IGrantable): Grant
```

Grants contribute permissions to the specified grantee on this CodeArtifact domain.

###### `grantee`<sup>Required</sup> <a name="grantee" id="@open-constructs/aws-cdk.aws_codeartifact.IDomain.grantContribute.parameter.grantee"></a>

- *Type:* aws-cdk-lib.aws_iam.IGrantable

The principal to grant contribute permissions to.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.IDomain.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.IDomain.property.env">env</a></code> | <code>aws-cdk-lib.ResourceEnvironment</code> | The environment this resource belongs to. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.IDomain.property.stack">stack</a></code> | <code>aws-cdk-lib.Stack</code> | The stack in which this resource is defined. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.IDomain.property.domainArn">domainArn</a></code> | <code>string</code> | The ARN of the Domain. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.IDomain.property.domainName">domainName</a></code> | <code>string</code> | The name of the Domain. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.IDomain.property.domainOwner">domainOwner</a></code> | <code>string</code> | 12-digit account number of the AWS account that owns the domain that contains the Domain. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.IDomain.property.domainEncryptionKey">domainEncryptionKey</a></code> | <code>string</code> | The ARN of the key used to encrypt the Domain. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.IDomain.property.encryptionKey">encryptionKey</a></code> | <code>aws-cdk-lib.aws_kms.IKey</code> | The KMS key used to encrypt the Domain. |

---

##### `node`<sup>Required</sup> <a name="node" id="@open-constructs/aws-cdk.aws_codeartifact.IDomain.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `env`<sup>Required</sup> <a name="env" id="@open-constructs/aws-cdk.aws_codeartifact.IDomain.property.env"></a>

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

##### `stack`<sup>Required</sup> <a name="stack" id="@open-constructs/aws-cdk.aws_codeartifact.IDomain.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- *Type:* aws-cdk-lib.Stack

The stack in which this resource is defined.

---

##### `domainArn`<sup>Required</sup> <a name="domainArn" id="@open-constructs/aws-cdk.aws_codeartifact.IDomain.property.domainArn"></a>

```typescript
public readonly domainArn: string;
```

- *Type:* string

The ARN of the Domain.

---

##### `domainName`<sup>Required</sup> <a name="domainName" id="@open-constructs/aws-cdk.aws_codeartifact.IDomain.property.domainName"></a>

```typescript
public readonly domainName: string;
```

- *Type:* string

The name of the Domain.

---

##### `domainOwner`<sup>Required</sup> <a name="domainOwner" id="@open-constructs/aws-cdk.aws_codeartifact.IDomain.property.domainOwner"></a>

```typescript
public readonly domainOwner: string;
```

- *Type:* string

12-digit account number of the AWS account that owns the domain that contains the Domain.

---

##### `domainEncryptionKey`<sup>Optional</sup> <a name="domainEncryptionKey" id="@open-constructs/aws-cdk.aws_codeartifact.IDomain.property.domainEncryptionKey"></a>

```typescript
public readonly domainEncryptionKey: string;
```

- *Type:* string

The ARN of the key used to encrypt the Domain.

---

##### `encryptionKey`<sup>Optional</sup> <a name="encryptionKey" id="@open-constructs/aws-cdk.aws_codeartifact.IDomain.property.encryptionKey"></a>

```typescript
public readonly encryptionKey: IKey;
```

- *Type:* aws-cdk-lib.aws_kms.IKey

The KMS key used to encrypt the Domain.

---

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

### IRepository <a name="IRepository" id="@open-constructs/aws-cdk.aws_codeartifact.IRepository"></a>

- *Extends:* aws-cdk-lib.IResource

- *Implemented By:* @open-constructs/aws-cdk.aws_codeartifact.Repository, @open-constructs/aws-cdk.aws_codeartifact.IRepository

Represents an Codeartifact Repository.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.IRepository.addToResourcePolicy">addToResourcePolicy</a></code> | Adds a statement to the CodeArtifact repository resource policy. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.IRepository.grant">grant</a></code> | Grants the given principal identity permissions to perform the actions on the repository. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.IRepository.grantRead">grantRead</a></code> | Grants the given principal identity permissions to perform the actions on the repository. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.IRepository.grantReadAndPublish">grantReadAndPublish</a></code> | Grants the given principal identity permissions to perform the actions on the repository. |

---

##### `addToResourcePolicy` <a name="addToResourcePolicy" id="@open-constructs/aws-cdk.aws_codeartifact.IRepository.addToResourcePolicy"></a>

```typescript
public addToResourcePolicy(statement: PolicyStatement): AddToResourcePolicyResult
```

Adds a statement to the CodeArtifact repository resource policy.

###### `statement`<sup>Required</sup> <a name="statement" id="@open-constructs/aws-cdk.aws_codeartifact.IRepository.addToResourcePolicy.parameter.statement"></a>

- *Type:* aws-cdk-lib.aws_iam.PolicyStatement

The policy statement to add.

---

##### `grant` <a name="grant" id="@open-constructs/aws-cdk.aws_codeartifact.IRepository.grant"></a>

```typescript
public grant(grantee: IGrantable, actions: ...string[]): Grant
```

Grants the given principal identity permissions to perform the actions on the repository.

###### `grantee`<sup>Required</sup> <a name="grantee" id="@open-constructs/aws-cdk.aws_codeartifact.IRepository.grant.parameter.grantee"></a>

- *Type:* aws-cdk-lib.aws_iam.IGrantable

The principal to grant permissions to.

---

###### `actions`<sup>Required</sup> <a name="actions" id="@open-constructs/aws-cdk.aws_codeartifact.IRepository.grant.parameter.actions"></a>

- *Type:* ...string[]

The actions to grant.

---

##### `grantRead` <a name="grantRead" id="@open-constructs/aws-cdk.aws_codeartifact.IRepository.grantRead"></a>

```typescript
public grantRead(grantee: IGrantable): Grant
```

Grants the given principal identity permissions to perform the actions on the repository.

###### `grantee`<sup>Required</sup> <a name="grantee" id="@open-constructs/aws-cdk.aws_codeartifact.IRepository.grantRead.parameter.grantee"></a>

- *Type:* aws-cdk-lib.aws_iam.IGrantable

The principal to grant permissions to.

---

##### `grantReadAndPublish` <a name="grantReadAndPublish" id="@open-constructs/aws-cdk.aws_codeartifact.IRepository.grantReadAndPublish"></a>

```typescript
public grantReadAndPublish(grantee: IGrantable): Grant
```

Grants the given principal identity permissions to perform the actions on the repository.

###### `grantee`<sup>Required</sup> <a name="grantee" id="@open-constructs/aws-cdk.aws_codeartifact.IRepository.grantReadAndPublish.parameter.grantee"></a>

- *Type:* aws-cdk-lib.aws_iam.IGrantable

The principal to grant permissions to.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.IRepository.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.IRepository.property.env">env</a></code> | <code>aws-cdk-lib.ResourceEnvironment</code> | The environment this resource belongs to. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.IRepository.property.stack">stack</a></code> | <code>aws-cdk-lib.Stack</code> | The stack in which this resource is defined. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.IRepository.property.domain">domain</a></code> | <code>@open-constructs/aws-cdk.aws_codeartifact.IDomain</code> | The domain that contains the repository. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.IRepository.property.repositoryArn">repositoryArn</a></code> | <code>string</code> | The ARN of the repository. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.IRepository.property.repositoryDomainName">repositoryDomainName</a></code> | <code>string</code> | The domain that contains the repository. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.IRepository.property.repositoryDomainOwner">repositoryDomainOwner</a></code> | <code>string</code> | The domain owner of the repository. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.IRepository.property.repositoryName">repositoryName</a></code> | <code>string</code> | The name of the repository. |

---

##### `node`<sup>Required</sup> <a name="node" id="@open-constructs/aws-cdk.aws_codeartifact.IRepository.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `env`<sup>Required</sup> <a name="env" id="@open-constructs/aws-cdk.aws_codeartifact.IRepository.property.env"></a>

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

##### `stack`<sup>Required</sup> <a name="stack" id="@open-constructs/aws-cdk.aws_codeartifact.IRepository.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- *Type:* aws-cdk-lib.Stack

The stack in which this resource is defined.

---

##### `domain`<sup>Required</sup> <a name="domain" id="@open-constructs/aws-cdk.aws_codeartifact.IRepository.property.domain"></a>

```typescript
public readonly domain: IDomain;
```

- *Type:* @open-constructs/aws-cdk.aws_codeartifact.IDomain

The domain that contains the repository.

---

##### `repositoryArn`<sup>Required</sup> <a name="repositoryArn" id="@open-constructs/aws-cdk.aws_codeartifact.IRepository.property.repositoryArn"></a>

```typescript
public readonly repositoryArn: string;
```

- *Type:* string

The ARN of the repository.

---

##### `repositoryDomainName`<sup>Required</sup> <a name="repositoryDomainName" id="@open-constructs/aws-cdk.aws_codeartifact.IRepository.property.repositoryDomainName"></a>

```typescript
public readonly repositoryDomainName: string;
```

- *Type:* string

The domain that contains the repository.

---

##### `repositoryDomainOwner`<sup>Required</sup> <a name="repositoryDomainOwner" id="@open-constructs/aws-cdk.aws_codeartifact.IRepository.property.repositoryDomainOwner"></a>

```typescript
public readonly repositoryDomainOwner: string;
```

- *Type:* string

The domain owner of the repository.

---

##### `repositoryName`<sup>Required</sup> <a name="repositoryName" id="@open-constructs/aws-cdk.aws_codeartifact.IRepository.property.repositoryName"></a>

```typescript
public readonly repositoryName: string;
```

- *Type:* string

The name of the repository.

---

## Enums <a name="Enums" id="Enums"></a>

### RepositoryConnection <a name="RepositoryConnection" id="@open-constructs/aws-cdk.aws_codeartifact.RepositoryConnection"></a>

Represents the supported external connections for CodeArtifact repositories.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.RepositoryConnection.PYTHON">PYTHON</a></code> | Python Package Index (PyPI). |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.RepositoryConnection.NPM">NPM</a></code> | Node Package Manager (npm). |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.RepositoryConnection.NUGET">NUGET</a></code> | NuGet Gallery. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.RepositoryConnection.RUBY">RUBY</a></code> | RubyGems. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.RepositoryConnection.RUST">RUST</a></code> | Crates.io (Rust). |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.RepositoryConnection.MAVEN_CENTRAL">MAVEN_CENTRAL</a></code> | Maven Central Repository. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.RepositoryConnection.GRADLE_PLUGINS">GRADLE_PLUGINS</a></code> | Gradle Plugins. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.RepositoryConnection.MAVEN_GOOGLE">MAVEN_GOOGLE</a></code> | Maven Google. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.RepositoryConnection.MAVEN_APACHE">MAVEN_APACHE</a></code> | Maven Apache. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.RepositoryConnection.MAVEN_ATLASSIAN">MAVEN_ATLASSIAN</a></code> | Maven Atlassian. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.RepositoryConnection.MAVEN_ECLIPSE">MAVEN_ECLIPSE</a></code> | Maven Eclipse. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.RepositoryConnection.MAVEN_JBOSS">MAVEN_JBOSS</a></code> | Maven JBoss. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.RepositoryConnection.MAVEN_SPRING">MAVEN_SPRING</a></code> | Maven Spring. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.RepositoryConnection.MAVEN_SPRING_PLUGINS">MAVEN_SPRING_PLUGINS</a></code> | Maven Spring Plugins. |

---

##### `PYTHON` <a name="PYTHON" id="@open-constructs/aws-cdk.aws_codeartifact.RepositoryConnection.PYTHON"></a>

Python Package Index (PyPI).

---


##### `NPM` <a name="NPM" id="@open-constructs/aws-cdk.aws_codeartifact.RepositoryConnection.NPM"></a>

Node Package Manager (npm).

---


##### `NUGET` <a name="NUGET" id="@open-constructs/aws-cdk.aws_codeartifact.RepositoryConnection.NUGET"></a>

NuGet Gallery.

---


##### `RUBY` <a name="RUBY" id="@open-constructs/aws-cdk.aws_codeartifact.RepositoryConnection.RUBY"></a>

RubyGems.

---


##### `RUST` <a name="RUST" id="@open-constructs/aws-cdk.aws_codeartifact.RepositoryConnection.RUST"></a>

Crates.io (Rust).

---


##### `MAVEN_CENTRAL` <a name="MAVEN_CENTRAL" id="@open-constructs/aws-cdk.aws_codeartifact.RepositoryConnection.MAVEN_CENTRAL"></a>

Maven Central Repository.

---


##### `GRADLE_PLUGINS` <a name="GRADLE_PLUGINS" id="@open-constructs/aws-cdk.aws_codeartifact.RepositoryConnection.GRADLE_PLUGINS"></a>

Gradle Plugins.

---


##### `MAVEN_GOOGLE` <a name="MAVEN_GOOGLE" id="@open-constructs/aws-cdk.aws_codeartifact.RepositoryConnection.MAVEN_GOOGLE"></a>

Maven Google.

---


##### `MAVEN_APACHE` <a name="MAVEN_APACHE" id="@open-constructs/aws-cdk.aws_codeartifact.RepositoryConnection.MAVEN_APACHE"></a>

Maven Apache.

---


##### `MAVEN_ATLASSIAN` <a name="MAVEN_ATLASSIAN" id="@open-constructs/aws-cdk.aws_codeartifact.RepositoryConnection.MAVEN_ATLASSIAN"></a>

Maven Atlassian.

---


##### `MAVEN_ECLIPSE` <a name="MAVEN_ECLIPSE" id="@open-constructs/aws-cdk.aws_codeartifact.RepositoryConnection.MAVEN_ECLIPSE"></a>

Maven Eclipse.

---


##### `MAVEN_JBOSS` <a name="MAVEN_JBOSS" id="@open-constructs/aws-cdk.aws_codeartifact.RepositoryConnection.MAVEN_JBOSS"></a>

Maven JBoss.

---


##### `MAVEN_SPRING` <a name="MAVEN_SPRING" id="@open-constructs/aws-cdk.aws_codeartifact.RepositoryConnection.MAVEN_SPRING"></a>

Maven Spring.

---


##### `MAVEN_SPRING_PLUGINS` <a name="MAVEN_SPRING_PLUGINS" id="@open-constructs/aws-cdk.aws_codeartifact.RepositoryConnection.MAVEN_SPRING_PLUGINS"></a>

Maven Spring Plugins.

---

