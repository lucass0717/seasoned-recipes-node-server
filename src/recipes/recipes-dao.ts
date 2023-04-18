import recipesModel from "./recipes-model";

type recipeType = {
  id: string;
  name: string;
  thumbnail_url: string;
  tags: string[];
  yields: string;
  total_time_minutes: string;
}

// Creates a new recipe
export const createRecipe = async (recipe: recipeType) => {
  return await recipesModel.create(recipe);
}

// Retrieves a recipe by its mongodb id
export const findRecipeById = async (recipeId: string) =>
  await recipesModel.findById(recipeId);

// Retrieves a recipe by its api id
export const findRecipeByExternalId = async (id: number) =>
  await recipesModel.findOne({ id });
