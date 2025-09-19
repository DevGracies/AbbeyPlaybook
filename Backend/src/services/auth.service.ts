import { pool } from "../config/database";
import { hashPassword, comparePassword } from "../utils/hash";
import { signAccessToken, signRefreshToken } from "../utils/jwt";

export const signup = async (fullName: string, email: string, password: string) => {
  console.log("Signup input:", { fullName, email });

  // Hash the password
  const hashedPassword = await hashPassword(password);

  // Insert user into database
  const result = await pool.query(
    `INSERT INTO users (fullName, email, password) VALUES ($1, $2, $3) RETURNING id, fullName, email`,
    [fullName, email, hashedPassword]
  );

  if (!result.rows.length) {
    throw new Error("Failed to create user");
  }

  const user = result.rows[0];

  // Generate tokens
  const accessToken = signAccessToken({ id: user.id, email: user.email });
  const refreshToken = signRefreshToken({ id: user.id, email: user.email });

  return { user, accessToken, refreshToken };
};

export const login = async (email: string, password: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [email]);

  if (!result.rows.length) {
    throw new Error("User not found");
  }

  const user = result.rows[0];

  // Compare password
  const match = await comparePassword(password, user.password);
  if (!match) throw new Error("Incorrect password");

  // Generate tokens
  const accessToken = signAccessToken({ id: user.id, email: user.email });
  const refreshToken = signRefreshToken({ id: user.id, email: user.email });

  return { user, accessToken, refreshToken };
};
