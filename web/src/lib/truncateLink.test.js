import truncateLink from './truncateLink';

test('truncateLink returns expected result', () => {
  expect(truncateLink('http://example.com/article1')).toEqual(
    'example.com/article1'
  );
  expect(truncateLink('http://example.com/article-longer-title')).toEqual(
    'example.com/artic...'
  );
  expect(truncateLink('example.com/article-longer-title', 5)).toEqual('ex...');
  expect(truncateLink('example.com', 2)).toEqual('ex');
  expect(truncateLink('example.com', 0)).toEqual('');
});
