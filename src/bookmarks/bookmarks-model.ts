import mongoose from "mongoose";
import followsSchema from "./follows-schema";
const followsModel = mongoose.model("follows", followsSchema);
export default followsModel;