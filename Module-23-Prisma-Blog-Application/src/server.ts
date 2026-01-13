import app from "./app.js";
import { prisma } from "./lib/prisma.js";

const PORT = Number(process.env.PORT) || 3000;

async function startServer() {
  try {
    console.log("⏳ Starting server...");

    await prisma.$connect();
    console.log("✅ Connected to the database");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server failed to start:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

startServer();
