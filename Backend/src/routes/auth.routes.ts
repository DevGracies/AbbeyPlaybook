import { Router } from "express";
import passport from "../config/passport"
import { signup, login, googleCallback } from "../controllers/auth.controller";
import jwt from "jsonwebtoken";

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
  passport.authenticate("google", { failureRedirect: "/login", session: false }),
  (req: any, res) => {
    const token = jwt.sign(
      { id: req.user.id, email: req.user.email },
      process.env.JWT_ACCESS_SECRET as string,
      { expiresIn: "7d" }
    );

    const isNew = req.user.isNew ? "signup" : "login";

    res.redirect(
      `http://localhost:5173/oauthSuccess?token=${token}&mode=${isNew}`
    );
  }
);

export default router;