import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { config } from "./config";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import playbookRoutes from "./routes/playbook.routes";
import { startProducer } from "./services/kafka.service";
import { prisma } from "./config/prisma";
import morgan from "morgan";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/playbooks", playbookRoutes);

app.get("/health", (req, res) => res.json({ ok: true }));

const start = async () => {
  await startProducer().catch((err) =>
    console.error("Kafka producer error", err)
  );
  app.listen(config.port, () =>
    console.log(`Server listening on port ${config.port}`)
  );
};

start();
