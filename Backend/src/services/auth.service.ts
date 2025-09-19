import { pool } from "../config/database";
import { hashPassword, comparePassword } from "../utils/hash";
import { signAccessToken, signRefreshToken } from "../utils/jwt";

export const signup = async (email: string, password: string) => {
  try {
    const hashed = await hashPassword(password);

    const result = await pool.query(
      `INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email`,
      [email, hashed]
    );

    if (!result.rows.length) throw new Error("Failed to create user");

    const user = result.rows[0];
    const accessToken = signAccessToken({ id: user.id, email: user.email });
    const refreshToken = signRefreshToken({ id: user.id, email: user.email });

    return { user, accessToken, refreshToken };
  } catch (err: any) {
    console.error("Signup service error:", err);
    throw new Error(err.message || "Signup failed");
  }
};

export const login = async (email: string, password: string) => {
  try {
    const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [email]);

    if (!result.rows.length) throw new Error("User not found");

    const user = result.rows[0];
    const match = await comparePassword(password, user.password);

    if (!match) throw new Error("Incorrect password");

    const accessToken = signAccessToken({ id: user.id, email: user.email });
    const refreshToken = signRefreshToken({ id: user.id, email: user.email });

    return { user, accessToken, refreshToken };
  } catch (err: any) {
    console.error("Login service error:", err);
    throw new Error(err.message || "Login failed");
  }
};

export const findOrCreateGoogleUser = async (googleEmail: string, fullName: string) => {
  try {
    const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [googleEmail]);
    let user;

    if (!result.rows.length) {
      const insert = await pool.query(
        `INSERT INTO users (email, fullName, password) VALUES ($1, $2, $3) RETURNING id, email, fullName`,
        [googleEmail, fullName, "google_oauth"]
      );
      user = insert.rows[0];
    } else {
      user = result.rows[0];
    }

    const accessToken = signAccessToken({ id: user.id, email: user.email });
    const refreshToken = signRefreshToken({ id: user.id, email: user.email });

    return { user, accessToken, refreshToken };
  } catch (err: any) {
    console.error("Google auth service error:", err);
    throw new Error(err.message || "Google login failed");
  }
};
