var express = require('express');
var router = express.Router();

var usuariosModel = require('./../../models/usuariosModel');
var novedadesModel = require('./../../models/novedadesModel');
var util = require('util'); //me sirve para hacer el ida y vuelta de las promesas (funciones)//
var cloudinary = require('cloudinary').v2; //librería para poder subir la imágen//
const uploader = util.promisify(cloudinary.uploader.upload); //la subida para que se comunique (útil) con cloudinary//
const destroy = util.promisify(cloudinary.uploader.destroy);

router.get('/', async function (req, res, next) {

  var novedades = await novedadesModel.getNovedades();

  novedades = novedades.map(novedades => {
    if (novedades.img_id) {
      const imagen = cloudinary.image(novedades.img_id, {
        width: 100,
        height: 100,
        crop: 'fill'
      });
      return {
        ...novedades,
        imagen
      }
    } else {
      return {
        ...novedades,
        imagen: ''
      }
    }
  });
  res.render('admin/novedades', {
    layout: 'admin/layout',
    usuario: req.session.nombre,
    novedades
  });
});

router.get('/eliminar/:id', async (req, res, next) => {
  var id = req.params.id;
  let novedades = await novedadesModel.getNovedadesById(id);
  if (novedades.img_id) {
    await (destroy(novedades.img_id))
  }

  await novedadesModel.deleteNovedadesById(id);
  res.redirect('/admin/novedades')
});

/*cuando reciba /agregar me va a enviar al formulario de agregar_novedades.hbs*/
router.get('/agregar', (req, res, next) => { //agregar.hbs//
  res.render('admin/agregar_novedades', {
    layout: 'admin/layout'
  }); //cierra render//
}); //cierra get//

router.post('/agregar_novedades', async (req, res, next) => {
  try {
    var img_id = '';
    if (req.files && Object.keys(req.files).length > 0) {
      imagen = req.files.imagen;
      img_id = (await uploader(imagen.tempFilePath)).public_id;
    }

    console.log(req.body) // img, titulo//

    if (req.body.titulo != ""/*?.trim()*/) {
      await novedadesModel.insertNovedades({
        ...req.body,
        img_id
      });

      res.redirect('/admin/novedades')

    } else {
      res.render('admin/agregar_novedades', {
        layout: 'admin/layout',
        error: true, message: 'Todos los campos son requeridos'
      })
    }

  } catch (error) {
    res.render('admin/agregar_novedades', {
      layout: 'admin/layout',
      error: true, message: 'No se cargo la nueva novedad'
    });
  }
});

/* get trae el diseño del formulario de modificar > info de la novedad por id*/
router.get('/modificar/:id', async (req, res, next) => {
  let id = req.params.id;
  let novedades = await novedadesModel.getNovedadesById(id);
  res.render('admin/modificar_novedades', { //modificar_novedades.hbs//
    layout: 'admin/layout',
    novedades
  });
});

/*la actualización del formulario actualizar */
router.post('/modificar_novedades', async (req, res, next) => {
  try {
    let img_id = req.body.img_original;
    let borrar_img_vieja = false;
    let imagen;

    if (req.body.img_delete === "1") {
      img_id = null;
      borrar_img_vieja = true;
    } else {
      if (req.files && Object.keys(req.files).length > 0) {
        imagen = req.files.imagen;
        img_id = (await uploader(imagen.tempFilePath)).public_id;
        borrar_img_vieja = true;
      }
    }
    if (borrar_img_vieja && req.body.img_original) {
      await (destroy(req.body.img_original));
    }


    //console.log(req.body.id); // para ver si trae el id
    var obj = {
      img_id,
      titulo: req.body.titulo

    }
    //var id = req.body.id;

    console.log(obj) //para ver si trae los datos

    await novedadesModel.modificarNovedadesById(obj, req.body.id);
    res.redirect('/admin/novedades');
  } catch (error) {
    console.log(error)
    res.render('admin/modificar_novedades', {
      layout: 'admin/layout',
      error: true,
      message: 'No se modificó la novedad'
    })
  } //cierre catch//
}); //cierra el post


module.exports = router;
