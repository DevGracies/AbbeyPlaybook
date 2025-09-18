import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { AppDataSource } from "../config/database";
import { User } from "../models/User";
import { generateToken } from "../utils/jwt";

const userRepo = AppDataSource.getRepository(User);

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password, fullName, position } = req.body;

    const existingUser = await userRepo.findOneBy({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = userRepo.create({ email, password: hashedPassword, fullName, position });
    await userRepo.save(newUser);

    const token = generateToken({ id: newUser.id, email: newUser.email });

    res.status(201).json({ user: newUser, token });
  } catch (err) {
    res.status(500).json({ message: "Signup failed", error: err });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await userRepo.findOneBy({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken({ id: user.id, email: user.email });

    res.json({ user, token });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err });
  }
};

export const logout = async (req: Request, res: Response) => {
  req.session?.destroy(() => {
    res.json({ message: "Logged out successfully" });
  });
};
