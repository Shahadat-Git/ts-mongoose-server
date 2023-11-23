import { Request, Response } from "express"
import { UserServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
    try {
        const user = req.body;
        const result = await UserServices.createUserIntoDB(user);
        res.status(200).json({
            "success": true,
            "message": "User created successfully!",
            "data": result,
        })
    } catch (error) {
        // console.log(error);
        res.status(500).json(error)
    }
}

const getUsers = async (req: Request, res: Response) => {
    try {
        const result = await UserServices.getAllUsersFromDB();
        res.status(200).json({
            "success": true,
            "message": "User created successfully!",
            "data": result,
        })
    } catch (error) {
        // console.log(error);
        res.status(500).json(error)
    }
}

const getSingleUser = async (req: Request, res: Response) => {
    try {
        const userId: string = req.params.userId;
        const result = await UserServices.getSingleUsersFromDB(userId);
        res.status(200).json({
            "success": true,
            "message": "User created successfully!",
            "data": result,
        })
    } catch (error) {
        // console.log(error);
        res.status(500).json(error)
    }
}


export const UserControllers = {
    createUser,
    getUsers,
    getSingleUser,
}