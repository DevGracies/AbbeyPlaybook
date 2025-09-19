import { Request, Response } from "express";
import * as PlaybookService from "../services/playbook.service";

// Create
export const create = async (req: Request, res: Response) => {
  try {
    const { title, body, userId } = req.body;
    const playbook = await PlaybookService.createPlaybook(title, body, userId);
    res.json(playbook);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Get all (optionally by user)
export const getAll = async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId ? Number(req.query.userId) : undefined;
    const playbooks = await PlaybookService.getPlaybooks(userId);
    res.json(playbooks);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Update
export const update = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { title, body } = req.body;
    const updated = await PlaybookService.updatePlaybook(id, title, body);
    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Delete
export const remove = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await PlaybookService.deletePlaybook(id);
    res.json({ message: "Deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Love
export const love = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const updated = await PlaybookService.lovePlaybook(id);
    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
