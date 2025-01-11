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

- *Implements:* @open-constructs/aws-cdk.aws_codeartifact.IDomain

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


### IamUser <a name="IamUser" id="@open-constructs/aws-cdk.aws_elasticache.IamUser"></a>

- *Implements:* @open-constructs/aws-cdk.aws_elasticache.IUser

Represents an IAM-enabled user construct in AWS CDK.

*Example*

```typescript
const user = new IamUser(
  stack,
  'User',
  {
    accessString: 'on ~* +@all',
  },
);
```


#### Initializers <a name="Initializers" id="@open-constructs/aws-cdk.aws_elasticache.IamUser.Initializer"></a>

```typescript
import { aws_elasticache } from '@open-constructs/aws-cdk'

new aws_elasticache.IamUser(scope: Construct, id: string, props?: IamUserProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.IamUser.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.IamUser.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.IamUser.Initializer.parameter.props">props</a></code> | <code>@open-constructs/aws-cdk.aws_elasticache.IamUserProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@open-constructs/aws-cdk.aws_elasticache.IamUser.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@open-constructs/aws-cdk.aws_elasticache.IamUser.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Optional</sup> <a name="props" id="@open-constructs/aws-cdk.aws_elasticache.IamUser.Initializer.parameter.props"></a>

- *Type:* @open-constructs/aws-cdk.aws_elasticache.IamUserProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.IamUser.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.IamUser.applyRemovalPolicy">applyRemovalPolicy</a></code> | Apply the given removal policy to this resource. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.IamUser.grant">grant</a></code> | Grant the given identity the specified actions. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.IamUser.grantConnect">grantConnect</a></code> | Permits an IAM principal to perform connect to the user. |

---

##### `toString` <a name="toString" id="@open-constructs/aws-cdk.aws_elasticache.IamUser.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `applyRemovalPolicy` <a name="applyRemovalPolicy" id="@open-constructs/aws-cdk.aws_elasticache.IamUser.applyRemovalPolicy"></a>

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

###### `policy`<sup>Required</sup> <a name="policy" id="@open-constructs/aws-cdk.aws_elasticache.IamUser.applyRemovalPolicy.parameter.policy"></a>

- *Type:* aws-cdk-lib.RemovalPolicy

---

##### `grant` <a name="grant" id="@open-constructs/aws-cdk.aws_elasticache.IamUser.grant"></a>

```typescript
public grant(grantee: IGrantable, actions: ...string[]): Grant
```

Grant the given identity the specified actions.

> [https://docs.aws.amazon.com/service-authorization/latest/reference/list_amazonelasticache.html](https://docs.aws.amazon.com/service-authorization/latest/reference/list_amazonelasticache.html)

###### `grantee`<sup>Required</sup> <a name="grantee" id="@open-constructs/aws-cdk.aws_elasticache.IamUser.grant.parameter.grantee"></a>

- *Type:* aws-cdk-lib.aws_iam.IGrantable

the identity to be granted the actions.

---

###### `actions`<sup>Required</sup> <a name="actions" id="@open-constructs/aws-cdk.aws_elasticache.IamUser.grant.parameter.actions"></a>

- *Type:* ...string[]

the data-access actions.

---

##### `grantConnect` <a name="grantConnect" id="@open-constructs/aws-cdk.aws_elasticache.IamUser.grantConnect"></a>

```typescript
public grantConnect(grantee: IGrantable): Grant
```

Permits an IAM principal to perform connect to the user.

Actions: Connect

> [https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/auth-iam.html](https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/auth-iam.html)

###### `grantee`<sup>Required</sup> <a name="grantee" id="@open-constructs/aws-cdk.aws_elasticache.IamUser.grantConnect.parameter.grantee"></a>

- *Type:* aws-cdk-lib.aws_iam.IGrantable

The principal to grant access to.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.IamUser.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.IamUser.isOwnedResource">isOwnedResource</a></code> | Returns true if the construct was created by CDK, and false otherwise. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.IamUser.isResource">isResource</a></code> | Check whether the given construct is a Resource. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.IamUser.fromUserAttributes">fromUserAttributes</a></code> | Imports an existing User from attributes. |

---

##### `isConstruct` <a name="isConstruct" id="@open-constructs/aws-cdk.aws_elasticache.IamUser.isConstruct"></a>

```typescript
import { aws_elasticache } from '@open-constructs/aws-cdk'

aws_elasticache.IamUser.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="@open-constructs/aws-cdk.aws_elasticache.IamUser.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isOwnedResource` <a name="isOwnedResource" id="@open-constructs/aws-cdk.aws_elasticache.IamUser.isOwnedResource"></a>

```typescript
import { aws_elasticache } from '@open-constructs/aws-cdk'

aws_elasticache.IamUser.isOwnedResource(construct: IConstruct)
```

Returns true if the construct was created by CDK, and false otherwise.

###### `construct`<sup>Required</sup> <a name="construct" id="@open-constructs/aws-cdk.aws_elasticache.IamUser.isOwnedResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

##### `isResource` <a name="isResource" id="@open-constructs/aws-cdk.aws_elasticache.IamUser.isResource"></a>

```typescript
import { aws_elasticache } from '@open-constructs/aws-cdk'

aws_elasticache.IamUser.isResource(construct: IConstruct)
```

Check whether the given construct is a Resource.

###### `construct`<sup>Required</sup> <a name="construct" id="@open-constructs/aws-cdk.aws_elasticache.IamUser.isResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

##### `fromUserAttributes` <a name="fromUserAttributes" id="@open-constructs/aws-cdk.aws_elasticache.IamUser.fromUserAttributes"></a>

```typescript
import { aws_elasticache } from '@open-constructs/aws-cdk'

aws_elasticache.IamUser.fromUserAttributes(scope: Construct, id: string, attrs: UserAttributes)
```

Imports an existing User from attributes.

###### `scope`<sup>Required</sup> <a name="scope" id="@open-constructs/aws-cdk.aws_elasticache.IamUser.fromUserAttributes.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `id`<sup>Required</sup> <a name="id" id="@open-constructs/aws-cdk.aws_elasticache.IamUser.fromUserAttributes.parameter.id"></a>

- *Type:* string

---

###### `attrs`<sup>Required</sup> <a name="attrs" id="@open-constructs/aws-cdk.aws_elasticache.IamUser.fromUserAttributes.parameter.attrs"></a>

- *Type:* @open-constructs/aws-cdk.aws_elasticache.UserAttributes

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.IamUser.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.IamUser.property.env">env</a></code> | <code>aws-cdk-lib.ResourceEnvironment</code> | The environment this resource belongs to. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.IamUser.property.stack">stack</a></code> | <code>aws-cdk-lib.Stack</code> | The stack in which this resource is defined. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.IamUser.property.userArn">userArn</a></code> | <code>string</code> | The ARN of the user. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.IamUser.property.userId">userId</a></code> | <code>string</code> | The ID of the user. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.IamUser.property.userName">userName</a></code> | <code>string</code> | The name of the user. |

---

##### `node`<sup>Required</sup> <a name="node" id="@open-constructs/aws-cdk.aws_elasticache.IamUser.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `env`<sup>Required</sup> <a name="env" id="@open-constructs/aws-cdk.aws_elasticache.IamUser.property.env"></a>

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

##### `stack`<sup>Required</sup> <a name="stack" id="@open-constructs/aws-cdk.aws_elasticache.IamUser.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- *Type:* aws-cdk-lib.Stack

The stack in which this resource is defined.

---

##### `userArn`<sup>Required</sup> <a name="userArn" id="@open-constructs/aws-cdk.aws_elasticache.IamUser.property.userArn"></a>

```typescript
public readonly userArn: string;
```

- *Type:* string

The ARN of the user.

---

##### `userId`<sup>Required</sup> <a name="userId" id="@open-constructs/aws-cdk.aws_elasticache.IamUser.property.userId"></a>

```typescript
public readonly userId: string;
```

- *Type:* string

The ID of the user.

---

##### `userName`<sup>Required</sup> <a name="userName" id="@open-constructs/aws-cdk.aws_elasticache.IamUser.property.userName"></a>

```typescript
public readonly userName: string;
```

- *Type:* string

The name of the user.

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
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.Namespace.addIamRole">addIamRole</a></code> | Adds a role to the namespace. |

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

##### `addIamRole` <a name="addIamRole" id="@open-constructs/aws-cdk.aws_redshiftserverless.Namespace.addIamRole"></a>

```typescript
public addIamRole(role: IRole): void
```

Adds a role to the namespace.

###### `role`<sup>Required</sup> <a name="role" id="@open-constructs/aws-cdk.aws_redshiftserverless.Namespace.addIamRole.parameter.role"></a>

- *Type:* aws-cdk-lib.aws_iam.IRole

the role to add.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.Namespace.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.Namespace.isOwnedResource">isOwnedResource</a></code> | Returns true if the construct was created by CDK, and false otherwise. |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.Namespace.isResource">isResource</a></code> | Check whether the given construct is a Resource. |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.Namespace.fromNamespaceAttributes">fromNamespaceAttributes</a></code> | Imports an existing Namespace from attributes. |

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

Imports an existing Namespace from attributes.

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
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.Namespace.property.namespaceId">namespaceId</a></code> | <code>string</code> | The namespace id. |
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

##### `namespaceId`<sup>Required</sup> <a name="namespaceId" id="@open-constructs/aws-cdk.aws_redshiftserverless.Namespace.property.namespaceId"></a>

```typescript
public readonly namespaceId: string;
```

- *Type:* string

The namespace id.

---

##### `namespaceName`<sup>Required</sup> <a name="namespaceName" id="@open-constructs/aws-cdk.aws_redshiftserverless.Namespace.property.namespaceName"></a>

```typescript
public readonly namespaceName: string;
```

- *Type:* string

The namespace name.

---


### NoPasswordRequiredUser <a name="NoPasswordRequiredUser" id="@open-constructs/aws-cdk.aws_elasticache.NoPasswordRequiredUser"></a>

- *Implements:* @open-constructs/aws-cdk.aws_elasticache.IUser

Represents a no password required user construct in AWS CDK.

*Example*

```typescript
const user = new NoPasswordRequiredUser(
  stack,
  'User',
  {
    userName: 'my-user',
    accessString: 'on ~* +@all',
  },
);
```


#### Initializers <a name="Initializers" id="@open-constructs/aws-cdk.aws_elasticache.NoPasswordRequiredUser.Initializer"></a>

```typescript
import { aws_elasticache } from '@open-constructs/aws-cdk'

new aws_elasticache.NoPasswordRequiredUser(scope: Construct, id: string, props?: NoPasswordRequiredUserProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.NoPasswordRequiredUser.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.NoPasswordRequiredUser.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.NoPasswordRequiredUser.Initializer.parameter.props">props</a></code> | <code>@open-constructs/aws-cdk.aws_elasticache.NoPasswordRequiredUserProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@open-constructs/aws-cdk.aws_elasticache.NoPasswordRequiredUser.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@open-constructs/aws-cdk.aws_elasticache.NoPasswordRequiredUser.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Optional</sup> <a name="props" id="@open-constructs/aws-cdk.aws_elasticache.NoPasswordRequiredUser.Initializer.parameter.props"></a>

- *Type:* @open-constructs/aws-cdk.aws_elasticache.NoPasswordRequiredUserProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.NoPasswordRequiredUser.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.NoPasswordRequiredUser.applyRemovalPolicy">applyRemovalPolicy</a></code> | Apply the given removal policy to this resource. |

---

##### `toString` <a name="toString" id="@open-constructs/aws-cdk.aws_elasticache.NoPasswordRequiredUser.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `applyRemovalPolicy` <a name="applyRemovalPolicy" id="@open-constructs/aws-cdk.aws_elasticache.NoPasswordRequiredUser.applyRemovalPolicy"></a>

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

###### `policy`<sup>Required</sup> <a name="policy" id="@open-constructs/aws-cdk.aws_elasticache.NoPasswordRequiredUser.applyRemovalPolicy.parameter.policy"></a>

- *Type:* aws-cdk-lib.RemovalPolicy

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.NoPasswordRequiredUser.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.NoPasswordRequiredUser.isOwnedResource">isOwnedResource</a></code> | Returns true if the construct was created by CDK, and false otherwise. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.NoPasswordRequiredUser.isResource">isResource</a></code> | Check whether the given construct is a Resource. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.NoPasswordRequiredUser.fromUserAttributes">fromUserAttributes</a></code> | Imports an existing User from attributes. |

---

##### `isConstruct` <a name="isConstruct" id="@open-constructs/aws-cdk.aws_elasticache.NoPasswordRequiredUser.isConstruct"></a>

```typescript
import { aws_elasticache } from '@open-constructs/aws-cdk'

aws_elasticache.NoPasswordRequiredUser.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="@open-constructs/aws-cdk.aws_elasticache.NoPasswordRequiredUser.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isOwnedResource` <a name="isOwnedResource" id="@open-constructs/aws-cdk.aws_elasticache.NoPasswordRequiredUser.isOwnedResource"></a>

```typescript
import { aws_elasticache } from '@open-constructs/aws-cdk'

aws_elasticache.NoPasswordRequiredUser.isOwnedResource(construct: IConstruct)
```

Returns true if the construct was created by CDK, and false otherwise.

###### `construct`<sup>Required</sup> <a name="construct" id="@open-constructs/aws-cdk.aws_elasticache.NoPasswordRequiredUser.isOwnedResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

##### `isResource` <a name="isResource" id="@open-constructs/aws-cdk.aws_elasticache.NoPasswordRequiredUser.isResource"></a>

```typescript
import { aws_elasticache } from '@open-constructs/aws-cdk'

aws_elasticache.NoPasswordRequiredUser.isResource(construct: IConstruct)
```

Check whether the given construct is a Resource.

###### `construct`<sup>Required</sup> <a name="construct" id="@open-constructs/aws-cdk.aws_elasticache.NoPasswordRequiredUser.isResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

##### `fromUserAttributes` <a name="fromUserAttributes" id="@open-constructs/aws-cdk.aws_elasticache.NoPasswordRequiredUser.fromUserAttributes"></a>

```typescript
import { aws_elasticache } from '@open-constructs/aws-cdk'

aws_elasticache.NoPasswordRequiredUser.fromUserAttributes(scope: Construct, id: string, attrs: UserAttributes)
```

Imports an existing User from attributes.

###### `scope`<sup>Required</sup> <a name="scope" id="@open-constructs/aws-cdk.aws_elasticache.NoPasswordRequiredUser.fromUserAttributes.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `id`<sup>Required</sup> <a name="id" id="@open-constructs/aws-cdk.aws_elasticache.NoPasswordRequiredUser.fromUserAttributes.parameter.id"></a>

- *Type:* string

---

###### `attrs`<sup>Required</sup> <a name="attrs" id="@open-constructs/aws-cdk.aws_elasticache.NoPasswordRequiredUser.fromUserAttributes.parameter.attrs"></a>

