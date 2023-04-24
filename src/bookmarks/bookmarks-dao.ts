import bookmarksModel from "./bookmarks-model";
import recipesModel from "../recipes/recipes-model";

export type bookmarks = {
  user: string;
  recipe: string;
}

export const createBookmark = async (bookmark: bookmarks) => {
  return await bookmarksModel.create(bookmark);
}

export const getBookmarksByRecipeId = async (recipeId: string) => {
  return await bookmarksModel.find({recipe: recipeId});
}

export const getBookmarksByUserId = async (userId: string, objectsOrRecipes: boolean) => {
  const bookmarks = await bookmarksModel.find({user: userId});
  const recipeIds = bookmarks.map((save: any) => save.recipe);
  const recipeInfos = await recipesModel.find({_id: {$in: recipeIds}});
  const bool = objectsOrRecipes
  if (bool) {
    return bookmarks;
  } else {
    return recipeInfos;
  }
}

export const getBookmarkByUserIdAndRecipeID = async (userId: string, recipeId: string) => {
  return await bookmarksModel.findOne({recipe: recipeId, user: userId});
}

export const unbookmark = async (bookmark: bookmarks) => {
  return await bookmarksModel.deleteOne(bookmark);
}
