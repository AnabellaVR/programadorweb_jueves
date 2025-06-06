var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('soy la pagina de servicios');
});

module.exports = router;