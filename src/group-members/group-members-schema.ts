import mongoose from "mongoose";
const groupMembersSchema = new mongoose.Schema(
    {
      groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "groups",
        required: true,
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
      },
    },
    { collection: "group-members" }
);
export default groupMembersSchema;