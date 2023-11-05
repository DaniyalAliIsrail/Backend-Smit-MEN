
import express from "express";
import cors from 'cors';
import router from './routes/index.js'
import mongoose from "./db/index.js"
import chalk from "chalk";
import 'dotenv/config'
console.log("process.env.PORT",process.env.PORT);

const app = express()
const PORT = process.env.PORT || 5000;

const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",function(){
  console.log(chalk.bgGreen("db connected!"));
});

app.use(express.json());
app.use(cors());

//middelwear use for security purpose //? use jwt authentication
// app.use("/",(req,res,next)=>{
//   console.log("req agyai ....",req.query)
//   if(req?.query?.apikey === "123"){
//     next()
//   }else{
//     res.status(401).send({
//       message:"not allowe"
//     })
//   }
// })
app.use('/api',router)
app.listen(PORT,()=>{
  console.log(`sever is connected in ${PORT}`);
})













