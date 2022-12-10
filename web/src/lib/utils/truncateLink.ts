export function truncateLink(href = '', maxLength = 20) {
  const withoutProtocol = href.replace(/^https?:\/\//, '');

  if (maxLength <= 3) {
    return withoutProtocol.substr(0, maxLength);
  } else if (withoutProtocol.length > maxLength) {
    return withoutProtocol.substr(0, maxLength - 3) + '...';
  } else {
    return withoutProtocol;
  }
}
