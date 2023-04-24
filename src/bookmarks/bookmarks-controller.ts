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
        console.log("GET BOOKMARKS BY USER ID");
        const userId = req.params.userId;
        // console.log("USER ID IS", userId);
        const bookmarkByUserId = await bookmarksDao.getBookmarksByUserId(userId);
        res.json(bookmarkByUserId);
    };

    const unbookmark = async (req, res) => {
        const bookmark: bookmarks = req.body;
        const deletedBookmark = await bookmarksDao.unbookmark(bookmark);
        res.json(deletedBookmark);
    };

    app.post("/api/bookmarks", createBookmark);
    app.get("/api/bookmarks/:recipeId", getBookmarksByRecipeId);
    app.get("/api/bookmarks/user/:userId", getBookmarksByUserId);
    app.delete("/api/bookmarks", unbookmark);
}

export default BookmarksController;
