import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: Number(process.env.PORT || 4000),
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET || "access_secret",
    refreshSecret: process.env.JWT_REFRESH_SECRET || "refresh_secret",
    accessExpiry: process.env.ACCESS_TOKEN_EXPIRES_IN || "15m",
    refreshExpiry: process.env.REFRESH_TOKEN_EXPIRES_IN || "7d",
  },
  redisUrl: process.env.REDIS_URL || "redis://localhost:6379",
  kafka: {
    brokers: (process.env.KAFKA_BROKERS || "localhost:9092").split(","),
    clientId: process.env.KAFKA_CLIENT_ID || "abbeyplaybook",
  },
  azure: {
    storageAccount: process.env.AZURE_STORAGE_ACCOUNT,
    storageKey: process.env.AZURE_STORAGE_ACCESS_KEY,
    container: process.env.AZURE_STORAGE_CONTAINER || "avatars",
  }
};
