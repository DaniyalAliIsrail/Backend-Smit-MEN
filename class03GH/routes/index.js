import express from "express";
import user from './user.js'
import products from './product.js'
import cards from './cards.js'
import upload from './upload.js'
const router = express.Router();

router.use('/cards',cards)
router.use('/user',user)
router.use('/products',products)
router.use("/upload",upload)

export default router;