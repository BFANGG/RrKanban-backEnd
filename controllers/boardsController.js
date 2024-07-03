const db = require("../models");
const userAuth = require("../middleware/userAuth");

module.exports = {
  getdata: async (req, res) => {
    const loggedIn = await userAuth.isLoggedIn(req, res);
    if (!loggedIn) return res.status(401).json("You must be logged in and the owner to do that!");
    res.end();
  },
  findOne: async (req, res) => {   //查询一个看板的所有列表&所有用户，查询一个列表的所有卡片，
    const loggedIn = await userAuth.isLoggedIn(req, res);
    if (!loggedIn) return res.status(401).json("You must be logged in and the to do that!");
    const oneBoard = await db.Board.findOne({
      where: { id: req.params.id },
      include: [
        { model: db.User },
        { model: db.Label },
        {
          model: db.List,
          attributes: ['index'],
          include: {
            model: db.Card,
            attributes: ['index'],
          },
        }],
      order: [[db.List, db.Card, "index", "ASC"]],
    });
    console.log(oneBoard)
    res.json(oneBoard);
  },
  findAll: async (req, res) => {     //查询一个用户的所有看板
    const loggedIn = userAuth.isLoggedIn(req, res);
    if (!loggedIn) return res.status(401).json("You must be logged in to do that!");
    // const getBoards = await db.Board.findAll({ where: { UserId: req.user } });
    const user = await db.User.findOne({
      where: { id: req.user },
      include: {
        model: db.Board,
        through: {
          attributes: ['isAdmin']
        }
      },
    });
    const getBoards = user.Boards;
    res.json({ boardData: getBoards });
    console.log(getBoards);
  },
  create: async (req, res) => {   //管理员创建项目
    // Deconstruct the body
    const { name } = req.body;
    if (!name) return res.status(400).send({ errMessage: 'Title cannot be empty' });
    const loggedIn = userAuth.isLoggedIn(req, res);
    if (!loggedIn) return res.status(401).json("You must be logged in to do that!");
    //const newBoard = await db.Board.create({ ...req.body, UserId: req.user });
    const admin = await db.User.findByPk(req.user);
    const newBoard = await db.Board.create({ ...req.body });
    await newBoard.addUser(admin, { through: { isAdmin: true } });//创建的人默认为管理员
    const defaultLabels = await db.Label.bulkCreate([             //每个项目默认标签
      { color: "#a8193d", text: ' ' },
      { color: "#4fcc25", text: ' ' },
      { color: "#1ebffa", text: ' ' },
      { color: "#8da377", text: ' ' },
      { color: "#9975bd", text: ' ' },
      { color: "#cf61a1", text: ' ' },
      { color: "#240959", text: ' ' }
    ]);
    newBoard.addLabels(defaultLabels);
    res.json(newBoard.dataValues);
  },
  update: async (req, res) => {
    const loggedIn = await userAuth.isLoggedIn(req, res);
    if (!loggedIn) return res.status(401).json("You must be logged in and the owner to do that!");
    await db.Board.update(req.body, { where: { id: req.params.id } });
    res.end();
  },
  delete: async (req, res) => {
    const loggedIn = await userAuth.isLoggedIn(req, res);
    if (!loggedIn) return res.status(401).json("You must be logged in and the owner to do that!");
    await db.Board.destroy({ where: { id: req.params.id } });
    res.end();
  }
};