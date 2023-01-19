const Router = require('express')
const TimesController = require("../controllers/TimesController.js");
const router = new Router();

router.get('/', TimesController.getAll)
router.get('/:id', TimesController.getOne)

module.exports = router;