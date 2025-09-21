import { pool } from "../config/database";
// import { User } from "../interface/user.interface";
import { QueryResult } from "pg";

export type User = {
  id: number;
  fullName: string;
  email?: string;
  position?: string | null;
  aboutWork?: string | null;
  profilePic?: string | null;
  created_at?: string;
};

const mapUser = (row: any): User => ({
  id: row.id,
  fullName: row.fullName,
  position: row.position,
  aboutWork: row.aboutWork,
  profilePic: row.profilePic,
  email: row.email,
});

export const updateUser = async (
  id: number,
  data: {
    fullName?: string | null;
    position?: string | null;
    aboutWork?: string | null;
    profilePic?: string | null;
  }
): Promise<User | null> => {
  const fields: string[] = [];
  const values: any[] = [];
  let idx = 1;

  if (data.fullName !== undefined) {
    fields.push(`"fullName" = $${idx++}`);
    values.push(data.fullName);
  }
  if (data.position !== undefined) {
    fields.push(`position = $${idx++}`);
    values.push(data.position);
  }
  if (data.aboutWork !== undefined) {
    fields.push(`"aboutWork" = $${idx++}`);
    values.push(data.aboutWork);
  }
  if (data.profilePic !== undefined) {
    fields.push(`"profilePic" = $${idx++}`);
    values.push(data.profilePic);
  }

  if (fields.length === 0) {
    const existing = await getUserById(id);
    return existing;
  }

  values.push(id);
  const query = `UPDATE users SET ${fields.join(", ")} WHERE id = $${idx} RETURNING *`;

  try {
    console.log("Running SQL:", query, values);
    const result: QueryResult = await pool.query(query, values);
    return result.rows[0] ? mapUser(result.rows[0]) : null;
  } catch (err) {
    console.error("updateUser failed:", err);
    throw err; 
  }
};

export const getUserById = async (id: number): Promise<User | null> => {
  const result = await pool.query('SELECT id, "fullName", position, "aboutWork", "profilePic", email FROM users WHERE id = $1', [id]);
  return result.rows[0] ? mapUser(result.rows[0]) : null;
};

export const getAllUsers = async (): Promise<any[]> => {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
};

export const followUser = async (followerId: number, followingId: number) => {
  try {
   console.log("SERVICE DEBUG: followUser called", { followerId, followingId });

   const checkUser = await pool.query("SELECT id FROM users WHERE id=$1", [followingId]);
  if (checkUser.rows.length === 0) {
    throw { status: 404, message: "User not found" }
  }

  const check = await pool.query(
    "SELECT 1 FROM relationships WHERE follower_id=$1 AND following_id=$2",
    [followerId, followingId]
  );
  if (!check.rows.length) {
    await pool.query(
      "INSERT INTO relationships (follower_id, following_id) VALUES ($1, $2)",
      [followerId, followingId]
    );
  }
  } catch (err: any) {
    console.error("followUser failed:", err.message || err);
    throw err;
  }
};

export const unfollowUser = async (followerId: number, followingId: number) => {
  await pool.query(
    "DELETE FROM relationships WHERE follower_id=$1 AND following_id=$2",
    [followerId, followingId]
  );
};

export const getFollowingIds = async (userId: number) => {
  const result = await pool.query(
    "SELECT following_id FROM relationships WHERE follower_id=$1",
    [userId]
  );
  return result.rows.map((row) => row.following_id);
};
