import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('countries', function (table) {
      table.increments('id');
      table.string('name', 255).notNullable();
      table.string('name_in_origin_language', 255).nullable();
      table.string('iso_code_2', 2).notNullable();
      table.string('iso_code_3', 3).notNullable();

      table.dateTime('created_at').defaultTo(knex.fn.now());
      table.dateTime('updated_at');
      table.dateTime('deleted_at');
    });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('countries');
}
