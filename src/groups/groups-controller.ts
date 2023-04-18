import * as groupsDao from "./groups-dao";

const GroupsController = (app) => {
  const getGroups = async (req, res) => {
    const groups = await groupsDao.getGroups();
    res.json(groups);
  };

  const getGroupById = async (req, res) => {
    const groupId = req.params.groupId;
    const group = await groupsDao.getGroupById(groupId);
    res.json(group);
  };

  const updateGroup = async (req, res) => {
    const groupId = req.params.groupId;
    const group = req.body;
    await groupsDao.updateGroup(groupId, group);
    res.json(group);
  };

  app.get("/api/groups", getGroups);
  app.get("/api/groups/:groupId", getGroupById);
  app.put("/api/groups/:groupId", updateGroup);
};

export default GroupsController;