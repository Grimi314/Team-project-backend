import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectMongoDB } from "./db/connectMongoDB.js";
import { logger } from "./middleware/logger.js";
import { errorHandler } from "./middleware/errorHandler.js";
import pino from "pino-http";

import userRoutes from "./routes/userRoutes.js";
import storyRouter from "./routes/storyRoutes.js";
import cookieParser from "cookie-parser";

import authRouter from "./routes/authRoutes.js";


const app = express();

app.use(logger);
app.use(express.json());

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(userRoutes);

app.use(cookieParser());
app.use(pino());
app.use(storyRouter);


app.use("/api/auth", authRouter);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`сервер запущена на порті ${PORT}`);
});
