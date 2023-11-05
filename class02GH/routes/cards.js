import express from 'express';
import { CARDS } from '../constants/cards.js';
const router = express.Router()

router.get('/',(req,res)=>{
        res.status(200).send({
                cards:CARDS
        })
})
export default router;

