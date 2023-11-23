import { TUser } from "./user.interface"
import { User } from "./user.model"


const createUserIntoDB = async (user: TUser) => {
    const result = await User.create(user);
    return result;
}

const getAllUsersFromDB = async () => {
    const result = await User.find();
    return result;
}

const getSingleUsersFromDB = async (userId: string) => {
    const result = await User.findOne({ userId });
    return result;
}



export const UserServices = {
    createUserIntoDB,
    getAllUsersFromDB,
    getSingleUsersFromDB,
}