var express = require('express');
var router = express.Router();

var usuariosModel = require('./../../models/usuariosModel');


router.get('/', function (req, res, next) {
  res.render('admin/login', { //login.hbs
    layout: 'admin/layout'
  });
});


router.post('/', async (req, res, next) => {
  try {
    var usuario = req.body.usuario; // flavia
    var password = req.body.password; // 1234

    console.log(req.body);

    var data = await usuariosModel.getUserAndPassword(usuario, password);

    console.log(data);

    if (data != undefined) {
      req.session.id_usuario = data.id;
      req.session.nombre = data.usuario;

      res.redirect('/admin');/*('/admin/almohadones')*/
    } else {
      res.render('admin/login', {
        layout: 'admin/layout',
        error: true
      })
    }  //cierre else
  } catch (error) {
    console.log(error)
  }
}) //cierra el post

router.get('/logout', function (req, res, next) {
  req.session.destroy(); //destruye la sessión
  res.render('admin/login', {
    layout: 'admin/layout'
  });
});


module.exports = router;
