import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import pino from "pino-http";
import "dotenv/config";

import { errors } from "celebrate";
import swaggerUi from "swagger-ui-express";

import storyRouter from "./routes/storyRoutes.js";
import { connectMongoDB } from "./db/connectMongoDB.js";
import { swaggerSpec } from "./docs/swagger.js";

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

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(storyRouter);

app.use(errors());

const PORT = process.env.PORT || 3000;

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Сервер запущено на порті ${PORT}`);
});
