import { prisma } from "./lib/prisma.js";

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "abdullah@example.com" },
    update: {
      posts: {
        create: [
          {
            id: crypto.randomUUID(),
            title: "New post for existing user",
            content: "This is content for post,from Amatullah ayat.",
          },
        ],
      },
    },
    create: {
      id: crypto.randomUUID(),
      name: "Abdullah anas",
      email: "abdullah@example.com",
      phone: "98765443",
      role: "USER",
      posts: {
        create: [
          {
            title: "Hello World",
            content: "This is my first post! from Abdullah.",
          },
        ],
      },
    },
    include: { posts: true },
  });
  // console.log("Created user:", user);

  // Fetch all users with their posts
  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
    },
  });
  // console.log("All users:", JSON.stringify(allUsers, null, 2));
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


// console.log(prisma.$connect());