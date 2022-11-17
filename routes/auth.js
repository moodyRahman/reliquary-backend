
import express from 'express'
import * as jwt from "jsonwebtoken"
import * as crypto from "crypto"
import User from "../db/User.js"

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


router.post("/login", verifyCaptcha, (req, res, next) => {
    const { username, password } = req.body
    console.log(username, password)

    res.send("loggin in now")
})

router.post("/register", verifyCaptcha, async (req, res, next) => {
    const { username, password } = req.body

    if (await User.exists({username:username})) {
        return next({status:500, message:"user already exists"})
    }



    const user = new User();
    
    user.username = username
    user.salt = crypto.randomBytes(64).toString("base64")
    
    const hash = crypto.createHash("sha256")
    hash.update(password + user.salt)
    user.hashed_password = hash.digest("hex")

    await user.save()


    res.send({status:201, message:"success", username:username})
})


router.get("/", (req, res) => {
    res.send("auth module online")
})

export {router as authModule}
