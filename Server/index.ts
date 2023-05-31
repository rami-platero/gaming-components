import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

const app = express()
app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

app.listen(4000, ()=>{
    console.log("listening on port 4000")
})


