import { config } from "dotenv";

config();

const configuration = {
  server: {
    PORT: process.env.PORT,
  },
  database: {
    POSTGRES_URI: process.env.POSTGRES_URI,
  },
  salt: {
    BCRYPT_SALT: process.env.BCRYPT_SALT,
  },
};

export default configuration;
