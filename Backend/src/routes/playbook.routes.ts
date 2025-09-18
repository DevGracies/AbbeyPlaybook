import { Router } from "express";
import * as playbookCtrl from "../controllers/playbook.controller";
import { requireAuth } from "../middleware/auth.middleware";

const r = Router();
r.post("/", requireAuth, playbookCtrl.createPlaybook);
r.get("/", requireAuth, playbookCtrl.listPlaybooks); // ?authorId= & ?feed=true
r.post("/:id/love", requireAuth, playbookCtrl.toggleLove);
r.get("/:id", requireAuth, playbookCtrl.getPlaybook);
r.put("/:id", requireAuth, playbookCtrl.updatePlaybook);
r.delete("/:id", requireAuth, playbookCtrl.deletePlaybook);

export default r;
