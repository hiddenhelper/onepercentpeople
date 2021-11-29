import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('job_responses', function (table) {
      table.increments('id');
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('users.id');
      table.integer('job_id').unsigned();
      table.foreign('job_id').references('jobs.id');
      table.text('cover_letter').nullable();
      table.integer('employer_review_status').defaultTo(0).comment('0: not review, 1: interested, 2: rejected');
      table.dateTime('created_at').defaultTo(knex.fn.now());
      table.dateTime('updated_at');
      table.dateTime('deleted_at');
    });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('job_responses');
}

