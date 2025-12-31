import { Router } from "express";
import { postControllers } from "./post.controllers.js";

const router = Router();

router.post("/", postControllers.createPost);

export default router;
