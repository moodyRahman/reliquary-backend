
import express from 'express'
import * as dotenv from 'dotenv'
import * as mongoose from "mongoose"
import { authModule } from "./routes/auth.js"


dotenv.config({
    path: `${process.env.NODE_ENV}.env`
})

const app = express()
const port = 3005

app.use("/auth", authModule)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log(`🤖 connected to mongodb`)
    app.listen(port, () => {
        console.log(`⚡ backend server at: http://localhost:${port}`)
    })  
})
