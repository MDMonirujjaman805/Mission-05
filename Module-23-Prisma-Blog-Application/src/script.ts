// import { User } from "./../generated/prisma/models/User";
// import { User } from "./lib/prisma.js src/lib/prisma/prisma/models/User.js";
import { User } from "../lib/prisma.js";
import { prisma } from "../lib/prisma.js";

async function main() {
  // Create a new user with a post
  const user = await prisma.User.create({
    data: {
      name: "Mahdi",
      email: "mahdi@example.com",
      posts: {
        create: [
          {
            title: "Hello World",
            content: "This is my first post!",
            thumbnail: "https://example.com/thumbnail.jpg",
            isFeatured: true,
            status: "PUBLISHED",
            tags: ["introduction", "hello"],
            views: 100,
            published: true,
          },
        ],
      },
    },
    include: {
      posts: true,
    },
  });
  console.log("Created user:", user);

  // Fetch all users with their posts
  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
    },
  });
  console.log("All users:", JSON.stringify(allUsers, null, 2));
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

console.log("DB URL =", process.env.DATABASE_URL);
