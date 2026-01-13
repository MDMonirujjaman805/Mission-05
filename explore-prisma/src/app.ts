import express from "express";
import cors from "cors";

const app = express();

/* middlewares */
app.use(express.json());

app.use(
  cors({
    origin: process.env.APP_URL || "http://localhost:4000",
    credentials: true,
  })
);

/* routes */
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// console.log("🔥 app.ts loaded");

export default app;

// import postRouter from "./modules/post/post.routes.js";
// import { toNodeHandler } from "better-auth/node";
// import { auth } from "./lib/auth.js";

// app.all("/api/auth/*splat", toNodeHandler(auth));

// app.use("/posts", postRouter);

// import express, { Application, Request, Response } from "express";
// import cors from "cors";

// const app: Application = express();

// /* ------------------ Middlewares ------------------ */
// app.use(
//   cors({
//     origin: "http://localhost:5173", // frontend url
//     credentials: true,
//   })
// );

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// /* ------------------ Health Check ------------------ */
// app.get("/", (req: Request, res: Response) => {
//   res.status(200).json({
//     success: true,
//     message: "🔥 Server is running",
//   });
// });

// /* ------------------ Routes ------------------ */
// // app.use("/api", router);

// /* ------------------ 404 Handler ------------------ */
// app.use((req: Request, res: Response) => {
//   res.status(404).json({
//     success: false,
//     message: "Route not found",
//   });
// });

// export default app;
