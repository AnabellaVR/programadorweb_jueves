var express = require('express');
var router = express.Router();

var usuariosModel = require('./../../models/usuariosModel');
var almohadonesModel = require('./../../models/almohadonesModel');

/*sirve para listar almohadones*/
router.get('/', async function (req, res, next) {

  var almohadones = await almohadonesModel.getAlmohadones();

  res.render('admin/almohadones', { //almohadones.hbs
    layout: 'admin/layout',
    usuario: req.session.nombre,  /*flavia*/
    almohadones
  });
});
/*eliminar almohadones*/
router.get('/eliminar/:id', async (req, res, next) => {
  var id = req.params.id;
  await almohadonesModel.deleteAlmohadonesById(id);
  res.redirect('/admin/almohadones')
});

module.exports = router;