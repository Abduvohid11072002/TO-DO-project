import pkg from "pg";
import configuration from "./configuration.js";
const { Pool } = pkg;

const { POSTGRES_URI } = configuration.database;

const pool = new Pool({
  connectionString: POSTGRES_URI,
  // max: 20, // Bir vaqtni o'zida 20 ta foydalanuvchi foydalanishi mumkin
  // idleTimeoutMillis: 600000, // Klient database dan 120 sekund ichida ma'lumot olmasa yozmasa database yopiladi
  // connectionTimeoutMillis: 3000, // Agar 3 sekundda databasega ulanmasa xatolik beradi
});

export const connectDatabase = async () => {
  try {
    const client = await pool.connect(); // database ga ulangan klientni olish

    console.log(`Postgres connected on host : ${client.host}`); // Ulanish hostini (manzilini) konsolga chiqarish

    client.release(); // Bu ulanish band bo'lib qolishini oldini oladi
  } catch (err) {
    console.error(err);

    process.exit(1);
  }
};

export default pool;
