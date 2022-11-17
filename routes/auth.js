import express from 'express'
const router = express.Router()


const verifyCaptcha = async (req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
    const { token } = req.body
    const c_res = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_SECRET}&response=${token}&remoteip=${ip}`)
    const data = await c_res.json()

    if (data.success) {
        return next()
    }
    next({
        status:500,
        message:"bad captcha, are you a robot?"
    })
}


router.post("/login", verifyCaptcha, (req, res) => {
    const { username, password } = req.body
    console.log(username, password)

    res.send("loggin in now")
})

router.post("/register", verifyCaptcha, async (req, res) => {
    const { username, password } = req.body
    console.log(username, password)
    res.send({status:200, message:"registered!"})
})


router.get("/", (req, res) => {
    res.send("auth module online")
})

export {router as authModule}
