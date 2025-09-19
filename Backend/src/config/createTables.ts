import { pool } from "./database";

export const createTables = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      fullName VARCHAR(255),
      position VARCHAR(255),
      profilePic VARCHAR(255),
      aboutWork TEXT
    );

    CREATE TABLE IF NOT EXISTS playbooks (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      body TEXT NOT NULL,
      loves INT DEFAULT 0,
      user_id INT REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS relationships (
      id SERIAL PRIMARY KEY,
      follower_id INT REFERENCES users(id) ON DELETE CASCADE,
      following_id INT REFERENCES users(id) ON DELETE CASCADE
    );
  `);

  console.log("Tables created successfully!");
  process.exit(0);
};

createTables().catch((err) => {
  console.error("Error creating tables:", err);
  process.exit(1);
});
