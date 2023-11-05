import mongoose from "mongoose";
const {Schema} = mongoose;
const postSchema = new mongoose.Schema(
  {
    title: {
      type:Schema.Types.String, // Use 'String' directly
      required: true,
    },
    description: {
      type: Schema.Types.String, // Use 'String' directly
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref:'User', // collection name aye ga yaha User collection name hay...
      required: true,
    },
  },{
    timestamps:{
      createdAt:'createTime',
      updateAt:'updateTime'
    }
  }
);
//? Create the model need two things "collection name and Schemaname"
const Post = mongoose.model('Post', postSchema);
export default Post;
