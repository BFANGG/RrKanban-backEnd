const db = require("../models");
const userAuth = require("../middleware/userAuth");

module.exports = {

  create: async (req, res) => {
    const loggedIn = userAuth.isLoggedIn(req, res);
    if(!loggedIn) return res.status(401).json("You must be logged in to do that!");
    const {description}=req.body;
    if(!description) return res.status(400).send({ errMessage: 'description cannot be empty' });
    const newCard = await db.Task.create(req.body);
    res.json(newCard);
  },
  update: async (req, res) => {
    const loggedIn = userAuth.isLoggedIn(req, res);
    if(!loggedIn) return res.status(401).json("You must be logged in to do that!");
    console.log(req.params.id);
    const updatedTask = await db.Task.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res.json(updatedTask);
  } ,
    delete: async (req, res) => {
    const loggedIn = userAuth.isLoggedIn(req, res);
    if (!loggedIn) return res.status(401).json("You must be logged in to do that!");
    await db.Task.destroy({ where: { id: req.params.id } });
    res.end();
  },
};