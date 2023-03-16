import { encodeCursor } from './encode-cursor.util';

export class PaginationCursor<T> {
  private readonly value: T;

  constructor(value: T) {
    this.value = value;
  }

  public toJSON() {
    return encodeCursor(this.value);
  }
}
