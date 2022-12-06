import express from 'express'
import { verifyJWT } from '../../middleware.js'
import {Character, User} from "../../db/index.js"
import { CharacterSchema } from '../../db/Character.js'
const router = express.Router()


router.get("/", (req, res, next) => {
    res.send("characrers module online")
})


// every route after this line enforces tokens
router.use(verifyJWT)

router.post("/create", async (req, res, next) => {
    const {name, class:c, description} = req.body

    const user = await User.findOne({username:req.username})
    .populate("characters")


    const character = new Character({
        name:name,
        class:c,
        description:description,
        owner:user
    })

    await character.save()
    
    user.characters.push(character)
    
    await user.save()
    res.send(user.username)
})

router.post("/get", async (req, res, next) => {
    const characters = await Character.find({owner:{username:req.username}})
    .populate("owner")

    console.log(characters)

    res.send("moody")

})


export { router as characterController }
