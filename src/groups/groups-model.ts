import monogoose from "mongoose";
import groupsSchema from "./groups-schema";
const groupsModel = monogoose.model("groups", groupsSchema);
export default groupsModel;