import { IsString, Length, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @Length(0, 30)
  name: string;

  @IsString()
  @Length(0, 90)
  info: string;

  @Min(0.1)
  price: number;
}
