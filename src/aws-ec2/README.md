Constructs for the AWS EC2 service

# EC2 Instance Connect Endpoint CDK Construct

## Overview

The `InstanceConnectEndpoint` construct facilitates the creation and management of [EC2 Instance Connect endpoints](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/connect-with-ec2-instance-connect-endpoint.html)
within AWS CDK applications.

## Usage

Import the necessary classes from AWS CDK and this construct and create a VPC for the endpoint:

```ts
import { App, Stack } from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { InstanceConnectEndpoint } from '@open-constructs/aws-cdk/aws-ec2';

const app = new App();
const stack = new Stack(app, 'InstanceConnectEndpointStack');
const vpc = new ec2.Vpc(stack, 'MyVpc');
```

### Basic Example

Here's how you can create an EC2 Instance Connect endpoint and allow connections to an EC2 instance:

```ts
const instance = new ec2.Instance(this, 'Instance', {
  vpc,
  instanceType: ec2.InstanceType.of(
    ec2.InstanceClass.C5,
    ec2.InstanceSize.LARGE,
  ),
  machineImage: new ec2.AmazonLinuxImage({
    generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2023,
  }),
});

const endpoint = new InstanceConnectEndpoint(stack, 'MyEndpoint', {
  vpc,
});

// Allow SSH connections to the instance
// You can also use the port 3389 for RDP connections
endpoint.connections.allowTo(instance, ec2.Port.tcp(22));
```

### Advanced Example

Creating an endpoint with a custom settings:

```ts
declare const endpointSecurityGroup: ec2.ISecurityGroup;

const endpoint = new InstanceConnectEndpoint(stack, 'MyCustomEndpoint', {
  vpc,
  securityGroups: [endpointSecurityGroup], // Specify user-defined security groups
  preserveClientIp: true, // Whether your client's IP address is preserved as the source
  clientToken: 'my-client-token', // Specify client token to ensure the idempotency of the request.
});
```

Import an existing endpoint:

```ts
declare const existingEndpoint: ec2.IInstanceConnectEndpoint;
declare const securityGroups: ec2.ISecurityGroup[];

const existingEndpoint = InstanceConnectEndpoint.fromInstanceConnectEndpointAttributes(
  stack,
  'MyExistingEndpoint',
  {
    instanceConnectEndpointId: existingEndpoint.instanceConnectEndpointId,
    securityGroups,
  },
);
```
