import express from "express";
import session from "express-session";
import AuthController from "./users/auth-controller.js";
import cors from "cors";
import mongoose from "mongoose";
import PostsController from "./posts/posts-controller";
import RecipesController from "./recipes/recipes-controller";
import GroupsController from "./groups/groups-controller";
mongoose.connect('mongodb://127.0.0.1:27017/seasoned-recipes-db');
const app = express();

// NETWORK COMMUNICATION WITH REACT APP CONFIGURATION
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

// SESSION
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

app.get("/", (req, res) => {
  res.send("Seasoned Recipes API Server");
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
