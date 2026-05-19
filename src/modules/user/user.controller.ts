import type { Request, Response } from "express"
import { userService } from "./user.service"

const createUser = async (req: Request, res: Response) => {
    try {
        const result = await userService.createUserIntoDB(req.body)
        res.status(200).json({
            success: true,
            message: "user created successfully",
            data: result.rows[0]
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        })
    }
}

const getAllUsers = async (req: Request, res: Response) => {
    try {
        console.log(req.user);
        const result = await userService.getAllUsersFromDB()
        res.status(200).json({
            success: true,
            message: "users data retrieved successfully",
            data: result.rows
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        })
    }
}

const getSingleUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const result = await userService.getSingleUserFromDB(id as string)
        // console.log(result);
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "users data does not exist"
            })
        }
        // console.log(result);
        res.status(200).json({
            success: true,
            message: "users data retrieved successfully",
            data: result.rows
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        })
    }
}

const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const result = await userService.updateUserToDB(req.body, id as string)
        // console.log(result);
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "users data does not exist"
            })
        }
        res.status(200).json({
            success: true,
            message: "users data updated successfully",
            data: result.rows[0]
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        })
    }
}

const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const result = await userService.deleteUserFromDB(id as string)
        // console.log(result);
        if (result.rowCount === 0) {
            return res.status(404).json({
                success: false,
                message: "users data does not exist"
            })
        }
        res.status(200).json({
            success: true,
            message: "users data deleted successfully"
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        })
    }
}

export const userController = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser
}