import express from "express";
import { connectDatabase } from "./config/database.js";
import mainRoute from "./routes/index.routes.js";
import { createTables } from "./models/postgres.tables.js";

export const app = express();
connectDatabase();
createTables();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", mainRoute);

process.on("unhandledRejection", (reason, promise) => {
  console.error(reason);

  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.error(err);

  process.exit(1);
});

/*
CREATE EXTENSION IF NOT EXISTS "uuid-ossp"
*/
