const database = require('../database/database');

var getUserByName = function (name, callback) {
    if (callback && typeof callback === 'function') {
        var connection = database.getConnection();
        if (!connection) {
            callback(new Error('Ошибка соеденения с БД'));
            return;
        }

        var params = [
            name
        ];

        connection.query('select * from users as u where u.username = ?;', params, (err, result, fields) => {
            if (err) {
                console.log(err);
                callback(new Error('Ошибка при работе с БД'));
            }
            else {
                if (result && result.length > 0) {
                    callback(null, result[0]);
                }
                else {
                    callback(new Error('Пользователь не найден'));
                }
            }
        });
    }
};

var getUserByRefresh = function (refresh, callback) {
    if (callback && typeof callback === 'function') {
        var connection = database.getConnection();
        if (!connection) {
            callback(new Error('Ошибка соеденения с БД'));
            return;
        }

        var params = [
            refresh
        ];

        connection.query('select * from users as u where u.refresh = ?;', params, (err, result, fields) => {
            if (err) {
                console.log(err);
                callback(new Error('Ошибка при работе с БД'));
            }
            else {
                if (result && result.length > 0) {
                    callback(null, result[0]);
                }
                else {
                    callback(new Error('Пользователь не найден'));
                }
            }
        });
    }
};

var getUserById = function (id, callback) {
    if (callback && typeof callback === 'function') {
        var connection = database.getConnection();
        if (!connection) {
            callback(new Error('Ошибка соеденения с БД'));
            return;
        }

        var params = [
            id
        ];

        connection.query('select * from users as u where u.user_id = ?;', params, (err, result, fields) => {
            if (err) {
                console.log(err);
                callback(new Error('Ошибка при работе с БД'));
            }
            else {
                if (result && result.length > 0) {
                    callback(null, result[0]);
                }
                else {
                    callback(new Error('Пользователь не найден'));
                }
            }
        });
    }
};

module.exports = {
    getUserByName: getUserByName,
    getUserById: getUserById,
    getUserByRefresh: getUserByRefresh
};