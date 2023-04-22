import followsModel from "./follows-model";

export type follow = {
  follower: string;
  following: string;
}

export const createFollow = async (follow: follow) => {
  return await followsModel.create(follow);
}

export const getFollow = async (follow: follow) => {
  return await followsModel.findOne(follow);
}

export const getFollowersById = async (userId: string) => {
  const followers = await followsModel
      .find({following: userId})
      .populate("follower");
  return followers.map(follow => follow.follower);
}

export const getFollowingById = async (userId: string) => {
  const following =  await followsModel
      .find({follower: userId})
      .populate("following");
  return following.map(follow => follow.following);
}

export const unfollow = async (follow: follow) => {
  return await followsModel.deleteOne(follow);
}