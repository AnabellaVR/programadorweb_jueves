var express = require('express');
var router = express.Router();

var nodemailer = require('nodemailer')

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('contacto');
});

router.post('/', async (req, res, next) => {
    var nombre = req.body.nombre;
    var apellido = req.body.apellido;
    var email = req.body.email;
    var tel = req.body.tel;
    var mensaje = req.body.mensaje;

    console.log(req.body)


    var obj = {
        to: 'anabella_vr@hotmail.com',
        subject: 'Contacto de la página Container estudio',
        html: nombre + " " + apellido + " se contactó a través de la web y quiere más informacón a este correo: " + email + ".<br> Además, hizo este comentario: " + mensaje + " .<br> Su tel es : " + tel
    } //cierre de var obj


    var transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        }
    });// cierre de transport

    var info = await transport.sendMail(obj);

    res.render('contacto', {
        message: 'Mensaje enviado correctamente',
    });
}); //cierre petición de POST



module.exports = router;