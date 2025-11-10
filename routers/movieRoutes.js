
import express from "express";
import movieController from "../controllers/movieController.js";
import uploads from "../middleware/fileUpload.js";
import movie from "../modals/movieModel.js";

const router = express.Router();

// Add new movie
router.post("/add", uploads.single("file"), movieController.AddMovie);

// Get all movie data (API)
router.get("/allMovie", movieController.getAllMovie);

// Update movie
router.post("/edit/:id", uploads.single("file"), movieController.updateMovie);

// Delete movie
router.post("/delete/:id", movieController.deleteMovie);

// Render all movies (EJS)
router.get("/list", async (req, res) => {
  const movies = await movie.find();
  res.render("movie", { movie: movies });
});

// Render add movie page
router.get("/addMovie", (req, res) => {
  res.render("addMovie");
});

// Render edit movie page
router.get("/edit/:id", async (req, res) => {
  const singleMovie = await movie.findById(req.params.id);
  res.render("editMovie", { movie: singleMovie });
});

export default router;
