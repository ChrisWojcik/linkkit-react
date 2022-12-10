import { IsOptional, IsBooleanString } from 'class-validator';

export class GetPostQueryParams {
  @IsBooleanString()
  @IsOptional()
  readonly includeComments?: 'true' | 'false';
}
