// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import cloudinary from "../config/cloudnary.js";
// import multer from "multer";


// const storage = new CloudinaryStorage({
//     cloudinary,
//     params:{
//         folder:"public/uploads",
//         allowed_formats:["jpg","png","jpeg"],
//         transformation:[{width:500,height:500,crop:",limit"}]
//     }
// })


// const uploads = multer({
//     storage,
//     limits:{filesize:2 * 1024 *1024}, //2 mb
//     fileFilter:function (req,file,cb){
//         const allowedfiles=["image/jpg","image/png","image/jpeg"]
   
//             if(!allowedfiles.includes(file.mimetype)){
//                 return cb(new Error("invalid file type"))
//             }
//             cb(null,true)
   
   
//     }
// })

// export default uploads





import multer from "multer";
import path from "path";

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join("public/uploads")); // save in public/uploads
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`); // unique filename
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedFiles = ["image/jpg", "image/jpeg", "image/png"];
  if (!allowedFiles.includes(file.mimetype)) {
    return cb(new Error("Invalid file type"), false);
  }
  cb(null, true);
};

// Create upload middleware
const uploads = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB
});

export default uploads;
