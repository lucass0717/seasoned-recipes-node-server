import upvotesModel from "../upvotes/upvotes-model";

export type upvotes = {
  user: string;
  post: string;
}

export const createUpvote = async (upvote: upvotes) => {
  return await upvotesModel.create(upvote);
}

export const getUpvotesByPostId = async (postId: string) => {
  return await upvotesModel.find({post: postId});
}

export const getUpvotesByUserId = async (userId: string) => {
  return await upvotesModel.find({user: userId});
}

export const removeUpvote = async (upvote: upvotes) => {
  return await upvotesModel.deleteOne(upvote);
}
