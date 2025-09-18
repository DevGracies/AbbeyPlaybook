import jwt from "jsonwebtoken";
import { config } from "../config";

export const signAccessToken = (payload: object) => {
  return jwt.sign(payload, config.jwt.accessSecret, {
    expiresIn: config.jwt.accessExpiry,
  });
};

export const signRefreshToken = (payload: object) => {
  return jwt.sign(payload, config.jwt.refreshSecret, {
    expiresIn: config.jwt.refreshExpiry,
  });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, config.jwt.accessSecret);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, config.jwt.refreshSecret);
};

export const generateToken = (payload: object) => {
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);
  return { accessToken, refreshToken };
};
