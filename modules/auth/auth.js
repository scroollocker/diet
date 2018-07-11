var validator = require('Validator');
var userModel = require('./model');
var bcrypt = require('bcrypt');

var authWithCreditianals = function (req, res, next) {

    var data = {
        username: req.body.username,
        password: req.body.password
    };

    var rules = {
        username: 'required',
        password: 'required'
    };

    var fieldsNames = {
        username: 'Имя пользователя',
        password: 'Пароль'
    };

    var messages = {
        'required': 'Поле :attr обязательно к заполнению'
    };

    var v = validator.make(data, rules, messages, fieldsNames);

    if (v.passes()) {
        userModel.getUserByName(data.username, (err, user) => {
            if (err) {
                res.send({
                    status: false,
                    message: err.message
                });

                return;
            }

            bcrypt.compare(data.password, user.password, function(err, res) {
                if (err) {
                    console.error('Bcrypt error', err);
                    return;
                }

                if (res) {

                }
                else {

                }
            });
        });
    }
    else {
        var errors = v.getErrors();

        var msgs = '';
        if (errors) {
            errors.forEach((error) => {
                error.forEach((msg) => {
                    msgs += ' ' + msg;
                });
            });
        }

        res.send({
            status: false,
            message: msgs
        });
    }

};