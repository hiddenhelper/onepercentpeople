import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('talent_profile_roles', function (table) {
      table.increments('id');
      table.integer('talent_profile_id').unsigned();
      table.foreign('talent_profile_id').references('talent_profiles.id');
      table.integer('role_id').unsigned();
      table.foreign('role_id').references('roles.id');
    });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('talent_profile_roles');
}

