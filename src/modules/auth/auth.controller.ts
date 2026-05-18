import type { Request, Response } from "express";
import { authService } from "./auth.service";

const createLogin = async (req: Request, res: Response) =>{
try {
    const result = await authService.createLoginIntoDB(req.body)
    res.status(200).json({
        success: true,
        message: "user retrieved successfully",
        data: result
    })
} catch (error: any) {
    res.status(500).json({
        status: false,
        message: error.message,
        error: error
    })
}
}

export const authController = {
    createLogin
}