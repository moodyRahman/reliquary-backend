import express from 'express'
import { verifyJWT } from '../../middleware.js'

const router = express.Router()

router.get("/", (req, res, next) => {
    res.send("items module online")
})

router.use(verifyJWT)

router.post("/get", (req, res, next) => {

    res.send(res.locals.id)
})

export { router as itemController }
