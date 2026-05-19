import express, { type Application, type Request, type Response } from "express"
import { userRoute } from "./modules/user/user.route"
import { profileRoute } from "./modules/profile/profile.route"
import { authRoute } from "./modules/auth/auth.route"
import fs from "fs"
const app: Application = express()

app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({ extended: true }))

app.use((req,res,next)=>{
    console.log("date", Date.now() , "\nurl", req.url, "\nmethod", req.method);
    const log = `\nmethod -> ${req.method}, time -> ${Date.now()}, URL -> ${req.url}\n`
    fs.appendFile("logger.txt", log,(err)=>{
        console.log(err);
    })
    next()
})




app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "app is running"
    })
})

app.use("/api/users", userRoute)
app.use("/api/profile", profileRoute)
app.use("/api/auth", authRoute)



export default app