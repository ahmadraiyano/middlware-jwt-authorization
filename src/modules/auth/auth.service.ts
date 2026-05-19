import bcrypt from "bcryptjs"
import { pool } from "../../db"
import jwt from "jsonwebtoken"
import config from "../../config"

const createLoginIntoDB = async (payload: { email: string, password: string }) => {
    const { email, password } = payload

    const userData = await pool.query(`
        SELECT * FROM users WHERE email = $1
        `, [email])

    if (userData.rows.length === 0) {
        throw new Error("Invalid Credentials")
    }

    const user = userData.rows[0]

    const matchPassword = await bcrypt.compare(password, user.password)
    if (!matchPassword) {
        throw new Error("Invalid Credentials")
    }

    const jwtPayload = {
        id: user.id,
        name: user.name,
        role: user.role,
        is_active: user.is_active,
        email: user.email
    }

    const accessToken = jwt.sign(jwtPayload, config.secret as string, {expiresIn: "1d"})
    const refreshToken = jwt.sign(jwtPayload, config.refresh_secret as string, {expiresIn: "1d"})

    return {accessToken, refreshToken}
}

export const authService = {
    createLoginIntoDB
}