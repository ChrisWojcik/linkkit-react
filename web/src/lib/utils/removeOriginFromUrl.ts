export function removeOriginFromUrl(url: string): string {
  if (/^https?:\/\//.test(url)) {
    const { pathname, search, hash } = new URL(url);

    return `${pathname}${search}${hash}`;
  }

  return url;
}
