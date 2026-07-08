<<<<<<< HEAD
import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
=======
import { Schema, model } from 'mongoose';

const sessionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
>>>>>>> 85fab6f23b6f5d2adc7a8668559cbf28da14e53f
      required: true,
    },
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    accessTokenValidUntil: {
      type: Date,
      required: true,
    },
    refreshTokenValidUntil: {
      type: Date,
      required: true,
    },
  },
<<<<<<< HEAD
  { timestamps: true },
);

export const Session = mongoose.model("Session", sessionSchema);
=======
  {
    timestamps: true,
  },
);

export const Session = model('Session', sessionSchema);
>>>>>>> 85fab6f23b6f5d2adc7a8668559cbf28da14e53f
