import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('salaries', function (table) {
      table.increments('id');
      table.string('period', 10).notNullable().comment('Salary billing period. hour, month, year');
      table.decimal('min', 15, 6).notNullable();
      table.decimal('max', 15, 6).notNullable();
      table.integer('currency_id').unsigned();
      table.foreign('currency_id').references('currencies.id');
    });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('salaries');
}

