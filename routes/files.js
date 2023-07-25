const express = require('express');
const router = express.Router();
const { getFiles, getFile } = require('../controllers/files');

// /api/files/
router.get('/', getFiles);

// /api/files/file/:name
router.get('/:folder/:name', getFile);

module.exports = router;
