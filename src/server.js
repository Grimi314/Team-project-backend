
import cors from 'cors';
import express from 'express';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import { errors as celebrateErrors } from 'celebrate';
import { connectMongoDB } from './db/connectMongoDB.js';
import authRoutes from './routes/authRoutes.js';







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
