import express  from "express";
const router = express.Router();
const users = [
        {
                id:1,
                name:"daniyal",
                email:"daniyal@gmail.com"
        },
        {
                id:2,
                name:"ali",
                email:"ali@gmail.com"
        }
]
router.get("/",(req,res)=>{
        res.status(200).send({users:users})
})
export default router;