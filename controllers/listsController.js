const db = require("../models");
const userAuth = require("../middleware/userAuth");
const listService = require('../services/ListsService');

module.exports = {
  findOne: async (req, res) => {
    const loggedIn = userAuth.isLoggedIn(req, res);
    if (!loggedIn) return res.status(401).json("You must be logged in to do that!");
    const ListInfo = await db.List.findOne({
      where: { id: req.params.listId },
      include: {
        model: db.Card
      },
      order: [
        [ { model: db.Card }, 'index', 'ASC'],
      ]
    });
    res.json({ listInfo: ListInfo });
  },
  findAll: async (req, res) => {
    const loggedIn = userAuth.isLoggedIn(req, res);
    if (!loggedIn) return res.status(401).json("You must be logged in to do that!");
    const getLists = await db.List.findAll({
      where: { BoardId: req.params.boardId },
      include: {
        model: db.Card,
        include: [db.User, db.Task, db.Label]
      },
      order: [
        ["index", "ASC"],
        [ { model: db.Card }, 'index', 'ASC'],
      ]
    });
    res.json({ listData: getLists });
  },
  create: async (req, res) => {
    // Deconstruct the body
    const { listTitle, BoardId } = req.body;
    // Validate the title
    if (!(listTitle && BoardId)) return res.status(400).send({ errMessage: 'Title cannot be empty' });
    //validate login
    const loggedIn = userAuth.isLoggedIn(req, res);
    console.log(loggedIn);
    if (!loggedIn) return res.status(401).json("You must be logged in to do that!");
    // Validate whether boardId is in the user's boards or not

    // Call the service to add new list
    await listService.create(listTitle, BoardId, (err, result) => {
      if (err) return res.status(500).send(err);
      return res.status(201).send(result);
    });
  },

  update: async (req, res) => {
    const loggedIn = userAuth.isLoggedIn(req, res);
    if (!loggedIn) return res.status(401).json("You must be logged in to do that!");
    await db.List.update(req.body, {
      where: {
        id: req.body.id
      }
    });
    res.end();
  },
  delete: async (req, res) => {
    const loggedIn = userAuth.isLoggedIn(req, res);
    if (!loggedIn) return res.status(401).json("You must be logged in to do that!");
    // Call the service

    await listService.deleteList(req.params.listId, (err, result) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(result);
    });
  },
  updateCardOrder: async (req, res) => {
    // deconstruct the params 卡片id    卡片所属列表 目标卡片所属列表 目标卡片下标
    const { cardId, sourceId, sourceIndex, destinationId, destinationIndex } = req.body;
    const user = req.user;
    // Call the service
    await listService.updateCardOrder(cardId, sourceId, sourceIndex, destinationId, destinationIndex, (err, result) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(result);
    });
  },

  updateListOrder: async (req, res) => {
    // deconstruct the params
    const { boardId, sourceObjId, sourceIndex, destinationIndex } = req.body;
    const user = req.user;

    // Validate the params

    // Call the service
    await listService.updateListOrder(boardId,sourceObjId, sourceIndex, destinationIndex, (err, result) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(result);
    });
  }
};