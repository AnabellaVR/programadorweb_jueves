var express = require('express');
var router = express.Router();
var novedadesModel = require('../models/novedadesModel');
var cloudinary = require('cloudinary').v2;

/* GET home page. */
router.get('/', async function (req, res, next) {
  novedades = await novedadesModel.getNovedades();
  novedades = novedades.slice(0, 5);
  novedades = novedades.map(novedades => {
    if (novedades.img_id) {
      const imagen = cloudinary.url(novedades.img_id, {
        width: 460,
        height: 350,
        crop: 'fill'
      });
      return {
        ...novedades,
        imagen
      }
    } else {
      return {
        ...novedades,
        imagen: 'img/default-image.jpg'
      }
    }
  });
  res.render('novedades', {
    layout: 'layout',
    novedades
  });
});

module.exports = router;