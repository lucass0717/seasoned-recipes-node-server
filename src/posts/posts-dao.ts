import postsModel from "./posts-model";

type postType = {
  text: string;
  date: Date;
  likes: number;
}

// retrieves all posts in descending order by date with populated userId, groupId, and recipeId
export const getPosts = async () => {
  return await postsModel
  .find()
  .populate("recipeId")
  .populate("userId")
  .populate("groupId")
  .sort({date: -1});
}

export const createPost = async (post: postType) => 
  await postsModel.create(post);


export const deletePost = async (postId: string) => 
  await postsModel.deleteOne({_id: postId});
