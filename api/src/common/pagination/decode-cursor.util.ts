import base64url from 'base64url';

export function decodeCursor(string: string): unknown {
  return JSON.parse(base64url.decode(string));
}
