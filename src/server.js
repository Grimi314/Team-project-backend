import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import pino from "pino-http";
import "dotenv/config";

import { connectMongoDB } from "./db/connectMongoDB.js";
import authRoutes from "./routes/authRoutes.js";
import { notFoundHandler } from "./midelware/notFoundHandler.js";
import { errorHandler } from "./midelware/errorHandler.js";

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use(pino());

app.use(authRoutes);

// TODO (команда): app.use(userRoutes); app.use(storyRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
