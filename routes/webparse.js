const express = require('express');
const { checkWebSite } = require('../controllers/webparse');
const router = express.Router();

// /api/web_parse/
router.post('/', checkWebSite);

module.exports = router;
