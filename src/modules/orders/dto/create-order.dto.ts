import { IsString, IsEnum } from 'class-validator';
import { OrderType } from '../../../entity/enum/order-type';

export class CreateOrderDto {
  @IsString()
  @IsEnum(OrderType)
  status: OrderType;
}
