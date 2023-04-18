import groupMembersModel from "./group-members-model";

type groupMember = {
  groupId: string;
  userId: string;
}

export const createGroupMember = async (groupMember: groupMember) => {
  return await groupMembersModel.create(groupMember);
}

export const getGroupMembersByGroupId = async (groupId: string) => {
  return await groupMembersModel.find({groupId: groupId});
}

export const getGroupsByUserId = async (userId: string) => {
  return await groupMembersModel.find({userId: userId});
}

export const leaveGroup = async (groupMember: groupMember) => {
  return await groupMembersModel.deleteOne(groupMember);
}