import express from 'express'
const app = express()

app.get("/login", (req, res) => {
    res.send("loggin in now")
})

export {app as authModule}
