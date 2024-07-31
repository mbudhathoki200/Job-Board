import { Knex } from "knex";

const TABLE_NAME = "job_applications";

/**
 * Create table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.bigIncrements();

    table
      .bigInteger("job_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("job_listings");

    table
      .bigInteger("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users");

    table
      .bigInteger("recruiter_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users");

    table.string("resume_url", 1000).notNullable();

    table.string("status", 100).notNullable().defaultTo("submitted");

    table.timestamp("applied_date").notNullable().defaultTo(knex.raw("now()"));

    table
      .bigInteger("created_by")
      .unsigned()
      .nullable()
      .references("id")
      .inTable(TABLE_NAME);

    table.timestamp("updated_at").nullable();

    table
      .bigInteger("updated_by")
      .unsigned()
      .references("id")
      .inTable("users")
      .nullable();
  });
}

/**
 * Drop table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