- *Type:* @open-constructs/aws-cdk.aws_elasticache.UserAttributes

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.NoPasswordRequiredUser.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.NoPasswordRequiredUser.property.env">env</a></code> | <code>aws-cdk-lib.ResourceEnvironment</code> | The environment this resource belongs to. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.NoPasswordRequiredUser.property.stack">stack</a></code> | <code>aws-cdk-lib.Stack</code> | The stack in which this resource is defined. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.NoPasswordRequiredUser.property.userArn">userArn</a></code> | <code>string</code> | The ARN of the user. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.NoPasswordRequiredUser.property.userId">userId</a></code> | <code>string</code> | The ID of the user. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.NoPasswordRequiredUser.property.userName">userName</a></code> | <code>string</code> | The name of the user. |

---

##### `node`<sup>Required</sup> <a name="node" id="@open-constructs/aws-cdk.aws_elasticache.NoPasswordRequiredUser.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `env`<sup>Required</sup> <a name="env" id="@open-constructs/aws-cdk.aws_elasticache.NoPasswordRequiredUser.property.env"></a>

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

##### `stack`<sup>Required</sup> <a name="stack" id="@open-constructs/aws-cdk.aws_elasticache.NoPasswordRequiredUser.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- *Type:* aws-cdk-lib.Stack

The stack in which this resource is defined.

---

##### `userArn`<sup>Required</sup> <a name="userArn" id="@open-constructs/aws-cdk.aws_elasticache.NoPasswordRequiredUser.property.userArn"></a>

```typescript
public readonly userArn: string;
```

- *Type:* string

The ARN of the user.

---

##### `userId`<sup>Required</sup> <a name="userId" id="@open-constructs/aws-cdk.aws_elasticache.NoPasswordRequiredUser.property.userId"></a>

```typescript
public readonly userId: string;
```

- *Type:* string

The ID of the user.

---

##### `userName`<sup>Required</sup> <a name="userName" id="@open-constructs/aws-cdk.aws_elasticache.NoPasswordRequiredUser.property.userName"></a>

```typescript
public readonly userName: string;
```

- *Type:* string

The name of the user.

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


### PasswordUser <a name="PasswordUser" id="@open-constructs/aws-cdk.aws_elasticache.PasswordUser"></a>

- *Implements:* @open-constructs/aws-cdk.aws_elasticache.IUser

Represents a password authentication user construct in AWS CDK.

*Example*

```typescript
const user = new PasswordUser(
  stack,
  'User',
  {
   passwords: [
     cdk.SecretValue.unsafePlainText('exampleUserPassword123'),
     cdk.SecretValue.unsafePlainText('anotherUserPassword123'),
   ],
  },
);
```


#### Initializers <a name="Initializers" id="@open-constructs/aws-cdk.aws_elasticache.PasswordUser.Initializer"></a>

```typescript
import { aws_elasticache } from '@open-constructs/aws-cdk'

new aws_elasticache.PasswordUser(scope: Construct, id: string, props: PasswordUserProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.PasswordUser.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.PasswordUser.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.PasswordUser.Initializer.parameter.props">props</a></code> | <code>@open-constructs/aws-cdk.aws_elasticache.PasswordUserProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@open-constructs/aws-cdk.aws_elasticache.PasswordUser.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@open-constructs/aws-cdk.aws_elasticache.PasswordUser.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@open-constructs/aws-cdk.aws_elasticache.PasswordUser.Initializer.parameter.props"></a>

- *Type:* @open-constructs/aws-cdk.aws_elasticache.PasswordUserProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.PasswordUser.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.PasswordUser.applyRemovalPolicy">applyRemovalPolicy</a></code> | Apply the given removal policy to this resource. |

---

##### `toString` <a name="toString" id="@open-constructs/aws-cdk.aws_elasticache.PasswordUser.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `applyRemovalPolicy` <a name="applyRemovalPolicy" id="@open-constructs/aws-cdk.aws_elasticache.PasswordUser.applyRemovalPolicy"></a>

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

###### `policy`<sup>Required</sup> <a name="policy" id="@open-constructs/aws-cdk.aws_elasticache.PasswordUser.applyRemovalPolicy.parameter.policy"></a>

- *Type:* aws-cdk-lib.RemovalPolicy

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.PasswordUser.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.PasswordUser.isOwnedResource">isOwnedResource</a></code> | Returns true if the construct was created by CDK, and false otherwise. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.PasswordUser.isResource">isResource</a></code> | Check whether the given construct is a Resource. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.PasswordUser.fromUserAttributes">fromUserAttributes</a></code> | Imports an existing User from attributes. |

---

##### `isConstruct` <a name="isConstruct" id="@open-constructs/aws-cdk.aws_elasticache.PasswordUser.isConstruct"></a>

```typescript
import { aws_elasticache } from '@open-constructs/aws-cdk'

aws_elasticache.PasswordUser.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="@open-constructs/aws-cdk.aws_elasticache.PasswordUser.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isOwnedResource` <a name="isOwnedResource" id="@open-constructs/aws-cdk.aws_elasticache.PasswordUser.isOwnedResource"></a>

```typescript
import { aws_elasticache } from '@open-constructs/aws-cdk'

aws_elasticache.PasswordUser.isOwnedResource(construct: IConstruct)
```

Returns true if the construct was created by CDK, and false otherwise.

###### `construct`<sup>Required</sup> <a name="construct" id="@open-constructs/aws-cdk.aws_elasticache.PasswordUser.isOwnedResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

##### `isResource` <a name="isResource" id="@open-constructs/aws-cdk.aws_elasticache.PasswordUser.isResource"></a>

```typescript
import { aws_elasticache } from '@open-constructs/aws-cdk'

aws_elasticache.PasswordUser.isResource(construct: IConstruct)
```

Check whether the given construct is a Resource.

###### `construct`<sup>Required</sup> <a name="construct" id="@open-constructs/aws-cdk.aws_elasticache.PasswordUser.isResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

##### `fromUserAttributes` <a name="fromUserAttributes" id="@open-constructs/aws-cdk.aws_elasticache.PasswordUser.fromUserAttributes"></a>

```typescript
import { aws_elasticache } from '@open-constructs/aws-cdk'

aws_elasticache.PasswordUser.fromUserAttributes(scope: Construct, id: string, attrs: UserAttributes)
```

Imports an existing User from attributes.

###### `scope`<sup>Required</sup> <a name="scope" id="@open-constructs/aws-cdk.aws_elasticache.PasswordUser.fromUserAttributes.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `id`<sup>Required</sup> <a name="id" id="@open-constructs/aws-cdk.aws_elasticache.PasswordUser.fromUserAttributes.parameter.id"></a>

- *Type:* string

---

###### `attrs`<sup>Required</sup> <a name="attrs" id="@open-constructs/aws-cdk.aws_elasticache.PasswordUser.fromUserAttributes.parameter.attrs"></a>

- *Type:* @open-constructs/aws-cdk.aws_elasticache.UserAttributes

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.PasswordUser.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.PasswordUser.property.env">env</a></code> | <code>aws-cdk-lib.ResourceEnvironment</code> | The environment this resource belongs to. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.PasswordUser.property.stack">stack</a></code> | <code>aws-cdk-lib.Stack</code> | The stack in which this resource is defined. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.PasswordUser.property.userArn">userArn</a></code> | <code>string</code> | The ARN of the user. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.PasswordUser.property.userId">userId</a></code> | <code>string</code> | The ID of the user. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.PasswordUser.property.userName">userName</a></code> | <code>string</code> | The name of the user. |

---

##### `node`<sup>Required</sup> <a name="node" id="@open-constructs/aws-cdk.aws_elasticache.PasswordUser.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `env`<sup>Required</sup> <a name="env" id="@open-constructs/aws-cdk.aws_elasticache.PasswordUser.property.env"></a>

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

##### `stack`<sup>Required</sup> <a name="stack" id="@open-constructs/aws-cdk.aws_elasticache.PasswordUser.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- *Type:* aws-cdk-lib.Stack

The stack in which this resource is defined.

---

##### `userArn`<sup>Required</sup> <a name="userArn" id="@open-constructs/aws-cdk.aws_elasticache.PasswordUser.property.userArn"></a>

```typescript
public readonly userArn: string;
```

- *Type:* string

The ARN of the user.

---

##### `userId`<sup>Required</sup> <a name="userId" id="@open-constructs/aws-cdk.aws_elasticache.PasswordUser.property.userId"></a>

```typescript
public readonly userId: string;
```

- *Type:* string

The ID of the user.

---

##### `userName`<sup>Required</sup> <a name="userName" id="@open-constructs/aws-cdk.aws_elasticache.PasswordUser.property.userName"></a>

```typescript
public readonly userName: string;
```

- *Type:* string

The name of the user.

---


### Repository <a name="Repository" id="@open-constructs/aws-cdk.aws_codeartifact.Repository"></a>

- *Implements:* @open-constructs/aws-cdk.aws_codeartifact.IRepository

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


### ServerlessCache <a name="ServerlessCache" id="@open-constructs/aws-cdk.aws_elasticache.ServerlessCache"></a>

- *Implements:* @open-constructs/aws-cdk.aws_elasticache.IServerlessCache

Represents a ElastiCache Serverless Cache construct in AWS CDK.

*Example*

```typescript
declare const vpc: aws_ec2.IVpc;

const serverlessCache = new ServerlessCache(
  stack,
  'ServerlessCache',
  {
    serverlessCacheName: 'my-serverlessCache',
    engine: Engine.VALKEY,
    vpc,
  },
);
```


#### Initializers <a name="Initializers" id="@open-constructs/aws-cdk.aws_elasticache.ServerlessCache.Initializer"></a>

```typescript
import { aws_elasticache } from '@open-constructs/aws-cdk'

new aws_elasticache.ServerlessCache(scope: Construct, id: string, props: ServerlessCacheProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.ServerlessCache.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.ServerlessCache.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.ServerlessCache.Initializer.parameter.props">props</a></code> | <code>@open-constructs/aws-cdk.aws_elasticache.ServerlessCacheProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@open-constructs/aws-cdk.aws_elasticache.ServerlessCache.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@open-constructs/aws-cdk.aws_elasticache.ServerlessCache.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@open-constructs/aws-cdk.aws_elasticache.ServerlessCache.Initializer.parameter.props"></a>

- *Type:* @open-constructs/aws-cdk.aws_elasticache.ServerlessCacheProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.ServerlessCache.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.ServerlessCache.applyRemovalPolicy">applyRemovalPolicy</a></code> | Apply the given removal policy to this resource. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.ServerlessCache.grant">grant</a></code> | Grant the given identity the specified actions. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.ServerlessCache.grantConnect">grantConnect</a></code> | Permits an IAM principal to perform connect to the serverless cache. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.ServerlessCache.metric">metric</a></code> | Create a CloudWatch metric for severless cache. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.ServerlessCache.metricBytesUsedForCache">metricBytesUsedForCache</a></code> | Metric for the total number of bytes used by the data stored in your cache. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.ServerlessCache.metricElastiCacheProcessingUnits">metricElastiCacheProcessingUnits</a></code> | Metric for the total number of ElastiCacheProcessingUnits (ECPUs) consumed by the requests executed on your cache. |

---

##### `toString` <a name="toString" id="@open-constructs/aws-cdk.aws_elasticache.ServerlessCache.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `applyRemovalPolicy` <a name="applyRemovalPolicy" id="@open-constructs/aws-cdk.aws_elasticache.ServerlessCache.applyRemovalPolicy"></a>

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

###### `policy`<sup>Required</sup> <a name="policy" id="@open-constructs/aws-cdk.aws_elasticache.ServerlessCache.applyRemovalPolicy.parameter.policy"></a>

- *Type:* aws-cdk-lib.RemovalPolicy

---

##### `grant` <a name="grant" id="@open-constructs/aws-cdk.aws_elasticache.ServerlessCache.grant"></a>

```typescript
public grant(grantee: IGrantable, actions: ...string[]): Grant
```

Grant the given identity the specified actions.

> [https://docs.aws.amazon.com/service-authorization/latest/reference/list_amazonelasticache.html](https://docs.aws.amazon.com/service-authorization/latest/reference/list_amazonelasticache.html)

###### `grantee`<sup>Required</sup> <a name="grantee" id="@open-constructs/aws-cdk.aws_elasticache.ServerlessCache.grant.parameter.grantee"></a>

- *Type:* aws-cdk-lib.aws_iam.IGrantable

the identity to be granted the actions.

---

###### `actions`<sup>Required</sup> <a name="actions" id="@open-constructs/aws-cdk.aws_elasticache.ServerlessCache.grant.parameter.actions"></a>

- *Type:* ...string[]

the data-access actions.

---

##### `grantConnect` <a name="grantConnect" id="@open-constructs/aws-cdk.aws_elasticache.ServerlessCache.grantConnect"></a>

```typescript
public grantConnect(grantee: IGrantable): Grant
```

Permits an IAM principal to perform connect to the serverless cache.

Actions: Connect

> [https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/auth-iam.html](https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/auth-iam.html)

###### `grantee`<sup>Required</sup> <a name="grantee" id="@open-constructs/aws-cdk.aws_elasticache.ServerlessCache.grantConnect.parameter.grantee"></a>

- *Type:* aws-cdk-lib.aws_iam.IGrantable

The principal to grant access to.

---

##### `metric` <a name="metric" id="@open-constructs/aws-cdk.aws_elasticache.ServerlessCache.metric"></a>

```typescript
public metric(metricName: string, props?: MetricOptions): Metric
```

Create a CloudWatch metric for severless cache.

> [https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/serverless-metrics-events.memcached.html](https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/serverless-metrics-events.memcached.html)

###### `metricName`<sup>Required</sup> <a name="metricName" id="@open-constructs/aws-cdk.aws_elasticache.ServerlessCache.metric.parameter.metricName"></a>

- *Type:* string

name of the metric.

---

###### `props`<sup>Optional</sup> <a name="props" id="@open-constructs/aws-cdk.aws_elasticache.ServerlessCache.metric.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

metric options.

---

##### `metricBytesUsedForCache` <a name="metricBytesUsedForCache" id="@open-constructs/aws-cdk.aws_elasticache.ServerlessCache.metricBytesUsedForCache"></a>

```typescript
public metricBytesUsedForCache(props?: MetricOptions): Metric
```

Metric for the total number of bytes used by the data stored in your cache.

###### `props`<sup>Optional</sup> <a name="props" id="@open-constructs/aws-cdk.aws_elasticache.ServerlessCache.metricBytesUsedForCache.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricElastiCacheProcessingUnits` <a name="metricElastiCacheProcessingUnits" id="@open-constructs/aws-cdk.aws_elasticache.ServerlessCache.metricElastiCacheProcessingUnits"></a>

```typescript
public metricElastiCacheProcessingUnits(props?: MetricOptions): Metric
```

Metric for the total number of ElastiCacheProcessingUnits (ECPUs) consumed by the requests executed on your cache.

###### `props`<sup>Optional</sup> <a name="props" id="@open-constructs/aws-cdk.aws_elasticache.ServerlessCache.metricElastiCacheProcessingUnits.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.ServerlessCache.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.ServerlessCache.isOwnedResource">isOwnedResource</a></code> | Returns true if the construct was created by CDK, and false otherwise. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.ServerlessCache.isResource">isResource</a></code> | Check whether the given construct is a Resource. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.ServerlessCache.fromServerlessCacheAttributes">fromServerlessCacheAttributes</a></code> | Imports an existing ServerlessCache from attributes. |

---

##### `isConstruct` <a name="isConstruct" id="@open-constructs/aws-cdk.aws_elasticache.ServerlessCache.isConstruct"></a>

