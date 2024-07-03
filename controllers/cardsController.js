const db = require("../models");
const userAuth = require("../middleware/userAuth");
const { Op, sequelize } = require('sequelize');

module.exports = {
  addCardUser: async (req, res) => {
    const loggedIn = userAuth.isLoggedIn(req, res);
    if (!loggedIn) return res.status(401).json("You must be logged in to do that!");
    const { UserId, CardId } = req.body;
    if (!UserId || !CardId) return res.status(400).send({ errMessage: 'ID cannot be empty' });
    const user_card = await db.User_Card.create(req.body);
    res.json(user_card);
  },
  delCardUser: async (req, res) => {
    const loggedIn = userAuth.isLoggedIn(req, res);
    if (!loggedIn) return res.status(401).json("You must be logged in to do that!");
    const { CardId, UserId } = req.body;
    if (!UserId || !CardId) return res.status(400).send({ errMessage: 'ID cannot be empty' });
    const user_card = await db.User_Card.destroy({ where: { CardId: CardId, UserId: UserId } });
    res.json(user_card);
  },
  findOne: async (req, res) => {
    const loggedIn = await userAuth.isLoggedIn(req, res);
    if (!loggedIn) return res.status(401).json("You must be logged in and the to do that!");
    const oneCard = await db.Card.findOne({
      where: { id: req.params.id },
      include: [db.User, db.Task, db.Label,db.Attachment,
      {
        model: db.Comment,
        include: [
          {
            model: db.User,
            attributes: ['name', 'avatar'],
          }
        ]
      }],
      order: [
        [ { model: db.Comment }, 'createdAt', 'ASC'],
      ]
    });
    console.log(oneCard.Comments.User);
    res.json({ cardInfo: oneCard });
  },
  create: async (req, res) => {
    const loggedIn = userAuth.isLoggedIn(req, res);
    if (!loggedIn) return res.status(401).json("You must be logged in to do that!");
    const { cardTitle, ListId } = req.body;
    if (!cardTitle) return res.status(400).send({ errMessage: 'Title cannot be empty' });
    const newCard = await db.Card.create(req.body);
    // create field index
    const count = await db.Card.count({ where: { ListId: ListId } });
    newCard.index = count - 1;
    console.log("newList.index" + newCard.index);
    console.log("count" + count);
    //对实例的操作需要保存
    await newCard.save();
    res.json(newCard);
  },
  update: async (req, res) => {
    const loggedIn = userAuth.isLoggedIn(req, res);
    if (!loggedIn) return res.status(401).json("You must be logged in to do that!");
    console.log(req.params.id);
    const updatedCard = await db.Card.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res.json(updatedCard);
  },
  delete: async (req, res) => {
    const loggedIn = userAuth.isLoggedIn(req, res);
    if (!loggedIn) return res.status(401).json("You must be logged in to do that!");
    const oneCard = await db.Card.findByPk(req.params.id);
		db.Card.decrement({ index: 1 }, { where: { ListId: oneCard.ListId, 'index': { [Op.gt]: oneCard.index } } });//后面的index-1
    await db.Card.destroy({ where: { id: oneCard.id} });
    res.end();
  },
};