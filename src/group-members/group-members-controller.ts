import * as groupMembersDao from './group-members-dao';

function GroupMembersController(app) {
  const createGroupMember = async (req, res) => {
    const groupMember = req.body;
    const newGroupMember = await groupMembersDao.createGroupMember(groupMember);
    res.json(newGroupMember);
  };

  const getGroupMembersByGroupId = async (req, res) => {
    const groupId = req.params.groupId;
    const groupMembers = await groupMembersDao.getGroupMembersByGroupId(groupId);
    res.json(groupMembers);
  };

  const getGroupsByUserId = async (req, res) => {
    const userId = req.params.userId;
    const groups = await groupMembersDao.getGroupsByUserId(userId);
    res.json(groups);
  };

  const leaveGroup = async (req, res) => {
    const groupMember = req.body;
    const deletedGroupMember = await groupMembersDao.leaveGroup(groupMember);
    res.json(deletedGroupMember);
  };

  app.post('/api/group-members', createGroupMember);
  app.get('/api/group-members/:groupId', getGroupMembersByGroupId);
  app.get('/api/groups/:userId', getGroupsByUserId);
  app.delete('/api/group-members', leaveGroup);
}

export default GroupMembersController;