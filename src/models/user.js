import { Schema, model } from 'mongoose';

const userSchema = new Schema(
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
      trim: true,
      sparse: true,

      lowercase: true,
      maxlength: 64,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    avatarUrl: {
      type: String,
      default: null,
    },
    savedArticles: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Story',
      },
    ],
  },
  { timestamps: true },
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const User = model('User', userSchema);
