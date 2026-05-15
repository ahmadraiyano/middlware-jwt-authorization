import express, { type Application, type Request, type Response } from "express"

import { pool } from "./db"
const app: Application = express()

app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({ extended: true }))




app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "app is running"
    })
})

app.post("/api/users", async (req: Request, res: Response) => {
    try {
        const { name, email, password, age } = req.body
        const result = await pool.query(`
        INSERT INTO users(name,email,password,age)
        VALUES ($1,$2,$3, $4)
        RETURNING *
        `, [name, email, password, age])
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
})

app.get("/api/users", async (req: Request, res: Response) => {
    try {
        const result = await pool.query(`
        SELECT * FROM users
        `)
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
})
app.get("/api/users/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const result = await pool.query(`
        SELECT * FROM users
        WHERE id = $1
        `, [id])
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
})
app.put("/api/users/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { name, password, is_active, age } = req.body
        const result = await pool.query(`
        UPDATE users 
        SET
            name = COALESCE($1, name), 
            password = COALESCE($2, password), 
            is_active = COALESCE($3, is_active), 
            age = COALESCE($4, age),
            updated_at = NOW()
        WHERE id = $5
        RETURNING *
        `, [name, password, is_active, age, id])
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
})
app.delete("/api/users/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const result = await pool.query(`
        DELETE FROM users 
        WHERE id = $1
        `, [id])
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
})

export default app