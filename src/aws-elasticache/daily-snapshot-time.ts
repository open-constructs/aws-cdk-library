/**
 * Properties required for setting up a daily snapshot time.
 */
export interface DailySnapshotTimeProps {
  /**
   * The hour of the day (from 0-23) for snapshot starts.
   */
  readonly hour: number;
  /**
   * The minute of the hour (from 0-59) for snapshot starts.
   */
  readonly minute: number;
}

/**
 * Class for scheduling a daily snapshot time.
 */
export class DailySnapshotTime {
  /**
   * The start hour of the snapshot time in Coordinated Universal Time (UTC), using 24-hour time.
   * For example, 17 refers to 5:00 P.M. UTC.
   *
   * @default - 22
   */
  private readonly hour: string;
  /**
   * The start minute of the snapshot time, in UTC.
   *
   * @default - 0
   */
  private readonly minute: string;

  constructor(props: DailySnapshotTimeProps) {
    this.validate(props.hour, props.minute);

    this.hour = this.getTwoDigitString(props.hour);
    this.minute = this.getTwoDigitString(props.minute);
  }
  /**
   * Converts an hour, and minute into HH:MM string.
   */
  public toTimestamp(): string {
    return `${this.hour}:${this.minute}`;
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
   * Validation needed for the values of the daily snapshot time.
   */
  private validate(hour: number, minute: number) {
    if (!Number.isInteger(hour) || hour < 0 || hour > 23) {
      throw new Error(`dailySnapshotTime hour must be an integer between 0 and 24. received: ${hour}`);
    }
    if (!Number.isInteger(minute) || minute < 0 || minute > 59) {
      throw new Error(`dailySnapshotTime minute must be an integer between 0 and 59. received: ${minute}`);
    }
  }
}
