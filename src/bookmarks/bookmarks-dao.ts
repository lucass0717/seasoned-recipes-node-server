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

export const getBookmarksByUserId = async (userId: string) => {
  const bookmarks = await bookmarksModel.find({user: userId});
  const recipeIds = bookmarks.map((save: any) => save.recipe);
  const recipeInfos = await recipesModel.find({_id: {$in: recipeIds}});
  return recipeInfos;
}

export const unbookmark = async (bookmark: bookmarks) => {
  return await bookmarksModel.deleteOne(bookmark);
}
