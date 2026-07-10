import { Schema, model } from 'mongoose';

const categorySchema = new Schema(
  {
    category: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  {
    versionKey: false,
  },
);

export const Category = model('Category', categorySchema, 'categories');
