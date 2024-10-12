Constructs for the AWS CodeArtifact service

# CDK Constructs for CodeArtifact Service

## Overview

The `Domain` and `Repository` constructs simplify the creation and management of AWS CodeArtifact domains and repositories within AWS CDK
applications. These constructs allow users to manage private repositories for software packages and define domains to group repositories,
facilitating secure sharing and version control across teams.

## Usage

Import the `Domain` and `Repository` constructs and create a new CodeArtifact domain & repository within your AWS CDK stack.

```ts
import { App, Stack } from 'aws-cdk-lib';
import { Domain, Repository } from '@open-constructs/aws-cdk/aws-codeartifact';

const app = new App();
const stack = new Stack(app, 'CodeArtifactDomainStack');

const domain = new Domain(stack, 'MyDomain', {
  domainName: 'my-domain',
});

const repository = new Repository(this, 'MyRepo', {
  domain: domain,
  repositoryName: 'my-repo',
});
```

### Importing existing resources

If you need to manage an existing CodeArtifact repository, you can import it into your CDK stack. Since the domain is implicit in the ARN of the repository it will be automatically imported as well.

```ts
import { Repository } from '@open-constructs/aws-cdk/aws-codeartifact';

const existingRepo = Repository.fromRepositoryArn(stack, 'ImportedRepo', 'arn:aws:codeartifact:us-east-1:123456789012:repository/my-domain/my-repo');
```