import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import pino from 'pino-http';

import { connectMongoDB } from './db/connectMongoDB.js';
import recommendedStoriesRouter from './routes/recommendedStoriesRoutes.js';
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

app.use('/api/auth', authRouter);
app.use('/api/stories', recommendedStoriesRouter);

const PORT = process.env.PORT || 3000;

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`сервер запущена на порті ${PORT}`);
});
