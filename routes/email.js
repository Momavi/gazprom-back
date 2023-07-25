const express = require('express');
const router = express.Router();
const { createRandomEmails, getEmails, getEmail } = require('../controllers/email');
const { authenticateTokenCheck } = require('../controllers/users');

// /api/email/
router.get('/', authenticateTokenCheck, getEmails);

// /api/email/
router.get('/:emailId', authenticateTokenCheck, getEmail);

// /api/email/ywaeLHymu4JYpY5m0L1h0yf8G9nizSMmH4lfrZXHfwM/:number/mail
router.get('/ywaeLHymu4JYpY5m0L1h0yf8G9nizSMmH4lfrZXHfwM/:number/mail', createRandomEmails);
module.exports = router;
