import * as cdk from 'aws-cdk-lib';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as route53 from 'aws-cdk-lib/aws-route53';
import { Construct } from 'constructs';

const isAliasRecordTarget = (value: route53.IAliasRecordTarget | Array<string>): value is route53.IAliasRecordTarget => {
  return !('length' in value);
};

type ARecordArray = Array<route53.ARecord>;

export interface AliasTarget {
  readonly target: route53.IAliasRecordTarget | Array<string>;
  readonly private?: boolean;
  readonly public?: boolean;
  readonly ttl?: cdk.Duration;
}

/**
 * @param zoneName The DNS name of the zone to create
 * @param existingPublicZone An existing public zone to use instead of creating a new one
 * @param existingPrivateZone An existing private zone to use instead of creating a new one
 * @param disallowPrivateZone Override the default behavior of creating a private zone. Will also block adding private records.
 * @param includeCertificate Whether to create an ACM certificate for the zone
 * @param certAlternateNames Alternate names to include in the certificate
 * @param privateZoneVpcs VPCs to associate with the private zone
 * @param targets Targets to create A records for
 */
export interface ISplitHorizonDnsProps {
  readonly zoneName: string;
  readonly recordName?: string;
  readonly existingPublicZone?: route53.IHostedZone;
  readonly existingPrivateZone?: route53.IHostedZone;
  readonly disallowPrivateZone?: boolean;
  readonly certAlternateNames?: Array<string>;
  readonly privateZoneVpcs?: Array<ec2.Vpc>;
  readonly targets: Array<AliasTarget>;
  readonly includeCertificate?: boolean;
}

/**
 * Creates a public and private zone for a given domain name, and creates A records for the given targets.
 * @property publicZone The public zone created
 * @property privateZone The private zone created
 * @property records The A records created
 */
export class SplitHorizonDns extends Construct {
  public publicZone: route53.IHostedZone;

  public privateZone?: route53.IHostedZone;

  public records: Array<ARecordArray>;

  constructor(scope: Construct, id: string, props: ISplitHorizonDnsProps) {
    super(scope, id);

    const {
      zoneName,
      existingPublicZone,
      existingPrivateZone,
      disallowPrivateZone,
      includeCertificate,
      certAlternateNames,
      privateZoneVpcs,
      targets,
    } = props;

    if (existingPublicZone) {
      this.publicZone = existingPublicZone;
    } else {
      this.publicZone = new route53.HostedZone(this, 'PublicZone', {
        zoneName: zoneName,
      });
    }

    if (includeCertificate) {
      new acm.Certificate(this, 'Certificate', {
        domainName: zoneName,
        subjectAlternativeNames: certAlternateNames,
      });
    }

    if (disallowPrivateZone) {
      console.log('Private zone creation is disallowed. Skipping...');
    } else if (disallowPrivateZone && existingPrivateZone) {
      console.error('Private zone creation is disallowed, but an existing private zone was provided. Skipping...');
    } else if (existingPrivateZone) {
      this.privateZone = existingPrivateZone;
    } else {
      this.privateZone = new route53.HostedZone(this, 'PrivateZone', {
        zoneName: zoneName,
        vpcs: privateZoneVpcs,
      });
    }

    this.records = targets.reduce((accu: Array<ARecordArray>, curr: AliasTarget) => {
      let target;

      if (isAliasRecordTarget(curr.target)) {
        target = route53.RecordTarget.fromAlias(curr.target);
      } else {
        target = route53.RecordTarget.fromValues(...curr.target);
      }

      if (!curr.private && !curr.public) {
        console.error(`Neither public nor private was specified for ${JSON.stringify(curr)}. Omitting...`);
        return accu;
      }

      const records = [] as ARecordArray;
      if (curr.public) {
        const publicARecord = new route53.ARecord(this, `${curr.target.toString()}PublicARecord`, {
          zone: this.publicZone,
          target: target,
          ttl: curr.ttl,
          recordName: props.recordName,
        });
        records.push(publicARecord);
      }

      if (disallowPrivateZone) {
        console.log('Private zone creation is disallowed. Skipping...');
      } else if (curr.private && this.privateZone) {
        const privateARecord = new route53.ARecord(this, `${curr.target.toString()}PrivateARecord`, {
          zone: this.privateZone,
          target: target,
          recordName: props.recordName,
        });
        records.push(privateARecord);
      } else if (curr.private && !this.privateZone) {
        console.error(`Private zone was specified for ${curr}, but private zone was not created. Omitting...`);
      }
      accu.push(records);
      return accu;
    }, [] as Array<ARecordArray>);
  }
}
