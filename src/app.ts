import express from "express";
import session from "express-session";
import cors from "cors";
import mongoose from "mongoose";
// CONTROLLER IMPORTS
import AuthController from "./users/auth-controller";
import PostsController from "./posts/posts-controller";
import RecipesController from "./recipes/recipes-controller";
import GroupsController from "./groups/groups-controller";
import FollowsController from "./follows/follows-controller";
import UpvotesController from "./upvotes/upvotes-controller";
import BookmarksController from "./bookmarks/bookmarks-controller";

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING
 || 'mongodb://127.0.0.1:27017/seasoned-recipes-db'
mongoose.connect(CONNECTION_STRING);

// EXPRESS CONNECT AND CONFIGURATION
const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use(
  session({
    secret: "secret string",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.json());

// CONTROLLERS
AuthController(app);
PostsController(app);
RecipesController(app);
GroupsController(app);
FollowsController(app);
UpvotesController(app);
BookmarksController(app);

// DEFAULT ROUTE AND SERVER START
app.get("/", (req, res) => {
  res.send("Seasoned Recipes API Server");
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
