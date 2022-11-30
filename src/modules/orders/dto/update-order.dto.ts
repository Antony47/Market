import { IsEnum, IsString } from 'class-validator';
import { OrderType } from '../../../entity/enum/order-type';

export class UpdateOrderDto {
  @IsString()
  @IsEnum(OrderType)
  status: OrderType;
}
