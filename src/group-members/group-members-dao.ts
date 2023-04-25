import groupMembersModel from "./group-members-model";
import groupsModel from "../groups/groups-model";
import usersModel from "../users/users-model";
export type groupMember = {
  groupId: string;
  userId: string;
}

export const createGroupMember = async (groupMember: groupMember) => {
  return await groupMembersModel.create(groupMember);
}

export const getGroupMembersByGroupId = async (groupId: string) => {
  const groupMembers = await groupMembersModel.find({group: groupId});
  const userIds = groupMembers.map((member: any) => member.user);
  const userInfos = await usersModel.find({_id: {$in: userIds}});
  return userInfos;
}

export const getGroupsByUserId = async (userId: string) => {
  const groupMembers = await groupMembersModel.find({user: userId});
  const groupIds = groupMembers.map((member: any) => member.group);
  const groupInfos = await groupsModel.find({_id: {$in: groupIds}})
  return groupInfos;
}

export const leaveGroup = async (groupMember: groupMember) => {
  return await groupMembersModel.deleteOne({group: groupMember.groupId, user: groupMember.userId});
}