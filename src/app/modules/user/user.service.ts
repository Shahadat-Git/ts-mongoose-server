import { TUser } from "./user.interface"
import { User } from "./user.model"


// user create to db
const createUserIntoDB = async (user: TUser) => {
    if (await User.isUserExists(user.userId)) {
        throw new Error('User ID already Exists');
    } else if (await User.isEmailExists(user.username)) {
        throw new Error('User Name already Exists');
    }
    const result = await User.create(user);
    const dataWithoutPassword = await User.findById(result._id).select({
        password: 0,
        _id: 0
    });

    return dataWithoutPassword;
}

// get all users
const getAllUsersFromDB = async () => {
    const result = await User.find({},
        {
            _id: 0,
            username: 1,
            fullName: 1,
            age: 1,
            email: 1,
            address: 1
        }
    );
    return result;
}

// get single user
const getSingleUsersFromDB = async (userId: string) => {
    if (await User.isUserDoNotExists(Number(userId))) {
        throw new Error('User does not exist');
    }

    const result = await User.findOne({ userId }).select({ password: 0, _id: 0 });
    return result;
}

const updateSingleUsersToDB = async (userId: string, updatedData: TUser) => {
    if (await User.isUserDoNotExists(Number(userId))) {
        throw new Error('User does not exist');
    }
    const result = await User.findOneAndUpdate({ userId }, updatedData, { new: true }).select({ password: 0 });
    return result;
}

const deleteSingleUsersFromDB = async (userId: string) => {
    if (await User.isUserDoNotExists(Number(userId))) {
        throw new Error('User does not exist');
    }
    const result = await User.deleteOne({ userId });
    return result;
}



export const UserServices = {
    createUserIntoDB,
    getAllUsersFromDB,
    getSingleUsersFromDB,
    updateSingleUsersToDB,
    deleteSingleUsersFromDB
}