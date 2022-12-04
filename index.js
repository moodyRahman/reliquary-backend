
import express from 'express'
import * as dotenv from 'dotenv'
import * as mongoose from "mongoose"
import cors from "cors"
import morgan from "morgan"
import bodyParser from "body-parser"
import { authModule } from "./routes/auth.js"
import { debugModule } from './routes/debug.js'
import { resourceController } from './routes/resources.js'


dotenv.config({
    path: `${process.env.NODE_ENV}.env`
})

const app = express()
const port = 3005

app.use(express.json());
app.use(morgan('dev'));
app.use(cors({origin: `${process.env.ORIGIN}`}))
app.use(bodyParser.json())


app.use("/auth", authModule)
app.use("/debug", debugModule)
app.use("/resources", resourceController)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use((err, req, res, next) => {
    console.log(err)
    const {status, message} = err;

    res.status(status?status:500)
    return res.send({
        status:status?status:500,
        message:message?message:"internal server error, see logs"
    })
})

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log(`🤖 connected to mongodb`)
    app.listen(port, () => {
        console.log(`⚡ backend server at: http://localhost:${port}`)
    })
})
