import dotenv from "dotenv";
import express from "express";
import connectDb from "./config/db.js";
import movieRoutes from "./routers/movieRoutes.js";
import movie from "./modals/movieModel.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


app.use(express.static(join(__dirname, "public")));


app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));


app.use("/movie", movieRoutes);


app.get("/", (req, res) => {
  res.redirect("/movie/list");
});

const startServer = async () => {
  try {
    const connect = await connectDb();

    if (!connect) throw new Error("Failed to connect to the database");

    console.log("✅ Database connected");

    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

startServer();
