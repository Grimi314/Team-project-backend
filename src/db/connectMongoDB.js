import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    const mongoUrl = process.env.MONGO_URL;
    await mongoose.connect(mongoUrl);
    console.log("✅  До бази під'єднались успішно");
  } catch (error) {
    console.error("❌ Неможливо під'єднатись до бази:", error.message);
    process.exit(1); // аварійне завершення програми
  }
};
