import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', function (table) {
    table.increments('id').primary();
    table.string('email', 50).notNullable();
    table.string('password', 255).notNullable();
    table.string('name', 50);
    table.string('info', 90);
    table.integer('age');
    table.timestamps();
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable('users');
}

