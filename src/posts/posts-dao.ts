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

export const getFollowedPosts = async (userId: string) => {
  console.log("userId", userId);
  const following = await followsDao.getFollowingById(userId);
  const followingIds = following.map((follow: any) => follow.following);
  console.log("followingIds", followingIds);
  const followedPosts = await postsModel.find({userId: {$in: followingIds}});
  console.log("followedPosts", followedPosts);
  return followedPosts;  
}

export const createPost = async (post: postType) => 
  await postsModel.create(post);


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