```typescript
import { aws_elasticache } from '@open-constructs/aws-cdk'

aws_elasticache.ServerlessCache.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="@open-constructs/aws-cdk.aws_elasticache.ServerlessCache.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isOwnedResource` <a name="isOwnedResource" id="@open-constructs/aws-cdk.aws_elasticache.ServerlessCache.isOwnedResource"></a>

```typescript
import { aws_elasticache } from '@open-constructs/aws-cdk'

aws_elasticache.ServerlessCache.isOwnedResource(construct: IConstruct)
```

Returns true if the construct was created by CDK, and false otherwise.

###### `construct`<sup>Required</sup> <a name="construct" id="@open-constructs/aws-cdk.aws_elasticache.ServerlessCache.isOwnedResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

##### `isResource` <a name="isResource" id="@open-constructs/aws-cdk.aws_elasticache.ServerlessCache.isResource"></a>

```typescript
import { aws_elasticache } from '@open-constructs/aws-cdk'

aws_elasticache.ServerlessCache.isResource(construct: IConstruct)
```

Check whether the given construct is a Resource.

###### `construct`<sup>Required</sup> <a name="construct" id="@open-constructs/aws-cdk.aws_elasticache.ServerlessCache.isResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

##### `fromServerlessCacheAttributes` <a name="fromServerlessCacheAttributes" id="@open-constructs/aws-cdk.aws_elasticache.ServerlessCache.fromServerlessCacheAttributes"></a>

```typescript
import { aws_elasticache } from '@open-constructs/aws-cdk'

aws_elasticache.ServerlessCache.fromServerlessCacheAttributes(scope: Construct, id: string, attrs: ServerlessCacheAttributes)
```

Imports an existing ServerlessCache from attributes.

###### `scope`<sup>Required</sup> <a name="scope" id="@open-constructs/aws-cdk.aws_elasticache.ServerlessCache.fromServerlessCacheAttributes.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `id`<sup>Required</sup> <a name="id" id="@open-constructs/aws-cdk.aws_elasticache.ServerlessCache.fromServerlessCacheAttributes.parameter.id"></a>

- *Type:* string

---

###### `attrs`<sup>Required</sup> <a name="attrs" id="@open-constructs/aws-cdk.aws_elasticache.ServerlessCache.fromServerlessCacheAttributes.parameter.attrs"></a>

- *Type:* @open-constructs/aws-cdk.aws_elasticache.ServerlessCacheAttributes

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.ServerlessCache.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.ServerlessCache.property.env">env</a></code> | <code>aws-cdk-lib.ResourceEnvironment</code> | The environment this resource belongs to. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.ServerlessCache.property.stack">stack</a></code> | <code>aws-cdk-lib.Stack</code> | The stack in which this resource is defined. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.ServerlessCache.property.connections">connections</a></code> | <code>aws-cdk-lib.aws_ec2.Connections</code> | The connection object associated with the ElastiCache Serverless Cache. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.ServerlessCache.property.endpointAddress">endpointAddress</a></code> | <code>string</code> | The DNS hostname of the cache node. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.ServerlessCache.property.endpointPort">endpointPort</a></code> | <code>number</code> | The port number that the cache engine is listening on. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.ServerlessCache.property.serverlessCacheArn">serverlessCacheArn</a></code> | <code>string</code> | The serverless cache ARN. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.ServerlessCache.property.serverlessCacheName">serverlessCacheName</a></code> | <code>string</code> | The serverless cache name. |

---

##### `node`<sup>Required</sup> <a name="node" id="@open-constructs/aws-cdk.aws_elasticache.ServerlessCache.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `env`<sup>Required</sup> <a name="env" id="@open-constructs/aws-cdk.aws_elasticache.ServerlessCache.property.env"></a>

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

##### `stack`<sup>Required</sup> <a name="stack" id="@open-constructs/aws-cdk.aws_elasticache.ServerlessCache.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- *Type:* aws-cdk-lib.Stack

The stack in which this resource is defined.

---

##### `connections`<sup>Required</sup> <a name="connections" id="@open-constructs/aws-cdk.aws_elasticache.ServerlessCache.property.connections"></a>

```typescript
public readonly connections: Connections;
```

- *Type:* aws-cdk-lib.aws_ec2.Connections

The connection object associated with the ElastiCache Serverless Cache.

---

##### `endpointAddress`<sup>Required</sup> <a name="endpointAddress" id="@open-constructs/aws-cdk.aws_elasticache.ServerlessCache.property.endpointAddress"></a>

```typescript
public readonly endpointAddress: string;
```

- *Type:* string

The DNS hostname of the cache node.

---

##### `endpointPort`<sup>Required</sup> <a name="endpointPort" id="@open-constructs/aws-cdk.aws_elasticache.ServerlessCache.property.endpointPort"></a>

```typescript
public readonly endpointPort: number;
```

- *Type:* number

The port number that the cache engine is listening on.

---

##### `serverlessCacheArn`<sup>Required</sup> <a name="serverlessCacheArn" id="@open-constructs/aws-cdk.aws_elasticache.ServerlessCache.property.serverlessCacheArn"></a>

```typescript
public readonly serverlessCacheArn: string;
```

- *Type:* string

The serverless cache ARN.

---

##### `serverlessCacheName`<sup>Required</sup> <a name="serverlessCacheName" id="@open-constructs/aws-cdk.aws_elasticache.ServerlessCache.property.serverlessCacheName"></a>

```typescript
public readonly serverlessCacheName: string;
```

- *Type:* string

The serverless cache name.

---


### UserGroup <a name="UserGroup" id="@open-constructs/aws-cdk.aws_elasticache.UserGroup"></a>

- *Implements:* @open-constructs/aws-cdk.aws_elasticache.IUserGroup

Represents a user group construct in AWS CDK.

*Example*

```typescript
declare const user: User;

const userGroup = new UserGroup(
  stack,
  'UserGroup',
  {
     user: [user],
  },
);
```


#### Initializers <a name="Initializers" id="@open-constructs/aws-cdk.aws_elasticache.UserGroup.Initializer"></a>

```typescript
import { aws_elasticache } from '@open-constructs/aws-cdk'

new aws_elasticache.UserGroup(scope: Construct, id: string, props: UserGroupProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.UserGroup.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.UserGroup.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.UserGroup.Initializer.parameter.props">props</a></code> | <code>@open-constructs/aws-cdk.aws_elasticache.UserGroupProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@open-constructs/aws-cdk.aws_elasticache.UserGroup.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@open-constructs/aws-cdk.aws_elasticache.UserGroup.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@open-constructs/aws-cdk.aws_elasticache.UserGroup.Initializer.parameter.props"></a>

- *Type:* @open-constructs/aws-cdk.aws_elasticache.UserGroupProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.UserGroup.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.UserGroup.applyRemovalPolicy">applyRemovalPolicy</a></code> | Apply the given removal policy to this resource. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.UserGroup.addUser">addUser</a></code> | Adds a user to the user group. |

---

##### `toString` <a name="toString" id="@open-constructs/aws-cdk.aws_elasticache.UserGroup.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `applyRemovalPolicy` <a name="applyRemovalPolicy" id="@open-constructs/aws-cdk.aws_elasticache.UserGroup.applyRemovalPolicy"></a>

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

###### `policy`<sup>Required</sup> <a name="policy" id="@open-constructs/aws-cdk.aws_elasticache.UserGroup.applyRemovalPolicy.parameter.policy"></a>

- *Type:* aws-cdk-lib.RemovalPolicy

---

##### `addUser` <a name="addUser" id="@open-constructs/aws-cdk.aws_elasticache.UserGroup.addUser"></a>

```typescript
public addUser(user: IUser): void
```

Adds a user to the user group.

###### `user`<sup>Required</sup> <a name="user" id="@open-constructs/aws-cdk.aws_elasticache.UserGroup.addUser.parameter.user"></a>

- *Type:* @open-constructs/aws-cdk.aws_elasticache.IUser

the user to add.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.UserGroup.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.UserGroup.isOwnedResource">isOwnedResource</a></code> | Returns true if the construct was created by CDK, and false otherwise. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.UserGroup.isResource">isResource</a></code> | Check whether the given construct is a Resource. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.UserGroup.fromUserGroupId">fromUserGroupId</a></code> | Imports an existing user group from attributes. |

---

##### `isConstruct` <a name="isConstruct" id="@open-constructs/aws-cdk.aws_elasticache.UserGroup.isConstruct"></a>

```typescript
import { aws_elasticache } from '@open-constructs/aws-cdk'

aws_elasticache.UserGroup.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="@open-constructs/aws-cdk.aws_elasticache.UserGroup.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isOwnedResource` <a name="isOwnedResource" id="@open-constructs/aws-cdk.aws_elasticache.UserGroup.isOwnedResource"></a>

```typescript
import { aws_elasticache } from '@open-constructs/aws-cdk'

aws_elasticache.UserGroup.isOwnedResource(construct: IConstruct)
```

Returns true if the construct was created by CDK, and false otherwise.

###### `construct`<sup>Required</sup> <a name="construct" id="@open-constructs/aws-cdk.aws_elasticache.UserGroup.isOwnedResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

##### `isResource` <a name="isResource" id="@open-constructs/aws-cdk.aws_elasticache.UserGroup.isResource"></a>

```typescript
import { aws_elasticache } from '@open-constructs/aws-cdk'

aws_elasticache.UserGroup.isResource(construct: IConstruct)
```

Check whether the given construct is a Resource.

###### `construct`<sup>Required</sup> <a name="construct" id="@open-constructs/aws-cdk.aws_elasticache.UserGroup.isResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

##### `fromUserGroupId` <a name="fromUserGroupId" id="@open-constructs/aws-cdk.aws_elasticache.UserGroup.fromUserGroupId"></a>

```typescript
import { aws_elasticache } from '@open-constructs/aws-cdk'

aws_elasticache.UserGroup.fromUserGroupId(scope: Construct, id: string, userGroupId: string)
```

Imports an existing user group from attributes.

###### `scope`<sup>Required</sup> <a name="scope" id="@open-constructs/aws-cdk.aws_elasticache.UserGroup.fromUserGroupId.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `id`<sup>Required</sup> <a name="id" id="@open-constructs/aws-cdk.aws_elasticache.UserGroup.fromUserGroupId.parameter.id"></a>

- *Type:* string

---

###### `userGroupId`<sup>Required</sup> <a name="userGroupId" id="@open-constructs/aws-cdk.aws_elasticache.UserGroup.fromUserGroupId.parameter.userGroupId"></a>

- *Type:* string

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.UserGroup.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.UserGroup.property.env">env</a></code> | <code>aws-cdk-lib.ResourceEnvironment</code> | The environment this resource belongs to. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.UserGroup.property.stack">stack</a></code> | <code>aws-cdk-lib.Stack</code> | The stack in which this resource is defined. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.UserGroup.property.userGroupArn">userGroupArn</a></code> | <code>string</code> | The ARN of the user group. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.UserGroup.property.userGroupId">userGroupId</a></code> | <code>string</code> | The ID of the user group. |

---

##### `node`<sup>Required</sup> <a name="node" id="@open-constructs/aws-cdk.aws_elasticache.UserGroup.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `env`<sup>Required</sup> <a name="env" id="@open-constructs/aws-cdk.aws_elasticache.UserGroup.property.env"></a>

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

##### `stack`<sup>Required</sup> <a name="stack" id="@open-constructs/aws-cdk.aws_elasticache.UserGroup.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- *Type:* aws-cdk-lib.Stack

The stack in which this resource is defined.

---

##### `userGroupArn`<sup>Required</sup> <a name="userGroupArn" id="@open-constructs/aws-cdk.aws_elasticache.UserGroup.property.userGroupArn"></a>

```typescript
public readonly userGroupArn: string;
```

- *Type:* string

The ARN of the user group.

---

##### `userGroupId`<sup>Required</sup> <a name="userGroupId" id="@open-constructs/aws-cdk.aws_elasticache.UserGroup.property.userGroupId"></a>

```typescript
public readonly userGroupId: string;
```

- *Type:* string

The ID of the user group.

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
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.Workgroup.property.connections">connections</a></code> | <code>aws-cdk-lib.aws_ec2.Connections</code> | The connection object associated with the Redshift Serverless Workgroup. |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.Workgroup.property.endpointAddress">endpointAddress</a></code> | <code>string</code> | The workgroup endpoint address. |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.Workgroup.property.port">port</a></code> | <code>number</code> | The workgroup port. |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.Workgroup.property.workgroupArn">workgroupArn</a></code> | <code>string</code> | The workgroup Arn. |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.Workgroup.property.workgroupId">workgroupId</a></code> | <code>string</code> | The workgroup id. |
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

The connection object associated with the Redshift Serverless Workgroup.

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

##### `workgroupId`<sup>Required</sup> <a name="workgroupId" id="@open-constructs/aws-cdk.aws_redshiftserverless.Workgroup.property.workgroupId"></a>

```typescript
public readonly workgroupId: string;
```

- *Type:* string

The workgroup id.

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

### DailySnapshotTimeProps <a name="DailySnapshotTimeProps" id="@open-constructs/aws-cdk.aws_elasticache.DailySnapshotTimeProps"></a>

Properties required for setting up a daily snapshot time.

#### Initializer <a name="Initializer" id="@open-constructs/aws-cdk.aws_elasticache.DailySnapshotTimeProps.Initializer"></a>

```typescript
import { aws_elasticache } from '@open-constructs/aws-cdk'

const dailySnapshotTimeProps: aws_elasticache.DailySnapshotTimeProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.DailySnapshotTimeProps.property.hour">hour</a></code> | <code>number</code> | The hour of the day (from 0-23) for snapshot starts. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.DailySnapshotTimeProps.property.minute">minute</a></code> | <code>number</code> | The minute of the hour (from 0-59) for snapshot starts. |

---

##### `hour`<sup>Required</sup> <a name="hour" id="@open-constructs/aws-cdk.aws_elasticache.DailySnapshotTimeProps.property.hour"></a>

```typescript
public readonly hour: number;
```

- *Type:* number

The hour of the day (from 0-23) for snapshot starts.

---

##### `minute`<sup>Required</sup> <a name="minute" id="@open-constructs/aws-cdk.aws_elasticache.DailySnapshotTimeProps.property.minute"></a>

```typescript
public readonly minute: number;
```

- *Type:* number

The minute of the hour (from 0-59) for snapshot starts.

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
- *Default:* An AWS managed KMS key is used

The key used to encrypt the Domain.

---

### IamUserProps <a name="IamUserProps" id="@open-constructs/aws-cdk.aws_elasticache.IamUserProps"></a>

Properties for IAM-enabled users.

#### Initializer <a name="Initializer" id="@open-constructs/aws-cdk.aws_elasticache.IamUserProps.Initializer"></a>

```typescript
import { aws_elasticache } from '@open-constructs/aws-cdk'

const iamUserProps: aws_elasticache.IamUserProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.IamUserProps.property.accessString">accessString</a></code> | <code>string</code> | Access permissions string used for this user. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.IamUserProps.property.userId">userId</a></code> | <code>string</code> | The ID of the user. |

---

