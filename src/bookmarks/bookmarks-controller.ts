import * as bookmarksDao from "./bookmarks-dao";

type bookmarks = bookmarksDao.bookmarks;

function BookmarksController(app) {
    const createBookmark = async (req, res) => {
        const bookmark: bookmarks = req.body;
        const newBookmark = await bookmarksDao.createBookmark(bookmark);
        res.json(newBookmark);
    };

    const getBookmarksByRecipeId = async (req, res) => {
        const recipeId = req.params.recipeId;
        const bookmarkByRecipeId = await bookmarksDao.getBookmarksByRecipeId(recipeId);
        res.json(bookmarkByRecipeId);
    };

    const getBookmarksByUserId = async (req, res) => {
        const userId = req.params.userId;
        const bookmarkByUserId = await bookmarksDao.getBookmarksByUserId(userId, false);
        res.json(bookmarkByUserId);
    };

    const getBookmarkObjectsByUserId = async (req, res) => {
        const userId = req.params.userId;
        const bookmarkByUserId = await bookmarksDao.getBookmarksByUserId(userId, true);
        res.json(bookmarkByUserId);
    };

    const getBookmarkByBothIDs = async (req, res) => {
        const recipeId = req.params.recipeId;
        const userId = req.params.userId;
        const bookmarkByUserId = await bookmarksDao.getBookmarkByUserIdAndRecipeID(userId, recipeId);
        res.json(bookmarkByUserId);
    };

    const unbookmark = async (req, res) => {
        const bookmark: bookmarks = req.body;
        const deletedBookmark = await bookmarksDao.unbookmark(bookmark);
        res.json(deletedBookmark);
    };

    app.post("/api/bookmarks", createBookmark);
    app.get("/api/bookmarks/:recipeId", getBookmarksByRecipeId);
    app.get("/api/bookmarks/objects/user/:userId", getBookmarkObjectsByUserId);
    app.get("/api/bookmarks/user/:userId", getBookmarksByUserId);
    app.get("/api/bookmarks/:recipeId/:userId", getBookmarkByBothIDs);
    app.delete("/api/bookmarks", unbookmark);
}

export default BookmarksController;
