import express from "express";
import cors from 'cors';
import router from './routes/index.js'

const app = express()
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

//middelwear use for security purpose | har req pr chaly ga
app.use("/",(req,res,next)=>{
  console.log("req agyai ....",req.query)
  if(req?.query?.apikey === "123"){
    next()
  }else{
    res.status(401).send({
      message:"not allowed"
    })
  }
})
app.use('/api',router)
app.listen(PORT,()=>{
  console.log(`sever is connected in ${PORT}`);
})