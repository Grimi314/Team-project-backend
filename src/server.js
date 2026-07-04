import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import pino from "pino-http";
import "dotenv/config";

import { connectMongoDB } from "./db/connectMongoDB.js";
import  storiesRouter from "./routes/storyRoutes.js"
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

app.use("/api/stories", storiesRouter);

const PORT = process.env.PORT || 3000;

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
