import express, { NextFunction, Request, Response } from "express";
import { postControllers } from "./post.controllers.js";

const router = express.Router();

const auth = (...roles: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    console.log("middleware connecting.........");
    next();
  };
};

router.post("/", auth("ADMIN", "USER"), postControllers.createPost);
export const postRouter = router;
