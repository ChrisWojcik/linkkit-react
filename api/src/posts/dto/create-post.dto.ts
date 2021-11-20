import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  MaxLength,
  IsUrl,
  IsString,
} from 'class-validator';
import { IsMutuallyExclusiveWith } from '../../common/validation/decorators';
import { addProtocolIfMissing, trim } from '../../common/validation/transforms';

export class CreatePostDto {
  @MaxLength(300)
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => trim(value))
  readonly title!: string;

  @MaxLength(10000)
  @IsString()
  @IsMutuallyExclusiveWith(['sharedLink'])
  @IsOptional()
  readonly text: string;

  @MaxLength(2048)
  @IsUrl({ protocols: ['http', 'https'] })
  @IsMutuallyExclusiveWith(['text'])
  @IsOptional()
  @Transform(({ value }) => addProtocolIfMissing(value))
  readonly sharedLink: string;
}
