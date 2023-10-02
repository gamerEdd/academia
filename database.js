const mysql = require('mysql');

// Configuración de la conexión a la base de datos
const dbConfig = {
  host: 'academy.mysql.database.azure.com',
  user: 'Academia',
  password: 'Eddgenial199503',
  database: 'academia_educativa',
  port: 3306, // Cambia esto al número de puerto de tu servidor de MySQL si es diferente
};

// Crear una conexión a la base de datos
const connection = mysql.createConnection(dbConfig);

// Conectar a la base de datos
connection.connect((error) => {
  if (error) {
    console.error('Error al conectar a la base de datos:', error);
    throw error;
  }
  console.log('Conexión a la base de datos MySQL establecida');
});

module.exports = connection;
