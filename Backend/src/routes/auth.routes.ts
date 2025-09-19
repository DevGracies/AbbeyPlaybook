import { Router } from "express";
import passport from "passport";
import { signup, login, googleCallback } from "../controllers/auth.controller";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);

// Google OAuth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleCallback
);

export default router;
