import express from "express";
import movieController from "../controllers/movieController.js";
import uploads from "../middleware/fileUpload.js";
import movie from "../modals/movieModel.js";


const router = express.Router();

router.post("/add",uploads.single("file"),movieController.AddMovie)

router.get("/allMovie",movieController.getAllMovie)

router.patch("/:id",movieController.updateMovie)

router.delete("/:id",movieController.deleteMovie)

router.get("/list", async (req, res) => {
  const movies = await movie.find();
  res.render("movie-list", { movies });
});


export default router