//https://github.com/jprichardson/node-fs-extra/tree/master/docs//** docs file reference
import express from "express";
import multer from "multer";
import fs from "fs-extra";
const router = express.Router();
import cloudinary from 'cloudinary';
//cloudnary configration are secure to please env file kaya andr rakho isko

cloudinary.config({
  cloud_name: 'dih6gzzhk',
  api_key: '553388149965484',
  api_secret: '0umYW6KOYp9ZO4_1ZteptavElNY'
});

//multer provide diskstorage file uploaded
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
//! upload file

router.post("/", upload.single('file'), (req, res) => {
  fs.readdirSync(`images/`).forEach((file) => {
    console.log(file);
    cloudinary.v2.uploader.upload(`images/${file}`, {}, (error, result) => {
      fs.remove(`images/${file}`, err => {
        if (err) return console.error(err);
        console.log("success!");
      });
      if(error){
        return res.status(400).send({error})
      }
      console.log(result, error);
     res.status(200).send({url: result.url})
        });
    });
  });
  // res.send({ message: "uploaded" });

export default router;
