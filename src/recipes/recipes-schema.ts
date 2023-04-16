import mongoose from "mongoose";
const recipesSchema = new mongoose.Schema(
{
  recipeApiId: { type: Number, unique: true, required: true },
  title: { type: String, required: true },
  description: { type: String},
  image: { type: String, required: true },
  tags: { type: Array, required: true },
},
{ collection: "recipes" }
);
export default recipesSchema;