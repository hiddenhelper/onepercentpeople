import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("roles").del();

  // Inserts seed entries
  await knex("roles").insert([
    { title: "Accounting" },
    { title: "Client Success" },
    { title: "Recruiters" },
    { title: "Back Office" },
    { title: "Marketing" },
    { title: "Sales" },
  ]);
};
