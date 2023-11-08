import express from "express";
import user from '../routes/user.js';
import product from '../routes/product.js'
const router = express.Router();

router.use("/users",user)
router.use("/products",product)
export default router;