import express from 'express'
import { verifyJWT, verifyJSONBody } from '../../middleware.js'
import { Character, User } from "../../db/index.js"
import { CharacterSchema } from '../../db/Character.js'
const router = express.Router()


router.get("/", (req, res, next) => {
    res.send("characrers module online")
})


// every route after this line enforces tokens
router.use(verifyJWT)

router.post("/create", verifyJSONBody(["name", "class", "description"]), async (req, res, next) => {
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
    console.log(req.username)
    const characters = await Character.find()
        .populate(
            {
                path: "owner",
                match: {username:{$eq:req.username}},
                select: "username -_id"
            })

    
    res.send(characters.filter(e => e.owner !== null))

})


export { router as characterController }
