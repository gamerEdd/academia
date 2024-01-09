const express = require('express');
const router = express.Router();
const db = require('../database');

// Ruta para registrar un nuevo usuario
router.post('/registro', (req, res) => {
  const { nombre, apellido, email, telefono, direccion, user, contrasena } = req.body;

  // Inserta los datos en la tabla 'persona'
  const insertPersonaSQL = 'INSERT INTO persona (nombre, apellido, email, telefono, direccion, estado) VALUES (?, ?, ?, ?, ?, ?)';
  const estadoPersona = 'A'; // Estado de persona
  db.query(insertPersonaSQL, [nombre, apellido, email, telefono, direccion, estadoPersona], (error, personaResult) => {
    if (error) {
      res.status(500).json({ error: 'Error al registrar la persona.' });
    } else {
      // Inserta los datos en la tabla 'usuarios' con el rol 'Estudiante'
      const insertUsuarioSQL = 'INSERT INTO usuarios (user, contrasena, rol, estado, persona_persona_id) VALUES (?, ?, ?, ?, ?)';
      const rol = 'Estudiante'; // Rol de Estudiante
      const estadoUsuario = 'A'; // Estado de usuario
      const personaId = personaResult.insertId; // Obtiene el ID de persona recién insertado

      db.query(insertUsuarioSQL, [user, contrasena, rol, estadoUsuario, personaId], (error, usuarioResult) => {
        if (error) {
          res.status(500).json({ error: 'Error al registrar el usuario.' });
        } else {
          res.status(200).json({ message: 'Usuario registrado con éxito.' });
        }
      });
    }
  });
});
// Ruta para iniciar sesión sin encriptación ni token JWT
router.post('/login', (req, res) => {
  const { user, contrasena } = req.body;

  // Busca al usuario por su nombre de usuario y contraseña en la base de datos
  const sql = 'SELECT * FROM usuarios WHERE user = ? AND contrasena = ?';
  db.query(sql, [user, contrasena], (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Error al buscar el usuario.' });
    } else {
      if (results.length === 1) {
        // Redirige al usuario a la página de dashboard si el inicio de sesión es exitoso
        res.redirect('/dashboard');
      } else {
        res.status(401).json({ error: 'Credenciales incorrectas.' });
      }
    }
  });
});

// Ruta para obtener información del usuario autenticado
router.get('/perfil', (req, res) => {
  // ... (código anterior sin cambios)
});

module.exports = router;
