import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('orders', function (table) {
    table.increments('id').primary();
    table.integer('user_id');
    table.string('status');

    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable('orders');
}

