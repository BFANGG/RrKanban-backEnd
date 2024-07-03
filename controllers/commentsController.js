const db = require("../models");
const userAuth = require("../middleware/userAuth");

module.exports = {

  create: async (req, res) => {
    const loggedIn = userAuth.isLoggedIn(req, res);
    if (!loggedIn) return res.status(401).json("You must be logged in to do that!");
    const { CardId, content, id } = req.body;
    if (!content) return res.status(400).send({ errMessage: 'content cannot be empty' });
    const newComment = await db.Comment.create({ content: content, UserId: req.user, CardId: CardId, id: id });
    res.json(newComment);
  },
  update: async (req, res) => {
    const loggedIn = userAuth.isLoggedIn(req, res);
    if (!loggedIn) return res.status(401).json("You must be logged in to do that!");
    console.log(req.params.id);
    const updatedComment = await db.Comment.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res.json(updatedComment);
  },
  delete: async (req, res) => {
    const loggedIn = userAuth.isLoggedIn(req, res);
    if (!loggedIn) return res.status(401).json("You must be logged in to do that!");
    await db.Comment.destroy({ where: { id: req.params.id } });
    res.end();
  },
  findAll: async (req, res) => {
    const loggedIn = userAuth.isLoggedIn(req, res);
    if (!loggedIn) return res.status(401).json("You must be logged in to do that!");
    const allUser = await db.User.findAll(req.body, {
      include: {
        where: {
          cardId: req.params.id
        },
        model: db.Comment,
        order: [["createdAt", "ASC"]],
      }
    });
    let CommentUser = allUser.CommentS;
    res.json({ CommentUserData: CommentUser });
    console.log(CommentUser);
  }
};