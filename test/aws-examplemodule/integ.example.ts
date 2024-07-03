import { IntegTest } from '@aws-cdk/integ-tests-alpha';
import { App, RemovalPolicy, Stack } from 'aws-cdk-lib';
import { Topic } from 'aws-cdk-lib/aws-sns';

const app = new App();
const stack = new Stack(app, 'IntegrationTestExampleStack', {});
const topic = new Topic(stack, 'Output', {});
topic.applyRemovalPolicy(RemovalPolicy.DESTROY);

new IntegTest(app, 'IntegTestExample', {
  testCases: [stack],
});
