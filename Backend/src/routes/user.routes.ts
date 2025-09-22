import { Router } from "express";
import multer from "multer";
import { requireAuth, authMiddleware } from "../middleware/auth.middleware"; 
import { getMyProfile, updateMyProfile, uploadAvatar, getFollowing, unfollow, updateUser, follow, getUsers, deleteUser } from "../controllers/user.controller";


const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB

router.get("/me", authMiddleware, getMyProfile);
router.put("/profile", authMiddleware, updateMyProfile);
router.get("/users", getUsers)
router.post("/avatar", authMiddleware, upload.single("avatar"), uploadAvatar);

router.post("/follow/:userId", authMiddleware, follow);
router.post("/unfollow/:userId", authMiddleware, unfollow);

router.get("/following", authMiddleware, getFollowing);
router.delete("/:id", authMiddleware, deleteUser);
export default router;
