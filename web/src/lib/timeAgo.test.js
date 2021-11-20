/**
 * @jest-environment jsdom
 */

import timeAgo from './timeAgo';

test('timeAgo returns the expected result', () => {
  jest.useFakeTimers('modern');
  jest.setSystemTime(new Date('2021-02-01T00:00:00Z'));

  expect(timeAgo('2021-02-01T00:00:00Z')).toEqual('just now');
  expect(timeAgo('2021-01-31T23:59:59Z')).toEqual('1s');
  expect(timeAgo('2021-01-31T23:59:01Z')).toEqual('59s');
  expect(timeAgo('2021-01-31T23:59:00Z')).toEqual('1m');
  expect(timeAgo('2021-01-31T23:57:59Z')).toEqual('2m');
  expect(timeAgo('2021-01-31T23:01:00Z')).toEqual('59m');
  expect(timeAgo('2021-01-31T23:00:00Z')).toEqual('1h');
  expect(timeAgo('2021-01-31T00:00:00Z')).toEqual('24h');
  expect(timeAgo('2021-01-30T04:59:59Z')).toEqual('Jan 30');
  expect(timeAgo('2020-12-31T04:59:59Z')).toEqual('Dec 31, 2020');
  expect(timeAgo()).toEqual(undefined);
  expect(timeAgo(null)).toEqual(undefined);
  expect(timeAgo('')).toEqual(undefined);

  jest.useRealTimers();
});
