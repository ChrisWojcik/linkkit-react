import { IsSerialDbId } from '@/api/common/validation/decorators';

export class PostsListCursor {
  @IsSerialDbId()
  readonly id: string;
}
