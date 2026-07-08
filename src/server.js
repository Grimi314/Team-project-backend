import express from "express";
<<<<<<< HEAD
import cors from "cors";
import cookieParser from "cookie-parser";
import pino from "pino-http";
import "dotenv/config";

import { connectMongoDB } from "./db/connectMongoDB.js";
import authRoutes from "./routes/authRoutes.js";
import { notFoundHandler } from "./midelware/notFoundHandler.js";
import { errorHandler } from "./midelware/errorHandler.js";

const app = express();

=======
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import pino from "pino-http";

import { connectMongoDB } from "./db/connectMongoDB.js";
import { logger } from "./middleware/logger.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";

import authRouter from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import storyRouter from "./routes/storyRoutes.js";
import recommendedStoriesRouter from "./routes/recommendedStoriesRoutes.js";

const app = express();

app.use(logger);
app.use(express.json());
>>>>>>> 85fab6f23b6f5d2adc7a8668559cbf28da14e53f
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

<<<<<<< HEAD
app.use(express.json());
app.use(cookieParser());
app.use(pino());

app.use(authRoutes);

// TODO (команда): app.use(userRoutes); app.use(storyRoutes);
=======
app.use(cookieParser());
app.use(pino());

app.use("/api/auth", authRouter);
app.use(userRoutes);
app.use(storyRouter);
app.use(recommendedStoriesRouter);


>>>>>>> 85fab6f23b6f5d2adc7a8668559cbf28da14e53f

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

await connectMongoDB();

app.listen(PORT, () => {
<<<<<<< HEAD
  console.log(`Server is running on port ${PORT}`);
=======
  console.log(`сервер запущена на порті ${PORT}`);
>>>>>>> 85fab6f23b6f5d2adc7a8668559cbf28da14e53f
});
