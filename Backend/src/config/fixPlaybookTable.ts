import { pool } from "./database";

const fixPlaybookTable = async () => {
  try {
    await pool.query(`
      DO $$
      BEGIN
          -- Check if "content" column exists
          IF NOT EXISTS (
              SELECT 1
              FROM information_schema.columns
              WHERE table_name = 'playbooks'
                AND column_name = 'content'
          ) THEN
              -- Add the column if missing
              ALTER TABLE playbooks ADD COLUMN content TEXT;
          END IF;
      END$$;
    `);

    console.log("Playbooks table fixed ");
  } catch (err) {
    console.error("Error fixing playbooks table:", err);
  } finally {
    process.exit(0);
  }
};

fixPlaybookTable();
