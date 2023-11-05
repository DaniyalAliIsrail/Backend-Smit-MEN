import Post from "../models/Post.js"; //schema import keya hay
import mongoose from "mongoose";
const { Schema } = mongoose;

// get data function
const addPost = async (data) => {
  const post = new Post(data);
  return await post.save();
};
// sara deta get kar raha hay user ka
//populate basicallay filteration ka work karata hay:

//! pagination

const allPost = async (skip = 0, limit = 3) => {

  // skip = Number(skip);  // Ensure skip is a numeric value
  // limit = Number(limit); 
  if (isNaN(skip)) {
    skip = 3; // Provide a default value if skip is not a valid number
  }
  if (isNaN(limit)) {
    limit = 3; // Provide a default value if limit is not a valid number
  }
  // return await Post.find()
  // author ka srf name email or phone la raha hay:..
  // return await Post.find({}).populate("author","name , email , phone ")
  //query method .aggregate()
  return await Post.aggregate([
  //         {
  // post may title agr daniyal hay to lay kar ao:..
  // $match:{title:"daniyal"}
  //author k andr js k id ye wo data lao..
  // $match:{author: new mongoose.Types.ObjectId("653cd1c63e659c15dd240d04")}

  //                 $lookup:{
  //mujhy users k collection jetnay author hay un sab ka id chaye wo lao || mtlb filter ka kam kar raha hay..
  //                         from:"users",// database collection name
  //                         localField:"author",//docmnt may localfield name kyahay
  //                         foreignField:"_id",//ksy match karna hay
  //                         as:'author'
  //                 }
  //         }
  // ])
  {
        $facet: {
          total: [
            {
              $count: 'createTime'
            }
          ],
          data: [
            {
              $addFields: {
                _id: '$_id'
              }
            }
          ]
        }
      },
      {
        $unwind: '$total'
      },
       {
        $project: {
          data: {
            $slice: ['$data', skip, {
              $ifNull: [limit, '$total.createTime']
            }]
          },
          meta: {
            total: '$total.createTime',
            limit: {
              $literal: limit
            },
            currentpage: {
              $literal: ((skip / limit) + 1)
            },
            totalPages: {
              $ceil: {
                $divide: ['$total.createTime', limit]
              }
            },
          },
        },
      }
])
};
export { addPost, allPost };
