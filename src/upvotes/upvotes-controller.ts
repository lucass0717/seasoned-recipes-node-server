import * as upvotesDao from "./upvotes-dao";
import * as postsDao from "../posts/posts-dao";

type upvotes = upvotesDao.upvotes;

function UpvotesController(app) {
    const createUpvote = async (req, res) => {
        const upvote: upvotes = req.body;
        const createdUpvote = await upvotesDao.createUpvote(upvote);
        await postsDao.addLikeToPost(upvote.post);
        res.json(createdUpvote);
    };

    const getUpvotesByPostId = async (req, res) => {
        const postId = req.params.postId;
        const upvotedByPostId = await upvotesDao.getUpvotesByPostId(postId);
        res.json(upvotedByPostId);
    };

    const getUpvotesByUserId = async (req, res) => {
        const userId = req.params.userId;
        const upvotedByUserId = await upvotesDao.getUpvotesByUserId(userId);
        res.json(upvotedByUserId);
    };

    const getUpvotesByBothIds = async (req, res) => {
        const postId = req.params.postId;
        const userId = req.params.userId;
        const upvotedByBothIds = await upvotesDao.getUpvotesByBothIds(postId, userId);
        res.json(upvotedByBothIds);
    };

    const removeUpvote = async (req, res) => {
        const upvote: upvotes = req.body;
        const deletedUpvote = await upvotesDao.removeUpvote(upvote);
        await postsDao.removeLikeFromPost(upvote.post);
        res.json(deletedUpvote);
    };

    app.post("/api/upvotes", createUpvote);
    app.get("/api/upvotes/objects/:postId/:userId", getUpvotesByBothIds);
    app.get("/api/upvotes/post/:postId", getUpvotesByPostId);
    app.get("/api/upvotes/user/:userId", getUpvotesByUserId);
    app.delete("/api/upvotes", removeUpvote);
}

export default UpvotesController;
