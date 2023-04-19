import mongoose from "mongoose";

const upvotesSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "posts",
            required: true,
        },
    },
    { collection: "upvotes" }
);

export default upvotesSchema
