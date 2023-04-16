import recipesModel from "./recipes-model";

type recipeType = {
  recipeApiId: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
}

export const createRecipe = async (recipe: recipeType) => {
  return await recipesModel.create(recipe);
}

// Retrieves a recipe by its mongodb id
export const findRecipeById = async (recipeId: string) =>
  await recipesModel.findById(recipeId);

// Retrieves a recipe by its api id
export const findRecipeByApiId = async (recipeApiId: number) => 
  await recipesModel.findOne({ recipeApiId });
