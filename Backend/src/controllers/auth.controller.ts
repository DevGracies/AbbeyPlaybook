import { Request, Response } from "express";
import * as AuthService from "../services/auth.service";

export const signup = async (req: Request, res: Response) => {
  try {
    // Log request body for debugging
    console.log("Signup request body:", req.body);

    const { fullName, email, password, confirmPassword } = req.body;

    // Basic validations
    if (!fullName || !email || !password || !confirmPassword) {
      return res
        .status(400)
        .json({ error: "fullName, email, password, and confirmPassword are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Call service
    const data = await AuthService.signup(fullName, email, password);

    console.log("Signup successful:", data);
    return res.status(201).json(data);
  } catch (err: any) {
    console.error("Signup controller error:", err);
    return res.status(400).json({ error: err.message || "Signup failed" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    console.log("Login request body:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "email and password are required" });
    }

    const data = await AuthService.login(email, password);

    console.log("Login successful:", data);
    return res.status(200).json(data);
  } catch (err: any) {
    console.error("Login controller error:", err);
    return res.status(400).json({ error: err.message || "Login failed" });
  }
};

export const googleCallback = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    if (!user) {
      return res.status(400).json({ error: "No user data returned from Google" });
    }

    return res.status(200).json(user);
  } catch (err: any) {
    console.error("Google callback error:", err);
    return res.status(400).json({ error: err.message || "Google login failed" });
  }
};

