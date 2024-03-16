const Router = require('express');
const router = new Router();
const controller = require('../controllers/VMcontroller');
router.post('/', controller.runCode);
module.exports = router;
