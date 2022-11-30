import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  info?: string;

  @IsOptional()
  @IsInt()
  @Min(14)
  @Max(101)
  age?: number;
}
