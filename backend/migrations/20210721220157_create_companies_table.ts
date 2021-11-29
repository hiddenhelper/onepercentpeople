import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('companies', function (table) {
      table.increments('id');
      table.string('name', 255).notNullable;
      table.text('description').nullable();
      table.string('url', 255).nullable();
      table.integer('company_size_id').nullable().unsigned();
      table.foreign('company_size_id').references('company_sizes.id');
      table.string('industry', 255).nullable();
      table.string('phone', 20).nullable();
      table.string('logo_url', 255).nullable();

      table.dateTime('created_at').defaultTo(knex.fn.now());
      table.dateTime('updated_at');
      table.dateTime('deleted_at');
    });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('companies');
}
