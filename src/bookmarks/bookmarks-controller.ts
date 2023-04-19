import * as bookmarksDao from "./bookmarks-dao";

function BookmarksController(app) {
    const createBookmark = async (req, res) => {
        const bookmark = req.body;
        const newBookmark = await bookmarksDao.createBookmark(bookmark);
        res.json(newBookmark);
    };

    const getBookmarksByRecipeId = async (req, res) => {
        const recipeId = req.params.recipeId;
        const followers = await bookmarksDao.getBookmarksByRecipeId(recipeId);
        res.json(followers);
    };

    const getBookmarksByUserId = async (req, res) => {
        const userId = req.params.userId;
        const following = await bookmarksDao.getBookmarksByUserId(userId);
        res.json(following);
    };

    const unbookmark = async (req, res) => {
        const bookmark = req.body;
        const deletedBookmark = await bookmarksDao.unbookmark(bookmark);
        res.json(deletedBookmark);
    };

    app.post("/api/bookmarks", createBookmark);
    app.get("/api/bookmarks/:recipeId", getBookmarksByRecipeId);
    app.get("/api/bookmarks/:userId", getBookmarksByUserId);
    app.delete("/api/bookmarks", unbookmark);
}

export default BookmarksController;
