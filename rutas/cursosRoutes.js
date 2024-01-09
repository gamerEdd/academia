const express = require('express');
const router = express.Router();
const db = require('../database'); // Reemplaza '../database' con la ruta adecuada a tu archivo de conexión a la base de datos

// Ruta para obtener todos los cursos
router.get('/', (req, res) => {
  // Realiza una consulta a la base de datos para obtener todos los cursos
  const sql = 'SELECT * FROM cursos';
  
  db.query(sql, (error, results) => {
    if (error) {
      console.error('Error al obtener los cursos:', error);
      res.status(500).json({ error: 'Error al obtener los cursos.' });
    } else {
      const cursos = results;
      // Renderiza la vista de administración de cursos con la lista de cursos
      res.render('adminCursos', { cursos }); // Asegúrate de que 'adminCursos' sea la vista adecuada
    }
  });
});
router.get('/', (req, res) => {
  // Realiza una consulta a la base de datos para obtener todos los cursos
  const sql = 'SELECT * FROM cursos';
  
  db.query(sql, (error, results) => {
    if (error) {
      console.error('Error al obtener los cursos:', error);
      res.status(500).json({ error: 'Error al obtener los cursos.' });
    } else {
      const cursos = results;
      
      // Renderiza la vista de administración de cursos con la lista de cursos
      res.render('adminCursos', { cursos }); // Asegúrate de que 'adminCursos' sea la vista adecuada
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
// Ruta para obtener los cursos de una unidad específica
router.get('/unidades/:unidad_id', (req, res) => {
  const unidadId = req.params.unidad_id;

  // Realiza una consulta a la base de datos para obtener los cursos de la unidad
  //const sql = 'SELECT * FROM cursos WHERE unidad_id = ?';
  const sql = 'SELECT * FROM cursos WHERE unidad_id = ? ORDER BY CAST(SUBSTRING(nombre, 1, CASE WHEN LENGTH(nombre) = 1 THEN 1 ELSE LENGTH(nombre) END) AS UNSIGNED), nombre';

  db.query(sql, [unidadId], (error, results) => {
    if (error) {
      console.error('Error al obtener los cursos de la unidad:', error);
      res.status(500).json({ error: 'Error al obtener los cursos de la unidad.' });
    } else {
      res.status(200).json(results);
    }
  });
});

router.get('/worksheet/:curso_id', (req, res) => {
  const cursoId = req.params.curso_id;

  // Realiza una consulta a la base de datos para obtener el enlace al worksheet por curso_id
  const sql = 'SELECT enlacesheet FROM cursos WHERE curso_id = ?';

  db.query(sql, [cursoId], (error, results) => {
    if (error) {
      console.error('Error al obtener el enlace al worksheet:', error);
      res.status(500).json({ error: 'Error al obtener el enlace al worksheet.' });
    } else {
      if (results.length === 1) {
        const worksheetLink = results[0].enlacesheet;

        if (worksheetLink) {
          res.status(200).json({ enlacesheet: worksheetLink });
        } else {
          // El enlace al worksheet está vacío
          res.status(404).json({ error: 'El enlace al worksheet está vacío.' });
        }
      } else {
        // No se encontró el curso
        res.status(404).json({ error: 'Curso no encontrado.' });
      }
    }
  });
});
router.get('/video/:curso_id', (req, res) => {
  const cursoId = req.params.curso_id;

  // Realiza una consulta a la base de datos para obtener el enlace al video de YouTube por curso_id
  const sql = 'SELECT enlaceyoutube FROM cursos WHERE curso_id = ?';

  db.query(sql, [cursoId], (error, results) => {
    if (error) {
      console.error('Error al obtener el enlace al video:', error);
      res.status(500).json({ error: 'Error al obtener el enlace al video.' });
    } else {
      if (results.length === 1) {
        const youtubeLink = results[0].enlaceyoutube;

        if (youtubeLink) {
          res.status(200).json({ enlaceyoutube: youtubeLink });
        } else {
          console.log('El enlace al video de YouTube está vacío para el curso_id', cursoId);
          res.status(404).json({ error: 'El enlace al video de YouTube está vacío.' });
        }
      } else {
        // No se encontró el curso
        res.status(404).json({ error: 'Curso no encontrado.' });
      }
    }
  });
});


// Ruta para obtener todas las unidades
router.get('/obtener-unidades', (req, res) => {
  db.query('SELECT * FROM unidades', (error, results) => {
    if (error) {
      console.error('Error al obtener las unidades:', error);
      res.status(500).json({ error: 'Error al obtener las unidades.' });
    } else {
      const unidades = results;
      res.status(200).json(unidades);
    }
  });
});




router.get('/dashboard', (req, res) => {
  // Supongamos que tienes la lógica para verificar el rol del usuario aquí
  const usuario = req.user; // Supongamos que req.user contiene información sobre el usuario actual
  let isAdmin = false; // Definimos isAdmin como falso por defecto

  if (usuario && usuario.rol === 'Administrador') {
    isAdmin = true; // Si el usuario es administrador, establecemos isAdmin en true
  }

  res.render('dash', { isAdmin });
});


// Ruta para modificar un curso por su curso_id
router.get('/modificar/:curso_id', (req, res) => {
  const cursoId = req.params.curso_id;
  console.log('cursoId:', cursoId); // Verifica el valor de cursoId

  // Realiza una consulta a la base de datos para obtener los datos del curso por su curso_id
  const sql = 'SELECT * FROM cursos WHERE curso_id = ?';

  db.query(sql, [cursoId], (error, results) => {
    if (error) {
      console.error('Error al obtener los datos del curso:', error);
      res.status(500).json({ error: 'Error al obtener los datos del curso.' });
    } else {
      if (results.length === 1) {
        const curso = results[0];
        console.log('Curso:', curso); // Verifica el curso que se obtiene de la base de datos

        // Renderiza una vista de formulario de modificación con los datos del curso
        res.render('modificarCurso', { curso });
      } else {
        // No se encontró el curso
        res.status(404).json({ error: 'Curso no encontrado.' });
      }
    }
  });
});


// Ruta para mostrar el formulario de creación de cursos



// Ruta para eliminar un curso por su curso_id
router.get('/eliminar/:curso_id', (req, res) => {
  const cursoId = req.params.curso_id;

  // Realiza una consulta a la base de datos para eliminar el curso por su curso_id
  const sql = 'DELETE FROM cursos WHERE curso_id = ?';

  db.query(sql, [cursoId], (error, results) => {
    if (error) {
      console.error('Error al eliminar el curso:', error);
      res.status(500).json({ error: 'Error al eliminar el curso.' });
    } else {
      // Redirige a la página de administración de cursos después de la eliminación
      res.redirect('/adminCursos');
    }
  });
});

// Ruta para obtener todos los cursos
// En cursosRoutes.js
router.get('/adminCursos', (req, res) => {
  // Realiza una consulta a la base de datos para obtener los cursos
  const sql = 'SELECT cursos.*, unidades.nombre AS nombre_unidad FROM cursos JOIN unidades ON cursos.unidad_id = unidades.unidad_id';

  db.query(query, (error, results) => {
    if (error) {
      console.error('Error al obtener los cursos:', error);
      res.status(500).json({ error: 'Error al obtener los cursos.' });
    } else {
      const cursos = results;
      res.render('verCursos', { cursos }); // Asegúrate de pasar 'cursos' aquí
    }
  });
});

router.post('/modificar/:curso_id', (req, res) => {
  const cursoId = req.params.curso_id;
  const { nombre, descripcion, enlacesheet, enlaceyoutube } = req.body;

  // Realiza la actualización en la base de datos
  const sql = 'UPDATE cursos SET nombre = ?, descripcion = ?, enlacesheet = ?, enlaceyoutube = ? WHERE curso_id = ?';
  
  db.query(sql, [nombre, descripcion, enlacesheet, enlaceyoutube, cursoId], (error, results) => {
    if (error) {
      console.error('Error al modificar el curso:', error);
      res.status(500).json({ error: 'Error al modificar el curso.' });
    } else {
      // Redirige a la página de administración de cursos después de la modificación
      res.redirect('/adminCursos');
    }
  });
});


// Ruta para mostrar el formulario de creación de cursos
router.get('/crear', (req, res) => {
  res.render('crearCurso'); // Asegúrate de que 'crearCurso' sea la vista adecuada
});

// Ruta para manejar la creación de un nuevo curso
router.post('/crear', (req, res) => {
  const { nombre, descripcion, unidad, archivo_pdf, enlacesheet, enlaceyoutube } = req.body;

  // Realiza la lógica para crear el nuevo curso en la base de datos
  // Inserta los datos del curso en la tabla 'cursos'

  const insertCursoSQL = 'INSERT INTO cursos (nombre, descripcion, unidad_id, archivo_pdf, enlacesheet, enlaceyoutube) VALUES (?, ?, ?, ?, ?, ?)';

  db.query(insertCursoSQL, [nombre, descripcion, unidad, archivo_pdf, enlacesheet, enlaceyoutube], (error, result) => {
    if (error) {
      console.error('Error al crear el curso:', error);
      res.status(500).json({ error: 'Error al crear el curso.' });
    } else {
      console.log('Curso creado con éxito.');
      // Redirige a la página de administración de cursos después de la creación
      res.redirect('/adminCursos');
    }
  });
});

// ... (otros manejadores de rutas)

// Ruta para obtener todos los cursos
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM cursos';

  db.query(sql, (error, results) => {
    if (error) {
      console.error('Error al obtener los cursos:', error);
      res.status(500).json({ error: 'Error al obtener los cursos.' });
    } else {
      const cursos = results;
      // Renderiza la vista de administración de cursos con la lista de cursos
      res.render('adminCursos', { cursos }); // Asegúrate de que 'adminCursos' sea la vista adecuada
    }
  });
});

// ... (otros manejadores de rutas)

// Ruta para mostrar la vista de administración de cursos
router.get('/adminCursos', (req, res) => {
  const sql = 'SELECT * FROM cursos';

  db.query(sql, (error, results) => {
    if (error) {
      console.error('Error al obtener los cursos:', error);
      res.status(500).json({ error: 'Error al obtener los cursos.' });
    } else {
      const cursos = results;
      // Renderiza la vista de administración de cursos con la lista de cursos
      res.render('adminCursos', { cursos }); // Asegúrate de que 'adminCursos' sea la vista adecuada
    }
  });
});

// ... (otros manejadores de rutas)

module.exports = router;
