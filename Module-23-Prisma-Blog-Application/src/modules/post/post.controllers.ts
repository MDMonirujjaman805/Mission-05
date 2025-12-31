import { Request, Response } from "express";
import { postServices } from "./post.services.js";

const createPost = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        error: "Unauthorized............",
      });
    }

    const result = await postServices.createPost(
      req.body,
      user.id
      // Number(user.id) // if Prisma expects number
    );

    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({
      error: "Post creation failed",
    });
  }
};

export const postControllers = {
  createPost,
};
