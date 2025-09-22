import { Router } from "express";
import { create, getAll, update, remove, love, createPlaybook,
  getPersonalPlaybooks,
  getUserPlaybooks,
  updatePlaybook,
  deletePlaybook,  
  getPlaybooksForFollowing} from "../controllers/playbook.controller";
import {authMiddleware, requireAuth } from "../middleware/auth.middleware" 
const router = Router();

router.post("/", authMiddleware, createPlaybook);
router.get("/me", authMiddleware, getPersonalPlaybooks);
router.get("/user/:userId",  getUserPlaybooks);
router.put("/:playbookId", authMiddleware, updatePlaybook);
router.delete("/:playbookId", authMiddleware, deletePlaybook);

router.get("/following", requireAuth, getPlaybooksForFollowing);
router.get("/users/:userId/playbooks", getUserPlaybooks);


router.post("/:id/love", love);

router.post("/", create);
router.get("/", getAll);
router.put("/:id", update);
router.delete("/:id", remove);

export default router; 

