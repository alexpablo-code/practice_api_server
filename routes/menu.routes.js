const menuController = require('../controllers/menu.controller');
const express = require('express');
const router = express.Router();

router.get('/api/first', menuController.firstReq);



module.exports = router;