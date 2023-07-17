const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/files", function(req, res, next) {
  const files = [
    { id: 1, name: "File 1" },
    { id: 2, name: "File 2" },
  ];

  res.status(201).json(files);
});

module.exports = router;
