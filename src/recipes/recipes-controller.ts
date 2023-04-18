import * as recipesDao from './recipes-dao';

const RecipesController = (app) => {
  
<<<<<<< HEAD
  // Get recipe by External Id
  const getRecipeById =  async (req, res) => {
    const recipeId = req.params.recipeId;
    const recipe = await recipesDao.findRecipeByExternalId(recipeId);
=======
  // Get recipe by Mongo Id
  const getRecipeById =  async (req, res) => {
    const recipeId = req.params.recipeId;
    const recipe = await recipesDao.findRecipeById(recipeId);
>>>>>>> 454bf2b0e6064bb73dcd983b756b717bdbb656ab
    res.json(recipe);
  };

  // Save an external recipe in our database
  const createRecipe = async (req, res) => {
    const recipe = req.body;
    await recipesDao.createRecipe(recipe);
    res.json(recipe);
  };

  app.get('/api/recipes/:recipeId', getRecipeById);
  app.post('/api/recipes', createRecipe);
}

export default RecipesController;