##### `accessString`<sup>Optional</sup> <a name="accessString" id="@open-constructs/aws-cdk.aws_elasticache.IamUserProps.property.accessString"></a>

```typescript
public readonly accessString: string;
```

- *Type:* string
- *Default:* 'off -@all'

Access permissions string used for this user.

> [https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/Clusters.RBAC.html#Access-string](https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/Clusters.RBAC.html#Access-string)

---

##### `userId`<sup>Optional</sup> <a name="userId" id="@open-constructs/aws-cdk.aws_elasticache.IamUserProps.property.userId"></a>

```typescript
public readonly userId: string;
```

- *Type:* string
- *Default:* auto generated

The ID of the user.

Must consist only of alphanumeric characters or hyphens, with the first character as a letter.
Cannot end with a hyphen or contain two consecutive hyphens.

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
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.NamespaceAttributes.property.namespaceId">namespaceId</a></code> | <code>string</code> | The namespace id. |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.NamespaceAttributes.property.namespaceName">namespaceName</a></code> | <code>string</code> | The namespace name. |

---

##### `namespaceId`<sup>Required</sup> <a name="namespaceId" id="@open-constructs/aws-cdk.aws_redshiftserverless.NamespaceAttributes.property.namespaceId"></a>

```typescript
public readonly namespaceId: string;
```

- *Type:* string

The namespace id.

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
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.NamespaceProps.property.finalSnapshotRetentionPeriod">finalSnapshotRetentionPeriod</a></code> | <code>number</code> | How long days to retain the final snapshot. |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.NamespaceProps.property.iamRoles">iamRoles</a></code> | <code>aws-cdk-lib.aws_iam.IRole[]</code> | A list of IAM roles to associate with the namespace. |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.NamespaceProps.property.kmsKey">kmsKey</a></code> | <code>aws-cdk-lib.aws_kms.IKey</code> | A Customer Managed Key used to encrypt your data. |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.NamespaceProps.property.logExports">logExports</a></code> | <code>@open-constructs/aws-cdk.aws_redshiftserverless.LogExport[]</code> | The types of logs the namespace can export. |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.NamespaceProps.property.namespaceName">namespaceName</a></code> | <code>string</code> | The namespace name. |

---

##### `adminUsername`<sup>Optional</sup> <a name="adminUsername" id="@open-constructs/aws-cdk.aws_redshiftserverless.NamespaceProps.property.adminUsername"></a>

```typescript
public readonly adminUsername: string;
```

- *Type:* string
- *Default:* no admin user

The username of the administrator for the primary database created in the namespace.

You must specify both `adminUsername` and `adminUserPassword`, or neither.

---

##### `adminUserPassword`<sup>Optional</sup> <a name="adminUserPassword" id="@open-constructs/aws-cdk.aws_redshiftserverless.NamespaceProps.property.adminUserPassword"></a>

```typescript
public readonly adminUserPassword: SecretValue;
```

- *Type:* aws-cdk-lib.SecretValue
- *Default:* no admin user

The password of the administrator for the primary database created in the namespace.

You must specify both `adminUsername` and `adminUserPassword`, or neither.

---

##### `dbName`<sup>Optional</sup> <a name="dbName" id="@open-constructs/aws-cdk.aws_redshiftserverless.NamespaceProps.property.dbName"></a>

```typescript
public readonly dbName: string;
```

- *Type:* string
- *Default:* 'dev'

The name of the primary database created in the namespace.

---

##### `defaultIamRole`<sup>Optional</sup> <a name="defaultIamRole" id="@open-constructs/aws-cdk.aws_redshiftserverless.NamespaceProps.property.defaultIamRole"></a>

```typescript
public readonly defaultIamRole: IRole;
```

- *Type:* aws-cdk-lib.aws_iam.IRole
- *Default:* no default IAM role

The IAM role to set as a default in the namespace.

`defaultIamRole` must be included in `iamRoles`.

---

##### `finalSnapshotName`<sup>Optional</sup> <a name="finalSnapshotName" id="@open-constructs/aws-cdk.aws_redshiftserverless.NamespaceProps.property.finalSnapshotName"></a>

```typescript
public readonly finalSnapshotName: string;
```

- *Type:* string
- *Default:* no final snapshot

The name of the snapshot to be created before the namespace is deleted.

If not specified, the final snapshot will not be taken.

---

##### `finalSnapshotRetentionPeriod`<sup>Optional</sup> <a name="finalSnapshotRetentionPeriod" id="@open-constructs/aws-cdk.aws_redshiftserverless.NamespaceProps.property.finalSnapshotRetentionPeriod"></a>

```typescript
public readonly finalSnapshotRetentionPeriod: number;
```

- *Type:* number
- *Default:* Retained indefinitely if `finalSnapshotName` is specified, otherwise no final snapshot

How long days to retain the final snapshot.

You must set `finalSnapshotName` when you specify `finalSnapshotRetentionPeriod`.

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
- *Default:* auto generate

The namespace name.

---

### NoPasswordRequiredUserProps <a name="NoPasswordRequiredUserProps" id="@open-constructs/aws-cdk.aws_elasticache.NoPasswordRequiredUserProps"></a>

Properties for users that don't require authentication.

#### Initializer <a name="Initializer" id="@open-constructs/aws-cdk.aws_elasticache.NoPasswordRequiredUserProps.Initializer"></a>

```typescript
import { aws_elasticache } from '@open-constructs/aws-cdk'

const noPasswordRequiredUserProps: aws_elasticache.NoPasswordRequiredUserProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.NoPasswordRequiredUserProps.property.accessString">accessString</a></code> | <code>string</code> | Access permissions string used for this user. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.NoPasswordRequiredUserProps.property.userId">userId</a></code> | <code>string</code> | The ID of the user. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.NoPasswordRequiredUserProps.property.userName">userName</a></code> | <code>string</code> | The username of the user. |

---

##### `accessString`<sup>Optional</sup> <a name="accessString" id="@open-constructs/aws-cdk.aws_elasticache.NoPasswordRequiredUserProps.property.accessString"></a>

```typescript
public readonly accessString: string;
```

- *Type:* string
- *Default:* 'off -@all'

Access permissions string used for this user.

> [https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/Clusters.RBAC.html#Access-string](https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/Clusters.RBAC.html#Access-string)

---

##### `userId`<sup>Optional</sup> <a name="userId" id="@open-constructs/aws-cdk.aws_elasticache.NoPasswordRequiredUserProps.property.userId"></a>

```typescript
public readonly userId: string;
```

- *Type:* string
- *Default:* auto generated

The ID of the user.

Must consist only of alphanumeric characters or hyphens, with the first character as a letter.
Cannot end with a hyphen or contain two consecutive hyphens.

---

##### `userName`<sup>Optional</sup> <a name="userName" id="@open-constructs/aws-cdk.aws_elasticache.NoPasswordRequiredUserProps.property.userName"></a>

```typescript
public readonly userName: string;
```

- *Type:* string
- *Default:* same as userId

The username of the user.

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
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.OntapConfiguration.property.automaticBackupRetention">automaticBackupRetention</a></code> | <code>aws-cdk-lib.Duration</code> | The number of days to retain automatic backups. |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.OntapConfiguration.property.dailyAutomaticBackupStartTime">dailyAutomaticBackupStartTime</a></code> | <code>@open-constructs/aws-cdk.aws_fsx.DailyAutomaticBackupStartTime</code> | Start time for 30-minute daily automatic backup window in Coordinated Universal Time (UTC). |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.OntapConfiguration.property.deploymentType">deploymentType</a></code> | <code>@open-constructs/aws-cdk.aws_fsx.OntapDeploymentType</code> | The FSx for ONTAP file system deployment type to use in creating the file system. |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.OntapConfiguration.property.diskIops">diskIops</a></code> | <code>number</code> | The total number of SSD IOPS provisioned for the file system. |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.OntapConfiguration.property.endpointIpAddressRange">endpointIpAddressRange</a></code> | <code>string</code> | The IP address range in which the endpoints to access your file system will be created. |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.OntapConfiguration.property.fsxAdminPassword">fsxAdminPassword</a></code> | <code>aws-cdk-lib.SecretValue</code> | The ONTAP administrative password for the `fsxadmin` user with which you administer your file system using the NetApp ONTAP CLI and REST API. |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.OntapConfiguration.property.haPairs">haPairs</a></code> | <code>number</code> | How many high-availability (HA) pairs of file servers will power your file system. |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.OntapConfiguration.property.preferredSubnet">preferredSubnet</a></code> | <code>aws-cdk-lib.aws_ec2.ISubnet</code> | The subnet in which you want the preferred file server to be located. |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.OntapConfiguration.property.routeTables">routeTables</a></code> | <code>aws-cdk-lib.aws_ec2.IRouteTable[]</code> | The route tables in which Amazon FSx creates the rules for routing traffic to the correct file server. |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.OntapConfiguration.property.throughputCapacityPerHaPair">throughputCapacityPerHaPair</a></code> | <code>@open-constructs/aws-cdk.aws_fsx.ThroughputCapacityPerHaPair</code> | The throughput capacity per HA pair for the file system. |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.OntapConfiguration.property.weeklyMaintenanceStartTime">weeklyMaintenanceStartTime</a></code> | <code>@open-constructs/aws-cdk.aws_fsx.MaintenanceTime</code> | The preferred day and time to perform weekly maintenance. |

---

##### `automaticBackupRetention`<sup>Optional</sup> <a name="automaticBackupRetention" id="@open-constructs/aws-cdk.aws_fsx.OntapConfiguration.property.automaticBackupRetention"></a>

```typescript
public readonly automaticBackupRetention: Duration;
```

- *Type:* aws-cdk-lib.Duration
- *Default:* 30 days

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

##### `deploymentType`<sup>Optional</sup> <a name="deploymentType" id="@open-constructs/aws-cdk.aws_fsx.OntapConfiguration.property.deploymentType"></a>

```typescript
public readonly deploymentType: OntapDeploymentType;
```

- *Type:* @open-constructs/aws-cdk.aws_fsx.OntapDeploymentType
- *Default:* OntapDeploymentType.MULTI_AZ_2

The FSx for ONTAP file system deployment type to use in creating the file system.

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
public readonly fsxAdminPassword: SecretValue;
```

- *Type:* aws-cdk-lib.SecretValue
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
- *Default:* 1

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

##### `throughputCapacityPerHaPair`<sup>Optional</sup> <a name="throughputCapacityPerHaPair" id="@open-constructs/aws-cdk.aws_fsx.OntapConfiguration.property.throughputCapacityPerHaPair"></a>

```typescript
public readonly throughputCapacityPerHaPair: ThroughputCapacityPerHaPair;
```

- *Type:* @open-constructs/aws-cdk.aws_fsx.ThroughputCapacityPerHaPair
- *Default:* Amazon FSx determines the throughput capacity based on the storage capacity

The throughput capacity per HA pair for the file system.

> [https://docs.aws.amazon.com/fsx/latest/ONTAPGuide/managing-throughput-capacity.html](https://docs.aws.amazon.com/fsx/latest/ONTAPGuide/managing-throughput-capacity.html)

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
provide exactly two subnets, one for the preferred file server and one for the standby file server.

Specify one of these subnets as the preferred subnet using `OntapConfiguration.preferredSubnet` property for multi-AZ file system.

---

### PasswordUserProps <a name="PasswordUserProps" id="@open-constructs/aws-cdk.aws_elasticache.PasswordUserProps"></a>

Properties for password-authenticated users.

#### Initializer <a name="Initializer" id="@open-constructs/aws-cdk.aws_elasticache.PasswordUserProps.Initializer"></a>

```typescript
import { aws_elasticache } from '@open-constructs/aws-cdk'

const passwordUserProps: aws_elasticache.PasswordUserProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.PasswordUserProps.property.accessString">accessString</a></code> | <code>string</code> | Access permissions string used for this user. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.PasswordUserProps.property.userId">userId</a></code> | <code>string</code> | The ID of the user. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.PasswordUserProps.property.passwords">passwords</a></code> | <code>aws-cdk-lib.SecretValue[]</code> | Passwords used for this user account. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.PasswordUserProps.property.userName">userName</a></code> | <code>string</code> | The username of the user. |

---

##### `accessString`<sup>Optional</sup> <a name="accessString" id="@open-constructs/aws-cdk.aws_elasticache.PasswordUserProps.property.accessString"></a>

```typescript
public readonly accessString: string;
```

- *Type:* string
- *Default:* 'off -@all'

Access permissions string used for this user.

> [https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/Clusters.RBAC.html#Access-string](https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/Clusters.RBAC.html#Access-string)

---

##### `userId`<sup>Optional</sup> <a name="userId" id="@open-constructs/aws-cdk.aws_elasticache.PasswordUserProps.property.userId"></a>

```typescript
public readonly userId: string;
```

- *Type:* string
- *Default:* auto generated

The ID of the user.

Must consist only of alphanumeric characters or hyphens, with the first character as a letter.
Cannot end with a hyphen or contain two consecutive hyphens.

---

##### `passwords`<sup>Required</sup> <a name="passwords" id="@open-constructs/aws-cdk.aws_elasticache.PasswordUserProps.property.passwords"></a>

```typescript
public readonly passwords: SecretValue[];
```

- *Type:* aws-cdk-lib.SecretValue[]

Passwords used for this user account.

You can create up to two passwords for each user.

---

##### `userName`<sup>Optional</sup> <a name="userName" id="@open-constructs/aws-cdk.aws_elasticache.PasswordUserProps.property.userName"></a>

```typescript
public readonly userName: string;
```

- *Type:* string
- *Default:* same as userId

The username of the user.

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
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.RepositoryProps.property.description">description</a></code> | <code>string</code> | The description of the repository. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.RepositoryProps.property.externalConnection">externalConnection</a></code> | <code>@open-constructs/aws-cdk.aws_codeartifact.RepositoryConnection</code> | The connections to external repositories (like npmjs, pypi, etc.). |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.RepositoryProps.property.repositoryName">repositoryName</a></code> | <code>string</code> | The name of the repository. |
| <code><a href="#@open-constructs/aws-cdk.aws_codeartifact.RepositoryProps.property.upstreams">upstreams</a></code> | <code>@open-constructs/aws-cdk.aws_codeartifact.IRepository[]</code> | A list of upstream Codeartifact repositories to associate with the repository. |

---

##### `domain`<sup>Required</sup> <a name="domain" id="@open-constructs/aws-cdk.aws_codeartifact.RepositoryProps.property.domain"></a>

```typescript
public readonly domain: IDomain;
```

- *Type:* @open-constructs/aws-cdk.aws_codeartifact.IDomain

The domain that contains the repository.

---

##### `description`<sup>Optional</sup> <a name="description" id="@open-constructs/aws-cdk.aws_codeartifact.RepositoryProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string
- *Default:* No description

The description of the repository.

---

##### `externalConnection`<sup>Optional</sup> <a name="externalConnection" id="@open-constructs/aws-cdk.aws_codeartifact.RepositoryProps.property.externalConnection"></a>

```typescript
public readonly externalConnection: RepositoryConnection;
```

- *Type:* @open-constructs/aws-cdk.aws_codeartifact.RepositoryConnection
- *Default:* No external connections

The connections to external repositories (like npmjs, pypi, etc.).

You can use the AWS CLI to connect your CodeArtifact repository to an external repository by adding an external connection directly to the repository.
This will allow users connected to the CodeArtifact repository, or any of its downstream repositories, to fetch packages from the configured external repository.
Each CodeArtifact repository can only have one external connection.

---

##### `repositoryName`<sup>Optional</sup> <a name="repositoryName" id="@open-constructs/aws-cdk.aws_codeartifact.RepositoryProps.property.repositoryName"></a>

```typescript
public readonly repositoryName: string;
```

- *Type:* string
- *Default:* A name is automatically generated

The name of the repository.

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

### ServerlessCacheAttributes <a name="ServerlessCacheAttributes" id="@open-constructs/aws-cdk.aws_elasticache.ServerlessCacheAttributes"></a>

Attributes for importing a ElastiCache Serverless Cache.

#### Initializer <a name="Initializer" id="@open-constructs/aws-cdk.aws_elasticache.ServerlessCacheAttributes.Initializer"></a>

```typescript
import { aws_elasticache } from '@open-constructs/aws-cdk'

const serverlessCacheAttributes: aws_elasticache.ServerlessCacheAttributes = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.ServerlessCacheAttributes.property.endpointAddress">endpointAddress</a></code> | <code>string</code> | The DNS hostname of the cache node. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.ServerlessCacheAttributes.property.endpointPort">endpointPort</a></code> | <code>number</code> | The port number that the cache engine is listening on. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.ServerlessCacheAttributes.property.securityGroups">securityGroups</a></code> | <code>aws-cdk-lib.aws_ec2.ISecurityGroup[]</code> | The security groups to associate with the serverless cache. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.ServerlessCacheAttributes.property.serverlessCacheName">serverlessCacheName</a></code> | <code>string</code> | The serverless cache name. |

---

##### `endpointAddress`<sup>Required</sup> <a name="endpointAddress" id="@open-constructs/aws-cdk.aws_elasticache.ServerlessCacheAttributes.property.endpointAddress"></a>

```typescript
public readonly endpointAddress: string;
```

- *Type:* string

The DNS hostname of the cache node.

---

##### `endpointPort`<sup>Required</sup> <a name="endpointPort" id="@open-constructs/aws-cdk.aws_elasticache.ServerlessCacheAttributes.property.endpointPort"></a>

```typescript
public readonly endpointPort: number;
```

- *Type:* number

The port number that the cache engine is listening on.

---

##### `securityGroups`<sup>Required</sup> <a name="securityGroups" id="@open-constructs/aws-cdk.aws_elasticache.ServerlessCacheAttributes.property.securityGroups"></a>

```typescript
public readonly securityGroups: ISecurityGroup[];
```

- *Type:* aws-cdk-lib.aws_ec2.ISecurityGroup[]

The security groups to associate with the serverless cache.

---

##### `serverlessCacheName`<sup>Required</sup> <a name="serverlessCacheName" id="@open-constructs/aws-cdk.aws_elasticache.ServerlessCacheAttributes.property.serverlessCacheName"></a>

```typescript
public readonly serverlessCacheName: string;
```

- *Type:* string

The serverless cache name.

---

### ServerlessCacheProps <a name="ServerlessCacheProps" id="@open-constructs/aws-cdk.aws_elasticache.ServerlessCacheProps"></a>

Properties for defining a ElastiCache Serverless Cache.

#### Initializer <a name="Initializer" id="@open-constructs/aws-cdk.aws_elasticache.ServerlessCacheProps.Initializer"></a>

```typescript
import { aws_elasticache } from '@open-constructs/aws-cdk'

const serverlessCacheProps: aws_elasticache.ServerlessCacheProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.ServerlessCacheProps.property.engine">engine</a></code> | <code>@open-constructs/aws-cdk.aws_elasticache.Engine</code> | The engine the serverless cache is compatible with. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.ServerlessCacheProps.property.majorEngineVersion">majorEngineVersion</a></code> | <code>@open-constructs/aws-cdk.aws_elasticache.MajorVersion</code> | The version number of the engine the serverless cache is compatible with. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.ServerlessCacheProps.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.IVpc</code> | The VPC to place the serverless cache in. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.ServerlessCacheProps.property.dailySnapshotTime">dailySnapshotTime</a></code> | <code>@open-constructs/aws-cdk.aws_elasticache.DailySnapshotTime</code> | The daily time when a cache snapshot will be created. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.ServerlessCacheProps.property.description">description</a></code> | <code>string</code> | A description of the serverless cache. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.ServerlessCacheProps.property.finalSnapshotName">finalSnapshotName</a></code> | <code>string</code> | The name of the final snapshot taken of a cache before the cache is deleted. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.ServerlessCacheProps.property.kmsKey">kmsKey</a></code> | <code>aws-cdk-lib.aws_kms.IKey</code> | The Customer Managed Key that is used to encrypt data at rest in the serverless cache. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.ServerlessCacheProps.property.securityGroups">securityGroups</a></code> | <code>aws-cdk-lib.aws_ec2.ISecurityGroup[]</code> | The security groups to associate with the serverless cache. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.ServerlessCacheProps.property.serverlessCacheName">serverlessCacheName</a></code> | <code>string</code> | The unique identifier of the serverless cache. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.ServerlessCacheProps.property.snapshotArnsToRestore">snapshotArnsToRestore</a></code> | <code>string[]</code> | The ARN of the snapshot from which to restore data into the new cache. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.ServerlessCacheProps.property.snapshotRetentionLimit">snapshotRetentionLimit</a></code> | <code>number</code> | The number of serverless cache snapshots the system will retain. To enable automatic backups, this property must be set. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.ServerlessCacheProps.property.userGroup">userGroup</a></code> | <code>@open-constructs/aws-cdk.aws_elasticache.IUserGroup</code> | The user group associated with the serverless cache. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.ServerlessCacheProps.property.vpcSubnets">vpcSubnets</a></code> | <code>aws-cdk-lib.aws_ec2.SubnetSelection</code> | Where to place the serverless cache within the VPC. |

---

##### `engine`<sup>Required</sup> <a name="engine" id="@open-constructs/aws-cdk.aws_elasticache.ServerlessCacheProps.property.engine"></a>

```typescript
public readonly engine: Engine;
```

- *Type:* @open-constructs/aws-cdk.aws_elasticache.Engine

The engine the serverless cache is compatible with.

---

##### `majorEngineVersion`<sup>Required</sup> <a name="majorEngineVersion" id="@open-constructs/aws-cdk.aws_elasticache.ServerlessCacheProps.property.majorEngineVersion"></a>

```typescript
public readonly majorEngineVersion: MajorVersion;
```

- *Type:* @open-constructs/aws-cdk.aws_elasticache.MajorVersion

The version number of the engine the serverless cache is compatible with.

---

##### `vpc`<sup>Required</sup> <a name="vpc" id="@open-constructs/aws-cdk.aws_elasticache.ServerlessCacheProps.property.vpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* aws-cdk-lib.aws_ec2.IVpc

The VPC to place the serverless cache in.

---

##### `dailySnapshotTime`<sup>Optional</sup> <a name="dailySnapshotTime" id="@open-constructs/aws-cdk.aws_elasticache.ServerlessCacheProps.property.dailySnapshotTime"></a>

```typescript
public readonly dailySnapshotTime: DailySnapshotTime;
```

- *Type:* @open-constructs/aws-cdk.aws_elasticache.DailySnapshotTime
- *Default:* ElastiCache automatically assigns the backup window if \`snapshotRetentionLimit\` is set. Otherwise, no snapshots are taken.

The daily time when a cache snapshot will be created.

This property must be set along with `snapshotRetentionLimit`.

> [https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/backups-automatic.html](https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/backups-automatic.html)

---

##### `description`<sup>Optional</sup> <a name="description" id="@open-constructs/aws-cdk.aws_elasticache.ServerlessCacheProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string
- *Default:* no description

A description of the serverless cache.

The description can have up to 255 characters and must not contain < and > characters.

---

##### `finalSnapshotName`<sup>Optional</sup> <a name="finalSnapshotName" id="@open-constructs/aws-cdk.aws_elasticache.ServerlessCacheProps.property.finalSnapshotName"></a>

```typescript
public readonly finalSnapshotName: string;
```

- *Type:* string
- *Default:* no final snapshot taken

The name of the final snapshot taken of a cache before the cache is deleted.

---

##### `kmsKey`<sup>Optional</sup> <a name="kmsKey" id="@open-constructs/aws-cdk.aws_elasticache.ServerlessCacheProps.property.kmsKey"></a>

```typescript
public readonly kmsKey: IKey;
```

- *Type:* aws-cdk-lib.aws_kms.IKey
- *Default:* use AWS managed key

The Customer Managed Key that is used to encrypt data at rest in the serverless cache.

---

##### `securityGroups`<sup>Optional</sup> <a name="securityGroups" id="@open-constructs/aws-cdk.aws_elasticache.ServerlessCacheProps.property.securityGroups"></a>

```typescript
public readonly securityGroups: ISecurityGroup[];
```

- *Type:* aws-cdk-lib.aws_ec2.ISecurityGroup[]
- *Default:* a new security group is created

The security groups to associate with the serverless cache.

---

##### `serverlessCacheName`<sup>Optional</sup> <a name="serverlessCacheName" id="@open-constructs/aws-cdk.aws_elasticache.ServerlessCacheProps.property.serverlessCacheName"></a>

```typescript
public readonly serverlessCacheName: string;
```

- *Type:* string
- *Default:* auto generate

The unique identifier of the serverless cache.

The name can have up to 40 characters, and must not contain spaces.

---

##### `snapshotArnsToRestore`<sup>Optional</sup> <a name="snapshotArnsToRestore" id="@open-constructs/aws-cdk.aws_elasticache.ServerlessCacheProps.property.snapshotArnsToRestore"></a>

```typescript
public readonly snapshotArnsToRestore: string[];
```

- *Type:* string[]
- *Default:* not restored

The ARN of the snapshot from which to restore data into the new cache.

---

##### `snapshotRetentionLimit`<sup>Optional</sup> <a name="snapshotRetentionLimit" id="@open-constructs/aws-cdk.aws_elasticache.ServerlessCacheProps.property.snapshotRetentionLimit"></a>

```typescript
public readonly snapshotRetentionLimit: number;
```

- *Type:* number
- *Default:* no automatic backups

The number of serverless cache snapshots the system will retain. To enable automatic backups, this property must be set.

\`snapshotRetentionLimit\` must be between 1 and 35.

---

##### `userGroup`<sup>Optional</sup> <a name="userGroup" id="@open-constructs/aws-cdk.aws_elasticache.ServerlessCacheProps.property.userGroup"></a>

```typescript
public readonly userGroup: IUserGroup;
```

- *Type:* @open-constructs/aws-cdk.aws_elasticache.IUserGroup
- *Default:* no user group associated

The user group associated with the serverless cache.

Available for Valkey and Redis OSS only.

---

##### `vpcSubnets`<sup>Optional</sup> <a name="vpcSubnets" id="@open-constructs/aws-cdk.aws_elasticache.ServerlessCacheProps.property.vpcSubnets"></a>

```typescript
public readonly vpcSubnets: SubnetSelection;
```

- *Type:* aws-cdk-lib.aws_ec2.SubnetSelection
- *Default:* private subnets

Where to place the serverless cache within the VPC.

---

### UserAttributes <a name="UserAttributes" id="@open-constructs/aws-cdk.aws_elasticache.UserAttributes"></a>

Attributes for importing a User.

#### Initializer <a name="Initializer" id="@open-constructs/aws-cdk.aws_elasticache.UserAttributes.Initializer"></a>

```typescript
import { aws_elasticache } from '@open-constructs/aws-cdk'

const userAttributes: aws_elasticache.UserAttributes = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.UserAttributes.property.userId">userId</a></code> | <code>string</code> | The ID of the user. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.UserAttributes.property.userName">userName</a></code> | <code>string</code> | The name of the user. |

---

##### `userId`<sup>Required</sup> <a name="userId" id="@open-constructs/aws-cdk.aws_elasticache.UserAttributes.property.userId"></a>

```typescript
public readonly userId: string;
```

- *Type:* string

The ID of the user.

---

##### `userName`<sup>Required</sup> <a name="userName" id="@open-constructs/aws-cdk.aws_elasticache.UserAttributes.property.userName"></a>

```typescript
public readonly userName: string;
```

- *Type:* string

The name of the user.

---

### UserBaseProps <a name="UserBaseProps" id="@open-constructs/aws-cdk.aws_elasticache.UserBaseProps"></a>

Base properties for all user types.

#### Initializer <a name="Initializer" id="@open-constructs/aws-cdk.aws_elasticache.UserBaseProps.Initializer"></a>

```typescript
import { aws_elasticache } from '@open-constructs/aws-cdk'

const userBaseProps: aws_elasticache.UserBaseProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.UserBaseProps.property.accessString">accessString</a></code> | <code>string</code> | Access permissions string used for this user. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.UserBaseProps.property.userId">userId</a></code> | <code>string</code> | The ID of the user. |

---

##### `accessString`<sup>Optional</sup> <a name="accessString" id="@open-constructs/aws-cdk.aws_elasticache.UserBaseProps.property.accessString"></a>

```typescript
public readonly accessString: string;
```

- *Type:* string
- *Default:* 'off -@all'

Access permissions string used for this user.

> [https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/Clusters.RBAC.html#Access-string](https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/Clusters.RBAC.html#Access-string)

---

##### `userId`<sup>Optional</sup> <a name="userId" id="@open-constructs/aws-cdk.aws_elasticache.UserBaseProps.property.userId"></a>

```typescript
public readonly userId: string;
```

- *Type:* string
- *Default:* auto generated

The ID of the user.

Must consist only of alphanumeric characters or hyphens, with the first character as a letter.
Cannot end with a hyphen or contain two consecutive hyphens.

---

### UserGroupAttributes <a name="UserGroupAttributes" id="@open-constructs/aws-cdk.aws_elasticache.UserGroupAttributes"></a>

Attributes for importing a User Group.

#### Initializer <a name="Initializer" id="@open-constructs/aws-cdk.aws_elasticache.UserGroupAttributes.Initializer"></a>

```typescript
import { aws_elasticache } from '@open-constructs/aws-cdk'

const userGroupAttributes: aws_elasticache.UserGroupAttributes = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.UserGroupAttributes.property.userGroupId">userGroupId</a></code> | <code>string</code> | The ID of the user group. |

---

##### `userGroupId`<sup>Required</sup> <a name="userGroupId" id="@open-constructs/aws-cdk.aws_elasticache.UserGroupAttributes.property.userGroupId"></a>

```typescript
public readonly userGroupId: string;
```

- *Type:* string

The ID of the user group.

---

### UserGroupProps <a name="UserGroupProps" id="@open-constructs/aws-cdk.aws_elasticache.UserGroupProps"></a>

Properties for defining a User Group.

#### Initializer <a name="Initializer" id="@open-constructs/aws-cdk.aws_elasticache.UserGroupProps.Initializer"></a>

```typescript
import { aws_elasticache } from '@open-constructs/aws-cdk'

const userGroupProps: aws_elasticache.UserGroupProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.UserGroupProps.property.users">users</a></code> | <code>@open-constructs/aws-cdk.aws_elasticache.IUser[]</code> | The list of User that belong to the user group. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.UserGroupProps.property.userGroupId">userGroupId</a></code> | <code>string</code> | The ID of the user group. |

---

##### `users`<sup>Required</sup> <a name="users" id="@open-constructs/aws-cdk.aws_elasticache.UserGroupProps.property.users"></a>

```typescript
public readonly users: IUser[];
```

- *Type:* @open-constructs/aws-cdk.aws_elasticache.IUser[]

The list of User that belong to the user group.

A user with the username `default` must be included in `users`.

---

##### `userGroupId`<sup>Optional</sup> <a name="userGroupId" id="@open-constructs/aws-cdk.aws_elasticache.UserGroupProps.property.userGroupId"></a>

```typescript
public readonly userGroupId: string;
```

- *Type:* string
- *Default:* auto generate

The ID of the user group.

\`userGroupId\` can have up to 40 characters.

\`userGroupId\` must consist only of alphanumeric characters or hyphens,
with the first character as a letter, and it can't end with a hyphen or contain two consecutive hyphens.

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
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.WorkgroupAttributes.property.workgroupId">workgroupId</a></code> | <code>string</code> | The workgroup id. |
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

##### `workgroupId`<sup>Required</sup> <a name="workgroupId" id="@open-constructs/aws-cdk.aws_redshiftserverless.WorkgroupAttributes.property.workgroupId"></a>

```typescript
public readonly workgroupId: string;
```

- *Type:* string

The workgroup id.

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
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.WorkgroupProps.property.securityGroups">securityGroups</a></code> | <code>aws-cdk-lib.aws_ec2.ISecurityGroup[]</code> | The security groups to associate with the workgroup. |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.WorkgroupProps.property.vpcSubnets">vpcSubnets</a></code> | <code>aws-cdk-lib.aws_ec2.SubnetSelection</code> | Where to place the workgroup within the VPC. |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.WorkgroupProps.property.workgroupName">workgroupName</a></code> | <code>string</code> | The workgroup name. |

---

##### `vpc`<sup>Required</sup> <a name="vpc" id="@open-constructs/aws-cdk.aws_redshiftserverless.WorkgroupProps.property.vpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* aws-cdk-lib.aws_ec2.IVpc

The VPC to place the workgroup in.

`vpc` must have at least 3 subnets, and they must span across 3 Availability Zones.

---

##### `baseCapacity`<sup>Optional</sup> <a name="baseCapacity" id="@open-constructs/aws-cdk.aws_redshiftserverless.WorkgroupProps.property.baseCapacity"></a>

```typescript
public readonly baseCapacity: number;
```

- *Type:* number
- *Default:* 128

The base compute capacity of the workgroup in Redshift Processing Units (RPUs).

You can adjust the base capacity setting from 8 RPUs to 512 RPUs in units of 8.
Also you can increment or decrement RPUs in units of 32 when setting a base capacity between 512-1024.

> [https://docs.aws.amazon.com/redshift/latest/mgmt/serverless-capacity.html](https://docs.aws.amazon.com/redshift/latest/mgmt/serverless-capacity.html)

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
- *Default:* a new security group is created

The security groups to associate with the workgroup.

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

The workgroup name.

\`workgroupName\` must be between 3 and 64 characters long, contain only lowercase letters, numbers, and hyphens.

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




### DailySnapshotTime <a name="DailySnapshotTime" id="@open-constructs/aws-cdk.aws_elasticache.DailySnapshotTime"></a>

Class for scheduling a daily snapshot time.

#### Initializers <a name="Initializers" id="@open-constructs/aws-cdk.aws_elasticache.DailySnapshotTime.Initializer"></a>

```typescript
import { aws_elasticache } from '@open-constructs/aws-cdk'

new aws_elasticache.DailySnapshotTime(props: DailySnapshotTimeProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.DailySnapshotTime.Initializer.parameter.props">props</a></code> | <code>@open-constructs/aws-cdk.aws_elasticache.DailySnapshotTimeProps</code> | *No description.* |

---

##### `props`<sup>Required</sup> <a name="props" id="@open-constructs/aws-cdk.aws_elasticache.DailySnapshotTime.Initializer.parameter.props"></a>

- *Type:* @open-constructs/aws-cdk.aws_elasticache.DailySnapshotTimeProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.DailySnapshotTime.toTimestamp">toTimestamp</a></code> | Converts an hour, and minute into HH:MM string. |

---

##### `toTimestamp` <a name="toTimestamp" id="@open-constructs/aws-cdk.aws_elasticache.DailySnapshotTime.toTimestamp"></a>

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




### MultiAz1ThroughputCapacityPerHaPair <a name="MultiAz1ThroughputCapacityPerHaPair" id="@open-constructs/aws-cdk.aws_fsx.MultiAz1ThroughputCapacityPerHaPair"></a>

The throughput capacity for the Multi-AZ 1 deployment type.

#### Initializers <a name="Initializers" id="@open-constructs/aws-cdk.aws_fsx.MultiAz1ThroughputCapacityPerHaPair.Initializer"></a>

```typescript
import { aws_fsx } from '@open-constructs/aws-cdk'

new aws_fsx.MultiAz1ThroughputCapacityPerHaPair(capacity: number)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.MultiAz1ThroughputCapacityPerHaPair.Initializer.parameter.capacity">capacity</a></code> | <code>number</code> | *No description.* |

---

##### `capacity`<sup>Required</sup> <a name="capacity" id="@open-constructs/aws-cdk.aws_fsx.MultiAz1ThroughputCapacityPerHaPair.Initializer.parameter.capacity"></a>

- *Type:* number

---



#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.MultiAz1ThroughputCapacityPerHaPair.property.capacity">capacity</a></code> | <code>number</code> | *No description.* |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.MultiAz1ThroughputCapacityPerHaPair.property.deploymentType">deploymentType</a></code> | <code>@open-constructs/aws-cdk.aws_fsx.OntapDeploymentType</code> | The deployment type of the throughput capacity. |

---

##### `capacity`<sup>Required</sup> <a name="capacity" id="@open-constructs/aws-cdk.aws_fsx.MultiAz1ThroughputCapacityPerHaPair.property.capacity"></a>

```typescript
public readonly capacity: number;
```

- *Type:* number

---

##### `deploymentType`<sup>Required</sup> <a name="deploymentType" id="@open-constructs/aws-cdk.aws_fsx.MultiAz1ThroughputCapacityPerHaPair.property.deploymentType"></a>

```typescript
public readonly deploymentType: OntapDeploymentType;
```

- *Type:* @open-constructs/aws-cdk.aws_fsx.OntapDeploymentType

The deployment type of the throughput capacity.

---

#### Constants <a name="Constants" id="Constants"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.MultiAz1ThroughputCapacityPerHaPair.property.MB_PER_SEC_1024">MB_PER_SEC_1024</a></code> | <code>@open-constructs/aws-cdk.aws_fsx.MultiAz1ThroughputCapacityPerHaPair</code> | The throughput capacity of 1024 MBps per HA pair. |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.MultiAz1ThroughputCapacityPerHaPair.property.MB_PER_SEC_128">MB_PER_SEC_128</a></code> | <code>@open-constructs/aws-cdk.aws_fsx.MultiAz1ThroughputCapacityPerHaPair</code> | The throughput capacity of 128 MBps per HA pair. |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.MultiAz1ThroughputCapacityPerHaPair.property.MB_PER_SEC_2048">MB_PER_SEC_2048</a></code> | <code>@open-constructs/aws-cdk.aws_fsx.MultiAz1ThroughputCapacityPerHaPair</code> | The throughput capacity of 2048 MBps per HA pair. |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.MultiAz1ThroughputCapacityPerHaPair.property.MB_PER_SEC_256">MB_PER_SEC_256</a></code> | <code>@open-constructs/aws-cdk.aws_fsx.MultiAz1ThroughputCapacityPerHaPair</code> | The throughput capacity of 256 MBps per HA pair. |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.MultiAz1ThroughputCapacityPerHaPair.property.MB_PER_SEC_4096">MB_PER_SEC_4096</a></code> | <code>@open-constructs/aws-cdk.aws_fsx.MultiAz1ThroughputCapacityPerHaPair</code> | The throughput capacity of 4096 MBps per HA pair. |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.MultiAz1ThroughputCapacityPerHaPair.property.MB_PER_SEC_512">MB_PER_SEC_512</a></code> | <code>@open-constructs/aws-cdk.aws_fsx.MultiAz1ThroughputCapacityPerHaPair</code> | The throughput capacity of 512 MBps per HA pair. |

---

##### `MB_PER_SEC_1024`<sup>Required</sup> <a name="MB_PER_SEC_1024" id="@open-constructs/aws-cdk.aws_fsx.MultiAz1ThroughputCapacityPerHaPair.property.MB_PER_SEC_1024"></a>

```typescript
public readonly MB_PER_SEC_1024: MultiAz1ThroughputCapacityPerHaPair;
```

- *Type:* @open-constructs/aws-cdk.aws_fsx.MultiAz1ThroughputCapacityPerHaPair

The throughput capacity of 1024 MBps per HA pair.

---

##### `MB_PER_SEC_128`<sup>Required</sup> <a name="MB_PER_SEC_128" id="@open-constructs/aws-cdk.aws_fsx.MultiAz1ThroughputCapacityPerHaPair.property.MB_PER_SEC_128"></a>

```typescript
public readonly MB_PER_SEC_128: MultiAz1ThroughputCapacityPerHaPair;
```

- *Type:* @open-constructs/aws-cdk.aws_fsx.MultiAz1ThroughputCapacityPerHaPair

The throughput capacity of 128 MBps per HA pair.

---

##### `MB_PER_SEC_2048`<sup>Required</sup> <a name="MB_PER_SEC_2048" id="@open-constructs/aws-cdk.aws_fsx.MultiAz1ThroughputCapacityPerHaPair.property.MB_PER_SEC_2048"></a>

```typescript
public readonly MB_PER_SEC_2048: MultiAz1ThroughputCapacityPerHaPair;
```

- *Type:* @open-constructs/aws-cdk.aws_fsx.MultiAz1ThroughputCapacityPerHaPair

The throughput capacity of 2048 MBps per HA pair.

---

##### `MB_PER_SEC_256`<sup>Required</sup> <a name="MB_PER_SEC_256" id="@open-constructs/aws-cdk.aws_fsx.MultiAz1ThroughputCapacityPerHaPair.property.MB_PER_SEC_256"></a>

```typescript
public readonly MB_PER_SEC_256: MultiAz1ThroughputCapacityPerHaPair;
```

- *Type:* @open-constructs/aws-cdk.aws_fsx.MultiAz1ThroughputCapacityPerHaPair

The throughput capacity of 256 MBps per HA pair.

---

##### `MB_PER_SEC_4096`<sup>Required</sup> <a name="MB_PER_SEC_4096" id="@open-constructs/aws-cdk.aws_fsx.MultiAz1ThroughputCapacityPerHaPair.property.MB_PER_SEC_4096"></a>

```typescript
public readonly MB_PER_SEC_4096: MultiAz1ThroughputCapacityPerHaPair;
```

- *Type:* @open-constructs/aws-cdk.aws_fsx.MultiAz1ThroughputCapacityPerHaPair

The throughput capacity of 4096 MBps per HA pair.

---

##### `MB_PER_SEC_512`<sup>Required</sup> <a name="MB_PER_SEC_512" id="@open-constructs/aws-cdk.aws_fsx.MultiAz1ThroughputCapacityPerHaPair.property.MB_PER_SEC_512"></a>

```typescript
public readonly MB_PER_SEC_512: MultiAz1ThroughputCapacityPerHaPair;
```

- *Type:* @open-constructs/aws-cdk.aws_fsx.MultiAz1ThroughputCapacityPerHaPair

The throughput capacity of 512 MBps per HA pair.

---

### MultiAz2ThroughputCapacityPerHaPair <a name="MultiAz2ThroughputCapacityPerHaPair" id="@open-constructs/aws-cdk.aws_fsx.MultiAz2ThroughputCapacityPerHaPair"></a>

The throughput capacity for the Multi-AZ 2 deployment type.

#### Initializers <a name="Initializers" id="@open-constructs/aws-cdk.aws_fsx.MultiAz2ThroughputCapacityPerHaPair.Initializer"></a>

```typescript
import { aws_fsx } from '@open-constructs/aws-cdk'

new aws_fsx.MultiAz2ThroughputCapacityPerHaPair(capacity: number)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.MultiAz2ThroughputCapacityPerHaPair.Initializer.parameter.capacity">capacity</a></code> | <code>number</code> | *No description.* |

---

##### `capacity`<sup>Required</sup> <a name="capacity" id="@open-constructs/aws-cdk.aws_fsx.MultiAz2ThroughputCapacityPerHaPair.Initializer.parameter.capacity"></a>

- *Type:* number

---



#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.MultiAz2ThroughputCapacityPerHaPair.property.capacity">capacity</a></code> | <code>number</code> | *No description.* |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.MultiAz2ThroughputCapacityPerHaPair.property.deploymentType">deploymentType</a></code> | <code>@open-constructs/aws-cdk.aws_fsx.OntapDeploymentType</code> | The deployment type of the throughput capacity. |

---

##### `capacity`<sup>Required</sup> <a name="capacity" id="@open-constructs/aws-cdk.aws_fsx.MultiAz2ThroughputCapacityPerHaPair.property.capacity"></a>

```typescript
public readonly capacity: number;
```

- *Type:* number

---

##### `deploymentType`<sup>Required</sup> <a name="deploymentType" id="@open-constructs/aws-cdk.aws_fsx.MultiAz2ThroughputCapacityPerHaPair.property.deploymentType"></a>

```typescript
public readonly deploymentType: OntapDeploymentType;
```

- *Type:* @open-constructs/aws-cdk.aws_fsx.OntapDeploymentType

The deployment type of the throughput capacity.

---

#### Constants <a name="Constants" id="Constants"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.MultiAz2ThroughputCapacityPerHaPair.property.MB_PER_SEC_1536">MB_PER_SEC_1536</a></code> | <code>@open-constructs/aws-cdk.aws_fsx.MultiAz2ThroughputCapacityPerHaPair</code> | The throughput capacity of 1536 MBps per HA pair. |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.MultiAz2ThroughputCapacityPerHaPair.property.MB_PER_SEC_3072">MB_PER_SEC_3072</a></code> | <code>@open-constructs/aws-cdk.aws_fsx.MultiAz2ThroughputCapacityPerHaPair</code> | The throughput capacity of 3072 MBps per HA pair. |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.MultiAz2ThroughputCapacityPerHaPair.property.MB_PER_SEC_384">MB_PER_SEC_384</a></code> | <code>@open-constructs/aws-cdk.aws_fsx.MultiAz2ThroughputCapacityPerHaPair</code> | The throughput capacity of 384 MBps per HA pair. |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.MultiAz2ThroughputCapacityPerHaPair.property.MB_PER_SEC_6144">MB_PER_SEC_6144</a></code> | <code>@open-constructs/aws-cdk.aws_fsx.MultiAz2ThroughputCapacityPerHaPair</code> | The throughput capacity of 6144 MBps per HA pair. |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.MultiAz2ThroughputCapacityPerHaPair.property.MB_PER_SEC_768">MB_PER_SEC_768</a></code> | <code>@open-constructs/aws-cdk.aws_fsx.MultiAz2ThroughputCapacityPerHaPair</code> | The throughput capacity of 768 MBps per HA pair. |

---

##### `MB_PER_SEC_1536`<sup>Required</sup> <a name="MB_PER_SEC_1536" id="@open-constructs/aws-cdk.aws_fsx.MultiAz2ThroughputCapacityPerHaPair.property.MB_PER_SEC_1536"></a>

```typescript
public readonly MB_PER_SEC_1536: MultiAz2ThroughputCapacityPerHaPair;
```

- *Type:* @open-constructs/aws-cdk.aws_fsx.MultiAz2ThroughputCapacityPerHaPair

The throughput capacity of 1536 MBps per HA pair.

---

##### `MB_PER_SEC_3072`<sup>Required</sup> <a name="MB_PER_SEC_3072" id="@open-constructs/aws-cdk.aws_fsx.MultiAz2ThroughputCapacityPerHaPair.property.MB_PER_SEC_3072"></a>

```typescript
public readonly MB_PER_SEC_3072: MultiAz2ThroughputCapacityPerHaPair;
```

- *Type:* @open-constructs/aws-cdk.aws_fsx.MultiAz2ThroughputCapacityPerHaPair

The throughput capacity of 3072 MBps per HA pair.

---

##### `MB_PER_SEC_384`<sup>Required</sup> <a name="MB_PER_SEC_384" id="@open-constructs/aws-cdk.aws_fsx.MultiAz2ThroughputCapacityPerHaPair.property.MB_PER_SEC_384"></a>

```typescript
public readonly MB_PER_SEC_384: MultiAz2ThroughputCapacityPerHaPair;
```

- *Type:* @open-constructs/aws-cdk.aws_fsx.MultiAz2ThroughputCapacityPerHaPair

The throughput capacity of 384 MBps per HA pair.

---

##### `MB_PER_SEC_6144`<sup>Required</sup> <a name="MB_PER_SEC_6144" id="@open-constructs/aws-cdk.aws_fsx.MultiAz2ThroughputCapacityPerHaPair.property.MB_PER_SEC_6144"></a>

```typescript
public readonly MB_PER_SEC_6144: MultiAz2ThroughputCapacityPerHaPair;
```

- *Type:* @open-constructs/aws-cdk.aws_fsx.MultiAz2ThroughputCapacityPerHaPair

The throughput capacity of 6144 MBps per HA pair.

---

##### `MB_PER_SEC_768`<sup>Required</sup> <a name="MB_PER_SEC_768" id="@open-constructs/aws-cdk.aws_fsx.MultiAz2ThroughputCapacityPerHaPair.property.MB_PER_SEC_768"></a>

```typescript
public readonly MB_PER_SEC_768: MultiAz2ThroughputCapacityPerHaPair;
```

- *Type:* @open-constructs/aws-cdk.aws_fsx.MultiAz2ThroughputCapacityPerHaPair

The throughput capacity of 768 MBps per HA pair.

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

### SingleAz1ThroughputCapacityPerHaPair <a name="SingleAz1ThroughputCapacityPerHaPair" id="@open-constructs/aws-cdk.aws_fsx.SingleAz1ThroughputCapacityPerHaPair"></a>

The throughput capacity for the Single-AZ 1 deployment type.

#### Initializers <a name="Initializers" id="@open-constructs/aws-cdk.aws_fsx.SingleAz1ThroughputCapacityPerHaPair.Initializer"></a>

```typescript
import { aws_fsx } from '@open-constructs/aws-cdk'

new aws_fsx.SingleAz1ThroughputCapacityPerHaPair(capacity: number)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.SingleAz1ThroughputCapacityPerHaPair.Initializer.parameter.capacity">capacity</a></code> | <code>number</code> | *No description.* |

---

##### `capacity`<sup>Required</sup> <a name="capacity" id="@open-constructs/aws-cdk.aws_fsx.SingleAz1ThroughputCapacityPerHaPair.Initializer.parameter.capacity"></a>

- *Type:* number

---



#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.SingleAz1ThroughputCapacityPerHaPair.property.capacity">capacity</a></code> | <code>number</code> | *No description.* |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.SingleAz1ThroughputCapacityPerHaPair.property.deploymentType">deploymentType</a></code> | <code>@open-constructs/aws-cdk.aws_fsx.OntapDeploymentType</code> | The deployment type of the throughput capacity. |

---

##### `capacity`<sup>Required</sup> <a name="capacity" id="@open-constructs/aws-cdk.aws_fsx.SingleAz1ThroughputCapacityPerHaPair.property.capacity"></a>

```typescript
public readonly capacity: number;
```

- *Type:* number

---

##### `deploymentType`<sup>Required</sup> <a name="deploymentType" id="@open-constructs/aws-cdk.aws_fsx.SingleAz1ThroughputCapacityPerHaPair.property.deploymentType"></a>

```typescript
public readonly deploymentType: OntapDeploymentType;
```

- *Type:* @open-constructs/aws-cdk.aws_fsx.OntapDeploymentType

The deployment type of the throughput capacity.

---

#### Constants <a name="Constants" id="Constants"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.SingleAz1ThroughputCapacityPerHaPair.property.MB_PER_SEC_1024">MB_PER_SEC_1024</a></code> | <code>@open-constructs/aws-cdk.aws_fsx.SingleAz1ThroughputCapacityPerHaPair</code> | The throughput capacity of 1024 MBps per HA pair. |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.SingleAz1ThroughputCapacityPerHaPair.property.MB_PER_SEC_128">MB_PER_SEC_128</a></code> | <code>@open-constructs/aws-cdk.aws_fsx.SingleAz1ThroughputCapacityPerHaPair</code> | The throughput capacity of 128 MBps per HA pair. |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.SingleAz1ThroughputCapacityPerHaPair.property.MB_PER_SEC_2048">MB_PER_SEC_2048</a></code> | <code>@open-constructs/aws-cdk.aws_fsx.SingleAz1ThroughputCapacityPerHaPair</code> | The throughput capacity of 2048 MBps per HA pair. |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.SingleAz1ThroughputCapacityPerHaPair.property.MB_PER_SEC_256">MB_PER_SEC_256</a></code> | <code>@open-constructs/aws-cdk.aws_fsx.SingleAz1ThroughputCapacityPerHaPair</code> | The throughput capacity of 256 MBps per HA pair. |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.SingleAz1ThroughputCapacityPerHaPair.property.MB_PER_SEC_4096">MB_PER_SEC_4096</a></code> | <code>@open-constructs/aws-cdk.aws_fsx.SingleAz1ThroughputCapacityPerHaPair</code> | The throughput capacity of 4096 MBps per HA pair. |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.SingleAz1ThroughputCapacityPerHaPair.property.MB_PER_SEC_512">MB_PER_SEC_512</a></code> | <code>@open-constructs/aws-cdk.aws_fsx.SingleAz1ThroughputCapacityPerHaPair</code> | The throughput capacity of 512 MBps per HA pair. |

---

##### `MB_PER_SEC_1024`<sup>Required</sup> <a name="MB_PER_SEC_1024" id="@open-constructs/aws-cdk.aws_fsx.SingleAz1ThroughputCapacityPerHaPair.property.MB_PER_SEC_1024"></a>

```typescript
public readonly MB_PER_SEC_1024: SingleAz1ThroughputCapacityPerHaPair;
```

- *Type:* @open-constructs/aws-cdk.aws_fsx.SingleAz1ThroughputCapacityPerHaPair

The throughput capacity of 1024 MBps per HA pair.

---

##### `MB_PER_SEC_128`<sup>Required</sup> <a name="MB_PER_SEC_128" id="@open-constructs/aws-cdk.aws_fsx.SingleAz1ThroughputCapacityPerHaPair.property.MB_PER_SEC_128"></a>

```typescript
public readonly MB_PER_SEC_128: SingleAz1ThroughputCapacityPerHaPair;
```

- *Type:* @open-constructs/aws-cdk.aws_fsx.SingleAz1ThroughputCapacityPerHaPair

The throughput capacity of 128 MBps per HA pair.

---

##### `MB_PER_SEC_2048`<sup>Required</sup> <a name="MB_PER_SEC_2048" id="@open-constructs/aws-cdk.aws_fsx.SingleAz1ThroughputCapacityPerHaPair.property.MB_PER_SEC_2048"></a>

```typescript
public readonly MB_PER_SEC_2048: SingleAz1ThroughputCapacityPerHaPair;
```

- *Type:* @open-constructs/aws-cdk.aws_fsx.SingleAz1ThroughputCapacityPerHaPair

The throughput capacity of 2048 MBps per HA pair.

---

##### `MB_PER_SEC_256`<sup>Required</sup> <a name="MB_PER_SEC_256" id="@open-constructs/aws-cdk.aws_fsx.SingleAz1ThroughputCapacityPerHaPair.property.MB_PER_SEC_256"></a>

```typescript
public readonly MB_PER_SEC_256: SingleAz1ThroughputCapacityPerHaPair;
```

- *Type:* @open-constructs/aws-cdk.aws_fsx.SingleAz1ThroughputCapacityPerHaPair

The throughput capacity of 256 MBps per HA pair.

---

##### `MB_PER_SEC_4096`<sup>Required</sup> <a name="MB_PER_SEC_4096" id="@open-constructs/aws-cdk.aws_fsx.SingleAz1ThroughputCapacityPerHaPair.property.MB_PER_SEC_4096"></a>

```typescript
public readonly MB_PER_SEC_4096: SingleAz1ThroughputCapacityPerHaPair;
```

- *Type:* @open-constructs/aws-cdk.aws_fsx.SingleAz1ThroughputCapacityPerHaPair

The throughput capacity of 4096 MBps per HA pair.

---

##### `MB_PER_SEC_512`<sup>Required</sup> <a name="MB_PER_SEC_512" id="@open-constructs/aws-cdk.aws_fsx.SingleAz1ThroughputCapacityPerHaPair.property.MB_PER_SEC_512"></a>

```typescript
public readonly MB_PER_SEC_512: SingleAz1ThroughputCapacityPerHaPair;
```

- *Type:* @open-constructs/aws-cdk.aws_fsx.SingleAz1ThroughputCapacityPerHaPair

The throughput capacity of 512 MBps per HA pair.

---

### SingleAz2ThroughputCapacityPerHaPair <a name="SingleAz2ThroughputCapacityPerHaPair" id="@open-constructs/aws-cdk.aws_fsx.SingleAz2ThroughputCapacityPerHaPair"></a>

The throughput capacity for the Single-AZ 2 deployment type.

#### Initializers <a name="Initializers" id="@open-constructs/aws-cdk.aws_fsx.SingleAz2ThroughputCapacityPerHaPair.Initializer"></a>

```typescript
import { aws_fsx } from '@open-constructs/aws-cdk'

new aws_fsx.SingleAz2ThroughputCapacityPerHaPair(capacity: number)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.SingleAz2ThroughputCapacityPerHaPair.Initializer.parameter.capacity">capacity</a></code> | <code>number</code> | *No description.* |

---

##### `capacity`<sup>Required</sup> <a name="capacity" id="@open-constructs/aws-cdk.aws_fsx.SingleAz2ThroughputCapacityPerHaPair.Initializer.parameter.capacity"></a>

- *Type:* number

---



#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.SingleAz2ThroughputCapacityPerHaPair.property.capacity">capacity</a></code> | <code>number</code> | *No description.* |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.SingleAz2ThroughputCapacityPerHaPair.property.deploymentType">deploymentType</a></code> | <code>@open-constructs/aws-cdk.aws_fsx.OntapDeploymentType</code> | The deployment type of the throughput capacity. |

---

##### `capacity`<sup>Required</sup> <a name="capacity" id="@open-constructs/aws-cdk.aws_fsx.SingleAz2ThroughputCapacityPerHaPair.property.capacity"></a>

```typescript
public readonly capacity: number;
```

- *Type:* number

---

##### `deploymentType`<sup>Required</sup> <a name="deploymentType" id="@open-constructs/aws-cdk.aws_fsx.SingleAz2ThroughputCapacityPerHaPair.property.deploymentType"></a>

```typescript
public readonly deploymentType: OntapDeploymentType;
```

- *Type:* @open-constructs/aws-cdk.aws_fsx.OntapDeploymentType

The deployment type of the throughput capacity.

---

#### Constants <a name="Constants" id="Constants"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.SingleAz2ThroughputCapacityPerHaPair.property.MB_PER_SEC_1536">MB_PER_SEC_1536</a></code> | <code>@open-constructs/aws-cdk.aws_fsx.SingleAz2ThroughputCapacityPerHaPair</code> | The throughput capacity of 1536 MBps per HA pair. |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.SingleAz2ThroughputCapacityPerHaPair.property.MB_PER_SEC_3072">MB_PER_SEC_3072</a></code> | <code>@open-constructs/aws-cdk.aws_fsx.SingleAz2ThroughputCapacityPerHaPair</code> | The throughput capacity of 3072 MBps per HA pair. |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.SingleAz2ThroughputCapacityPerHaPair.property.MB_PER_SEC_6144">MB_PER_SEC_6144</a></code> | <code>@open-constructs/aws-cdk.aws_fsx.SingleAz2ThroughputCapacityPerHaPair</code> | The throughput capacity of 6144 MBps per HA pair. |

---

##### `MB_PER_SEC_1536`<sup>Required</sup> <a name="MB_PER_SEC_1536" id="@open-constructs/aws-cdk.aws_fsx.SingleAz2ThroughputCapacityPerHaPair.property.MB_PER_SEC_1536"></a>

```typescript
public readonly MB_PER_SEC_1536: SingleAz2ThroughputCapacityPerHaPair;
```

- *Type:* @open-constructs/aws-cdk.aws_fsx.SingleAz2ThroughputCapacityPerHaPair

The throughput capacity of 1536 MBps per HA pair.

---

##### `MB_PER_SEC_3072`<sup>Required</sup> <a name="MB_PER_SEC_3072" id="@open-constructs/aws-cdk.aws_fsx.SingleAz2ThroughputCapacityPerHaPair.property.MB_PER_SEC_3072"></a>

```typescript
public readonly MB_PER_SEC_3072: SingleAz2ThroughputCapacityPerHaPair;
```

- *Type:* @open-constructs/aws-cdk.aws_fsx.SingleAz2ThroughputCapacityPerHaPair

The throughput capacity of 3072 MBps per HA pair.

---

##### `MB_PER_SEC_6144`<sup>Required</sup> <a name="MB_PER_SEC_6144" id="@open-constructs/aws-cdk.aws_fsx.SingleAz2ThroughputCapacityPerHaPair.property.MB_PER_SEC_6144"></a>

```typescript
public readonly MB_PER_SEC_6144: SingleAz2ThroughputCapacityPerHaPair;
```

- *Type:* @open-constructs/aws-cdk.aws_fsx.SingleAz2ThroughputCapacityPerHaPair

The throughput capacity of 6144 MBps per HA pair.

---

### ThroughputCapacityPerHaPair <a name="ThroughputCapacityPerHaPair" id="@open-constructs/aws-cdk.aws_fsx.ThroughputCapacityPerHaPair"></a>

The throughput capacity per HA pair for an Amazon FSx for NetApp ONTAP file system.

#### Initializers <a name="Initializers" id="@open-constructs/aws-cdk.aws_fsx.ThroughputCapacityPerHaPair.Initializer"></a>

```typescript
import { aws_fsx } from '@open-constructs/aws-cdk'

new aws_fsx.ThroughputCapacityPerHaPair(capacity: number)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.ThroughputCapacityPerHaPair.Initializer.parameter.capacity">capacity</a></code> | <code>number</code> | *No description.* |

---

##### `capacity`<sup>Required</sup> <a name="capacity" id="@open-constructs/aws-cdk.aws_fsx.ThroughputCapacityPerHaPair.Initializer.parameter.capacity"></a>

- *Type:* number

---



#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.ThroughputCapacityPerHaPair.property.capacity">capacity</a></code> | <code>number</code> | *No description.* |
| <code><a href="#@open-constructs/aws-cdk.aws_fsx.ThroughputCapacityPerHaPair.property.deploymentType">deploymentType</a></code> | <code>@open-constructs/aws-cdk.aws_fsx.OntapDeploymentType</code> | The deployment type of the throughput capacity. |

---

##### `capacity`<sup>Required</sup> <a name="capacity" id="@open-constructs/aws-cdk.aws_fsx.ThroughputCapacityPerHaPair.property.capacity"></a>

```typescript
public readonly capacity: number;
```

- *Type:* number

---

##### `deploymentType`<sup>Required</sup> <a name="deploymentType" id="@open-constructs/aws-cdk.aws_fsx.ThroughputCapacityPerHaPair.property.deploymentType"></a>

```typescript
public readonly deploymentType: OntapDeploymentType;
```

- *Type:* @open-constructs/aws-cdk.aws_fsx.OntapDeploymentType

The deployment type of the throughput capacity.

---


## Protocols <a name="Protocols" id="Protocols"></a>

### IDomain <a name="IDomain" id="@open-constructs/aws-cdk.aws_codeartifact.IDomain"></a>

- *Extends:* aws-cdk-lib.IResource

- *Implemented By:* @open-constructs/aws-cdk.aws_codeartifact.Domain, @open-constructs/aws-cdk.aws_codeartifact.IDomain

Represents a CodeArtifact Domain.

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
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.INamespace.property.namespaceArn">namespaceArn</a></code> | <code>string</code> | The namespace ARN. |
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.INamespace.property.namespaceId">namespaceId</a></code> | <code>string</code> | The namespace id. |
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

The namespace ARN.

---

##### `namespaceId`<sup>Required</sup> <a name="namespaceId" id="@open-constructs/aws-cdk.aws_redshiftserverless.INamespace.property.namespaceId"></a>

```typescript
public readonly namespaceId: string;
```

- *Type:* string

The namespace id.

---

##### `namespaceName`<sup>Required</sup> <a name="namespaceName" id="@open-constructs/aws-cdk.aws_redshiftserverless.INamespace.property.namespaceName"></a>

```typescript
public readonly namespaceName: string;
```

- *Type:* string

The namespace name.

---

### IRepository <a name="IRepository" id="@open-constructs/aws-cdk.aws_codeartifact.IRepository"></a>

- *Extends:* aws-cdk-lib.IResource

- *Implemented By:* @open-constructs/aws-cdk.aws_codeartifact.Repository, @open-constructs/aws-cdk.aws_codeartifact.IRepository

Represents an CodeArtifact Repository.

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

### IServerlessCache <a name="IServerlessCache" id="@open-constructs/aws-cdk.aws_elasticache.IServerlessCache"></a>

- *Extends:* aws-cdk-lib.IResource, aws-cdk-lib.aws_ec2.IConnectable

- *Implemented By:* @open-constructs/aws-cdk.aws_elasticache.ServerlessCache, @open-constructs/aws-cdk.aws_elasticache.IServerlessCache

A ElastiCache Serverless Cache.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.IServerlessCache.grant">grant</a></code> | Grant the given identity the specified actions. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.IServerlessCache.grantConnect">grantConnect</a></code> | Grant the given identity connection access to the cache. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.IServerlessCache.metric">metric</a></code> | Create a CloudWatch metric. |

---

##### `grant` <a name="grant" id="@open-constructs/aws-cdk.aws_elasticache.IServerlessCache.grant"></a>

```typescript
public grant(grantee: IGrantable, actions: ...string[]): Grant
```

Grant the given identity the specified actions.

###### `grantee`<sup>Required</sup> <a name="grantee" id="@open-constructs/aws-cdk.aws_elasticache.IServerlessCache.grant.parameter.grantee"></a>

- *Type:* aws-cdk-lib.aws_iam.IGrantable

---

###### `actions`<sup>Required</sup> <a name="actions" id="@open-constructs/aws-cdk.aws_elasticache.IServerlessCache.grant.parameter.actions"></a>

- *Type:* ...string[]

---

##### `grantConnect` <a name="grantConnect" id="@open-constructs/aws-cdk.aws_elasticache.IServerlessCache.grantConnect"></a>

```typescript
public grantConnect(grantee: IGrantable): Grant
```

Grant the given identity connection access to the cache.

###### `grantee`<sup>Required</sup> <a name="grantee" id="@open-constructs/aws-cdk.aws_elasticache.IServerlessCache.grantConnect.parameter.grantee"></a>

- *Type:* aws-cdk-lib.aws_iam.IGrantable

---

##### `metric` <a name="metric" id="@open-constructs/aws-cdk.aws_elasticache.IServerlessCache.metric"></a>

```typescript
public metric(metricName: string, props?: MetricOptions): Metric
```

Create a CloudWatch metric.

###### `metricName`<sup>Required</sup> <a name="metricName" id="@open-constructs/aws-cdk.aws_elasticache.IServerlessCache.metric.parameter.metricName"></a>

- *Type:* string

---

###### `props`<sup>Optional</sup> <a name="props" id="@open-constructs/aws-cdk.aws_elasticache.IServerlessCache.metric.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.IServerlessCache.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.IServerlessCache.property.env">env</a></code> | <code>aws-cdk-lib.ResourceEnvironment</code> | The environment this resource belongs to. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.IServerlessCache.property.stack">stack</a></code> | <code>aws-cdk-lib.Stack</code> | The stack in which this resource is defined. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.IServerlessCache.property.connections">connections</a></code> | <code>aws-cdk-lib.aws_ec2.Connections</code> | The network connections associated with this resource. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.IServerlessCache.property.endpointAddress">endpointAddress</a></code> | <code>string</code> | The DNS hostname of the cache node. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.IServerlessCache.property.endpointPort">endpointPort</a></code> | <code>number</code> | The port number that the cache engine is listening on. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.IServerlessCache.property.serverlessCacheArn">serverlessCacheArn</a></code> | <code>string</code> | The serverless cache ARN. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.IServerlessCache.property.serverlessCacheName">serverlessCacheName</a></code> | <code>string</code> | The serverless cache name. |

---

##### `node`<sup>Required</sup> <a name="node" id="@open-constructs/aws-cdk.aws_elasticache.IServerlessCache.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `env`<sup>Required</sup> <a name="env" id="@open-constructs/aws-cdk.aws_elasticache.IServerlessCache.property.env"></a>

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

##### `stack`<sup>Required</sup> <a name="stack" id="@open-constructs/aws-cdk.aws_elasticache.IServerlessCache.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- *Type:* aws-cdk-lib.Stack

The stack in which this resource is defined.

---

##### `connections`<sup>Required</sup> <a name="connections" id="@open-constructs/aws-cdk.aws_elasticache.IServerlessCache.property.connections"></a>

```typescript
public readonly connections: Connections;
```

- *Type:* aws-cdk-lib.aws_ec2.Connections

The network connections associated with this resource.

---

##### `endpointAddress`<sup>Required</sup> <a name="endpointAddress" id="@open-constructs/aws-cdk.aws_elasticache.IServerlessCache.property.endpointAddress"></a>

```typescript
public readonly endpointAddress: string;
```

- *Type:* string

The DNS hostname of the cache node.

---

##### `endpointPort`<sup>Required</sup> <a name="endpointPort" id="@open-constructs/aws-cdk.aws_elasticache.IServerlessCache.property.endpointPort"></a>

```typescript
public readonly endpointPort: number;
```

- *Type:* number

The port number that the cache engine is listening on.

---

##### `serverlessCacheArn`<sup>Required</sup> <a name="serverlessCacheArn" id="@open-constructs/aws-cdk.aws_elasticache.IServerlessCache.property.serverlessCacheArn"></a>

```typescript
public readonly serverlessCacheArn: string;
```

- *Type:* string

The serverless cache ARN.

---

##### `serverlessCacheName`<sup>Required</sup> <a name="serverlessCacheName" id="@open-constructs/aws-cdk.aws_elasticache.IServerlessCache.property.serverlessCacheName"></a>

```typescript
public readonly serverlessCacheName: string;
```

- *Type:* string

The serverless cache name.

---

### IUser <a name="IUser" id="@open-constructs/aws-cdk.aws_elasticache.IUser"></a>

- *Extends:* aws-cdk-lib.IResource

- *Implemented By:* @open-constructs/aws-cdk.aws_elasticache.IamUser, @open-constructs/aws-cdk.aws_elasticache.NoPasswordRequiredUser, @open-constructs/aws-cdk.aws_elasticache.PasswordUser, @open-constructs/aws-cdk.aws_elasticache.IUser

A User.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.IUser.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.IUser.property.env">env</a></code> | <code>aws-cdk-lib.ResourceEnvironment</code> | The environment this resource belongs to. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.IUser.property.stack">stack</a></code> | <code>aws-cdk-lib.Stack</code> | The stack in which this resource is defined. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.IUser.property.userArn">userArn</a></code> | <code>string</code> | The ARN of the user. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.IUser.property.userId">userId</a></code> | <code>string</code> | The ID of the user. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.IUser.property.userName">userName</a></code> | <code>string</code> | The name of the user. |

---

##### `node`<sup>Required</sup> <a name="node" id="@open-constructs/aws-cdk.aws_elasticache.IUser.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `env`<sup>Required</sup> <a name="env" id="@open-constructs/aws-cdk.aws_elasticache.IUser.property.env"></a>

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

##### `stack`<sup>Required</sup> <a name="stack" id="@open-constructs/aws-cdk.aws_elasticache.IUser.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- *Type:* aws-cdk-lib.Stack

The stack in which this resource is defined.

---

##### `userArn`<sup>Required</sup> <a name="userArn" id="@open-constructs/aws-cdk.aws_elasticache.IUser.property.userArn"></a>

```typescript
public readonly userArn: string;
```

- *Type:* string

The ARN of the user.

---

##### `userId`<sup>Required</sup> <a name="userId" id="@open-constructs/aws-cdk.aws_elasticache.IUser.property.userId"></a>

```typescript
public readonly userId: string;
```

- *Type:* string

The ID of the user.

---

##### `userName`<sup>Required</sup> <a name="userName" id="@open-constructs/aws-cdk.aws_elasticache.IUser.property.userName"></a>

```typescript
public readonly userName: string;
```

- *Type:* string

The name of the user.

---

### IUserGroup <a name="IUserGroup" id="@open-constructs/aws-cdk.aws_elasticache.IUserGroup"></a>

- *Extends:* aws-cdk-lib.IResource

- *Implemented By:* @open-constructs/aws-cdk.aws_elasticache.UserGroup, @open-constructs/aws-cdk.aws_elasticache.IUserGroup

A User Group.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.IUserGroup.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.IUserGroup.property.env">env</a></code> | <code>aws-cdk-lib.ResourceEnvironment</code> | The environment this resource belongs to. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.IUserGroup.property.stack">stack</a></code> | <code>aws-cdk-lib.Stack</code> | The stack in which this resource is defined. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.IUserGroup.property.userGroupArn">userGroupArn</a></code> | <code>string</code> | The ARN of the user group. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.IUserGroup.property.userGroupId">userGroupId</a></code> | <code>string</code> | The ID of the user group. |

---

##### `node`<sup>Required</sup> <a name="node" id="@open-constructs/aws-cdk.aws_elasticache.IUserGroup.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `env`<sup>Required</sup> <a name="env" id="@open-constructs/aws-cdk.aws_elasticache.IUserGroup.property.env"></a>

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

##### `stack`<sup>Required</sup> <a name="stack" id="@open-constructs/aws-cdk.aws_elasticache.IUserGroup.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- *Type:* aws-cdk-lib.Stack

The stack in which this resource is defined.

---

##### `userGroupArn`<sup>Required</sup> <a name="userGroupArn" id="@open-constructs/aws-cdk.aws_elasticache.IUserGroup.property.userGroupArn"></a>

```typescript
public readonly userGroupArn: string;
```

- *Type:* string

The ARN of the user group.

---

##### `userGroupId`<sup>Required</sup> <a name="userGroupId" id="@open-constructs/aws-cdk.aws_elasticache.IUserGroup.property.userGroupId"></a>

```typescript
public readonly userGroupId: string;
```

- *Type:* string

The ID of the user group.

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
| <code><a href="#@open-constructs/aws-cdk.aws_redshiftserverless.IWorkgroup.property.workgroupId">workgroupId</a></code> | <code>string</code> | The workgroup id. |
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

##### `workgroupId`<sup>Required</sup> <a name="workgroupId" id="@open-constructs/aws-cdk.aws_redshiftserverless.IWorkgroup.property.workgroupId"></a>

```typescript
public readonly workgroupId: string;
```

- *Type:* string

The workgroup id.

---

##### `workgroupName`<sup>Required</sup> <a name="workgroupName" id="@open-constructs/aws-cdk.aws_redshiftserverless.IWorkgroup.property.workgroupName"></a>

```typescript
public readonly workgroupName: string;
```

- *Type:* string

The workgroup name.

---

## Enums <a name="Enums" id="Enums"></a>

### Engine <a name="Engine" id="@open-constructs/aws-cdk.aws_elasticache.Engine"></a>

The engine the cache uses.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.Engine.REDIS">REDIS</a></code> | Redis. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.Engine.VALKEY">VALKEY</a></code> | Valkey. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.Engine.MEMCACHED">MEMCACHED</a></code> | Memcached. |

---

##### `REDIS` <a name="REDIS" id="@open-constructs/aws-cdk.aws_elasticache.Engine.REDIS"></a>

Redis.

---


##### `VALKEY` <a name="VALKEY" id="@open-constructs/aws-cdk.aws_elasticache.Engine.VALKEY"></a>

Valkey.

---


##### `MEMCACHED` <a name="MEMCACHED" id="@open-constructs/aws-cdk.aws_elasticache.Engine.MEMCACHED"></a>

Memcached.

---


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


### MajorVersion <a name="MajorVersion" id="@open-constructs/aws-cdk.aws_elasticache.MajorVersion"></a>

The version number of the engine the serverless cache is compatible with.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.MajorVersion.VER_7">VER_7</a></code> | Version 7. |
| <code><a href="#@open-constructs/aws-cdk.aws_elasticache.MajorVersion.VER_8">VER_8</a></code> | Version 8. |

---

##### `VER_7` <a name="VER_7" id="@open-constructs/aws-cdk.aws_elasticache.MajorVersion.VER_7"></a>

Version 7.

---


##### `VER_8` <a name="VER_8" id="@open-constructs/aws-cdk.aws_elasticache.MajorVersion.VER_8"></a>

Version 8.

---


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

