import express from 'express'
const router = express.Router()

router.post("/login", (req, res) => {
    const { username, password } = req.body
    console.log(username, password)

    res.send("loggin in now")
})

router.get("/", (req, res) => {
    res.send("auth module online")
})

export {router as authModule}
