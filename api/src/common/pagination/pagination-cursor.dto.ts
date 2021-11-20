import { PaginationCursorService } from './pagination-cursor.service';

export class PaginationCursor<T> {
  private readonly value: T;

  constructor(value: T) {
    this.value = value;
  }

  public toJSON() {
    return PaginationCursorService.encode(this.value);
  }
}
