import * as recipesDao from './recipes-dao';

const RecipesController = (app) => {
  
  const getRecipes =  async (req, res) => {
    const recipeId = req.params.recipeId;
    const recipe = await recipesDao.findRecipeById(recipeId);
    res.json(recipe);
  };

  const createRecipe = async (req, res) => {
    const recipe = req.body;
    await recipesDao.createRecipe(recipe);
    res.json(recipe);
  };

  app.get('/api/recipes/:recipeId', getRecipes);
  app.post('/api/recipes', createRecipe);
}

export default RecipesController;