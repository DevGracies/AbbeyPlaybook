import { Request, Response } from "express";
import * as playbookService from "../services/playbook.service";

export async function createPlaybook(req: any, res: Response) {
  try {
    const { title, content } = req.body;
    const userId = req.user.id;
    const pb = await playbookService.createPlaybook({ title, content, authorId: userId });
    res.json(pb);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function listPlaybooks(req: Request, res: Response) {
  // support ?authorId= or ?feed=true (feed = playbooks by people current user follows)
  try {
    const { authorId, feed } = req.query;
    const pbs = await playbookService.listPlaybooks({ authorId: authorId as string, feed: feed === "true", userId: (req as any).user?.id });
    res.json(pbs);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function toggleLove(req: any, res: Response) {
  try {
    const userId = req.user.id;
    const playbookId = req.params.id;
    const count = await playbookService.toggleLove(playbookId, userId);
    res.json({ loves: count });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}
