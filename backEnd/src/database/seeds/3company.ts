import { Knex } from "knex";

const TABLE_NAME = "company";

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
          name: "Leapfrog",
          description:
            "Leapfrog is a global technology services company. Leapfrog helps create better digital products with extraordinary engineers and emerging technologies like AI, data and the cloud",
          logo_url: "www.cloudfare.com/image1",
          website: "www.lftechnology.com",
          user_id: "2",
        },
      ]);
    });
}
