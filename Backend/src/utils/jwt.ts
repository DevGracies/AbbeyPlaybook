import jwt, { JwtPayload, Secret, SignOptions } from "jsonwebtoken";
import { config } from "../config/config";

// Explicitly type secrets
const accessSecret: Secret = config.jwt.accessSecret;
const refreshSecret: Secret = config.jwt.refreshSecret;

// Sign Access Token
export const signAccessToken = (payload: string | object | Buffer): string => {
  const options: SignOptions = { expiresIn: config.jwt.accessExpiry as any }; // cast to any to fix TS error
  return jwt.sign(payload, accessSecret, options);
};

// Sign Refresh Token
export const signRefreshToken = (payload: string | object | Buffer): string => {
  const options: SignOptions = { expiresIn: config.jwt.refreshExpiry as any }; // cast to any to fix TS error
  return jwt.sign(payload, refreshSecret, options);
};

// Verify Token
export const verifyToken = (token: string, type: "access" | "refresh"): string | JwtPayload => {
  const secret: Secret = type === "access" ? accessSecret : refreshSecret;
  return jwt.verify(token, secret);
};
