import express from "express";
// import cors from 'cors';
import router from "./routes/index.js";
import mongoose from "./db/index.js";
const app = express();
const PORT = 8000;
//body parser
app.use(express.json());
const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",function(){
  console.log("db connected!")
})

//middelwear
// app.use("/", (req, res, next) => {
//   console.log("agaye req", req.query);
//   if(req.query.apikey === "123"){
//     next()
//   }else{
//     res.status(400).send({message:"user not allowed"})
//   }
//   // res.send({message:"middel wear wala req agya"})
// });
app.use("/api", router);
app.listen(PORT, () => {
  console.log(`server is connected in ${PORT}`);
});
