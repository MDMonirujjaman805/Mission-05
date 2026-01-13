import { prisma } from "@/lib/prisma.js";
import { Post } from "@prisma/client";

const createPost = async (
  data: Omit<Post, "id" | "createdAt" | "updatedAt" | "authorId">,
  userId: string
) => {
  const result = await prisma.post.create({
    data: {
      ...data,
      authorId: userId, // 👈 fix here
      // authorId: Number(userId), // 👈 fix here
    },
  });

  return result;
};
export const postServices = {
  createPost,
};
