import { strictEqual } from 'assert';
import { DailySnapshotTime } from '../../src/aws-elasticache';

test.each([
  [0, 0, '00:00'],
  [0, 0, '00:00'],
  [23, 0, '23:00'],
  [0, 59, '00:59'],
])('valid daily snapshot time %s:%d:%d returns %s', (hour: number, minute: number, expected: string) => {
  strictEqual(new DailySnapshotTime({ hour, minute }).toTimestamp(), expected);
});

test.each([
  [-1, 0],
  [24, 0],
  [1.2, 0],
])('invalid daily snapshot time hour %s:%d:%d', (hour: number, minute: number) => {
  expect(() => {
    new DailySnapshotTime({ hour, minute });
  }).toThrow(`dailySnapshotTime hour must be an integer between 0 and 24. received: ${hour}`);
});

test.each([
  [0, -1],
  [0, 60],
  [0, 1.2],
])('invalid daily snapshot time minute %s:%d:%d', (hour: number, minute: number) => {
  expect(() => {
    new DailySnapshotTime({ hour, minute });
  }).toThrow(`dailySnapshotTime minute must be an integer between 0 and 59. received: ${minute}`);
});
