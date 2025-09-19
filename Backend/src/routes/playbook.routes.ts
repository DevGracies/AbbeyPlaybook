import { Router } from "express";
import { create, getAll, update, remove, love,getPersonalPlaybooks, getFollowedPlaybooks  } from "../controllers/playbook.controller";
import {authenticate} from "../middleware/auth.middleware" 
const router = Router();


router.get("/personal", authenticate, getPersonalPlaybooks);
router.get("/following", authenticate, getFollowedPlaybooks);

router.post("/", create);
router.get("/", getAll);
router.put("/:id", update);
router.delete("/:id", remove);
router.post("/:id/love", love);

export default router;

