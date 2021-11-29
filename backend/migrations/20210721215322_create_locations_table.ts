import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('locations', function (table) {
      table.increments('id');
      table.string('city', 255).nullable();
      table.integer('country_id').unsigned();
      table.foreign('country_id').references('countries.id');

      table.dateTime('created_at').defaultTo(knex.fn.now());
      table.dateTime('updated_at');
      table.dateTime('deleted_at');
    });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('locations');
}
