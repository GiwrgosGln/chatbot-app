import { Pool, PoolClient } from "pg";
import dotenv from "dotenv";

dotenv.config();

const config = {
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
  max: 10,
  min: 0,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 15000,
};

let pool: Pool | null = null;

export const connectDB = async (): Promise<Pool> => {
  try {
    if (pool) {
      return pool;
    }

    console.log("🔄 Connecting to PostgreSQL...");
    pool = new Pool(config);

    // Test the connection
    const client = await pool.connect();
    await client.query("SELECT 1");
    client.release();

    console.log("✅ Connected to PostgreSQL successfully!");
    return pool;
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    throw error;
  }
};

export const getPool = (): Pool => {
  if (!pool) {
    throw new Error("Database pool not initialized. Call connectDB() first.");
  }
  return pool;
};

export const closeDB = async (): Promise<void> => {
  try {
    if (pool) {
      await pool.end();
      pool = null;
      console.log("✅ Database connection closed");
    }
  } catch (error) {
    console.error("❌ Error closing database connection:", error);
    throw error;
  }
};

export default { connectDB, getPool, closeDB };
