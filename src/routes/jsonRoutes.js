const express = require('express');
const router = express.Router();
const { echoJson } = require('../controllers/jsonController');

router.post('/', echoJson);

module.exports = router;