const Router = require('express');
const router = new Router();
const controller = require('../controllers/TaskController');
router.post('/runCode', controller.runTests);
router.post('/getTests', controller.getTests);
module.exports = router;
