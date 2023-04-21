import * as recipesDao from './recipes-dao';
import {findRecipeById} from "./recipes-dao";

const RecipesController = (app) => {
  
  // Get recipe by External Id
  const getRecipeByAPIId =  async (req, res) => {
    const recipeId = req.params.recipeId;
    const recipe = await recipesDao.findRecipeByAPIId(recipeId);
    res.json(recipe);
  };

  // Save an external recipe in our database
  const createRecipe = async (req, res) => {
    const recipe = req.body;
    await recipesDao.createRecipe(recipe);
    res.json(recipe);
  };

  app.get('/api/recipes/:recipeId', getRecipeByAPIId);
  app.post('/api/recipes', createRecipe);
}

export default RecipesController;