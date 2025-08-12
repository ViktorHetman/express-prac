import express from "express"
import type { Request, Response } from "express"

const app = express()

app.get("/", (req: Request, res: Response) => {
  res.send("Server is alive")
})

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})