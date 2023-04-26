import postsModel from "./posts-model";
import * as followsDao from "../follows/follows-dao";

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

// get post by id
export const getPostById = async (postId: string) => {
  return await postsModel
  .findById(postId)
  .populate("recipeId")
  .populate("userId")
  .populate("groupId")
}

// Get posts by recipeId
export const getPostsByRecipeId = async (recipeId: string) => {
  const posts = await postsModel
    .find({ recipeId: recipeId })
    .populate("recipeId")
    .populate("userId")
    .populate("groupId")
    .sort({ date: -1 });
  return posts;
};

// Get posts from the users that the current user is following
export const getFollowedPosts = async (userId: string) => {
  const following = await followsDao.getFollowingById(userId);
  const followingIds = following.map((follow: any) => follow._id);
  const followedPosts = await postsModel
  .find({userId: {$in: followingIds}})
  .populate("recipeId")
  .populate("userId")
  .populate("groupId")
  .sort({date: -1});
  return followedPosts;  
}

// Get posts in a group
export const getPostsInGroup = async (groupId: string) => {
  const groupPosts = await postsModel
  .find({groupId: groupId})
  .populate("recipeId")
  .populate("userId")
  .populate("groupId")
  .sort({date: -1});
  return groupPosts;
}

// Get posts by a user and assign to a recipe and group
export const createPost = async (post: postType) => 
  await postsModel.create(post);

// Delete a post
export const deletePost = async (postId: string) => 
  await postsModel.deleteOne({_id: postId});

export const addLikeToPost = async (postId: string) => {
  const post = await postsModel.findById(postId);
  if (post) {
    post.likes++;
    await post.save();
  }
}

export const removeLikeFromPost = async (postId: string) => {
  const post = await postsModel.findById(postId);
  if (post) {
    post.likes = Math.max(post.likes - 1, 0);
    await post.save();
  }
}