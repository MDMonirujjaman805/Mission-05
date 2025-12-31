import { prisma } from "@/lib/prisma.js";
import { Post } from "@prisma/client";
// import { prisma } from "../../../lib/prisma.js";


const createPost = async (
  data: Omit<Post, "id" | "createdAt" | "updatedAt">
) => {
  console.log("Create a new post");
  try {
    const result = await prisma.post.create({
      data,
    });
    return result;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const postServices = {
  createPost,
};
