import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from 'nest-knexjs';
import { Knex } from 'knex';
import { OrderType } from '../../entity/enum/order-type';

@Injectable()
export class OrdersService {
  constructor(@InjectModel() private readonly knex: Knex) {}

  async create(user_id: number, status: string) {
    const existedOrder = await this.knex.table('orders').where({
      user_id,
      status: OrderType.BASKET,
    });

    if (existedOrder.length)
      throw new BadRequestException('Basket already exists');
    await this.knex.table('orders').insert({
      user_id,
      status,
    });
  }

  async getAll(userId: number) {
    const orders = await this.knex
      .select('*')
      .from('orders')
      .leftJoin('order-products', function () {
        this.on('orders.id', '=', 'order-products.order_id');
      })
      .where({ 'orders.user_id': userId });

    return orders;
  }

  async getOne(userId: number, id: number) {
    const order = await this.knex.table('orders').where({ id });
    if (!order.length) throw new NotFoundException('Order not found');
    if (order[0].user_id !== userId) throw new ForbiddenException();

    return order;
  }

  async update(userId: number, id: number, status: OrderType) {
    await this.getOne(userId, id);

    return this.knex.table('orders').where({ id }).update({
      status,
    });
  }

  async delete(userId: number, id: number) {
    await this.getOne(userId, id);

    await this.knex.table('orders').where({ id }).del();
  }
}
