import cors from "cors";
import app from "./app.js";
import express from "express";
import { prisma } from "./lib/prisma.js";

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

async function main() {
  console.log("Server is up and running...");
  try {
    await prisma.$connect();
    console.log("Connected to the database successfully.");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error during server initialization:", error);
    process.exit(1);
  }
}

export default main();
