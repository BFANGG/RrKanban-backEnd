const router = require("express").Router();
const boardsController = require("../controllers/boardsController");

router.route("/boards/:id")
    .get(boardsController.findOne)
    .put(boardsController.update)
    .delete(boardsController.delete)
    .post(boardsController.getdata);

router.route("/boards")
    .get(boardsController.findAll)
    .post(boardsController.create);


module.exports = router;