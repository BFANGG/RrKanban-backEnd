const router = require("express").Router();
const cardsController = require("../controllers/cardsController");


router.route("/cards")
    .post(cardsController.create)

router.route("/cards/:id")
    .delete(cardsController.delete)
    .get(cardsController.findOne)
    .put(cardsController.update)
router.route('/add-card-user')
    .post(cardsController.addCardUser)
router.route('/del-card-user')
    .post(cardsController.delCardUser)
module.exports = router;