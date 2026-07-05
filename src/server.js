import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import pino from 'pino-http';

import { connectMongoDB } from "./db/connectMongoDB.js";
import  storiesRouter from "./routes/storyRoutes.js"
import { connectMongoDB } from './db/connectMongoDB.js';
import authRouter from './routes/authRoutes.js';

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
app.use('/api/auth', authRouter);

const PORT = process.env.PORT || 3000;

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
