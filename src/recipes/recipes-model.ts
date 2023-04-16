import mongoose from "mongoose";
import recipesSchema from "./recipes-schema";
const recipesModel = mongoose.model("recipes", recipesSchema);
export default recipesModel;