import "reflect-metadata";
import dotenv from "dotenv";
import { AppDataSource } from "./config/database";
import { createServer } from "./server";

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log("✅ Database connected successfully");

    const app = await createServer();
    app.listen(PORT, () => {
      console.log(` AbbeyPlaybook backend running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error(" Error starting server:", err);
  }
};

startServer();
