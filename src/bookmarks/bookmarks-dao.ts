import bookmarksModel from "./bookmarks-model";

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
  return await bookmarksModel.find({user: userId});
}

export const unbookmark = async (bookmark: bookmarks) => {
  return await bookmarksModel.deleteOne(bookmark);
}
