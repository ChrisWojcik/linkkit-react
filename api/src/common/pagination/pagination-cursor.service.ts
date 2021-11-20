import base64url from 'base64url';

export class PaginationCursorService {
  public static decode(value: string): unknown {
    return JSON.parse(base64url.decode(value));
  }

  public static encode(cursor: unknown): string {
    return base64url.encode(JSON.stringify(cursor));
  }
}
