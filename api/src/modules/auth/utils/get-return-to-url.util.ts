export function getReturnToUrl(url: any): string {
  try {
    const returnTo = String(url);
    const { host, protocol } = new URL(returnTo);

    if (`${protocol}//${host}` === process.env.BASE_URL) {
      return returnTo;
    } else {
      return '/';
    }
  } catch (err) {
    return '/';
  }
}
