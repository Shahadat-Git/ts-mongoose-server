/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { UserServices } from './user.service';
import { TUser } from './user.interface';
import userValidationSchema, { ordersValidationSchema } from './user.zod.validation';

// user create
const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    //validation with zod
    const validUser = await userValidationSchema.parse(user);
    const result = await UserServices.createUserIntoDB(validUser);
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error: any) {
    // console.log(error);
    res.status(500).json({
      success: false,
      message: 'Unable to create user.',
      error: {
        code: 404,
        description: error.message,
      },
    });
  }
};

// get all users
const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch all users!',
      error: {
        code: 404,
        description: 'Failed to fetch all users!',
      },
    });
  }
};

// get single user
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params.userId;
    const result = await UserServices.getSingleUsersFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: error.message,
      },
    });
  }
};

// update user using user id & new data
const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params.userId;
    const updatedData: TUser = req.body;
    const result = await UserServices.updateSingleUsersToDB(
      userId,
      updatedData,
    );
    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: error.message,
      },
    });
  }
};

// user delete
const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params.userId;
    await UserServices.deleteSingleUsersFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: error.message,
      },
    });
  }
};

// add order
const addOrder = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params.userId;
    const orderData = req.body;
    const ValidOrderData = await ordersValidationSchema.parse(orderData);

    await UserServices.addOrderToDB(userId, ValidOrderData);
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: {
        code: 404,
        description: error.message,
      },
    });
  }
};

// get orders
const getOrders = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params.userId;
    const orders = await UserServices.getOrderFromDB(userId);
    res.json({
      success: true,
      message: 'Order fetched successfully!',
      data: orders,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: error.message,
      },
    });
  }
};

// calculate total orders
const calculateTotalOrders = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params.userId;
    const result = await UserServices.getOrderDetailsFromDB(Number(userId));
    res.json({
      success: true,
      message: 'Total price calculated successfully!',
      data: {
        TotalPrice: result,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: error.message,
      },
    });
  }
};

export const UserControllers = {
  createUser,
  getUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
  addOrder,
  getOrders,
  calculateTotalOrders,
};
