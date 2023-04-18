import recipesModel from "./recipes-model";

type recipeType = {
  recipeApiId: number;
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
export const findRecipeByExternalId = async (recipeApiId: number) => 
  await recipesModel.findOne({ recipeApiId });
