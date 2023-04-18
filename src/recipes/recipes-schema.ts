import mongoose from "mongoose";
const recipesSchema = new mongoose.Schema(
{
  // id from the API
  id: { type: Number, unique: true, required: true },
  name: { type: String, required: true },
  thumbnail_url: { type: String, required: true },
  tags: { type: Array, required: true },
  yields: { type: String, required: true},
  total_time_minutes: { type: String, required: true}
},
{ collection: "recipes" }
);
export default recipesSchema;