import * as followsDao from "./follows-dao";

function FollowsController(app) {
  const createFollow = async (req, res) => {
    const follow = req.body;
    const newFollow = await followsDao.createFollow(follow);
    res.json(newFollow);
  };

  const getFollowersById = async (req, res) => {
    const userId = req.params.userId;
    const followers = await followsDao.getFollowersById(userId);
    res.json(followers);
  };

  const getFollowingById = async (req, res) => {
    const userId = req.params.userId;
    const following = await followsDao.getFollowingById(userId);
    res.json(following);
  };

  const unfollow = async (req, res) => {
    const follow = req.body;
    const deletedFollow = await followsDao.unfollow(follow);
    res.json(deletedFollow);
  };

  app.post("/api/follows", createFollow);
  app.get("/api/follows/:userId/followers", getFollowersById);
  app.get("/api/follows/:userId/following", getFollowingById);
  app.delete("/api/follows", unfollow);
}

export default FollowsController;