import express from 'express'
import { verifyJWT } from '../middleware.js'
import {Character, User} from "../db/index.js"
import { CharacterSchema } from '../db/Character.js'
import { characterController } from './resources/characters.js'
const router = express.Router()


router.get("/", (req, res, next) => {
    res.send("resource module online")
})


// every route after this line enforces tokens
router.use("/character", characterController)


export { router as resourceController }
