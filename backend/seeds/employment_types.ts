import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("employment_types").del();

  // Inserts seed entries
  await knex("employment_types").insert([
    { id: 1, title: "Full-time" },
    { id: 2, title: "Part-time" },
    { id: 3, title: "Hourly" },
    { id: 4, title: "Either full-time or part-time" }
  ]);
};
