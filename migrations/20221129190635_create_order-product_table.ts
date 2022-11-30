import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('order-products', function (table) {
    table.increments('id').primary();
    table.integer('user_id');
    table.integer('order_id');
    table.integer('product_id');
    table.string('product_name');
    table.double('amount');
    table.double('price');
    table.timestamps();

    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.foreign('order_id').references('id').inTable('orders').onDelete('CASCADE');
    table.foreign('product_id').references('id').inTable('products').onDelete('SET NULL');
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable('order-products');
}

