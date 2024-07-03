const router = require("express").Router();
const commentsController = require("../controllers/commentsController");


router.route("/comments")
    .post(commentsController.create)

router.route("/comments/:id")
    .delete(commentsController.delete)
    .put(commentsController.update)
    .get(commentsController.findAll)

module.exports = router;