/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import {
  TAddress,
  TFullName,
  TOrders,
  TUser,
  UserModel,
} from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const fullNameSchema = new Schema<TFullName>({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
});

const addressSchema = new Schema<TAddress>({
  street: {
    type: String,
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
});

const ordersSchema = new Schema<TOrders>({
  productName: {
    type: String,
  },
  price: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
});

const userSchema = new Schema<TUser, UserModel>({
  userId: {
    type: Number,
    unique: true,
  },
  username: {
    type: String,
    required: [true, 'Username Required! '],
  },
  password: {
    type: String,
  },
  fullName: fullNameSchema,
  age: {
    type: Number,
  },
  email: {
    type: String,
  },
  isActive: {
    type: Boolean,
  },
  hobbies: {
    type: [String],
  },
  address: addressSchema,
  orders: {
    type: [ordersSchema],
  },
});

// middleware

// password hashing
userSchema.pre('save', async function (this: TUser, next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// existing user check
userSchema.statics.isUserExists = async function (userId: number) {
  const existedUser = await User.findOne({ userId });
  return existedUser;
};
userSchema.statics.isEmailExists = async function (username: string) {
  const existedUsername = await User.findOne({ username });
  return existedUsername;
};
userSchema.statics.isUserDoNotExists = async function (userId: number) {
  const existedUser = await User.findOne({ userId });
  return existedUser === null;
};

export const User = model<TUser, UserModel>('User', userSchema);
