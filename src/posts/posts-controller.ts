import * as postsDao from "./posts-dao";
import * as recipeDao from "../recipes/recipes-dao";
import * as groupDao from "../groups/groups-dao";
import * as usersDao from "../users/users-dao";

const PostsController = (app) => {

  // Get all posts with the recipe, group, and user populated
  async function getAllPosts(req, res) {
    const posts = await postsDao.getPosts();
    res.json(posts);
  }

  async function getGroupsPosts(req, res) {
    const currentGroup = req.params.groupId;
    const posts = await postsDao.getPostsInGroup(currentGroup);
    res.json(posts);
  }

  // Get all posts from people you follow
  async function getFollowedPosts(req, res) {
    const currentUser = req.session.currentUser;
    // if no user is logged in, return 401=
    if (!currentUser) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const posts = await postsDao.getFollowedPosts(currentUser);
    res.json(posts);
  }

  // Get liked posts from a user
  async function getLikedPosts(req, res) { 
    const userId = req.params.userId;
    // if the user doesn't exist, return 404
    const user = usersDao.findUserById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const posts = await postsDao.getLikedPosts(userId);
    res.json(posts);
  }


  // Create a post and create the associated recipe if it doesn't exist
  async function createPost(req, res) {
    const currentUser = req.session.currentUser;
    const post = req.body.post;
    const recipe = req.body.recipe;
    let newPost = post;

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
    newPost = { ...newPost, recipeId: attachedRecipe._id};

    // Add the group to the post
    const groupId = await groupDao.getGroupByName(post.groupName);
    newPost = { ...newPost, groupId};

    await postsDao.createPost(newPost);
    const populatedPost = await postsDao.getPostById(newPost._id);
    res.json(populatedPost);
  }

  // Delete a post
  async function deletePost(req, res) {
    const postId = req.params.postId;
    const response = await postsDao.deletePost(postId);
    if(response.deletedCount === 0) {
      res.status(404).json({ message: "Post not found" });
      return;
    }
    res.json(postId);
  }

  // Get all posts associated with a recipe
  async function getPostsByRecipeId(req, res) {
    const recipeId = req.params.recipeId;
    const posts = await postsDao.getPostsByRecipeId(recipeId);
    res.json(posts);
  }

  // Get all posts associated with a user
  async function getPostsByUserId(req, res) {
    const userId = req.params.userId;
    const posts = await postsDao.getPostsByUserId(userId);
    res.json(posts);
  }

  app.get("/api/posts", getAllPosts);
  app.get("/api/group-posts/:groupId", getGroupsPosts);
  app.get("/api/followed-posts", getFollowedPosts);
  app.get("/api/user-posts/:userId", getPostsByUserId);
  app.get("/api/liked-posts/:userId", getLikedPosts);
  app.post("/api/posts", createPost);
  app.delete("/api/posts/:postId", deletePost);
  app.get("/api/recipe-posts/:recipeId", getPostsByRecipeId);
};

export default PostsController;
