import { Pool } from "pg";
import { config } from "./config";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgresql://abbeyplaybook_user:HG1bcAMA9w07hQfxXu1lxwOz2PZewPYA@dpg-d3670ke3jp1c73fbhejg-a.oregon-postgres.render.com/abbeyplaybook",
  ssl: { rejectUnauthorized: false },
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});
