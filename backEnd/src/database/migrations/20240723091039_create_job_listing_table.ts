import { Knex } from "knex";

const TABLE_NAME = "job_listings";

/**
 * Create table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.bigIncrements();

    table.string("title", 100).notNullable();

    table.string("description", 1000).notNullable();

    table.string("requirements", 1000).notNullable();

    table.string("location", 100).notNullable();

    table.string("salary_min", 100).notNullable();

    table.string("salary_max", 100).notNullable();

    table.date("post_date").notNullable();

    table.date("expiry_date").notNullable();

    table.string("openings", 100).notNullable();

    table.string("experience").notNullable();

    table.string("level").notNullable();

    table.string("type", 100).notNullable();

    table
      .bigInteger("company_id")
      .unsigned()
      .nullable()
      .references("id")
      .inTable("company");

    table
      .bigInteger("category_id")
      .unsigned()
      .nullable()
      .references("id")
      .inTable("jobCategories");

    table
      .bigInteger("created_by")
      .unsigned()
      .nullable()
      .references("id")
      .inTable("users");

    table.timestamp("created_at").notNullable().defaultTo(knex.raw("now()"));

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
