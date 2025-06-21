var express = require('express');
var router = express.Router();
var almohadonesModel = require('../models/almohadonesModel');
var cloudinary = require('cloudinary').v2;



/* GET home page. */
router.get('/', async function (req, res, next) {

  var almohadones = await almohadonesModel.getAlmohadones();

  almohadones = almohadones.slice(0, 12);

  almohadones = almohadones.map(almohadones => {
    if (almohadones.img_id) {
      const imagen = cloudinary.url(almohadones.img_id, {
        width: 300,
        height: 350,
        crop: 'fill'
      });
      return {
        ...almohadones,
        imagen
      }
    } else {
      return {
        ...almohadones,
        imagen: '/img/default-image.jpg'
      }
    }
  });
  res.render('almohadones', {
    layout: 'layout',
    almohadones
  })
});


module.exports = router;