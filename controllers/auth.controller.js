var userModel = require('../models/user.model');
var bcrypt = require('bcrypt');
var jwt = require('jwt-simple');
var moment = require('moment');
var errorHelper = require('../constant/error.helper');
var AuthorisationFailedError = require('../constant/AuthorisationFailedError');
var InternalServerError = require("../constant/InternalServerError");
var errorCodeList = (require('../constant/error.constant').ERROR_CODE_LIST);
var JWT_TOKEN_SECRET = 'frapp_T';


var auth = (function(){
    return{
        signIN: function(username, password){
            return userModel.findOne({ email: username })
            .then( function(user){
                if(!user) return ("The username does not exist");
                if(!bcrypt.compareSync(password, user.password)) return( "The password is invalid");
                return user
            }).then( function(usrData){
                return auth.createToken({'userId': usrData._id, 'email': usrData.email, 'mobile': usrData.mobile});
            })
        },

        createToken: function (data) {
            console.log(data);
            return new Promise(function (resolve, reject) {
                var expires = moment().add(1, 'year').valueOf();
                data.expires = expires;
                newJwtToken = jwt.encode(data, JWT_TOKEN_SECRET);
                resolve(newJwtToken);
            }).then(function (jwtToken) {
                if (!jwtToken) throw new InternalServerError(errorCodeList.InternalServerError);
                return jwtToken;
            })
        },

        decodeToken: function (token) {
            return new Promise(function (resolve, reject) {
                var data = jwt.decode(token, JWT_TOKEN_SECRET);
                resolve(data);
            })
                .catch(function (error) {
                    console.log(error);
                    throw new AuthorisationFailedError(errorCodeList.AuthorisationFailedError);
                })
        },

        validateToken: function (req, res, next){
            var token = req.headers.token || req.query.token;

            var userData = null;

            return auth.decodeToken(token)
                .then(function (decode) {

                    if (moment().isAfter(decode.expires)) throw new AuthorisationFailedError(errorCodeList.AuthorisationFailedError);
                    // Person Id is a Must.
                    if (!(decode.userId)) throw new AuthorisationFailedError(errorCodeList.AuthorisationFailedError);

                    // temporary store user Data in userData variable
                    userData = decode;

                    var pValidator = [];
                    if (decode.hasOwnProperty('userId')) pValidator.push(userModel.findById({ '_id': decode.userId}, null, { multi: false }));
                    return Promise.all(pValidator)
                })
                .then(function (result) {
                    for (var i = 0; i < result.length; i++) {
                        if (!result[i]) throw new AuthorisationFailedError(errorCodeList.AuthorisationFailedError);
                    }
                    // add userData in req.body under user property.
                    req.body.user = { ...userData, ...result[0]._doc };
                    next();
                })
                .then(undefined, function (err) {
                    console.log(err);
                    res.status(400).json(errorHelper.formatError(err));
                })
        },
    }
})();

module.exports = auth;