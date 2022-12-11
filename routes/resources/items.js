import express from 'express'
import { Character, Item } from "../../db/index.js"
import { verifyJSONBody, verifyJWT } from '../../middleware.js'

const router = express.Router()

router.get("/", (req, res, next) => {
    res.send("items module online")
})

router.use(verifyJWT)

router.post("/create", verifyJSONBody(["name", "description", "tags"]), async (req, res, next) => {
    const { name, description, tags } = req.body

    const c = await Character.findById(res.locals.id)
    const i = Item({
        name:name,
        description:description,
        tags:tags
    })
    c.items.push(i)
    c.save()
    res.send(c)
})

export { router as itemController }
