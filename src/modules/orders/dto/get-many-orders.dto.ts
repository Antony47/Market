import { IsInt, IsOptional, IsString } from 'class-validator';

export class GetManyOrdersDto {
  @IsInt()
  offset: number;

  @IsInt()
  limit: number;

  @IsOptional()
  @IsString()
  search?: string;
}
