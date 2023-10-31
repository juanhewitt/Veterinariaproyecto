import mysql from 'mysql'

const conection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'veterinaria'
});

conection.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("La conexión funciona");
});


export default conection;

