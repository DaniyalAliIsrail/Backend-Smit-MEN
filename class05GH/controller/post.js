import express from "express";
// import jwt from "jsonwebtoken";
// import chalk from "chalk";
import joi from "joi"; //form validation pacakgae
// import verifyToken from "../middlewear/verifyToken.js";
// import "dotenv/config";
import { addPost, allPost } from "../services/post.js";
const router = express.Router();

const postSchema = joi.object({
  title: joi.string().required(),
  description: joi.string().required(),
  author: joi.string().required(),
});

router.post("/", async (req, res) => {
  try {
    postSchema.validateAsync(req.body);
    const post = await addPost(req.body);
    console.log(post);
    return res.status(200).send({ status: 200, message: "success", post });
  } catch (err) {
    return res.status(400).send({ staus: 400, message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const {skip,limit} = req.query;
    const post = await allPost(Number(skip || 0 ),Number(limit || 2 ));
    return res.status(200).send({ message: "success", post });
  } catch (err) {
    return res.status(400).send({ status: 400, message: err.message });
  }
});
export default router;
