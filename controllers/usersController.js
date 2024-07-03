const db = require("../models");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const userAuth = require("../middleware/userAuth");

module.exports = {
  findOne: async (req, res) => {   //查询一个看板的所有列表&所有用户，查询一个列表的所有卡片，
    const loggedIn = await userAuth.isLoggedIn(req, res);
    if (!loggedIn) return res.status(401).json("You must be logged in and the to do that!");
    const oneUser = await db.User.findOne({
      where: { id: req.user }
    });
    res.json(oneUser);
  },
  update: async (req, res) => {
    const loggedIn = userAuth.isLoggedIn(req, res);
    if (!loggedIn) return res.status(401).json("You must be logged in to do that!");
    const updatedUser = await db.User.update(req.body, {
      where: {
        id: req.user
      }
    });
    res.json(updatedUser);
  },
  addBoardUser: async (req, res) => {
    const loggedIn = userAuth.isLoggedIn(req, res);
    if (!loggedIn) return res.status(401).json("You must be logged in to do that!");
    const email = req.params.email;
    if (!email) return res.status(400).send({ errMessage: 'email cannot be empty' });
    const user = await db.User.findOne({ where: { email: req.params.email } });
    if (!user) return res.status(400).send({ errMessage: 'Wrong email' });
    const user_board = await db.User_Board.create({ UserId: user.id, BoardId: req.body.BoardId });
    res.json(user_board);
  },
  register: async (req, res) => {
    const { email, password } = req.body;
    const user = await db.User.findOne({ where: { email: email } });
    try {
      if (user) { console.log(`user ${user} exists`); return res.status(409).json("A user with that email already exists!"); }
      else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await db.User.create({ ...req.body, password: hashedPassword });
        console.log(newUser);

        req.logIn(newUser, error => {
          if (error) return res.status(500).json("Oh no, something went wrong");
          return res.json({ user: { id: req.user.id, name: req.user.name, avatar: req.user.avatar, email: req.user.email } });
        })
      }
    } catch (e) {
      console.log(e);
      return res.status(500).json("Oh no, something went wrong");
    }
  },
  login: (req, res, next) => {
    passport.authenticate("local", (error, user, info) => {
      if (error) return res.status(500).json("Oh no, something went wrong");
      if (!user) return res.status(409).json("Username or password is incorrect!");

      req.logIn(user, error => {
        if (error) return res.status(500).json("Oh no, something went wrong");
        return res.json({ user: { id: req.user.id, name: req.user.name, avatar: req.user.avatar, email: req.user.email } });
      })
    })(req, res, next);
  },
  logout: async (req, res) => {
    await req.logout();
    res.end();
  },
};