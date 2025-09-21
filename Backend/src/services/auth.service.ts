import { pool } from "../config/database";
import { hashPassword, comparePassword } from "../utils/hash";
import { signAccessToken, signRefreshToken } from "../utils/jwt";

export const signup = async (fullName: string, email: string, password: string) => {
  console.log("Signup input:", { fullName, email });

  const hashedPassword = await hashPassword(password);

  const result = await pool.query(
    `INSERT INTO users (fullName, email, password) VALUES ($1, $2, $3) RETURNING id, fullName, email`,
    [fullName, email, hashedPassword]
  );

  if (!result.rows.length) {
    throw new Error("Failed to create user");
  }

  const user = result.rows[0];

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
  const match = await comparePassword(password, user.password);
  if (!match) throw new Error("Incorrect password");

  const accessToken = signAccessToken({ id: user.id, email: user.email });
  const refreshToken = signRefreshToken({ id: user.id, email: user.email });

  return { user, accessToken, refreshToken };
};
