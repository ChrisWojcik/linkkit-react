import { PaginationCursor } from './pagination-cursor';

type WithModelList<K extends string, Model> = {
  [k in K]: Model[];
};

type WithNextCursor<CursorType> = {
  nextCursor: PaginationCursor<CursorType> | null;
};

/**
 * { [K]: Model[], nextCursor: CursorType }
 */
export type PaginatedModel<K extends string, Model, CursorType> = WithModelList<
  K,
  Model
> &
  WithNextCursor<CursorType>;
