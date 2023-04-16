import mongoose from "mongoose";
import postsSchema from "./posts-schema";
const postsModel = mongoose.model("posts", postsSchema);
export default postsModel;  