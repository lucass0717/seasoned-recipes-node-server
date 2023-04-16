import mongoose from "mongoose";
const groupsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
  },
  { collection: "groups" }
);
export default groupsSchema;