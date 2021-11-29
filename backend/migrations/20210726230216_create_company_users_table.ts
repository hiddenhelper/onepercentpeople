import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('company_users', function (table) {
      table.increments('id');
      table.integer('user_id').notNullable().unsigned();
      table.foreign('user_id').references('users.id');
      table.integer('company_id').notNullable().unsigned();
      table.foreign('company_id').references('companies.id');

      table.text('job_title').nullable();

      table.dateTime('created_at').defaultTo(knex.fn.now());
      table.dateTime('updated_at');
      table.dateTime('deleted_at');
    });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('company_users');
}

