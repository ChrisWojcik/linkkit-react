import { IsDbId } from '../../common/validation/decorators';

export class ListPostsCursorDto {
  @IsDbId()
  readonly id: string;
}
