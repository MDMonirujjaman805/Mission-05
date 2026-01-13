import express from "express";
// import cors from "cors";

const app = express();

app.use(express.json());

// app.use(
//   cors({
//     origin: process.env.APP_URL || "http://localhost:4000",
//     credentials: true,
//   })
// );

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

export default app;
