import type { Request, Response } from "express";
import { authService } from "./auth.service";

const createLogin = async (req: Request, res: Response) =>{
try {
    const result = await authService.createLoginIntoDB(req.body)

    const {refreshToken} = result

    res.cookie("refreshToken", refreshToken, {
        secure: false, // true in production
        httpOnly: true,
        sameSite: "lax"
    })

    res.status(200).json({
        success: true,
        message: "user logged in successfully",
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