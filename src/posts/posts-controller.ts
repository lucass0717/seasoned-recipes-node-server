import * as postsDao from "./posts-dao";
import * as recipeDao from "../recipes/recipes-dao";

const PostsController = (app) => {

  async function getAllPosts(req, res) {
    const posts = await postsDao.getPosts();
    res.json(posts);
  }

  async function createPost(req, res) {
    const currentUser = req.session.currentUser;
    
    // if no user is logged in, return 401
    if (!currentUser) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    console.log("body", req.body);
    console.log("post", req.body.post);
    // If the recipe doesn't exist, create it
    let recipe = await recipeDao.findRecipeByApiId(req.body.recipe.recipeApiId);
    if (!recipe) {
      recipe = await recipeDao.createRecipe(req.body.recipe);
    }

    // Create the post with the recipe id
    const post = req.body.post;
    console.log(recipe);
    post.recipeId = recipe._id;
    await postsDao.createPost(post);
    res.json(post);
  }

  async function deletePost(req, res) {
    const postId = req.params.postId;
    await postsDao.deletePost(postId);
    res.json(postId);
  }

  app.get("/api/posts", getAllPosts);
  app.post("/api/posts", createPost);
  app.delete("/api/posts/:postId", deletePost);
};

export default PostsController;