import roundWithPrecision from './roundWithPrecision';

test('roundWithPrecision returns expected result', () => {
  expect(roundWithPrecision(1.2345, 1)).toEqual(1.2);
  expect(roundWithPrecision(1.2345, 2)).toEqual(1.23);
  expect(roundWithPrecision(1.2345, 3)).toEqual(1.235);
  expect(roundWithPrecision(12345.6, 0)).toEqual(12346);
  expect(roundWithPrecision(12345, 1)).toEqual(12345.0);
  expect(roundWithPrecision(12345.6789)).toEqual(12346);
  expect(roundWithPrecision(1.2345, 2, 'ceil')).toEqual(1.24);
  expect(roundWithPrecision(1.2345, 3, 'floor')).toEqual(1.234);
  expect(roundWithPrecision()).toEqual(0);
  expect(() => roundWithPrecision(12345, 2, 'foo')).toThrowError();
});
