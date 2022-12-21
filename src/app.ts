import "reflect-metadata"
import express from "express"
import loginRouter from "./routes/login.routes"
import userRouter from "./routes/user.routes"

const app = express()
app.use(express.json())
app.use('/login', loginRouter)
app.use('/users', userRouter)

export default app