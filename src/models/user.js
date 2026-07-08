<<<<<<< HEAD
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
=======
import { Schema, model } from 'mongoose';

const userSchema = new Schema(
>>>>>>> 85fab6f23b6f5d2adc7a8668559cbf28da14e53f
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32,
    },
    email: {
      type: String,
      required: true,
      unique: true,
<<<<<<< HEAD
      trim: true,
=======
      sparse: true,
      trim: true,
      lowercase: true,
>>>>>>> 85fab6f23b6f5d2adc7a8668559cbf28da14e53f
      maxlength: 64,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
<<<<<<< HEAD
    },
    avatar: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const User = mongoose.model("User", userSchema);
=======
      maxlength: 128,
    },
    avatarUrl: {
      type: String,
      default: '',
    },
    articlesAmount: {
      type: Number,
      default: 0,
    },
    savedArticles: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Article',
      },
    ],
  },
  {
    timestamps: true,
  },
);

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

export const User = model('User', userSchema);
>>>>>>> 85fab6f23b6f5d2adc7a8668559cbf28da14e53f
