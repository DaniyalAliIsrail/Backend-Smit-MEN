import express from "express";
import  PRODUCT  from "../constant/products.js";
const router = express.Router();

router.use("/",(req,res)=>{
        res.status(200).send({user:PRODUCT})
})
export default router;
