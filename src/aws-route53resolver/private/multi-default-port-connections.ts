import {
  Connections,
  ConnectionsProps,
  IConnectable,
  Port,
} from 'aws-cdk-lib/aws-ec2';

export interface MultiDefaultPortConnectionsProps extends ConnectionsProps {
  readonly defaultPorts?: Port[];
}
export class MultiDefaultPortConnections extends Connections {
  readonly defaultPorts?: Port[];
  constructor(props?: MultiDefaultPortConnectionsProps) {
    super(props);
    this.defaultPorts = props?.defaultPorts;
  }
  allowDefaultPortFrom(
    other: IConnectable,
    description?: string | undefined,
  ): void {
    this.defaultPorts?.forEach((port) =>
      super.allowFrom(other, port, description),
    );
  }
  allowDefaultPortFromAnyIpv4(description?: string | undefined): void {
    this.defaultPorts?.forEach((port) =>
      super.allowFromAnyIpv4(port, description),
    );
  }
  allowDefaultPortInternally(description?: string | undefined): void {
    this.defaultPorts?.forEach((port) =>
      super.allowInternally(port, description),
    );
  }
  allowDefaultPortTo(
    other: IConnectable,
    description?: string | undefined,
  ): void {
    this.defaultPorts?.forEach((port) =>
      super.allowTo(other, port, description),
    );
  }
}
