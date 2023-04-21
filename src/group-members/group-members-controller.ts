import * as groupMembersDao from './group-members-dao';
import * as groupDao from '../groups/groups-dao';
import * as userDao from '../users/users-dao';
import { groupMember } from './group-members-dao';

function GroupMembersController(app) {
  const createGroupMember = async (req, res) => {
    const groupMember : groupMember = req.body;
    const newGroupMember : groupMember = await groupMembersDao.createGroupMember(groupMember);
    res.json(newGroupMember);
  };

  const getGroupMembersByGroupId = async (req, res) => {
    const groupId = req.params.groupId;
    const group = await groupDao.getGroupById(groupId);
    if (!group) {
      res.status(404).send('Group not found');
      return;
    }
    const groupMembers: Array<groupMember> = await groupMembersDao.getGroupMembersByGroupId(groupId);
    res.json(groupMembers);
  };

  const getGroupsByUserId = async (req, res) => {
    const userId = req.params.userId;
    const user = await userDao.findUserById(userId);
    if (!user) {
      res.status(404).send('User not found');
      return;
    }
    const groups = await groupMembersDao.getGroupsByUserId(userId);
    res.json(groups);
  };

  const leaveGroup = async (req, res) => {
    const groupMember: groupMember = req.body;
    const user = await userDao.findUserById(groupMember.userId);
    if (!user) {
      res.status(404).send('User not found');
      return;
    }
    const group = await groupDao.getGroupById(groupMember.groupId);
    if (!group) {
      res.status(404).send('Group not found');
      return;
    }
    const deletedGroupMember = await groupMembersDao.leaveGroup(groupMember);
    res.json(deletedGroupMember);
  };

  app.post('/api/group-members', createGroupMember);
  app.get('/api/group-members/:groupId', getGroupMembersByGroupId);
  app.get('/api/groups/:userId', getGroupsByUserId);
  app.delete('/api/group-members', leaveGroup);
}

export default GroupMembersController;