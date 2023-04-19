import mongoose from "mongoose";

const bookmarksSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        recipe: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "recipes",
            required: true,
        },
    },
    { collection: "bookmarks" }
);

export default bookmarksSchema