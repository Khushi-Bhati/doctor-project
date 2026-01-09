// import multer from "multer";

// const mystorage=multer.diskStorage(
//     {
//     destination:function(req,file,cb){
//         cb(null,"./public/temp")
//     },

//     filename:function(req,file,cb){
//         cb(null,file.originalname)
//     }



   
// }
// )

// export const upload=multer({storage:mystorage})

import multer from "multer";
import fs from "fs";
import path from "path";

const uploadDir = path.join(process.cwd(), "public/temp");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const mystorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

export const upload = multer({ storage: mystorage });


