import { prisma } from "../config/prisma";
import { uploadBufferToAzure } from "../utils/azureBlob";
import { producer } from "./kafka.service";

export async function uploadAvatar(userId: string, file: Express.Multer.File) {
  const ext = file.originalname.split(".").pop();
  const blobName = `avatars/${userId}-${Date.now()}.${ext}`;
  const url = await uploadBufferToAzure(file.buffer, blobName);
  await prisma.user.update({ where: { id: userId }, data: { avatarUrl: url }});
  return url;
}

export async function followUser(followerId: string, followingId: string) {
  if (followerId === followingId) throw new Error("Cannot follow yourself");
  return prisma.follow.create({ data: { followerId, followingId }});
}

export async function unfollowUser(followerId: string, followingId: string) {
  await prisma.follow.deleteMany({ where: { followerId, followingId }});
}
