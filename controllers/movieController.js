// import movie from "../modals/movieModel.js";
// import path from "path"
// import fs from "fs"
// import httpError from "../middleware/errorHandling.js";


// // const AddMovie = async(req,res,next)=>{
// //     try {
        
// //         const {title,description,realeaseYear,genere,director,cast} = req.body;

// //         const newMovie = {
// //             title,
// //             description,
// //             realeaseYear,
// //             genere,
// //             director,
// //             cast
// //         }

// //        const  SaveMovie = new movie(newMovie)

// //        await SaveMovie.save()

// //        if(!SaveMovie){
// //         return next(new httpError("failed to create user",500))
// //        }

// //        res.status(201).json({message:"movie  created successfully",SaveMovie})


// //     } catch (error) {
// //         next(new httpError(error.message,500))
// //     }
// // }


// const AddMovie = async (req, res, next) => {
//   try {
//     const { title, description, releaseYear, genere, director, cast } = req.body;

//     const newMovie = new movie({
//       title,
//       description,
//       releaseYear,
//       director,
//       // Convert comma-separated strings into arrays
//       genere: genere ? genere.split(",").map((g) => g.trim()) : [],
//       cast: cast ? cast.split(",").map((c) => c.trim()) : [],
//       file: req.file ? `/uploads/${req.file.filename}` : null,
//     });

//     const savedMovie = await newMovie.save();

//     if (!savedMovie) {
//       return next(new httpError("Failed to create movie", 500));
//     }

//     // Redirect to movie list page instead of returning JSON
//     res.redirect("/movie/list");
//   } catch (error) {
//     next(new httpError(error.message, 500));
//   }
// };

// const getAllMovie = async(req,res,next)=>{
//     try {
//         const movieData = await movie.find({})

//         if(!movieData)
//         {
//             return next(new httpError("movie data not found",404))
//         }
//         res.status(200).json({message:"all movie data",movieData})

//     } catch (error) {
//         next(new httpError(error.message,400))
        
//     }
// }

// const updateMovie = async (req,res,next)=>{
//     try {
//         const id = req.params.id;

//         const existingmovie = await movie.findById(id)

//         if(!existingmovie){
//             return next (new httpError("id not found for update",404))
//         }

//         const updates = Object.keys(req.body)

//         const allowField = ["title","description","realeaseYear","genere","director","cast"];

//         const isValidUpdate = updates.every((field)=>allowField.includes(field))

//         if(!isValidUpdate){
//             return next(new httpError("only allowed field can be updated",400))
//         }

//         updates.forEach((update)=>{
//             existingmovie[update]=req.body[update]
//         })

//         await existingmovie.save()

//         res.status(200).json({message:"movie can be successfully updated",existingmovie})

//     } catch (error) {
//         next(new httpError(error.message))
//     }
// }

// const deleteMovie = async(req,res,next)=>{
//     try {
//         const id = req.params.id;

//         const deleteMovie = await movie.findByIdAndDelete(id);

//         if(!deleteMovie){
//             return next(new httpError("id not found",404))
//         }

//         res.status(200).json({message:"movie data dleted successfully"})
//     } catch (error) {
//         next(new httpError(error.message,400))
//     }
// }


// export default {AddMovie,getAllMovie,updateMovie,deleteMovie}









import movie from "../modals/movieModel.js";
import httpError from "../middleware/errorHandling.js";

const AddMovie = async (req, res, next) => {
  try {
    const { title, description, releaseYear, genere, director, cast } = req.body;

    const newMovie = new movie({
      title,
      description,
      releaseYear,
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
    const { title, description, releaseYear, genere, director, cast } = req.body;

    const existingMovie = await movie.findById(id);
    if (!existingMovie) return next(new httpError("Movie not found", 404));

    existingMovie.title = title;
    existingMovie.description = description;
    existingMovie.releaseYear = releaseYear;
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
