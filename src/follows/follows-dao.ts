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
  return await followsModel.find({following: userId});
}

export const getFollowingById = async (userId: string) => {
  return await followsModel.find({follower: userId});
}

export const unfollow = async (follow: follow) => {
  return await followsModel.deleteOne(follow);
}