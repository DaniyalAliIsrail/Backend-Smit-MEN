// services may baney gay ham function
import User from '../models/User.js' 
//get ka function bnaya matalb bussines logic 
const getAllusers =async () =>{
        return await User.find({})
}
export {
        getAllusers
}