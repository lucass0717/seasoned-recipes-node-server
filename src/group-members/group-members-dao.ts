import groupMembersModel from "./group-members-model";
import groupsModel from "../groups/groups-model";
export type groupMember = {
  groupId: string;
  userId: string;
}

export const createGroupMember = async (groupMember: groupMember) => {
  return await groupMembersModel.create(groupMember);
}

export const getGroupMembersByGroupId = async (groupId: string) => {
  return await groupMembersModel.find({group: groupId});
}

export const getGroupsByUserId = async (userId: string) => {
  const groupMembers = await groupMembersModel.find({user: userId});
  const groupIds = groupMembers.map((member: any) => member.group);
  const groupInfos = await groupsModel.find({_id: {$in: groupIds}})
  return groupInfos;
}

export const leaveGroup = async (groupMember: groupMember) => {
  return await groupMembersModel.deleteOne(groupMember);
}