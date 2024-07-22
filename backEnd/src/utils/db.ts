import knexConfig, { baseKnexConfig } from "../knexfile";
import toSnakeCase from "to-snake-case";
import camelize from "camelize";

import knex, { Knex } from "knex";

const KnexConfig: Knex.Config = {
  ...baseKnexConfig,
  wrapIdentifier: (value, originalImpl) => {
    if (value == "*") {
      return originalImpl(value);
    }
    if (value == "userId") {
      return originalImpl(value);
    }

    return originalImpl(toSnakeCase(value));
  },

  postProcessResponse: (result) => {
    return camelize(result);
  },
};

export default knex(KnexConfig);
