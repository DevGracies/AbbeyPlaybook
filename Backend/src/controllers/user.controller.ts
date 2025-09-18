import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import * as userService from "../services/user.service";

export async function getMe(req: any, res: Response) {
  res.json(req.user);
}

export async function updateProfile(req: any, res: Response) {
  const userId = req.user.id;
  const { fullName, position, about } = req.body;
  const user = await prisma.user.update({ where: { id: userId }, data: { fullName, position, about }});
  res.json(user);
}

export async function uploadAvatar(req: any, res: Response) {
  // multer will have placed file on req.file
  const file = req.file;
  if (!file) return res.status(400).json({ error: "No file uploaded" });
  // upload to azure blob and get URL using utils/azureBlob
  const url = await userService.uploadAvatar(req.user.id, file);
  res.json({ avatarUrl: url });
}

export async function followUser(req: any, res: Response) {
  const followerId = req.user.id;
  const followingId = req.params.id;
  const follow = await userService.followUser(followerId, followingId);
  res.json(follow);
}

export async function unfollowUser(req: any, res: Response) {
  const followerId = req.user.id;
  const followingId = req.params.id;
  await userService.unfollowUser(followerId, followingId);
  res.json({ ok: true });
}
