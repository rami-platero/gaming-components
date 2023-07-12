import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import router from './Routes/user.routes'
import passport from 'passport'

const app = express()
app.use(morgan("dev"))
app.use(cors())
app.use(express.json())
app.use(passport.initialize())
app.use(passport.session())

app.use("/", router)

export default app