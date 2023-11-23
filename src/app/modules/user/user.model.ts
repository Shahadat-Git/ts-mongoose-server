import { Schema, model } from 'mongoose';
import { TAddress, TFullName, TUser } from './user.interface';



const fullNameSchema = new Schema<TFullName>({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    }
})

const address = new Schema<TAddress>({
    street: {
        type: String,
    },
    city: {
        type: String,
    },
    country: {
        type: String,
    }
})

const userSchema = new Schema<TUser>({
    userId: {
        type: Number,
        unique: true,
    },
    username: {
        type: String,
        required: [true, "Username Required! "],
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
        type: [String]
    },
    address: address,


});

export const User = model<TUser>("User", userSchema);