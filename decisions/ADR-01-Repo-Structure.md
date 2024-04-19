# ADR-01-Repo-Structure

| Status |  | community-review |
| --- | --- | --- |
| Date |  | 2024-03-14 |
| Decider |  | @maintainers |

## Context

In order to get started with accepting code contributions the basic repository must be defined. 
This structure should enable contributors to find things quickly and makes sure it feels natural to use. 

## Project Structure

```
.
├── src
│   ├── aws-elasticache
│   │   ├── redis-replication-group.ts
│   ├── ...
│   ├── static-website
│   │   ├── static-website.ts
│   ├── monitoring
│   │   ├── lambda-monitoring
│   │   │   ├── lambda-monitoring.ts
│   │   ├── monitoring-aspect.ts
│   ├── ...
│   ├── core
│   │   ├── typescript-asset
│   │   │   ├── typescript-asset.ts
│   │   └── ...
├── test
│   ├── aws-elasticache
│   │   ├── integ.redis-replication-group.ts
│   │   ├── redis-replication-group.test.ts
│   ├── ...
│   ├── static-website
│   │   ├── static-website.test.ts
│   ├── monitoring
│   │   ├── lambda-monitoring
│   │   │   ├── lambda-monitoring.test.ts
│   │   ├── integ.monitoring.ts
│   │   ├── monitoring-aspect.test.ts
│   ├── ...
│   ├── core
│   │   ├── typescript-asset
│   │   │   ├── integ.typescript-asset.ts
│   │   │   ├── typescript-asset.test.ts
│   │   └── ...

```

The CDK construct library is managed as a mono-package with folders for each group of constructs.

The project structure for the TypeScript project hosting the CDK construct library should have the following folders:

The root for all code that is published as part of this library is `src`. There can be other folders on the same level as `src` to manage the development and deployment processes for this library.

Inside `src`, there are three types of folders:
- `core` contains the core features of this library that don't belong to any specific service or use-case, as well as code that is shared between multiple services or use-cases.
- Each service has its own folder, named after the service, e.g. `aws-elasticache`. The folder name starts with the name of the provider of that service. E.g. if it's an AWS service, the folder name starts with `aws-`. The folder contains all constructs, aspects, and other code specific to that service, typically mostly L2-constructs.
- Each use-case has its own folder, named after the use-case, e.g. `monitoring`. The folder name does not include the provider name, as use cases can potentially span multiple providers. The folder contains all constructs, aspects, and other code specific to that use-case, typically mostly L3-constructs.

Next to `src`, there is a folder called `test` which mirrors the folder structure from `src` and contains the related unit and integration tests.

