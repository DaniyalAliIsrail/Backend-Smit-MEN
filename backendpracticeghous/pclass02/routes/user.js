import express from "express";
import User from "../models/User.js";
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

router.post("/", async (req, res) => {
  try {
    const user = new User(req.body);
    const newUser = await user.save();
    console.log("user", user,newUser);
    return res.status(200).send({ status : 200 , message: "success" , user:newUser });
  } catch (err) {
    return res.status(400).send({ status: 400 , message : err.message });
  }
});
export default router;
