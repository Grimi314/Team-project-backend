import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import pino from "pino-http";
import "dotenv/config";

import { errors } from "celebrate";
import storyRouter from "./routes/storyRoutes.js";
import { connectMongoDB } from "./db/connectMongoDB.js";




import authRouter from './routes/authRoutes.js';

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(pino());
app.use(storyRouter);

app.use(errors);

app.use('/api/auth', authRouter);

const PORT = process.env.PORT || 3000;

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`сервер запущена на порті ${PORT}`);
});
