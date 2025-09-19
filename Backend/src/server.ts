import "reflect-metadata";
import express from "express";
import session from "express-session";
import passport from "passport";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import playbookRoutes from "./routes/playbook.routes";
import { errorHandler } from "./middleware/error.middleware";
import "./utils/oauth"; 
import { config } from "./config/config";
import { pool } from "./config/database";
import { createTables } from "./config/createTables";
const app = express();

// Middlewares

const allowedOrigins = ["http://localhost:5173", "https://abbeyplaybook.vercel.app"];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true, 
}));

app.use(express.json());
app.use(session({ secret: "abbey_secret", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

pool.query("SELECT NOW()")
  .then(() => console.log("Database connected"))
  .catch(err => console.error("Database connection failed:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/playbooks", playbookRoutes);

// Error handler
app.use(errorHandler);

// Start server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
