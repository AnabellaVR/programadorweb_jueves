var express = require('express');
var router = express.Router();
var almohadonesModel = require('../models/almohadonesModel');

/* GET home page. */
router.get('/', async function(req, res, next) {
  var almohadones = await almohadonesModel.getAlmohadones();
  res.render('almohadones')
  });


module.exports = router;