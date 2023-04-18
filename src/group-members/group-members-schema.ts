import mongoose from "mongoose";
const groupMembersSchema = new mongoose.Schema(
{
  groupId: { type: String, required: true },
  userId: { type: String, required: true }
},
{ collection: "groupMembers" }
);
export default groupMembersSchema;