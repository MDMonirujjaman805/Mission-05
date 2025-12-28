import express from "express";
import { postControllers } from "./post.controllers.js";

const router = express.Router();

router.post("/", postControllers.createPost);
export const postRouter = router;
