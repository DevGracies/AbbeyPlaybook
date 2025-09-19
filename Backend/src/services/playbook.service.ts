import { pool } from "../config/database";
import { Playbook } from "../interface/playbook.interface";

// Create new playbook
export const createPlaybook = async (title: string, body: string, userId: number): Promise<Playbook> => {
  const result = await pool.query(
    "INSERT INTO playbooks (title, body, user_id) VALUES ($1, $2, $3) RETURNING *",
    [title, body, userId]
  );
  return result.rows[0];
};

// Get all playbooks (or for a user)
export const getPlaybooks = async (userId?: number): Promise<Playbook[]> => {
  let query = "SELECT * FROM playbooks";
  const params: any[] = [];
  if (userId) {
    query += " WHERE user_id=$1";
    params.push(userId);
  }
  const result = await pool.query(query, params);
  return result.rows;
};

// Update playbook
export const updatePlaybook = async (id: number, title: string, body: string) => {
  const result = await pool.query(
    "UPDATE playbooks SET title=$1, body=$2 WHERE id=$3 RETURNING *",
    [title, body, id]
  );
  return result.rows[0];
};

// Delete playbook
export const deletePlaybook = async (id: number) => {
  await pool.query("DELETE FROM playbooks WHERE id=$1", [id]);
};

// Love playbook
export const lovePlaybook = async (id: number) => {
  const result = await pool.query(
    "UPDATE playbooks SET loves = loves + 1 WHERE id=$1 RETURNING *",
    [id]
  );
  return result.rows[0];
};
