
import express from 'express'
import * as jose from 'jose'
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
        status: 500,
        message: "bad captcha, are you a robot?"
    })
}


const generateJwt = async (payload, expiry) => {
    const secret = new TextEncoder().encode(
        `${process.env.JWT_SECRET}`
    );

    return await new jose.SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setIssuer('reliquary')
        .setAudience(payload.username)
        .setExpirationTime(expiry)
        .sign(secret)
}



router.post("/login", verifyCaptcha, async (req, res, next) => {
    const { username, password } = req.body
    const user = await User.findOne({ username: username })
    if (!user) {
        return next({ status: 500, message: "user not found" })
    }

    const hash = crypto.createHash("sha256")
    const calculated_hash = hash.update(password + user.salt).digest("hex")

    if (!(user.hashed_password === calculated_hash)) {
        return res.send({ status: 500, message: "incorrect password" })
    }

    const refresh = await generateJwt({ username: username, type: "refresh" }, "30d")
    const access = await generateJwt({ username: username, type: "access" }, "2h")

    res.status(200)
    return res.send({ status: 200, message: "logged in!", refresh_token: refresh, access_token: access, username:username })

})

router.post("/register", verifyCaptcha, async (req, res, next) => {
    const { username, password } = req.body

    if (await User.exists({ username: username })) {
        return next({ status: 500, message: "user already exists" })
    }

    const user = new User();

    user.username = username
    user.salt = crypto.randomBytes(64).toString("base64")

    const hash = crypto.createHash("sha256")
    hash.update(password + user.salt)
    user.hashed_password = hash.digest("hex")

    await user.save()

    const refresh = await generateJwt({ username: username, type: "refresh" }, "30d")
    const access = await generateJwt({ username: username, type: "access" }, "2h")

    res.send({ status: 201, message: "success", username: username, refresh_token: refresh, access_token: access })
})


router.get("/", (req, res) => {
    res.send("auth module online")
})

export { router as authModule }
