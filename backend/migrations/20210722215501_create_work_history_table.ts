import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('work_history', function (table) {
      table.increments('id');
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('users.id');
      table.string('job_title', 255).nullable();
      table.string('company', 255).nullable();
      table.integer('country_id').unsigned();
      table.foreign('country_id').references('countries.id');
      table.string('city', 255).nullable();
      table.integer('from_month').nullable();
      table.integer('from_year').nullable();
      table.integer('to_month').nullable();
      table.integer('to_year').nullable();
      table.integer('current_employment').notNullable().defaultTo(0);
      table.text('description').nullable();

      table.dateTime('created_at').defaultTo(knex.fn.now());
      table.dateTime('updated_at');
      table.dateTime('deleted_at');
    });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('work_history');
}
