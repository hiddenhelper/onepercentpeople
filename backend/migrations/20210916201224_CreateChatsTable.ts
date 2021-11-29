import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('chats', function (table) {
      table.increments('id');
      table.integer('employer_user_id').unsigned();
      table.foreign('employer_user_id').references('users.id');
      table.integer('talent_user_id').unsigned();
      table.foreign('talent_user_id').references('users.id');

      table.dateTime('created_at').defaultTo(knex.fn.now());
      table.dateTime('updated_at');
      table.dateTime('deleted_at');
    });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('chats');
}

