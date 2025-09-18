import { prisma } from "../config/prisma";
import { hashPassword, comparePassword } from "../utils/hash";
import { signAccessToken, signRefreshToken } from "../utils/jwt";
import { config } from "../config";

export async function registerUser(data: { email: string; password: string; fullName?: string }) {
  const existing = await prisma.user.findUnique({ where: { email: data.email }});
  if (existing) throw new Error("Email already in use");
  const passwordHash = await hashPassword(data.password);
  const user = await prisma.user.create({
    data: {
      email: data.email,
      password: passwordHash,
      fullName: data.fullName
    }
  });

  const accessToken = signAccessToken({ userId: user.id, email: user.email });
  const refreshToken = signRefreshToken({ userId: user.id });
  await prisma.refreshToken.create({
    data: { token: refreshToken, userId: user.id, expiresAt: new Date(Date.now() + 7 * 24 * 3600 * 1000) }
  });

  return { user, accessToken, refreshToken };
}

export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email }});
  if (!user || !user.password) throw new Error("Invalid credentials");
  const ok = await comparePassword(password, user.password);
  if (!ok) throw new Error("Invalid credentials");

  const accessToken = signAccessToken({ userId: user.id, email: user.email });
  const refreshToken = signRefreshToken({ userId: user.id });
  await prisma.refreshToken.create({
    data: { token: refreshToken, userId: user.id, expiresAt: new Date(Date.now() + 7 * 24 * 3600 * 1000) }
  });

  return { user, accessToken, refreshToken };
}

export async function refreshAccessToken(refreshToken: string) {
  // verify and re-issue access token
  // verify token exists in DB, then sign new access token
}
