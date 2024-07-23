import { number, required } from "joi";
import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    caption: {
      type: string,
    },
    image: {
      type: string,
    },
    likes: {
      total: {
        type: number,
        default: 0,
        required: true,
      },
      liked_by: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    comments: {
      total: {
        type: number,
        default: 0,
        required: true,
      },
      comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
