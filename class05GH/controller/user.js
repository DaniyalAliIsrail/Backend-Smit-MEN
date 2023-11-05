import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt  from "jsonwebtoken";
import chalk from "chalk";
import joi from "joi"; //form validation pacakgae
import verifyToken from "../middlewear/verifyToken.js";
import "dotenv/config";
import { getAllusers } from "../services/user.js";
const router = express.Router();
const users = [
  {
    id: 1,
    name: "daniyal",
    email: "daniyal@gmail.com",
  },
  {
    id: 2,
    name: "ali",
    email: "ali@gmail.com",
  },
];
//joi validation
const userSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  phone: joi.number().optional().min(11),
  password: joi.string().required().min(8),
});

router.get("/",verifyToken, async (req, res) => {
  const users = await getAllusers()
  res.status(200).send({ users: users });
});
//signup
//data bhja hay ismay
router.post("/", async (req, res) => {
  try {
    await userSchema.validateAsync(req.body);
    const password = await bcrypt.hash(req.body.password, 10);
    const user = new User({ ...req.body, password });
    const newUser = await user.save();
    const token = jwt.sign(
      { _id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET
    );
    console.log("user", user, newUser);
    return res
      .status(200)
      .send({ status: 200, token, message: "success", user: newUser });
  } catch (err) {
    return res.status(400).send({ status: 400, message: err.message });
  }
});
//login
// data bhj upar signup pay phr hamnay validate keya agr data mojood hay database pr login kardo
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).then((res) => res.toObject());
    if (!user) {
      return res.status(401).send({ status: 401, message: "user not found" });
    }
    const compare = await bcrypt.compare(password, user.password);
    if (!compare) {
      return res.status(403).send({ status: 403, message: "password invalid" });
    }
    console.log("comapre--->", compare);
    delete user.password;
    //create Tokens
    const token = jwt.sign({ _id: user._id, email: user.email }, "SMIT");
    return res
      .status(200)
      .send({ status: 200, user, token, message: "success" });
  } catch (err) {
    return res.status(400).send({ status: 400, message: err.message });
  }
});
//! jo data send keya hay wo get karo lao pura // ye database say data la raha hay
//? find or findOne or select or findByid deleteOne database k query hay
//? findOne filter ka kam karta hay js k email daniyal hay wo lay kar ao or findOne pahla wala data lata hay...

router.get("/getuser", async (req, res) => {
  //? find get all data the in the database
  // const user = await User.find();
  //? js ka name daniyal wo data lay ao to jsjs ka name daniyal hoga wo all data lay aye ag..
  const user = await User.find({ name: "daniyal" });
  //? all data lao pr srf uska password lao
  // const user = await User.find().select("password");
  //? password chor kar sab lay ao
  // const user = await User.find().select("-password");
  //? name js ka daniyal hay usko lao
  // const user = await User.findOne({name:"daniyal"});
  //? name js ka daniyal hay usko lao
  //? js k id ye ho wo user lay kar ao
  // const user = await User.findById('653adbf235f91937eec3b0ff');
  //basically id hey pass kar rahy hay par para query parameter say
  // const user = await User.findById(req.query.id);
  res.status(200).send({ users: user });
});
router.delete("/:id", async (req, res) => {
  //?deleteOne delete the using id and use url parameter
  await User.deleteOne({_id:req.params.id});
  res.status(200).send({ message: "success"});
});
router.put("/:id", async (req, res) => {
  try {
    // Extract the fields you want to update (e.g., name and email)
    const { name, email, password } = req.body;
    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create an object with the fields you want to update
    // const updateFields = {};
    // if (name) updateFields.name = name;
    // if (email) updateFields.email = email;
    // if (password) updateFields.password = hashedPassword;
    // Use findByIdAndUpdate to update specific fields
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {...req.body,password:hashedPassword},
      // updateFields,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "Resource not found" });
    }
    res.status(200).json({ message: "Success", user: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
export default router;
