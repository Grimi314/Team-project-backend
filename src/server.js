import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import pino from "pino-http";
import "dotenv/config";

import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errorHandler } from "./middleware/errorHandler.js";

import { connectMongoDB } from "./db/connectMongoDB.js";

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

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
