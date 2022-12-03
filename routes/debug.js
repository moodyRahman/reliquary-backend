import express from 'express'
import { verifyJWT } from '../middleware.js'
const router = express.Router()


router.get("/", (req, res, next) => {
    res.send("debug module online")
})

router.post("/", verifyJWT, (req, res, next) => {
    res.send(`token from ${req.username}`)
})

export { router as debugModule }
