import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("english_proficiencies").del();

  // Inserts seed entries
  await knex("english_proficiencies").insert([
    { id: 1, title: "Basic" },
    { id: 2, title: "Intermediate" },
    { id: 3, title: "Advanced" },
    { id: 4, title: "Native/Fluent" }
  ]);
};
