const router = require("express").Router();
const listsController = require("../controllers/listsController");


router.route("/lists/:boardId")
    .get(listsController.findAll)
router.route("/lists/:listId")
    .delete(listsController.delete)


router.route("/lists")
    .post(listsController.create)
    .put(listsController.update);
router.route('/change-card-order')
    .post(listsController.updateCardOrder)
router.route('/updateListOrder')
    .post(listsController.updateListOrder)



module.exports = router;