import { baseKnexConfig } from "../knexfile";
import toSnakeCase from "to-snake-case";
import camelize from "camelize";

import knex, { Knex } from "knex";

const knexConfig: Knex.Config = {
  ...baseKnexConfig,
  wrapIdentifier: (value, originalImpl) => {
    if (value == "*") {
      return originalImpl(value);
    }
    if (value == "jobCategories") {
      return originalImpl(value);
    }

    return originalImpl(toSnakeCase(value));
  },

  postProcessResponse: (result) => {
    return camelize(result);
  },
};

export default knex(knexConfig);
