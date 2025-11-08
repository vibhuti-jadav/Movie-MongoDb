import dotenv from "dotenv"
import express from "express";
import connectDb from "./config/db.js";
import movieRoutes  from "./routers/movieRoutes.js"
import path from "path"
import {fileURLToPath} from "url"
import movie from "./modals/movieModel.js";


dotenv.config()

const app = express()
const port = process.env.PORT || 3000


app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/movie",movieRoutes)

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// app.get("/",(req,res)=>{
//     res.redirect("/movie-list")
// })

app.get("/movie-list", async (req, res) => {
  const movies = await movie.find(); // get from DB
  res.render("movie-list", { movie });
});


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






