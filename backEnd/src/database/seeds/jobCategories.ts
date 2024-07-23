import { Knex } from "knex";

const TABLE_NAME = "jobCategories";

/**
 * Delete existing entries and seed values for table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export function seed(knex: Knex): Promise<void> {
  return knex(TABLE_NAME)
    .del()
    .then(() => {
      return knex(TABLE_NAME).insert([
        {
          name: "IT & Software",
        },
        {
          name: "Technology",
        },
        {
          name: "Government",
        },
        {
          name: "Accounting / Finanace",
        },
        {
          name: "Construction",
        },
        {
          name: "Tele-communications",
        },
        {
          name: "Design & Multimedia",
        },
        {
          name: "Human Resource",
        },
      ]);
    });
}
