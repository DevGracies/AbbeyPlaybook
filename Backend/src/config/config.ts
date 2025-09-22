import dotenv from "dotenv";
dotenv.config();

const getEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) throw new Error(`Environment variable ${key} is not defined`);
  return value;
};

export const config = {
  port: Number(process.env.PORT) || 5000,
  jwt: {
    accessSecret: getEnv("JWT_ACCESS_SECRET"),
    refreshSecret: getEnv("JWT_REFRESH_SECRET"),
    accessExpiry: getEnv("ACCESS_TOKEN_EXPIRES_IN"),  
    refreshExpiry: getEnv("REFRESH_TOKEN_EXPIRES_IN"),
  },
  oauth: {
    googleClientID: getEnv("GOOGLE_CLIENT_ID"),
    googleClientSecret: getEnv("GOOGLE_CLIENT_SECRET"),
  },
  db: {
    url: getEnv("DATABASE_URL"),
  },
};
