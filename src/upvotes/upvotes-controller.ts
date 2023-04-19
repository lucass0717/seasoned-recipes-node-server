import * as upvotesDao from "../upvotes/upvotes-dao";

function UpvotesController(app) {
    const createUpvote = async (req, res) => {
        const upvote = req.body;
        const createdUpvote = await upvotesDao.createUpvote(upvote);
        res.json(createdUpvote);
    };

    const getUpvotesByPostId = async (req, res) => {
        const recipeId = req.params.recipeId;
        const upvotedByPostId = await upvotesDao.getUpvotesByPostId(recipeId);
        res.json(upvotedByPostId);
    };

    const getUpvotesByUserId = async (req, res) => {
        const userId = req.params.userId;
        const upvotedByUserId = await upvotesDao.getUpvotesByUserId(userId);
        res.json(upvotedByUserId);
    };

    const removeUpvote = async (req, res) => {
        const upvote = req.body;
        const deletedUpvote = await upvotesDao.removeUpvote(upvote);
        res.json(deletedUpvote);
    };

    app.post("/api/upvotes", createUpvote);
    app.get("/api/upvotes/:postId", getUpvotesByPostId);
    app.get("/api/upvotes/:userId", getUpvotesByUserId);
    app.delete("/api/upvotes", removeUpvote);
}

export default UpvotesController;
