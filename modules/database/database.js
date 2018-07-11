const mysql = require('mysql');
const environment = require('../../env');

const prom = environment[environment.env];

var getConnection = function () {

    return mysql.createConnection({
        host: prom.database.host,
        user: prom.database.username,
        password: prom.database.password,
        database: prom.database.database
    });

};

var closeConnection = function (connection) {
    if (connection) {
        connection.end((err) => {
            if (err) {
                console.error('SQL Error', err);
            }
        });
    }
};

module.exports = {
    getConnection: getConnection,
    closeConnection: closeConnection
}