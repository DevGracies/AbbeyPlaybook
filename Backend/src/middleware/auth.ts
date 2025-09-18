// src/middleware/auth.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { AppDataSource } from "../config/database";
import { User } from "../models/User";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export interface AuthRequest extends Request {
  userId?: string;
  user?: User;
}

export async function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ message: "Authorization header missing" });
    const parts = header.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer")
      return res.status(401).json({ message: "Invalid authorization format" });

    const token = parts[1];
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    if (!decoded?.id && !decoded?.userId) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    const userId = decoded.id || decoded.userId;
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({ where: { id: userId } });
    if (!user) return res.status(401).json({ message: "User not found" });

    req.userId = userId;
    req.user = user;
    next();
  } catch (err: any) {
    return res.status(401).json({ message: "Unauthorized", details: err.message });
  }
}
