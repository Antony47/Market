import type { Knex } from "knex";

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'postgres',
    connection: {
      host: 'localhost',
      user: 'postgres',
      port: 5432,
      password: 'admin',
      database: 'market'
    },
    migrations: {
      tableName: "knex_migrations"
    },
    seeds: {
      directory: "src/seeds",
    },
    useNullAsDefault: true
  },
};

module.exports = config;
