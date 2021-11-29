import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("urgencies").del();

  // Inserts seed entries
  await knex("urgencies").insert([
    { id: 1, title: "1 to 3 days" },
    { id: 2, title: "3 to 7 days" },
    { id: 3, title: "1 to 2 weeks" },
    { id: 4, title: "2 to 4 weeks" },
    { id: 5, title: "More than weeks" }
  ]);
};
