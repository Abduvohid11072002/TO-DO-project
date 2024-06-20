import express from "express";
import { connectDatabase, connectMongoDB } from "./config/database.js";
import mainRoute from "./routes/index.routes.js";
import { createTables } from "./models/postgres.tables.js";
import { logMiddleware } from "./middlewares/logs.middleware.js";
import { logger } from "./utils/logger.js";

export const app = express();
connectDatabase();
createTables();
connectMongoDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logMiddleware);

app.use("/", mainRoute);

process.on("unhandledRejection", (reason, promise) => {
  logger.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
  console.error(reason);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  logger.error(`Uncaught Exception thrown: ${err.message}`);
  console.error(err);
  process.exit(1);
});

/*
CREATE EXTENSION IF NOT EXISTS "uuid-ossp"
*/
