import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table('users', function (table) {
    table.dateTime('finished_onboarding_at').nullable().after('account_type');
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.table('users', function (table) {
    table.dropColumn('finished_onboarding_at');
  });
}

