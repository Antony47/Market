import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nest-knexjs';
import { Knex } from 'knex';
import { OrdersService } from '../orders/orders.service';
import { AddProductToBasketDto } from './dto/add-product-to-basket.dto';
import { ProductsService } from '../products/products.service';
import { OrderType } from '../../entity/enum/order-type';

@Injectable()
export class BasketService {
  constructor(
    @InjectModel() private readonly knex: Knex,
    private readonly ordersService: OrdersService,
    private readonly productsService: ProductsService,
  ) {}

  async create(userId: number) {
    await this.ordersService.create(userId, OrderType.BASKET);
  }

  async addProduct(userId: number, dto: AddProductToBasketDto) {
    const product = await this.productsService.getOne(dto.productId);
    const basket = await this.knex.table('orders').where({
      user_id: userId,
      status: OrderType.BASKET,
    });
    debugger;
    if (!basket.length) await this.create(userId);

    await this.knex.table('order-products').insert({
      product_id: dto.productId,
      user_id: userId,
      order_id: basket[0].id,
      amount: dto.amount,
      product_name: product.name,
    });
  }

  async getMyBasket(userId: number) {
    const basketProducts = await this.knex
      .select('*')
      .from('orders')
      .leftJoin('order-products', function () {
        this.on('orders.id', '=', 'order-products.order_id');
      })
      .where({
        'order-products.user_id': userId,
        status: OrderType.BASKET,
      });
    return basketProducts;
  }

  async deleteProduct(userId: number, id: number) {
    const basketProduct = await this.knex.table('order-products').where({
      id,
      user_id: userId,
    });
    if (!basketProduct.length)
      throw new NotFoundException(
        'This product is not in the basket or its not you product',
      );

    await this.knex.table('order-products').where({ id }).del();
  }
}
