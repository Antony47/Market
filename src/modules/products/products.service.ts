import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nest-knexjs';
import { Knex } from 'knex';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(@InjectModel() private readonly knex: Knex) {}

  async create(dto: CreateProductDto) {
    await this.knex.table('products').insert({
      name: dto.name,
      info: dto.info,
      price: dto.price,
    });
    return 'Product created';
  }

  async getMany(offset: number, limit: number, search?: string) {
    const products = await this.knex
      .table('products')
      .whereILike('name', this.knex.raw('?', `%${search}%`))
      .offset(offset)
      .limit(limit);
    const total = await this.knex
      .table('products')
      .whereILike('name', this.knex.raw('?', `%${search}%`))
      .offset(offset)
      .limit(limit)
      .count();

    return { products, total };
  }

  async getOne(id: number) {
    const product = await this.knex.table('products').where({ id });
    if (!product.length) throw new NotFoundException('Product not found');

    return product[0];
  }

  async update(id: number, dto: UpdateProductDto) {
    await this.getOne(id);

    return this.knex.table('products').where('id', id).update({
      name: dto.name,
      info: dto.info,
      price: dto.price,
    });
  }

  async delete(id: number) {
    await this.knex.table('products').where('id', id).del();
  }
}
