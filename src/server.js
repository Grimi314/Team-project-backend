import express from 'express';

import cors from 'cors';
import cookieParser from 'cookie-parser';
import pino from 'pino-http';
import 'dotenv/config';

import { connectMongoDB } from './db/connectMongoDB.js';
import authRoutes from './routes/authRoutes.js';
import { notFoundHandler } from './midelware/notFoundHandler.js';
import { errorHandler } from './midelware/errorHandler.js';
import { errors as celebrateErrors } from 'celebrate';

const app = express();
app.use(logger);
app.use(express.json());

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

app.use(cookieParser());
app.use(pino());

app.use('/api/auth', authRouter);
app.use(userRoutes);
app.use(storyRouter);
app.use(recommendedStoriesRouter);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(authRoutes);

app.use(celebrateErrors());

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Сервер запущено на порту ${PORT}`);
});
