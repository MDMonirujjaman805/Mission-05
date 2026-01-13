import { prisma } from "./lib/prisma";

async function main() {
  const newUser = await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice@prisma.io",
    },
  });
  console.log("Created user:", newUser);

  const allUsers = await prisma.user.findMany();
  console.log("All users:", allUsers);
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
