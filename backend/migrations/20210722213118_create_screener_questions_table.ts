import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('screener_questions', function (table) {
      table.increments('id');
      table.integer('job_id').unsigned();
      table.foreign('job_id').references('jobs.id');
      table.text('question').notNullable();

      table.dateTime('created_at').defaultTo(knex.fn.now());
      table.dateTime('updated_at');
      table.dateTime('deleted_at');
    });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('screener_questions');
}

