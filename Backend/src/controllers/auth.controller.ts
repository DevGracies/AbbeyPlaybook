import { Request, Response } from "express";
import * as AuthService from "../services/auth.service";

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const data = await AuthService.signup(email, password);

    console.log("Signup returned:", data); 
    return res.status(201).json(data);
  } catch (err: any) {
    console.error("Signup controller error:", err);
    return res.status(400).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log("Login request body:", req.body); 

    const data = await AuthService.login(email, password);
    console.log("Login returned:", data); 

    return res.status(200).json(data);
  } catch (err: any) {
    console.error("Login controller error:", err);
    return res.status(400).json({ error: err.message });
  }
};

export const googleCallback = async (req: Request, res: Response) => {
  const user = req.user;
  return res.status(200).json(user || { error: "No user data" });
};
