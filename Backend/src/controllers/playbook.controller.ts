import { Request, Response } from "express";
import * as PlaybookService from "../services/playbook.service";
import { pool } from "../config/database";

export const create = async (req: Request, res: Response) => {
  try {
    const { title, body, userId } = req.body;
    const playbook = await PlaybookService.createPlaybook(title, body, userId);
    res.json(playbook);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}


export const getPersonalPlaybooks = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const result = await pool.query(
      "SELECT * FROM playbooks WHERE user_id = $1 ORDER BY created_at DESC",
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error in getPersonalPlaybooks:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getFollowedPlaybooks = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const result = await pool.query(
      `SELECT p.* 
       FROM playbooks p
       INNER JOIN follows f ON f.following_id = p.user_id
       WHERE f.follower_id = $1
       ORDER BY p.created_at DESC`,
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error in getFollowedPlaybooks:", err);
    res.status(500).json({ message: "Server error" });
  }
};
export const getAll = async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId ? Number(req.query.userId) : undefined;
    const playbooks = await PlaybookService.getPlaybooks(userId);
    res.json(playbooks);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

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

export const remove = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await PlaybookService.deletePlaybook(id);
    res.json({ message: "Deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const love = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const updated = await PlaybookService.lovePlaybook(id);
    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
