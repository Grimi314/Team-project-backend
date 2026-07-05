import { Schema } from "mongoose";
import { model } from "mongoose";

const storySchema = new Schema(
  {
    img: { type: String },
    ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
export const Story = model("Story", storySchema, "articles");
