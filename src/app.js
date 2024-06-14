import express from "express";
import { connectDatabase } from "./config/database.js";
// import mainRoute from "./routes/index.routes.js";
import { createTables } from "./models/postgres.tables.js";

export const app = express();
connectDatabase();
createTables();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use("/", mainRoute);

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
/auth/signup                    /post
/auth/verify-otp                /post
/auth/signin                    /post
/auth/me                        /get
/auth/logout                    /get
/auth/refresh-token             /post

/tasks                          /post
/tasks                          /get
/tasks/id                       /get
/tasks/id                       /put
/tasks/id                       /delet

/lists                          /post
/lists                          /get
/lists/id                       /get
/lists/id                       /put
/lists/id                       /delet

/tags                           /post
/tags                           /get
/tags/id                        /get
/tags/id                        /put
/tags/id                        /delet

/priorities                     /post
/priorities                     /get
/priorities/id                  /get
/priorities/id                  /put
/priorities/id                  /delet


-- Create the function
CREATE OR REPLACE FUNCTION update_timestamps()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        NEW."createdAt" = NOW();
        NEW."updatedAt" = NOW();
    ELSIF TG_OP = 'UPDATE' THEN
        NEW."updatedAt" = NOW();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the tables
CREATE TABLE table1 (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE table2 (
    id SERIAL PRIMARY KEY,
    description TEXT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE table3 (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the triggers
CREATE TRIGGER set_timestamps_table1
BEFORE INSERT OR UPDATE ON table1
FOR EACH ROW
EXECUTE FUNCTION update_timestamps();

CREATE TRIGGER set_timestamps_table2
BEFORE INSERT OR UPDATE ON table2
FOR EACH ROW
EXECUTE FUNCTION update_timestamps();

CREATE TRIGGER set_timestamps_table3
BEFORE INSERT OR UPDATE ON table3
FOR EACH ROW
EXECUTE FUNCTION update_timestamps();
*/
