import groupsModel from "./groups-model";

type groupType = {
  name: string;
  description: string;
  image: string;
}

export const getGroups = async () => 
  await groupsModel.find();


export const getGroupById = async (groupId: string) => 
  await groupsModel.findById({groupId});


export const updateGroup = async (groupId: string, group: groupType) => 
  await groupsModel.updateOne({_id: groupId}, group); 
