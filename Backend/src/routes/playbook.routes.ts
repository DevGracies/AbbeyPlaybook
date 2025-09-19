import { Router } from "express";
import { create, getAll, update, remove, love } from "../controllers/playbook.controller";

const router = Router();

router.post("/", create);
router.get("/", getAll);
router.put("/:id", update);
router.delete("/:id", remove);
router.post("/:id/love", love);

export default router;
