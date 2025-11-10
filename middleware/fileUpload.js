
import multer from "multer";
import path from "path";


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join("public/uploads")); 
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`); 
  }
});


const fileFilter = (req, file, cb) => {
  const allowedFiles = ["image/jpg", "image/jpeg", "image/png"];
  if (!allowedFiles.includes(file.mimetype)) {
    return cb(new Error("Invalid file type"), false);
  }
  cb(null, true);
};


const uploads = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, 
});

export default uploads;
