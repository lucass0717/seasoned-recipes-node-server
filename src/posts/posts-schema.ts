import mongoose from "mongoose";
const postsSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    date: { type: Date, required: true },
    likes: { type: Number, required: true, default: 0 },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: "groups", required: true },
    recipeId: { type: mongoose.Schema.Types.ObjectId, ref: "recipes", required: true },
  },
  { collection: "posts" }
);

export default postsSchema;