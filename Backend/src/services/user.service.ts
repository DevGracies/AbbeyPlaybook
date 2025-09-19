import { pool } from "../config/database";
import { User } from "../interface/user.interface";

// Get user by ID
export const getUserById = async (id: number): Promise<User | null> => {
  const result = await pool.query("SELECT * FROM users WHERE id=$1", [id]);
  return result.rows[0] || null;
};

// Update user profile
export const updateUser = async (
  id: number,
  fullName?: string,
  position?: string,
  aboutWork?: string,
  profilePic?: string
) => {
  const result = await pool.query(
    `UPDATE users 
     SET fullName=COALESCE($1, fullName),
         position=COALESCE($2, position),
         aboutWork=COALESCE($3, aboutWork),
         profilePic=COALESCE($4, profilePic)
     WHERE id=$5 RETURNING *`,
    [fullName, position, aboutWork, profilePic, id]
  );
  return result.rows[0];
};

// Get all users
export const getAllUsers = async (): Promise<User[]> => {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
};

// Follow a user
export const followUser = async (followerId: number, followingId: number) => {
  // Prevent duplicate
  const check = await pool.query(
    "SELECT * FROM relationships WHERE follower_id=$1 AND following_id=$2",
    [followerId, followingId]
  );
  if (!check.rows.length) {
    await pool.query(
      "INSERT INTO relationships (follower_id, following_id) VALUES ($1, $2)",
      [followerId, followingId]
    );
  }
};

// Get following users' IDs
export const getFollowingIds = async (userId: number) => {
  const result = await pool.query(
    "SELECT following_id FROM relationships WHERE follower_id=$1",
    [userId]
  );
  return result.rows.map((row) => row.following_id);
};
