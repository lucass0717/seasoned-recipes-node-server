import * as postsDao from "./posts-dao";
import * as recipeDao from "../recipes/recipes-dao";
import * as groupDao from "../groups/groups-dao";
import {findRecipeByAPIId} from "../recipes/recipes-dao";

const PostsController = (app) => {

  // Get all posts with the recipe, group, and user populated
  async function getAllPosts(req, res) {
    const posts = await postsDao.getPosts();
    res.json(posts);
  }

  // Get all posts from people you follow
  async function getFollowedPosts(req, res) {
    const currentUser = req.params.userId;
    // if no user is logged in, return 401
    console.log("currentUser", currentUser);
    if (!currentUser) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const posts = await postsDao.getFollowedPosts(currentUser);
    res.json(posts);
  }

  // Create a post and create the associated recipe if it doesn't exist
  async function createPost(req, res) {
    const currentUser = req.session.currentUser;
    const post = req.body.post;
    const recipe = req.body.recipe;
    let newPost = post;
    console.log("post", post);
    console.log("recipe", recipe);

    // if no user is logged in, return 401
    if (!currentUser) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    // If the recipe doesn't exist, create it and add it to the post
    let attachedRecipe = await recipeDao.findRecipeByAPIId(recipe.id);
    if (!attachedRecipe) {
      attachedRecipe = await recipeDao.createRecipe(recipe);
    }
    console.log(attachedRecipe);
    newPost = { ...newPost, recipeId: attachedRecipe._id};

    // Add the group to the post
    const groupId = await groupDao.getGroupByName(post.groupName);
    console.log("groupId", groupId);
    newPost = { ...newPost, groupId};

    await postsDao.createPost(newPost);
    res.json(newPost);
  }

  // Delete a post
  async function deletePost(req, res) {
    const postId = req.params.postId;
    await postsDao.deletePost(postId);
    res.json(postId);
  }

  app.get("/api/posts", getAllPosts);
  app.get("/api/followed-posts/:userId", getFollowedPosts);
  app.post("/api/posts", createPost);
  app.delete("/api/posts/:postId", deletePost);
};

export default PostsController;
