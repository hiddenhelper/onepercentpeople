import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.table('users', function (table) {
    table.integer('country_id').unsigned().after('phone');
    table.foreign('country_id').references('countries.id');
    table.string('city', 255).nullable().after('country_id');
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.table('users', function (table) {
    table.dropColumn('country_id');
    table.dropColumn('city');
  });
}

