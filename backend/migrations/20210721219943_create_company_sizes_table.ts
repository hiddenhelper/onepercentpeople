import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('company_sizes', function (table) {
      table.increments('id');
      table.string('title', 255).notNullable();
      table.text('description').nullable();

      table.dateTime('created_at').defaultTo(knex.fn.now());
      table.dateTime('updated_at');
      table.dateTime('deleted_at');
    });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('company_sizes');
}
