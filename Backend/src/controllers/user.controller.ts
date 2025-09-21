import { Request, Response } from "express";
import * as UserService from "../services/user.service";
import cloudinary from "../config/cloudinary";
import { pool } from "../config/database";

export const getMyProfile = async (req: Request & { user?: any }, res: Response) => {
  try {
    const userId = Number(req.user?.id);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });
    const user = await UserService.getUserById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (!user.fullName) user.fullName = "Anonymous";

    res.json(user);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const updateMyProfile = async (req: Request & { user?: any }, res: Response) => {
  try {
    const userId = Number(req.user?.id);
    console.log("Decoded userId:", userId);
    console.log("Request body:", req.body);

    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { fullName, position, aboutWork, profilePic } = req.body;

    const updated = await UserService.updateUser(userId, {
      fullName: fullName ?? undefined,
      position: position ?? undefined,
      aboutWork: aboutWork ?? undefined,
      profilePic: profilePic ?? undefined,
    });

    console.log("Updated user:", updated);
    res.json(updated);
  } catch (err: any) {
    console.error("Update profile failed:", err);  
    res.status(500).json({ error: err.message });
  }
};


export const uploadAvatar = async (req: Request & { user?: any }, res: Response) => {
  try {
    const userId = Number(req.user?.id);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    // upload to Cloudinary with folder
    const folder = process.env.CLOUDINARY_FOLDER || "avatars";
    const result = await cloudinary.uploader.upload_stream(
      { folder, resource_type: "image", transformation: [{ width: 800, crop: "limit" }] },
      async (error, uploadResult) => {
      }
    );
    const streamUpload = (fileBuffer: Buffer) =>
      new Promise<any>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ folder, resource_type: "image" }, (error, result) => {
          if (error) return reject(error);
          resolve(result);
        });
        stream.end(fileBuffer);
      });

    const uploadResult: any = await streamUpload(req.file.buffer);
    const imageUrl = uploadResult.secure_url;

    // Save to user
    const updated = await UserService.updateUser(userId, { profilePic: imageUrl });
    res.json({ avatarUrl: imageUrl, user: updated });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};


export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id; 
    const { fullName, email } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "User ID missing" });
    }

    const result = await pool.query(
      "UPDATE users SET full_name = $1, email = $2 WHERE id = $3 RETURNING id, full_name, email",
      [fullName, email, userId]
    );

    return res.json(result.rows[0]);
  } catch (err: any) {
    console.error("Error updating profile:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserService.getAllUsers();
    res.json(users);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Follow user
export const follow = async (req: Request & { user?: any }, res: Response) => {
  try {
    const followerId = Number(req.user?.id); // logged-in user
    const followingId = Number(req.params.userId); // the target user
   console.log("FOLLOW DEBUG:", { followerId, followingId });
    if (!followerId || !followingId) {
      return res.status(400).json({ error: "Invalid follower or following ID" });
    }

    await UserService.followUser(followerId, followingId);
    res.json({ message: "Followed successfully" });
  }catch (err: any) {
  console.error("Follow error:", err);
    const status = err.status || 500;
    res.status(status).json({ error: err.message || "Internal Server Error" });

}

};

// Unfollow user
export const unfollow = async (req: Request & { user?: any }, res: Response) => {
  try {
    const followerId = Number(req.user?.id) || Number(req.body.followerId);
    const followingId = Number(req.params.userId);
    if (!followerId || !followingId) return res.status(400).json({ error: "Missing user ids" });

    await UserService.unfollowUser(followerId, followingId);

    const following = await UserService.getFollowingIds(followerId);
    res.json({ message: "Unfollowed successfully", following });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getFollowing = async (req: Request & { user?: any }, res: Response) => {
  try {
    const userId = Number(req.user?.id) || Number(req.query.userId);
    if (!userId) return res.status(400).json({ error: "Missing user id" });

    const following = await UserService.getFollowingIds(userId);
    res.json(following);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE USER
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

    if (user.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete the user
    await pool.query("DELETE FROM users WHERE id = $1", [id]);

    res.json({ message: "User deleted successfully" });
  } catch (err: any) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};
