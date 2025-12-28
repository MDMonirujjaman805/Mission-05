import app from "./app.js";
import { prisma } from "../lib/prisma.js";
import express from "express";

const PORT = process.env.PORT || 3000;

app.use(express.json());

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
