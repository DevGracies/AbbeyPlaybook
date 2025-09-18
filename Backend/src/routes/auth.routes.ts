import { Router } from "express";
import * as authCtrl from "../controllers/auth.controller";

const router = Router();

router.post("/signup", authCtrl.signup);
router.post("/login", authCtrl.login);
router.post("/logout", authCtrl.logout);

export default router;
