const express = require('express');
const router = express.Router();
const db = require('../database'); // Reemplaza '../database' con la ruta adecuada a tu archivo de conexión a la base de datos

// Ruta para obtener todos los cursos
router.get('/', (req, res) => {
  db.query('SELECT * FROM cursos', (error, results) => {
    if (error) {
      console.error('Error al obtener los cursos:', error);
      res.status(500).json({ error: 'Error al obtener los cursos.' });
    } else {
      res.status(200).json(results);
    }
  });
});

// Ruta para obtener el PDF del curso por su curso_id
router.get('/ver-pdf/:curso_id', (req, res) => {
  const cursoId = req.params.curso_id;

  // Realiza una consulta a la base de datos para obtener el PDF del curso por su curso_id
  const sql = 'SELECT archivo_pdf FROM cursos WHERE curso_id = ?';

  db.query(sql, [cursoId], (error, results) => {
    if (error) {
      console.error('Error al obtener el PDF del curso:', error);
      res.status(500).json({ error: 'Error al obtener el PDF del curso.' });
    } else {
      if (results.length === 1) {
        const pdfData = results[0].archivo_pdf;

        // Establece el encabezado de respuesta para el PDF
        res.contentType('application/pdf');
        // Envía el PDF como respuesta
        res.send(pdfData);
      } else {
        // No se encontró el curso
        res.status(404).json({ error: 'Curso no encontrado.' });
      }
    }
  });
});

module.exports = router;
