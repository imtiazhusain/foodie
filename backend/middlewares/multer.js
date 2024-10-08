import multer from "multer";
import path from "path";
// using multer for uploading images of items
const storage = multer.diskStorage({
  destination: "./backend/public/uploads/",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({
  storage: storage,
});

export default upload;
