const express = require('express');
const router = express.Router();
const { HomeFolder, getFile, getFolder, getFileInFolder } = require('../controllers/files');

// /api/files/
router.get('/', HomeFolder);

// /api/files/:name
router.get('/file/:name', getFile);

// /api/files/:folder
router.get('/folder/:folder', getFolder);

// /api/files/:folder
router.post('/fileinfolder', getFileInFolder);

module.exports = router;
