import pool from "../config/database.js";

export const createTables = async () => {
  try {
    const tables = [
      `
      CREATE TABLE IF NOT EXISTS users (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          email VARCHAR(255) UNIQUE NOT NULL,
          username VARCHAR(100) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          role VARCHAR(20) NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin', 'moderator')),
          status VARCHAR(20) NOT NULL DEFAULT 'inactive' CHECK (status IN ('active', 'inactive')),
          createdAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
          updatedAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS otps(
          id VARCHAR(300) NOT NULL PRIMARY KEY,
          otp VARCHAR(10) NOT NULL
      )`,
      `
      CREATE TABLE IF NOT EXISTS lists (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          title VARCHAR(100) NOT NULL,
          description TEXT NOT NULL,
          ownerId UUID NOT NULL,
          createdAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
          updatedAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (ownerId) REFERENCES users(id) ON DELETE CASCADE ON UPDATE NO ACTION
      )`,
      `
      CREATE TABLE IF NOT EXISTS tags (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          name VARCHAR(100) NOT NULL,
          createdAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
          updatedAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      )`,
      `
      CREATE TABLE IF NOT EXISTS priority (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          name VARCHAR(100) NOT NULL,
          level INT NOT NULL DEFAULT 3 CHECK (level IN (1, 2, 3)),
          createdAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
          updatedAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      )`,
      `
      CREATE TABLE IF NOT EXISTS refresh_token (
          username VARCHAR(100) NOT NULL PRIMARY KEY,
          refresh TEXT NOT NULL
      )`,
      `
      CREATE TABLE IF NOT EXISTS tasks (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          title VARCHAR(100) NOT NULL,
          description TEXT NOT NULL,
          listId UUID NOT NULL,
          priorityId UUID NOT NULL,
          dueDate DATE NOT NULL,
          status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
          createdAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
          updatedAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (listId) REFERENCES lists(id) ON DELETE CASCADE ON UPDATE NO ACTION,
          FOREIGN KEY (priorityId) REFERENCES priority(id) ON DELETE CASCADE ON UPDATE NO ACTION
      )`,
    ];

    for (let table of tables) {
      await pool.query(table);
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
