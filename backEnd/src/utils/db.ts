import camelize from "camelize";
import toSnakeCase from "to-snake-case";
import { baseKnexConfig } from "../knexfile";

import knex, { Knex } from "knex";

const KnexConfig: Knex.Config = {
  ...baseKnexConfig,
  wrapIdentifier: (value, originalImpl) => {
    if (value == "*") {
      return originalImpl(value);
    }

    return originalImpl(toSnakeCase(value));
  },

  postProcessResponse: (result) => {
    return camelize(result);
  },
};

export default knex(KnexConfig);
