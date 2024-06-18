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
  nodemailer: {
    NODEMAILER_PORT: process.env.NODEMAILER_PORT,
    NODEMAILER_EMAIL: process.env.NODEMAILER_EMAIL,
    NODEMAILER_PASS: process.env.NODEMAILER_PASS,
  },
  token: {
    ACCESS_TOKEN_KEY: process.env.ACCESS_TOKEN_KEY,
    ACCESS_TOKEN_TIME: process.env.ACCESS_TOKEN_TIME,
    REFRESH_TOKEN_KEY: process.env.REFRESH_TOKEN_KEY,
    REFRESH_TOKEN_TIME: process.env.REFRESH_TOKEN_TIME,
  },
};

export default configuration;
