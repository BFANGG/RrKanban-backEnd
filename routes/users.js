const router = require("express").Router();
const usersController = require("../controllers/usersController");


router.route("/register")
    .post(usersController.register)

router.route("/login")
    .post(usersController.login)

router.route("/logout")
    .get(usersController.logout)
router.route("/users/:email")
    .post(usersController.addBoardUser)
router.route("/users")
    .put(usersController.update)
    .get(usersController.findOne)
module.exports = router;