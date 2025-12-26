const express = require('express');
const router = express.Router();
const { getDynamicData } = require('../controllers/dataController');

router.get('/', getDynamicData);

module.exports = router;