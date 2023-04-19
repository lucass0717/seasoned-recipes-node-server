import mongoose from "mongoose";
import upvotesSchema from "./upvotes-schema";

const upvotesModel = mongoose.model("upvotes", upvotesSchema);
export default upvotesModel;