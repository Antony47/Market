import { Module } from '@nestjs/common';
import { BasketController } from './basket.controller';
import { BasketService } from './basket.service';
import { OrdersService } from '../orders/orders.service';
import { ProductsService } from '../products/products.service';

@Module({
  imports: [],
  controllers: [BasketController],
  providers: [BasketService, OrdersService, ProductsService],
})
export class BasketModule {}
