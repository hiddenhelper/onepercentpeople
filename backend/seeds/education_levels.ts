import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("education_levels").del();

  // Inserts seed entries
  await knex("education_levels").insert([
    { title: "High School" },
    { title: "Bachelors" },
    { title: "Masters" },
    { title: "PhD" },
  ]);
};
