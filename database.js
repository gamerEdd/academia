const mysql = require('mysql');

// Configuración de la conexión a la base de datos
const dbConfig = {
  host: 'exvacorpr.mysql.database.azure.com',
  user: 'exvacorp',
  password: 'Eddgenial199503.*',
  database: 'academia_educativa',
  port: 3306, // Cambia esto al número de puerto de tu servidor de MySQL si es diferente*/
  
  /*
  host: 'localhost',
  user: 'root',
  password: 'edd1234',
  database: 'academia_educativa',
  port: 3306, // Cambia esto al número de puerto de tu servidor de MySQL si es diferente*
  */
  
};

// Crear una pool de conexiones a la base de datos
const pool = mysql.createPool(dbConfig);

// Verificar la conexión a la base de datos
pool.getConnection((error, connection) => {
  if (error) {
    console.error('Error al conectar a la base de datos:', error);
    throw error;
  }
  console.log('Conexión a la base de datos MySQL establecida');
  connection.release(); // Liberar la conexión inmediatamente
});

module.exports = pool;
