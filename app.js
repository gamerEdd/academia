const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const connection = require('./database');
const cursosRouter = require('./rutas/cursosRoutes'); // Importa la ruta de cursos
const unidadesRouter = require('./rutas/unidadesRoutes'); // Importa la ruta de unidades
const usuariosRouter = require('./rutas/usuariosRoutes'); // Importa la ruta de usuarios

// Define la variable isAdmin
const isAdmin = false; // Cambia a true si el usuario es un administrador

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware para servir archivos estáticos como CSS, JS, imágenes, etc.
// Middleware para servir archivos estáticos como CSS, JS, imágenes, etc.
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  const imageUrl = 'images/logo.png'; // Ruta de la imagen de fondo
  res.render('presentacion', { imageUrl });
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
        // Verifica el rol del usuario
        const usuario = results[0];
        let isAdmin = false;

        if (usuario.rol === 'Administrador') {
          isAdmin = true;
        }

        console.log('Inicio de sesión exitoso.');
        console.log('Rol del usuario:', usuario.rol); // Agrega esta línea para ver el rol en la consola
        res.render('dashboard', { isAdmin });
      } else {
        console.log('Inicio de sesión fallido.');
      // Mostrar el mensaje de error específico de la base de datos
      const dbError = 'Inicio de sesión fallido. Usuario o contraseña incorrectos.';
      console.error('Error en la autenticación:', dbError);
      res.status(401).json({ error: 'Inicio de sesión fallido', details: dbError });
    
      }
    }
  });
});


app.post('/registro', (req, res) => {
  const { nombre, apellido, email, telefono, direccion, user, contrasena } = req.body;

  // Inserta los datos en la tabla 'persona'
  const insertPersonaSQL = 'INSERT INTO persona (nombre, apellido, email, telefono, direccion, estado) VALUES (?, ?, ?, ?, ?, ?)';
  const estadoPersona = 'A'; // Estado de persona
  connection.query(insertPersonaSQL, [nombre, apellido, email, telefono, direccion, estadoPersona], (error, personaResult) => {
    if (error) {
      res.status(500).json({ error: 'Error al registrar la persona.' });
    } else {
      // Inserta los datos en la tabla 'usuarios' con el rol 'Estudiante'
      const insertUsuarioSQL = 'INSERT INTO usuarios (user, contrasena, rol, estado, persona_persona_id) VALUES (?, ?, ?, ?, ?)';
      const rol = 'Estudiante'; // Rol de Estudiante
      const estadoUsuario = 'A'; // Estado de usuario
      const personaId = personaResult.insertId; // Obtiene el ID de persona recién insertado

      connection.query(insertUsuarioSQL, [user, contrasena, rol, estadoUsuario, personaId], (error, usuarioResult) => {
        if (error) {
          //res.status(500).json({ error: 'Error al registrar el usuario.' });
        } else {
          // res.status(200).json({ message: 'Usuario registrado con éxito.' });
          res.redirect('/login');
        }
      });
    }
  });
});


// Ruta para usar el enrutador de cursos
app.use('/cursos', cursosRouter);

// Ruta para usar el enrutador de unidades
app.use('/unidades', unidadesRouter);

// Ruta para usar el enrutador de usuarios
app.use('/usuarios', usuariosRouter);

// Ruta para renderizar el formulario de registro


app.get('/adminCursos', (req, res) => {
  // Realiza una consulta a la base de datos para obtener todos los cursos
  const query = 'SELECT * FROM cursos';
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error al obtener los cursos:', error);
      res.status(500).json({ error: 'Error al obtener los cursos.' });
    } else {
      const cursos = results;
      res.render('adminCursos', { cursos });
    }
  });
});


// En lugar de definir manualmente los cursos aquí, los obtendremos de la ruta '/adminCursos'
app.get('/adminCursos', (req, res) => {
  // Redirige a la ruta '/adminCursos' manejada por cursosRoutes
  res.redirect('/cursos/adminCursos');
});

app.get('/registro', (req, res) => {
  res.render('registro'); // Asegúrate de que 'registro' sea el nombre correcto de tu archivo de vista EJS para el formulario de registro
});
app.get('/adminCursos', (req, res) => {
  res.render('adminCursos'); // Asegúrate de que 'adminCursos' sea el nombre correcto de tu archivo de vista EJS para la administración de cursos
});

// Ruta para mostrar el formulario de creación de cursos
app.get('/crear', (req, res) => {
  res.render('crearCurso'); // Asegúrate de que 'crearCurso' sea la vista adecuada
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});
