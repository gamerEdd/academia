const express = require('express');
const router = express.Router();
const db = require('../database'); // Reemplaza '../database' con la ruta adecuada a tu archivo de conexión a la base de datos

// Ruta para obtener todos los registros de usuarios_curso
router.get('/usuarios_curso', (req, res) => {
  db.query('SELECT * FROM usuarios_curso', (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Error al obtener los registros de usuarios_curso.' });
    } else {
      res.status(200).json(results);
    }
  });
});

// Ruta para crear un nuevo registro de usuarios_curso
router.post('/usuarios_curso', (req, res) => {
  const { cursos_curso_id, usuarios_usuario_id } = req.body;
  // Realiza la inserción en la base de datos utilizando los datos proporcionados en req.body
  // Asegúrate de validar y sanitizar los datos antes de insertarlos en la base de datos
  // ...

  // Después de la inserción, puedes responder con el ID del nuevo registro creado o un mensaje de éxito
  // ...
});

// Ruta para eliminar un registro de usuarios_curso
router.delete('/usuarios_curso/:usuario_curso_id', (req, res) => {
  const usuarioCursoId = req.params.usuario_curso_id;
  // Realiza la eliminación en la base de datos utilizando el ID proporcionado
  // ...

  // Después de la eliminación, puedes responder con un mensaje de éxito
  // ...
});

module.exports = router;
