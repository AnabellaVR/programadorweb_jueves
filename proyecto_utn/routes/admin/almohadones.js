var express = require('express');
var router = express.Router();

var usuariosModel = require('./../../models/usuariosModel');
var almohadonesModel = require('./../../models/almohadonesModel');
var util = require('util'); //me sirve para hacer el ida y vuelta de las promesas (funciones)//
var cloudinary = require('cloudinary').v2; //librería para poder subir la imágen//
const uploader = util.promisify(cloudinary.uploader.upload); //la subida para que se comunique (útil) con cloudinary//
const destroy = util.promisify(cloudinary.uploader.destroy);

/*sirve para listar almohadones*/
router.get('/', async function (req, res, next) {

  var almohadones
  if (req.query.q === undefined){
    almohadones = await almohadonesModel.getAlmohadones();
  } else {
    almohadones = await almohadonesModel.buscarAlmohadones(req.query.q);
  }

  //var almohadones = await almohadonesModel.getAlmohadones();/*<= esto debería irse ya que se escaló el proyecto(buscador)*/

  almohadones = almohadones.map(almohadones => {
    if (almohadones.img_id) {
      const imagen = cloudinary.image(almohadones.img_id, {
        width: 100,
        height: 100,
        crop: 'fill'
      });
      return {
        ...almohadones,
        imagen
      }
    } else {
      return {
        ...almohadones,
        imagen: ''
      }
    }
  });

  res.render('admin/almohadones', { //almohadones.hbs
    layout: 'admin/layout',
    usuario: req.session.nombre,  /*flavia*/
    almohadones,
    is_search: req.query.q !== undefined,
    q: req.query.q
  });
});
/*eliminar almohadones*/
router.get('/eliminar/:id', async (req, res, next) => {
  var id = req.params.id;
  let almohadones = await almohadonesModel.getAlmohadonesById(id);
  if (almohadones.img_id) {
    await (destroy(almohadones.img_id));
  }

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
    var img_id = '';
    if (req.files && Object.keys(req.files).length > 0) {
      imagen = req.files.imagen;
      img_id = (await uploader(imagen.tempFilePath)).public_id;
    }

    //console.log(req.body) //titulo y cuerpo//

    if (req.body.titulo != "" && req.body.cuerpo != "") {

      await almohadonesModel.insertAlmohadones({
        ...req.body,
        img_id
      });

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
    let img_id = req.body.img_original;
    let borrar_img_vieja = false;
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
      titulo: req.body.titulo,
      cuerpo: req.body.cuerpo
    }
    //var id = req.body.id;

    console.log(obj) //para ver si trae los datos

    await almohadonesModel.modificarAlmohadonesById(obj, req.body.id);
    res.redirect('/admin/almohadones');
  } catch (error) {
    console.log(error)
    res.render('admin/modificar', {
      layout: 'admin/layout',
      error: true,
      message: 'No se modificó el almohadón'
    })
  } //cierre catch//
}); //cierra el post



module.exports = router;