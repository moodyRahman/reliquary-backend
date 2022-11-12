
import express from 'express'
import { authModule } from "./auth.js"
const app = express()
const port = 3005

app.use("/auth", authModule)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`⚡ backend server at: http://localhost:${port}`)
})
