import { IsInt, Min } from 'class-validator';

export class AddProductToBasketDto {
  @IsInt()
  productId: number;

  @IsInt()
  @Min(1)
  amount: number;
}
