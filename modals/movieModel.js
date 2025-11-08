import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
            trim:true,
        },
        description:{
            type:String,
            required:true,
            trim:true,
        },
        realeaseYear:{
            type:String,
        },
        genere:[String],
        director:{
            type:String,
            trim:true
        },
        cast:[String],
        file:String,
    }
)


const movie = mongoose.model("movie",movieSchema)

export default movie;