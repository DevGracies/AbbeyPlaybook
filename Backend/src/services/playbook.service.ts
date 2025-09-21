import { pool } from "../config/database";
import { Playbook } from "../interface/playbook.interface";

export const createPlaybookService = async (userId: number, title: string, content: string) => {
  const result = await pool.query(
    "INSERT INTO playbooks (user_id, title, content) VALUES ($1, $2, $3) RETURNING *",
    [userId, title, content]
  );
  return result.rows[0];
};

export const getPersonalPlaybooksService = async (userId: number) => {
  const result = await pool.query(
    "SELECT * FROM playbooks WHERE user_id = $1 ORDER BY id DESC",
    [userId]
  );
  return result.rows;
};

export const getUserPlaybooksService = async (otherUserId: number) => {
  const result = await pool.query(
    "SELECT * FROM playbooks WHERE user_id = $1 ORDER BY created_at DESC",
    [otherUserId]
  );
  return result.rows;
};

export const updatePlaybookService = async (
  playbookId: number,
  userId: number,
  title?: string,
  content?: string
) => {
  const fields: string[] = [];
  const values: any[] = [];
  let paramIndex = 1;

  if (title !== undefined) {
    fields.push(`title = $${paramIndex++}`);
    values.push(title);
  }

  if (content !== undefined) {
    fields.push(`content = $${paramIndex++}`);
    values.push(content);
  }

  if (fields.length === 0) {
    return null;
  }

  values.push(playbookId, userId);

 const query = `
  UPDATE playbooks 
  SET ${fields.join(", ")} 
  WHERE id = $${paramIndex++} AND user_id = $${paramIndex} 
  RETURNING *;
`;


  const result = await pool.query(query, values);
  return result.rows[0];
};

export const deletePlaybookService = async (playbookId: number, userId: number) => {
  const result = await pool.query(
    "DELETE FROM playbooks WHERE id = $1 AND user_id = $2 RETURNING *",
    [playbookId, userId]
  );
  return result.rows[0];
};

// Love playbook
export const lovePlaybook = async (id: number) => {
  const result = await pool.query(
    "UPDATE playbooks SET loves = loves + 1 WHERE id=$1 RETURNING *",
    [id]
  );
  return result.rows[0];
};

export const createPlaybook = async (title: string, content: string, userId: number): Promise<Playbook> => {
  const result = await pool.query(
    "INSERT INTO playbooks (title, content, user_id) VALUES ($1, $2, $3) RETURNING *",
    [title, content, userId]
  );
  return result.rows[0];
};

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

export const updatePlaybook = async (id: number, title: string, content: string) => {
  const result = await pool.query(
    "UPDATE playbooks SET title=$1, content=$2 WHERE id=$3 RETURNING *",
    [title, content, id]
  );
  return result.rows[0]
};

export const deletePlaybook = async (id: number) => {
  await pool.query("DELETE FROM playbooks WHERE id=$1", [id]);
};

export const getPlaybooksByUser = async (userId: number) => {
  const result = await pool.query(
    "SELECT * FROM playbooks WHERE user_id = $1 ORDER BY created_at DESC",
    [userId]
  );
  return result.rows;
};
