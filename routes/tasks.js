const router = require("express").Router();
const tasksController = require("../controllers/tasksController");


router.route("/tasks")
    .post(tasksController.create)

router.route("/tasks/:id")
    .delete(tasksController.delete)
    .put(tasksController.update)

module.exports = router;