import express from 'express'
import { verifyJWT } from '../../middleware.js'
import { Character, User } from "../../db/index.js"
import { CharacterSchema } from '../../db/Character.js'
const router = express.Router()


router.get("/", (req, res, next) => {
    res.send("characrers module online")
})


// every route after this line enforces tokens
router.use(verifyJWT)

router.post("/create", async (req, res, next) => {
    const { name, class: c, description } = req.body

    const user = await User.findOne({ username: req.username })
        .populate("characters")

    const character = new Character({
        name: name,
        class: c,
        description: description,
        owner: user
    })

    await character.save()

    user.characters.push(character)
    await user.save()
    res.send({
        "status": "successful",
        name: name,
        class: c,
        description: description,
        owner: req.username
    })
})

router.post("/get", async (req, res, next) => {
    const characters = await Character.find()
        .populate(
            {
                path: "owner",
                match: req.username,
                select: "username -_id"
            })

    console.log(characters)

    res.send(characters)

})


export { router as characterController }
