import { IsString, IsInt, IsEnum } from 'class-validator';
import { OrderType } from '../../../entity/enum/order-type';

export class CreateBasketDto {
  @IsInt()
  user_id: number;

  @IsString()
  @IsEnum(OrderType)
  status: string;
}
