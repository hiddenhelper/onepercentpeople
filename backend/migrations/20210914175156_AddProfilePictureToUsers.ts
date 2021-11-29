import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.table('users', function (table) {
    table.string('profile_photo_url', 255).nullable().after('city');
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.table('users', function (table) {
    table.dropColumn('profile_photo_url');
  });
}

