import mongoose from "mongoose";
import groupMembersSchema from "./group-members-schema";
const groupMembersModel = mongoose.model("groupMembers", groupMembersSchema);
export default groupMembersModel;