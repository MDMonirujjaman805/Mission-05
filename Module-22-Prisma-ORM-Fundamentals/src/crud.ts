import { prisma } from "./lib/prisma.js";

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "Mahdi Hasan",
      email: "mahdi@example.com",
      posts: {
        create: {
          title: "My Second Post",
          content: "This is the content of my second post.",
          published: true,
        },
      },
    },
    include: {
      posts: true,
    },
  });
  console.log("Created user:", user);

  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
    },
  });
  console.log("All users:", JSON.stringify(allUsers, null, 2));
}
main();
