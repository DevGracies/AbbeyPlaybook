import { Request, Response } from "express";
import * as UserService from "../services/user.service";

// Get user profile
export const getProfile = async (req: Request, res: Response) => {
  try {
    const user = await UserService.getUserById(Number(req.params.id));
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Update profile
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { fullName, position, aboutWork, profilePic } = req.body;
    const updatedUser = await UserService.updateUser(id, fullName, position, aboutWork, profilePic);
    res.json(updatedUser);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Get all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserService.getAllUsers();
    res.json(users);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Follow user
export const follow = async (req: Request, res: Response) => {
  try {
    const followerId = Number(req.body.followerId);
    const followingId = Number(req.body.followingId);
    await UserService.followUser(followerId, followingId);
    res.json({ message: "Followed successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
