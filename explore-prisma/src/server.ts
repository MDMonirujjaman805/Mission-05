// import app from "./app.js";
// import express from "express";
// import { prisma } from "./lib/prisma.js";

// const PORT = process.env.PORT || 3000;

// app.use(express.json());

// async function main() {
//   console.log("Server is up and running...");
//   try {
//     await prisma.$connect();
//     console.log("Connected to the database successfully.");
//     app.listen(PORT, () => {
//       console.log(`Server is running on http://localhost:${PORT}`);
//     });
//   } catch (error) {
//     await prisma.$disconnect();
//     console.error("Error during server initialization:", error);
//     process.exit(1);
//   }
// }

// export default main();

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


// import cors from "cors";

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );

// import app from "./app.js";
// import { prisma } from "./lib/prisma.js";
// // import prisma from "./config/prisma.js";

// const PORT = Number(process.env.PORT) || 3000;

// async function main() {
//   try {
//     await prisma.$connect();
//     console.log("✅ Database connected");

//     app.listen(PORT, () => {
//       console.log(`🚀 Server running on http://localhost:${PORT}`);
//     });
//   } catch (error) {
//     console.error("❌ Failed to start server", error);
//   }
// }

// main();
