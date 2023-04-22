import mongoose from "mongoose";
const groupMembersSchema = new mongoose.Schema(
    {
      group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "groups",
        required: true,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
      },
    },
    { collection: "group-members" }
);
export default groupMembersSchema
