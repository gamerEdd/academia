const express = require('express');
const router = express.Router();
const db = require('../database');

// Ruta para registrar un nuevo usuario
router.post('/registro', (req, res) => {
  // ... (código anterior sin cambios)
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
