import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('jobs', function (table) {
      table.increments('id');
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('users.id');
      table.integer('company_id').unsigned();
      table.foreign('company_id').references('companies.id');

      table.text('title').notNullable();
      table.integer('role_id').unsigned();
      table.foreign('role_id').references('roles.id');
      table.text('description').notNullable();
      table.integer('num_hires_wanted').notNullable().defaultTo(1);
      table.integer('employment_type_id').unsigned();
      table.foreign('employment_type_id').references('employment_types.id');
      table.integer('urgency_id').unsigned();
      table.foreign('urgency_id').references('urgencies.id');
      table.string('salary_period', 10).notNullable().comment('Salary billing period. hour, month, year');
      table.decimal('min_salary', 15, 6).notNullable();
      table.decimal('max_salary', 15, 6).notNullable();
      table.integer('salary_currency_id').unsigned();
      table.foreign('salary_currency_id').references('currencies.id');

      table.dateTime('posted_at');
      table.dateTime('paused_at');
      table.dateTime('created_at').defaultTo(knex.fn.now());
      table.dateTime('updated_at');
      table.dateTime('deleted_at');
    });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('jobs');
}

