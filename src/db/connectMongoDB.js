<<<<<<< HEAD
import mongoose from "mongoose";

export const connectMongoDB = async () => {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("MongoDB connected");
=======
import mongoose from 'mongoose';

export const connectMongoDB = async () => {
  await mongoose.connect(process.env.MONGO_URL);
  console.log('MongoDB connected');
>>>>>>> 85fab6f23b6f5d2adc7a8668559cbf28da14e53f
};
