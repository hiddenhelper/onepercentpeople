import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('users', function (table) {
      table.increments('id');
      table.string('firebase_uid', 255).notNullable().unique();
      table.string('first_name', 255).nullable();
      table.string('last_name', 255).nullable();
      table.string('email', 255).notNullable().unique();
      table.string('phone', 20).nullable();
      table.integer('account_type', 2).defaultTo(1).notNullable().comment('1 talent, 2 employer');


      table.dateTime('created_at').defaultTo(knex.fn.now());
      table.dateTime('updated_at');
      table.dateTime('deleted_at');
    });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users')
}

