//https://github.com/jprichardson/node-fs-extra/tree/master/docs//** docs file reference
import express from "express";
import multer from "multer";
import fs from "fs-extra";
// const upload = multer({dest : 'images/'})
const router = express.Router();

//multer provide diskstorage file uploaded
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
//! upload file
// router.post("/",upload.single('file'),(req,res)=>{
//         res.send({message:"uploaded"})
// })
//! Deleted
router.post("/", upload.single("file"), (req, res) => {
        //! fs.remove use deleted file 
  fs.remove("images/Minimal Modern You Are Enough Quote Desktop Wallpaper (1).png", (err) => {
    if (err) return console.error(err);
    console.log("success!");
  });
        res.send({message:"uploaded"})
});
export default router;
