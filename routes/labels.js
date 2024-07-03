const router = require("express").Router();
const labelsController = require("../controllers/labelsController");


router.route('/add-label-card')
    .post(labelsController.addLabelCard)
router.route('/del-label-card')
    .post(labelsController.delLabelCard)
router.route('/labels/:id')
    .put(labelsController.update)
module.exports = router;