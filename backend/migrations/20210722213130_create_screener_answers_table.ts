import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('screener_answers', function (table) {
      table.increments('id');
      table.integer('screener_question_id').unsigned();
      table.foreign('screener_question_id').references('screener_questions.id');
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('users.id');
      table.integer('job_response_id').unsigned();
      table.foreign('job_response_id').references('job_responses.id');


      table.dateTime('created_at').defaultTo(knex.fn.now());
      table.dateTime('updated_at');
      table.dateTime('deleted_at');
    });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('screener_answers');
}
