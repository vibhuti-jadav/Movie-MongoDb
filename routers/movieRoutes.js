import express from "express";
import movieController from "../controllers/movieController.js";


const router = express.Router();

router.post("/add",movieController.AddMovie)

router.get("/allMovie",movieController.getAllMovie)

router.patch("/:id",movieController.updateMovie)

router.delete("/:id",movieController.deleteMovie)

export default router