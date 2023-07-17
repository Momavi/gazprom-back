const express = require("express");
const rateLimit = require("express-rate-limit");
const router = express.Router();
const { login, register, reAuth, authenticateTokenCheck } = require("../controllers/users");

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: "Слишком много попыток с одного IP, попробуйте снова через 15 минут"
});

// /api/users/login
router.post("/login", loginLimiter, login);

// /api/users/register
router.post("/register", register);

// /api/users/reauth
router.get("/reauth", authenticateTokenCheck, reAuth);

module.exports = router;
