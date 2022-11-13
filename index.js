
import express from 'express'
import * as dotenv from 'dotenv'
import * as mongoose from "mongoose"
import cors from "cors"
import morgan from "morgan"
import bodyParser from "body-parser"
import { authModule } from "./routes/auth.js"
import { log } from "./middleware/logger.js"


dotenv.config({
    path: `${process.env.NODE_ENV}.env`
})

const app = express()
const port = 3005

app.use(express.json());
app.use(morgan('dev'));
app.use(cors())
app.use(bodyParser.json())


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
