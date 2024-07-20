import { aws_fsx } from 'aws-cdk-lib';

/**
 * Properties required for setting up a weekly maintenance time
 */
export interface MaintenanceTimeProps {
  /**
   * The day of the week for maintenance to be performed.
   */
  readonly day: aws_fsx.Weekday;
  /**
   * The hour of the day (from 0-23) for maintenance to be performed.
   */
  readonly hour: number;
  /**
   * The minute of the hour (from 0-59) for maintenance to be performed.
   */
  readonly minute: number;
}

/**
 * Class for scheduling a weekly maintenance time.
 */
export class MaintenanceTime {
  /**
   * The day of the week for maintenance to be performed.
   */
  private readonly day: aws_fsx.Weekday;
  /**
   * The hour of the day (from 00-23) for maintenance to be performed.
   */
  private readonly hour: string;
  /**
   * The minute of the hour (from 00-59) for maintenance to be performed.
   */
  private readonly minute: string;

  constructor(props: MaintenanceTimeProps) {
    this.validate(props.hour, props.minute);

    this.day = props.day;
    this.hour = this.getTwoDigitString(props.hour);
    this.minute = this.getTwoDigitString(props.minute);
  }
  /**
   * Converts a day, hour, and minute into a timestamp as used by FSx for Lustre's weeklyMaintenanceStartTime field.
   */
  public toTimestamp(): string {
    return `${this.day.valueOf()}:${this.hour}:${this.minute}`;
  }

  /**
   * Pad an integer so that it always contains at least 2 digits. Assumes the number is a positive integer.
   */
  private getTwoDigitString(n: number): string {
    const numberString = n.toString();
    if (numberString.length === 1) {
      return `0${n}`;
    }
    return numberString;
  }

  /**
   * Validation needed for the values of the maintenance time.
   */
  private validate(hour: number, minute: number) {
    if (!Number.isInteger(hour) || hour < 0 || hour > 23) {
      throw new Error('Maintenance time hour must be an integer between 0 and 23');
    }
    if (!Number.isInteger(minute) || minute < 0 || minute > 59) {
      throw new Error('Maintenance time minute must be an integer between 0 and 59');
    }
  }
}