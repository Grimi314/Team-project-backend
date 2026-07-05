import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectMongoDB } from "./db/connectMongoDB.js";
import { logger } from "./middleware/logger.js";
import authRouter from "./routes/authRoutes.js";
import recommendedStoriesRouter from "./routes/recommendedStoriesRoutes.js";
import storyRouter from "./routes/storyRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(logger);
app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(cookieParser());

app.use(userRoutes);
app.use(storyRouter);
app.use("/api/stories", recommendedStoriesRouter);
app.use("/api/auth", authRouter);

const PORT = process.env.PORT || 3000;

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`сервер запущена на порті ${PORT}`);
});
