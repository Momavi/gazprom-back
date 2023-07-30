const express = require('express');
const router = express.Router();
const { HomeFolder, getFile, getFolder, getFileInFolder } = require('../controllers/files');
const { authenticateTokenCheck } = require('../controllers/users');

// /api/files/
router.get('/', authenticateTokenCheck, HomeFolder);

// /api/files/:name
router.get('/file/:name', authenticateTokenCheck, getFile);

// /api/files/:folder
router.get('/folder/:folder', authenticateTokenCheck, getFolder);

// /api/files/:folder
router.post('/fileinfolder', authenticateTokenCheck, getFileInFolder);

module.exports = router;
