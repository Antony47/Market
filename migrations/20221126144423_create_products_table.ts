import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('products', function (table) {
    table.increments('id').primary();
    table.string('name', 30).notNullable();
    table.string('info', 90);
    table.double('price');
    table.timestamps();
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable('products');
}

