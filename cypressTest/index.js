import http from 'http'
import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.get("/", (req,res)=>{
    res.send('hello cypress')
})

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
})