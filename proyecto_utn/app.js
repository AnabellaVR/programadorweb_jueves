var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();
const session = require('express-session');
var fileUpload = require('express-fileupload');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var loginRouter = require('./routes/admin/login'); // >routes >admin >login.js
var adminIndexRouter = require('./routes/admin/index');

var adminRouter = require('./routes/admin/almohadones');  //almohadones.js
var adminNovedadesRouter = require('./routes/admin/novedades');//novedades.js

var proyectosRouter = require('./routes/proyectos'); //carpeta routes > proyecto.js

var tiendaRouter = require('./routes/tienda');

var almohadonesRouter = require('./routes/almohadones');

var novedadesRouter = require('./routes/novedades');

var serviciosRouter = require('./routes/servicios');

var disenioRouter = require('./routes/disenio');

var asesoramientoRouter = require('./routes/asesoramiento');

var estudioRouter = require('./routes/estudio');

var quienessomosRouter = require('./routes/quienessomos');

var equipoRouter = require('./routes/equipo');

var contactoRouter = require('./routes/contacto');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: '"31{%ay/?<FQ6j!N,5qZ',
  resave: false,
  saveUninitialized: true
}));

secured = async (req, res, next) => {
  try {
    console.log(req.session.id_usuario);

    if (req.session.id_usuario) {
      next();
    } else {
      res.redirect('/admin/login')
    }
  } catch (error) {
    console.log(error);
  }
}

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));


app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/admin/login', loginRouter);
app.use('/admin', secured, adminIndexRouter);

app.use('/admin/almohadones', secured, adminRouter);
app.use('/admin/novedades', secured, adminNovedadesRouter);

app.use('/proyectos', proyectosRouter);

app.use('/tienda', tiendaRouter);

app.use('/almohadones', almohadonesRouter);

app.use('/novedades', novedadesRouter);

app.use('/servicios', serviciosRouter);

app.use('/disenio', disenioRouter);

app.use('/asesoramiento', asesoramientoRouter);

app.use('/estudio', estudioRouter);

app.use('/quienessomos', quienessomosRouter);

app.use('/equipo', equipoRouter);

app.use('/contacto', contactoRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
