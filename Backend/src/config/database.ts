import { Pool } from "pg";

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://abbeyplaybook_user:HG1bcAMA9w07hQfxXu1lxwOz2PZewPYA@dpg-d3670ke3jp1c73fbhejg-a.oregon-postgres.render.com/abbeyplaybook?sslmode=require";

export const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

export const ensureSchema = async () => {
  try {
    // Ensure users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255),
        google_id VARCHAR(255) UNIQUE,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

      await pool.query(`
      ALTER TABLE users
      ADD COLUMN IF NOT EXISTS google_id VARCHAR(255) UNIQUE;
    `);
 await pool.query(`
    ALTER TABLE users
    ADD COLUMN IF NOT EXISTS "fullName" VARCHAR(255);
  `);
  await pool.query(`
    ALTER TABLE users ALTER COLUMN password DROP NOT NULL;

    `)
    // Ensure playbooks table fixes
    await pool.query(`
      ALTER TABLE playbooks
      ADD COLUMN IF NOT EXISTS content TEXT,
      ADD COLUMN IF NOT EXISTS loves INT DEFAULT 0,
      ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT NOW();

      ALTER TABLE playbooks
      DROP COLUMN IF EXISTS body;
    `);

    // Ensure relationships table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS relationships (
        id SERIAL PRIMARY KEY,
        follower_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        following_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT NOW(),
        UNIQUE(follower_id, following_id)
      );
    `);

    console.log("Schema check complete: users, playbooks, relationships ensured");
  } catch (err) {
    console.error("Schema check failed:", err);
  }
};
