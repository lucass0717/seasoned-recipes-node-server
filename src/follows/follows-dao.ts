import followsModel from "./follows-model";

type follow = {
  follower: string;
  following: string;
}

export const createFollow = async (follow: follow) => {
  return await followsModel.create(follow);
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