const express = require('express');
const router = express.Router();
const db = require('../database'); // Asegúrate de proporcionar la ruta correcta a tu archivo de conexión a la base de datos
const app = express(); // Asegúrate de importar express y definir app en cada archivo de ruta que lo necesite
// Resto del código de tus rutas

// Ruta para obtener todas las unidades
// Ruta para obtener todas las unidades
router.get('/', (req, res) => {
  db.query('SELECT * FROM unidades', (error, results) => {
    if (error) {
      console.error('Error al obtener las unidades:', error);
      res.status(500).json({ error: 'Error al obtener las unidades.' });
    } else {
      res.status(200).json(results);
    }
  });
});

// Ruta para renderizar adminCursos.ejs
router.get('/adminCursos', (req, res) => {
  // Obtén las unidades de la base de datos
  db.query('SELECT * FROM unidades', (error, unidades) => {
    if (error) {
      console.error('Error al obtener las unidades:', error);
      res.status(500).send('Error al obtener las unidades.');
    } else {
      // Renderiza adminCursos.ejs y pasa las unidades como datos
      res.render('adminCursos', { unidades: unidades });
    }
  });
});


module.exports = router;
