import express from 'express'
import { verifyJWT } from '../middleware.js'
import {User} from "../db/index.js"
const router = express.Router()


router.get("/", (req, res, next) => {
    res.send("resource module online")
})

router.post("/createcharacter", verifyJWT, (req, res, next) => {


})


export { router as resourceController }
