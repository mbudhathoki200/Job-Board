import dotenv from "dotenv";

dotenv.config({ path: __dirname + "/../.env" });

const config = {
  PORT: process.env.PORT,
  database: {
    client: process.env.DB_CLIENT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    name: process.env.DB_NAME,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    accessTokenExpiryMS: 3000,
    refreshTokenExpiryMS: 30000,
  },
};

export default config;
