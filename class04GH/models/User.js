
import mongoose from "mongoose";
//createschema
const userSchema = mongoose.Schema(
  {
    name: {
      type: String, // Use 'String' directly
      required: true,
      unique: true,
    },
    email: {
      type: String, // Use 'String' directly
      required: true,
      unique: true,
    },
    phone: {
      type: Number, // Use 'Number' directly
      required: true,
    },
    password: {
      type: String, // Use 'String' directly
      required: true,
    },
  },{
    timestamps:{
      createdAt:'createTime',
      updateAt:'updateTime'
    }
  }
);
//? Create the model need two things "collection name and Schema"
const User = mongoose.model('User', userSchema);
export default User;
