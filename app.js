
import express from "express";

const app = express()

app.use("/",(req,res)=>{
    res.status(200).json("hello from server")
})

const port = 5000

app.listen(port,()=>{
    console.log(`server runnign on port`,port)
})