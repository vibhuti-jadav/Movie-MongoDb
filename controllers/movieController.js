
import movie from "../modals/movieModel.js";
import httpError from "../middleware/errorHandling.js";

const AddMovie = async (req, res, next) => {
  try {
    const { title, description, realeaseYear, genere, director, cast } = req.body;

    const newMovie = new movie({
      title,
      description,
      realeaseYear,
      director,
      genere: genere ? genere.split(",").map((g) => g.trim()) : [],
      cast: cast ? cast.split(",").map((c) => c.trim()) : [],
      file: req.file ? `/uploads/${req.file.filename}` : null,
    });

    const savedMovie = await newMovie.save();
    if (!savedMovie) return next(new httpError("Failed to create movie", 500));

    res.redirect("/movie/list");
  } catch (error) {
    next(new httpError(error.message, 500));
  }
};

const getAllMovie = async (req, res, next) => {
  try {
    const movieData = await movie.find({});
    if (!movieData) return next(new httpError("movie data not found", 404));
    res.status(200).json({ message: "all movie data", movieData });
  } catch (error) {
    next(new httpError(error.message, 400));
  }
};

const updateMovie = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { title, description, realeaseYear, genere, director, cast } = req.body;

    const existingMovie = await movie.findById(id);
    if (!existingMovie) return next(new httpError("Movie not found", 404));

    existingMovie.title = title;
    existingMovie.description = description;
    existingMovie.realeaseYear = realeaseYear;
    existingMovie.director = director;
    existingMovie.genere = genere ? genere.split(",").map((g) => g.trim()) : [];
    existingMovie.cast = cast ? cast.split(",").map((c) => c.trim()) : [];

    if (req.file) existingMovie.file = `/uploads/${req.file.filename}`;

    await existingMovie.save();
    res.redirect("/movie/list");
  } catch (error) {
    next(new httpError(error.message, 500));
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedMovie = await movie.findByIdAndDelete(id);
    if (!deletedMovie) return next(new httpError("Movie not found", 404));

    res.redirect("/movie/list");
  } catch (error) {
    next(new httpError(error.message, 400));
  }
};

export default { AddMovie, getAllMovie, updateMovie, deleteMovie };
