import { Router } from "express";
import { getProfile, updateProfile, getUsers, follow } from "../controllers/user.controller";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getProfile);
router.put("/:id", updateProfile);
router.post("/follow", follow);

export default router;
