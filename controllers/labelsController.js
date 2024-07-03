const db = require("../models");
const userAuth = require("../middleware/userAuth");

module.exports = {

  addLabelCard: async (req, res) => {
    const loggedIn = userAuth.isLoggedIn(req, res);
    if (!loggedIn) return res.status(401).json("You must be logged in to do that!");
    const { CardId, LabelId } = req.body;
    if (!LabelId || !CardId) return res.status(400).send({ errMessage: 'ID cannot be empty' });
    const user_card = await db.Label_Card.create(req.body);
    res.json(user_card);
  },
  delLabelCard: async (req, res) => {
    const loggedIn = userAuth.isLoggedIn(req, res);
    if (!loggedIn) return res.status(401).json("You must be logged in to do that!");
    const { CardId,  LabelId } = req.body;
    if (!LabelId || !CardId) return res.status(400).send({ errMessage: 'ID cannot be empty' });
    const user_card = await db.Label_Card.destroy({ where: { CardId: CardId, LabelId:LabelId} });
    res.json(user_card);
  },
  create: async (req, res) => {
    const loggedIn = userAuth.isLoggedIn(req, res);
    if(!loggedIn) return res.status(401).json("You must be logged in to do that!");
    const {color}=req.body;
    if(!color) return res.status(400).send({ errMessage: 'color cannot be empty' });
    const newLabel = await db.Label.create(req.body);
    res.json(newLabel);
  },
  update: async (req, res) => {
    const loggedIn = userAuth.isLoggedIn(req, res);
    if(!loggedIn) return res.status(401).json("You must be logged in to do that!");
    console.log(req.params.id);
    const updatedLabel = await db.Label.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res.json(updatedLabel);
  } ,
    delete: async (req, res) => {
    const loggedIn = userAuth.isLoggedIn(req, res);
    if (!loggedIn) return res.status(401).json("You must be logged in to do that!");
    await db.Label.destroy({ where: { id: req.params.id } });
    res.end();
  },
};