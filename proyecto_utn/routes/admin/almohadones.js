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

/*cuando reciba /agregar me va a enviar al formulario de agregar.hbs*/
router.get('/agregar', (req, res, next) => { //agregar.hbs//
  res.render('admin/agregar', {
    layout: 'admin/layout'
  }); //cierra render//
}); //cierra get//

/*apretar el botón de guardar del formulario de agregar */
router.post('/agregar', async (req, res, next) => {
  try {

    console.log(req.body) //titulo y cuerpo//

    if (req.body.titulo != "" && req.body.cuerpo != "") {

      await almohadonesModel.insertAlmohadones(req.body);

      res.redirect('/admin/almohadones')

    } else {
      res.render('admin/agregar', {
        layout: 'admin/layout',
        error: true, message: 'Todos los campos son requeridos'
      })
    }

  } catch (error) {
    res.render('admin/agregar', {
      layout: 'admin/layout',
      error: true, message: 'No se cargo el nuevo almohadón'
    });
  }
});

/* get trae el diseño del formulario de modificar > info del almohadón por id*/
router.get('/modificar/:id', async (req, res, next) => {
  let id = req.params.id;
  let almohadones = await almohadonesModel.getAlmohadonesById(id);
  res.render('admin/modificar', { //modificar.hbs//
    layout: 'admin/layout',
    almohadones
  });
});

/*la actualización del formulario actualizar */
router.post('/modificar', async (req, res, next) => {
  try {
    var obj = {
      titulo: req.body.titulo,
      cuerpo: req.body.cuerpo
    }
    //var id = req.body.id;

    console.log(obj) //para ver si trae los datos

    await almohadonesModel.modificarAlmohadonesById(obj, req.body.id);
    res.redirect('/admin/almohadones');
  }catch(error) {
    console.log(error)
    res.render('admin/modificar', {
      layout:'admin/layout',
      error: true, 
      message: 'No se modificó la novedad'
    })
  } //cierre catch//
}); //cierra el post



module.exports = router;