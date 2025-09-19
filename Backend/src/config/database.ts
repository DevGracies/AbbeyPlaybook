import { Pool } from "pg";
import { config } from "./config";

export const pool = new Pool({
  connectionString: config.db.url,
   ssl: {
    rejectUnauthorized: false, 
  },
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});
