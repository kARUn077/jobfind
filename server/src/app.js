//backend
const express = require("express")
const app = express()

const PORT = require("port")
const port = 4001

app.listen(port , (req , res)=>{
    console.log( `Server is running at ${port}`)
})