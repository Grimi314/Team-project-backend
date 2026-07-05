import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const storySchema = new Schema(
  {
    img: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 40,
    },
    article: {
      type: String,
      required: true,
      trim: true,
      minlength: 12,
      maxlength: 3000,
    },
    category: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    rate: {
      type: Number,
      default: 0,
      min: 0,
      index: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

export const Story = models.Story || model("Story", storySchema, "articles");
