import express from 'express'
import { verifyJWT } from '../middleware.js'
import {Character, User} from "../db/index.js"
import { CharacterSchema } from '../db/Character.js'
import { characterController } from './resources/characters.js'
import { itemController } from './resources/items.js'
const router = express.Router()


router.get("/", (req, res, next) => {
    res.send("resource module online")
})


// every route after this line enforces tokens
router.use("/character", characterController)

router.use("/:id/items", (req, res, next) => {
    console.log(req.params.id)
    res.locals.id = req.params.id
    next()
})

router.use("/:id/items", itemController)

router.get("/kill", async (req, res, next) => {
    if (process.env.NODE_ENV == "dev") {
        await Character.remove()
        const users = await User.updateMany({}, {$set:{characters:[]}})
        res.send("deleted it all")
        return
    }
    res.send("not in prod >:(")

})


export { router as resourceController }
