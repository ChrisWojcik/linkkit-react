import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { IsDbId } from '../../common/validation/decorators';

export class AddCommentDto {
  @IsDbId()
  @IsNotEmpty()
  readonly postId!: string;

  @IsDbId()
  @IsOptional()
  readonly parentId: string;

  @MaxLength(10000)
  @IsString()
  @IsNotEmpty()
  readonly text!: string;
}
