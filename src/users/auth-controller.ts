import * as usersDao from "./users-dao";
import { getFollow } from "../follows/follows-dao";

const AuthController = (app) => {

  // Register a new user if they don't exist and create a session
  const register = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = await usersDao
      .findUserByUsername(username);
    if (user) {
      res.sendStatus(409);
      return;
    }
    const newUser = await usersDao
      .createUser(req.body);
    req.session["currentUser"] = newUser;
    res.json(newUser);
  };

  // Login a user if they exist and create a session
  const login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = await usersDao
      .findUserByCredentials(username, password);
    if (user) {
      req.session["currentUser"] = user;
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  };

  // If the user is logged in, return their profile
  const profile = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(404);
      return;
    }
    res.json(currentUser);
  };

  // Logout a user and destroy their session
  const logout = async (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  // Get a users profile by their id
  const findUserById = async (req, res) => {
    // get the current user session
    const currentUser = req.session["currentUser"];
    const userId = req.params["userId"];
    const user = await usersDao.findUserById(userId);
    if(!user) {
      res.status(404).send("User not found");
      return;
    }

    
    if(currentUser) {
      const follow = await getFollow({follower: currentUser._id, following: user._id.toString()});
      if(follow) {
        const response = {
          user,
          following: true
        }
        res.json(response);
        return;
      }
    }
    res.json({user, following: false});
  };

const update   = async (req, res) => { };


  app.post("/api/users/register", register);
  app.post("/api/users/login",    login);
  app.get("/api/users/profile",  profile);
  app.get("/api/users/:userId",  findUserById);
  app.post("/api/users/logout",   logout);
  app.put ("/api/users",          update);
};

export default AuthController;