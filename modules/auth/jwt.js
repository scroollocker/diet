const jwt = require('jsonwebtoken');
const environment = require('../../env');

const prom = environment[environment.env];

var getRefreshToken = (user, callback) => {
    if (user && callback && typeof callback === 'function') {
        jwt.sign({
            user_id: user.user_id,
            username: user.username,
            timestamp: new Date().getTime()
        }, prom.jwt_secret, {expiresIn: '1h'}, (err, token) => {
            if (err) {
                console.log('Get token error')
                callback(new Error('Произошла ошибка при генерации токена'));
                return;
            }

            callback(null, token);
        });
    }
};

var getTokenByUser = (user, callback) => {
    if (user && callback && typeof callback === 'function') {
        jwt.sign({
            user_id: user.user_id,
            username: user.username
        }, prom.jwt_secret, {expiresIn: '1h'}, (err, token) => {
            if (err) {
                console.log('Get token error', err);
                callback(new Error('Произошла ошибка при генерации токена'));
                return;
            }

            getRefreshToken(user, (err, refresh) => {
                if (err) {
                    callback(err);
                    return;
                }

                callback(null, {
                    access_token: token,
                    refresh_token: refresh
                });
            });
        });
    }
};