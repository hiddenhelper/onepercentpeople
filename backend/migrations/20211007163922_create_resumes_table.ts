import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('resumes', function (table) {
      table.increments('id');
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('users.id');

      table.string('url', 255).notNullable();
      table.string('file_name', 255).notNullable();
      table.string('file_type', 255).notNullable();
      table.string('title', 255).nullable();

      table.dateTime('created_at').defaultTo(knex.fn.now());
      table.dateTime('updated_at');
      table.dateTime('deleted_at');
    });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('resumes');
}

