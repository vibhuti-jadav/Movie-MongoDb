import dotenv from "dotenv";
import express from "express";
import connectDb from "./config/db.js";
import movieRoutes from "./routers/movieRoutes.js";
// import the existing model from `modals` (correct folder name in this project)
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

// Serve static files (CSS, images, etc.)
app.use(express.static(join(__dirname, "public")));

// Set up EJS as the view engine
app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));

// Use routes
app.use("/movie", movieRoutes);

// Home route — show movie list
// Redirect root to the movie list route which renders the template
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
