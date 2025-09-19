import { pool } from "./database";

export const createTables = async () => {
  await pool.query(`
    -- Users table
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      fullName VARCHAR(255),
      position VARCHAR(255),
      profilePic VARCHAR(255),
      aboutWork TEXT
    );

    -- Playbooks table
    CREATE TABLE IF NOT EXISTS playbooks (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      content TEXT NOT NULL, -- renamed from "body" to "content" to match controller
      loves INT DEFAULT 0,
      user_id INT REFERENCES users(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT NOW()
    );

    -- Relationships (Follows) table
    CREATE TABLE IF NOT EXISTS relationships (
      id SERIAL PRIMARY KEY,
      follower_id INT REFERENCES users(id) ON DELETE CASCADE,
      following_id INT REFERENCES users(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT NOW(),
      UNIQUE (follower_id, following_id) -- prevent duplicate follows
    );
  `);

  console.log("Tables created successfully!");
  process.exit(0);
};

createTables().catch((err) => {
  console.error("Error creating tables:", err);
  process.exit(1);
});
