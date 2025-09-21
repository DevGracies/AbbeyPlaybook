import * as UserService from "../services/user.service";
import { Request, Response, NextFunction  } from "express";
import * as PlaybookService from "../services/playbook.service";
import { pool } from "../config/database";

export const createPlaybook = async (req: Request, res: Response) => {
  try {
    console.log("Playbook request body:", req.body);
    console.log("Playbook user from token:", req.user);
    const { title, content } = req.body;
   const userId = (req.user as { id: number }).id;

  if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }
    const playbook = await PlaybookService.createPlaybookService(userId, title, content);
    res.status(201).json(playbook);
  } catch (error) {
   console.error("Error creating playbook:", error);
    return res.status(500).json({ error: "Server error creating playbook" });
  }
};

export const getPersonalPlaybooks = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
const userId = (req.user as { id: number }).id;

    const playbooks = await PlaybookService.getPersonalPlaybooksService(userId);
    res.json(playbooks);
  } catch (error) {
    console.error("Error fetching personal playbooks:", error);
    res.status(500).json({ error: "Error fetching personal playbooks" });
  }
};
// // Get all playbooks of a particular user (for followers)
// export const getUserPlaybooks = async (req: Request, res: Response) => {
//   try {
//     const { userId } = req.params;
//     const playbooks = await PlaybookService.getUserPlaybooksService(Number(userId));
//     res.json(playbooks);
//   } catch (error) {
//     res.status(500).json({ error: "Error fetching user playbooks" });
//   }
// };

export const updatePlaybook = async (req: Request, res: Response) => {
  try {
    const { playbookId } = req.params;
    const { title, content } = req.body;
const userId = (req.user as { id: number }).id;
    console.log("Update request body:", req.body);
    console.log("Params:", req.params);

    const updated = await PlaybookService.updatePlaybookService(
      Number(playbookId),
      userId,
      title,
      content
    );

    if (!updated) {
      return res
        .status(403)
        .json({ error: "Not allowed or nothing to update" });
    }

    res.json(updated);
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: "Error updating playbook" });
  }
};

export const deletePlaybook = async (req: Request, res: Response) => {
  try {
    const { playbookId } = req.params;
  const userId = (req.user as { id: number }).id;


    const deleted = await PlaybookService.deletePlaybookService(Number(playbookId), userId);
    if (!deleted) return res.status(403).json({ error: "Not allowed to delete this playbook" });

    res.json({ message: "Playbook deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting playbook" });
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

export const love = async (req: Request & { user?: any }, res: Response) => {
  try {
    console.log("REQ PARAMS:", req.params);
    console.log("REQ USER:", req.user);

    const playbookId = Number(req.params.id);
    if (!playbookId) return res.status(400).json({ error: "Invalid playbook ID" });

    const userId = req.user?.id;
    if (!userId) console.warn("No logged-in user found");

    const result = await pool.query(
      `UPDATE playbooks
       SET loves = COALESCE(loves, 0) + 1
       WHERE id = $1
       RETURNING *`,
      [playbookId]
    );

    if (!result.rows[0]) return res.status(404).json({ error: "Playbook not found" });

    res.json(result.rows[0]);
  } catch (err: any) {
    console.error("Error loving playbook:", err);
    res.status(500).json({ error: "Error loving playbook" });
  }
};


//admin
export const create = async (req: Request, res: Response) => {
  try {
    const { title, body, userId } = req.body;
    const playbook = await PlaybookService.createPlaybook(title, body, userId);
    res.json(playbook);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}


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



export const getPlaybooksForFollowing = async (req: Request & { user?: any }, res: Response) => {
  try {
    let authorIds: number[] = [];
    if (req.query.authors) {
      const authorsParam = String(req.query.authors);
      authorIds = authorsParam.split(",").map((s) => Number(s)).filter(Boolean);
    } else {
      const userId = Number(req.user?.id);
      if (!userId) return res.json([]);
      authorIds = await UserService.getFollowingIds(userId);
    }

    if (!authorIds.length) return res.json([]);
    const result = await pool.query(
      "SELECT * FROM playbooks WHERE author_id = ANY($1::int[]) ORDER BY created_at DESC",
      [authorIds]
    );

    res.json(result.rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// export const getUserPlaybooks = async (req: Request, res: Response) => {
//   try {
//     const userId = Number(req.params.userId);
//     const playbooks = await PlaybookService.getPlaybooksByUser(userId);
//     res.json(playbooks);
//   } catch (err: any) {
//     res.status(500).json({ error: err.message });
//   }
// };
// Get playbooks for a specific user
export const getUserPlaybooks = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    if (!userId) return res.status(400).json({ error: "Invalid userId" });

    const result = await pool.query(
      "SELECT * FROM playbooks WHERE user_id = $1 ORDER BY created_at DESC",
      [userId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching user playbooks", err);
    res.status(500).json({ error: "Failed to fetch user playbooks" });
  }
};
