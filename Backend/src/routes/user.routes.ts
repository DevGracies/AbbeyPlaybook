import { Router } from "express";
import * as userCtrl from "../controllers/user.controller";
import { requireAuth } from "../middleware/auth.middleware";
import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });

const r = Router();
r.get("/me", requireAuth, userCtrl.getMe);
r.put("/me", requireAuth, userCtrl.updateProfile);
r.post("/me/avatar", requireAuth, upload.single("avatar"), userCtrl.uploadAvatar);
r.post("/:id/follow", requireAuth, userCtrl.followUser);
r.delete("/:id/unfollow", requireAuth, userCtrl.unfollowUser);
r.get("/", requireAuth, userCtrl.listUsers);

export default r;
