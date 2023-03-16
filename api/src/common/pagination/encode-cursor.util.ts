import base64url from 'base64url';

export function encodeCursor(value: unknown): string {
  return base64url.encode(JSON.stringify(value));
}
