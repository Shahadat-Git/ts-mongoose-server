import { TOrders, TUser } from './user.interface';
import { User } from './user.model';

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
        _id: 0,
        orders: 0,
    });

    return dataWithoutPassword;
};

// get all users
const getAllUsersFromDB = async () => {
    const result = await User.find(
        {},
        {
            _id: 0,
            username: 1,
            fullName: 1,
            age: 1,
            email: 1,
            address: 1,
        },
    );
    return result;
};

// get single user
const getSingleUsersFromDB = async (userId: string) => {
    if (await User.isUserDoNotExists(Number(userId))) {
        throw new Error('User does not exist');
    }

    const result = await User.findOne({ userId }).select({ password: 0, _id: 0 });
    return result;
};

// update user
const updateSingleUsersToDB = async (userId: string, updatedData: TUser) => {
    if (await User.isUserDoNotExists(Number(userId))) {
        throw new Error('User does not exist');
    }
    const result = await User.findOneAndUpdate({ userId }, updatedData, {
        new: true,
    }).select({ password: 0 });
    return result;
};

// delete user
const deleteSingleUsersFromDB = async (userId: string) => {
    if (await User.isUserDoNotExists(Number(userId))) {
        throw new Error('User does not exist');
    }
    const result = await User.deleteOne({ userId });
    return result;
};

// add user order
const addOrderToDB = async (userId: string, orderData: TOrders) => {
    if (await User.isUserDoNotExists(Number(userId))) {
        throw new Error('User does not exist');
    }
    const user = await User.findOne({ userId });

    if (!user) {
        throw new Error('User not found!');
    }

    if (user.orders) {
        user.orders.push(orderData);
    } else {
        user.orders = [orderData];
    }
    const result = await user.save();
    return result;
};

// get user order
const getOrderFromDB = async (userId: string) => {
    if (await User.isUserDoNotExists(Number(userId))) {
        throw new Error('User does not exist');
    }
    const result = await User.findOne({ userId }, { orders: 1, _id: 0 })
    return result;
};

// calculate user order price
const getOrderDetailsFromDB = async (userId: number) => {
    if (await User.isUserDoNotExists(Number(userId))) {
        throw new Error('User does not exist');
    }
    const result = await User.aggregate([
        { $match: { userId } },
        { $unwind: '$orders' },
        {
            $group: {
                _id: null,
                totalPrice: {
                    $sum: { $multiply: ['$orders.price', '$orders.quantity'] },
                },
            },
        },
        { $project: { _id: 0, totalPrice: 1 } },
    ]);
    const totalPrice = result[0]?.totalPrice;
    return totalPrice || 0;
};

export const UserServices = {
    createUserIntoDB,
    getAllUsersFromDB,
    getSingleUsersFromDB,
    updateSingleUsersToDB,
    deleteSingleUsersFromDB,
    addOrderToDB,
    getOrderFromDB,
    getOrderDetailsFromDB,
};
