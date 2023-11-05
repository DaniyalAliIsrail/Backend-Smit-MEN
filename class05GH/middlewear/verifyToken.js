import jwt from "jsonwebtoken";
import "dotenv/config";

const verifyToken = (req, res, next) => {
        try{
                const { authorization } = req.headers;
                const token =authorization && authorization.split(" ")[1];
                // console.log("token--------->",token);
                
                // jwt verify token code
                jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
                  if (err) {
                    return res.status(400).send({ message:"unautharized",err });
                  }
                  console.log("decoded", decoded);
                  return next();
                });   
        }catch(err){
                return res.status(400).send({err});
        }
};
export default verifyToken;
