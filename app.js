import dotenv from "dotenv"
import express from "express";
import connectDb from "./config/db.js";
import movieRoutes  from "./routers/movieRoutes.js"

dotenv.config()

const app = express()
const port = process.env.PORT || 3000


app.use(express.json());


app.use("/movie",movieRoutes)

app.get("/",(req,res)=>{
    res.status(200).json("hello from server")
})


const startServer = async () =>{

    try {
            const connect = await connectDb()

            if(!connect){
                throw new Error("failed to connect to the databse")
            }

            console.log("database connected")

app.listen(port,()=>{
    console.log(`server runnign on port`,port)
})

    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

startServer()






