import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { IsSerialDbId } from '@/api/common/validation/decorators';

export class AddCommentDto {
  @MaxLength(10000)
  @IsString()
  @IsNotEmpty()
  readonly text!: string;

  @IsSerialDbId()
  @IsNotEmpty()
  readonly postId!: number;

  @IsSerialDbId()
  @IsOptional()
  readonly parentId: number | null;
}
