import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
  name: { type: String, required: true, trim: true } ,
  email: { type: String, required: true, trim: true, unique: true, lowercase: true },
  password: { type: String, required: true, trim: true },
  avatarUrl: { type: String, default: '' },
  articlesAmount: { type: Number, default: 0 },
  savedArticles: { type: [Schema.Types.ObjectId], ref: 'Arcticle' }
},
  { timestamps: true },
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const User = model('User', userSchema);
