import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudnary.js";
import multer from "multer";


const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder:"upload",
        allowed_formats:["jpg","png","jpeg"],
        transformation:[{width:500,height:500,crop:",limit"}]
    }
})


const uploads = multer({
    storage,
    limits:{filesize:2 * 1024 *1024}, //2 mb
    fileFilter:function (req,file,cb){
        const allowedfiles=["image/jpg","image/png","image/jpeg"]
   
            if(!allowedfiles.includes(file.mimetype)){
                return cb(new Error("invalid file type"))
            }
            cb(null,true)
   
   
    }
})

export default uploads