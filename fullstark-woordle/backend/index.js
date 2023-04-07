import express from 'express'
import cors from 'cors'
import getRandomWord from './src/app.js'


const app = express()

app.use(cors())
app.use(express.json)
app.use(express.static("../frontend/build"));


app.get('/api/random_word', async(req,res)=>{
    const word = getRandomWord()
    res.json({word})
})



const PORT = 5080

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
})