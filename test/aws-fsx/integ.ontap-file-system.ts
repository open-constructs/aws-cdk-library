import { App, Duration, RemovalPolicy, Stack, aws_ec2, aws_fsx } from 'aws-cdk-lib';
import * as integ from '@aws-cdk/integ-tests-alpha';
import * as ocf from '../../src';

const app = new App();

const stack = new Stack(app, 'FsxForOntapTestStack');

const vpc = new aws_ec2.Vpc(stack, 'Vpc');

new ocf.aws_fsx.OntapFileSystem(stack, 'OntapMultiAzFileSystem', {
  vpc,
  vpcSubnets: vpc.privateSubnets,
  storageCapacityGiB: 5120,
  ontapConfiguration: {
    automaticBackupRetention: Duration.days(7),
    dailyAutomaticBackupStartTime: new aws_fsx.DailyAutomaticBackupStartTime({
      hour: 1,
      minute: 0,
    }),
    deploymentType: ocf.aws_fsx.OntapDeploymentType.MULTI_AZ_2,
    diskIops: 15360,
    endpointIpAddressRange: '192.168.39.0/24',
    fsxAdminPassword: 'fsxPassword1',
    haPairs: 1,
    preferredSubnet: vpc.privateSubnets[0],
    routeTables: [vpc.privateSubnets[0].routeTable, vpc.privateSubnets[1].routeTable],
    throughputCapacity: 384,
    weeklyMaintenanceStartTime: new ocf.aws_fsx.MaintenanceTime({
      day: aws_fsx.Weekday.SUNDAY,
      hour: 1,
      minute: 0,
    }),
  },
  removalPolicy: RemovalPolicy.DESTROY,
});

new ocf.aws_fsx.OntapFileSystem(stack, 'OntapSingleAzFileSystem', {
  vpc,
  vpcSubnets: [vpc.privateSubnets[0]],
  storageCapacityGiB: 5120,
  ontapConfiguration: {
    automaticBackupRetention: Duration.days(7),
    dailyAutomaticBackupStartTime: new aws_fsx.DailyAutomaticBackupStartTime({
      hour: 1,
      minute: 0,
    }),
    deploymentType: ocf.aws_fsx.OntapDeploymentType.SINGLE_AZ_2,
    diskIops: 76800,
    fsxAdminPassword: 'fsxPassword1',
    haPairs: 5,
    throughputCapacityPerHaPair: 1536,
    weeklyMaintenanceStartTime: new ocf.aws_fsx.MaintenanceTime({
      day: aws_fsx.Weekday.SUNDAY,
      hour: 1,
      minute: 0,
    }),
  },
  removalPolicy: RemovalPolicy.DESTROY,
});

new integ.IntegTest(app, 'FsxForOntapTest', {
  testCases: [stack],
});