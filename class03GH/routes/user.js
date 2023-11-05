import express from "express";
import User from "../models/User.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
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
router.get("/", (req, res) => {
  res.status(200).send({ users: users });
});
//bcrypt password
router.post("/", async (req, res) => {
  try {
    const password = await  bcrypt.hash(req.body.password,10)
    const user = new User({...req.body,password });
    const newUser = await user.save();
    const token = jwt.sign({_id: newUser._id , email: newUser.email},"SMIT")
    console.log("user", user,newUser);
    return res.status(200).send({ status : 200 , token , message: "success" , user:newUser });
  } catch (err) {
    return res.status(400).send({ status: 400 , message : err.message });
  }
});
//login
router.post("/login", async (req, res) => {
  try {
    const {email,password} = req.body;
    const user = await User.findOne({email}).then(res => res.toObject())
    if(!user){
      return res.status(401).send({status:401, message:"user not found"})
    }
    const compare = await bcrypt.compare(password , user.password)
    if(!compare){
      return res.status(403).send({status:403, message:"password invalid"})
    }
    console.log("comapre--->",compare);
    delete user.password
    //create Tokens
    const token = jwt.sign({_id:user._id,email:user.email},"SMIT")
    return res.status(200).send({ status : 200 , user , token ,message: "success"  });
  } catch (err) {
    return res.status(400).send({ status:400,message : err.message });
  }
});
export default router;
