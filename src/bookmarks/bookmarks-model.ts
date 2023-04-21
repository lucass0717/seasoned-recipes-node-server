import mongoose from "mongoose";
import bookmarksSchema from "./bookmarks-schema";

const bookmarksModel = mongoose.model("bookmarks", bookmarksSchema);
export default bookmarksModel;