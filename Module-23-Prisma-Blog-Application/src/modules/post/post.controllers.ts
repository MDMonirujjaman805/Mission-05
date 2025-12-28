import { Request, Response } from "express";
import { postServices } from "./post.services.js";

const createPost = async (req: Request, res: Response) => {
//   res.send("Create a new post");
//   console.log({ req, res });
    try {   
    const postData = req.body;
    // Call the service to create a new post
    const newPost = await postServices.createPost(postData);
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error in createPost controller:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const postControllers = {
  createPost,
};
