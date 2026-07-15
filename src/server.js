import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import pino from 'pino-http';
import fs from 'fs';
import path from 'path';

// Імпортуємо модуль відображення Swagger
import swaggerUi from 'swagger-ui-express';

import { logger } from './middleware/logger.js';

import { connectMongoDB } from './db/connectMongoDB.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

import storyRouter from './routes/storyRoutes.js';

import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import { errors as celebrateErrors } from 'celebrate';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(pino());
app.use(logger);

const swaggerPath = path.resolve('src/swagger.json');
const completeSwaggerSpec = JSON.parse(fs.readFileSync(swaggerPath, 'utf8'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(completeSwaggerSpec));

app.use(authRoutes);
app.use(userRoutes);

app.use(storyRouter);

app.use(celebrateErrors());
app.use(notFoundHandler);
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Сервер запущено на порту ${PORT}`);
});
