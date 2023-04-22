import * as followsDao from "./follows-dao";
import { findUserById } from "../users/users-dao";
import { follow } from "./follows-dao";

function FollowsController(app) {
  const createFollow = async (req, res) => {
    try {
      const follow : follow = req.body;
      const newFollow = await followsDao.createFollow(follow);
      res.json(newFollow);
    } catch (e) {
      res.status(400).send("Invalid Follow");
    }
  };

  const getFollowersById = async (req, res) => {
    const userId = req.params.userId;
    const user = await findUserById(userId);
    if (!user) {
      res.status(404).send("User not found");
      return;
    }
    const followers = await followsDao.getFollowersById(userId);
    res.json(followers);
  };

  const getFollowingById = async (req, res) => {
    const userId = req.params.userId;
    const user = await findUserById(userId);
    if (!user) {
      res.status(404).send("User not found");
      return;
    }
    const following = await followsDao.getFollowingById(userId);
    res.json(following);
  };

  const unfollow = async (req, res) => {
    try {
      const follow : follow = req.body;
      const deletedFollow = await followsDao.unfollow(follow);
      res.json(deletedFollow);
    }
    catch (e) {
      res.status(400).send("Invalid Follow");
    }
  };

  app.post("/api/follows", createFollow);
  app.get("/api/follows/:userId/followers", getFollowersById);
  app.get("/api/follows/:userId/following", getFollowingById);
  app.delete("/api/follows", unfollow);
}

export default FollowsController;