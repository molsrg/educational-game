const Router = require('express');
const router = new Router();
const controller = require('../controllers/TaskController');
router.post('/1', controller.task1);
module.exports = router;
