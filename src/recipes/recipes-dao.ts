import recipesModel from "./recipes-model";

type recipeType = {
  recipeApiId: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
}

// Creates a new recipe
export const createRecipe = async (recipe: recipeType) => {
  return await recipesModel.create(recipe);
}

// Retrieves a recipe by its mongodb id
export const findRecipeById = async (recipeId: string) =>
  await recipesModel.findById(recipeId);

// Retrieves a recipe by its api id
<<<<<<< HEAD
export const findRecipeByExternalId = async (recipeApiId: number) => 
=======
export const findRecipeByApiId = async (recipeApiId: number) => 
>>>>>>> 454bf2b0e6064bb73dcd983b756b717bdbb656ab
  await recipesModel.findOne({ recipeApiId });
