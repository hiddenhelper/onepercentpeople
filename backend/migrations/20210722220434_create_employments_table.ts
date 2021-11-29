import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('employments', function (table) {
      table.increments('id');
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('users.id');
      table.integer('company_id').unsigned();
      table.foreign('company_id').references('companies.id');
      table.integer('job_id').unsigned();
      table.foreign('job_id').references('jobs.id');
      table.string('payment_schedule', 255);
      table.decimal('rate_amount', 13, 2);
      table.string('rate_period', 255);

      table.dateTime('created_at').defaultTo(knex.fn.now());
      table.dateTime('updated_at');
      table.dateTime('deleted_at');
    });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('employments');
}
