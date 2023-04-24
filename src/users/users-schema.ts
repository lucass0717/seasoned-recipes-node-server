import mongoose from "mongoose";
const usersSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },
    isAdmin: { type: Boolean, default: false },
    role: {
      type: String,
      default: "user",
      enum: ["admin", "user", "guest"],
      required: true
    },
    avatar: { type: String, default: "https://loremflickr.com/640/480/food", required: true},
  },
  { collection: "users" }
);
export default usersSchema;