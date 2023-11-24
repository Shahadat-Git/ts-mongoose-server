import { Request, Response } from "express"
import { UserServices } from "./user.service";
import { TUser } from "./user.interface";
import userValidationSchema from "./user.zod.validation";


// user create 
const createUser = async (req: Request, res: Response) => {
    try {
        const user = req.body;
        //validation with zod
        const validUser = await userValidationSchema.parse(user);
        const result = await UserServices.createUserIntoDB(validUser);
        res.status(200).json({
            "success": true,
            "message": "User created successfully!",
            "data": result,
        })
    } catch (error: any) {
        // console.log(error);
        res.status(500).json({
            "success": false,
            "message": 'Unable to create user.',
            "error": {
                "code": 404,
                "description": error.message,
            }
        })
    }
}

// get all users
const getUsers = async (req: Request, res: Response) => {
    try {
        const result = await UserServices.getAllUsersFromDB();
        res.status(200).json({
            'success': true,
            'message': 'Users fetched successfully!',
            'data': result,
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
}

// get single user
const getSingleUser = async (req: Request, res: Response) => {
    try {
        const userId: string = req.params.userId;
        const result = await UserServices.getSingleUsersFromDB(userId);
        res.status(200).json({
            "success": true,
            "message": "User fetched successfully!",
            "data": result,
        })
    } catch (error: any) {
        res.status(500).json({
            'success': false,
            'message': 'User not found',
            'error': {
                'code': 404,
                'description': error.message,
            },
        });

    }
}

// update user using user id & new data
const updateSingleUser = async (req: Request, res: Response) => {
    try {
        const userId: string = req.params.userId;
        const updatedData: TUser = req.body;
        const result = await UserServices.updateSingleUsersToDB(userId, updatedData);
        res.status(200).json({
            'success': true,
            'message': 'User updated successfully!',
            'data': result,
        })
    } catch (error: any) {
        res.status(500).json({
            "success": false,
            "message": 'User not found',
            "error": {
                "code": 404,
                "description": error.message,
            },
        });
    }
}

// user delete
const deleteSingleUser = async (req: Request, res: Response) => {
    try {
        const userId: string = req.params.userId;
        await UserServices.deleteSingleUsersFromDB(userId);
        res.status(200).json({
            "success": true,
            "message": 'User deleted successfully!',
            "data": null,
        });
    } catch (error: any) {
        res.status(500).json({
            "success": false,
            "message": 'User not found',
            "error": {
                "code": 404,
                "description": error.message,
            },
        });
    }
}


export const UserControllers = {
    createUser,
    getUsers,
    getSingleUser,
    updateSingleUser,
    deleteSingleUser
}