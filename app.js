const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const connection = require('./database');
const cursosRouter = require('./rutas/cursosRoutes'); // Importa la ruta de cursos
const unidadesRouter = require('./rutas/unidadesRoutes'); // Importa la ruta de unidades

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('presentacion');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {
  const { user, contrasena } = req.body;

  // Lógica de autenticación con la base de datos
  const sql = 'SELECT * FROM usuarios WHERE user = ? AND contrasena = ?';
  connection.query(sql, [user, contrasena], (error, results) => {
    if (error) {
      console.error('Error al consultar la base de datos:', error);
      res.redirect('/login');
    } else {
      if (results.length === 1) {
        console.log('Inicio de sesión exitoso.');
        res.render('dashboard');
      } else {
        console.log('Inicio de sesión fallido.');
        res.redirect('/login');
      }
    }
  });
});

// Ruta para usar el enrutador de cursos
app.use('/cursos', cursosRouter);

// Ruta para usar el enrutador de unidades
app.use('/unidades', unidadesRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});