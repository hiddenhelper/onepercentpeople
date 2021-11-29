import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('talent_profiles', function (table) {
      table.increments('id');
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('users.id');
      table.text('bio').nullable();
      table.integer('english_proficiency_id').nullable().unsigned();
      table.foreign('english_proficiency_id').references('english_proficiencies.id');
      table.integer('employment_type_preference_id').nullable().unsigned();
      table.foreign('employment_type_preference_id').references('employment_types.id');
      table.string('reason_for_applying', 255).nullable();

      table.integer('expected_salary_id').nullable().unsigned();
      table.foreign('expected_salary_id').references('salaries.id');

      table.integer('location_id').nullable().unsigned();
      table.foreign('location_id').references('locations.id');

      table.dateTime('created_at').defaultTo(knex.fn.now());
      table.dateTime('updated_at');
      table.dateTime('deleted_at');
    });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('talent_profiles');
}
