var errorConstant = (function () {
    return {
        ERROR_CODE_LIST: {
            "InvalidValueError": 100,
            "InvalidOtpError": 101,
            "OtpExpiredError": 102,
            "NoRecordMatchedError": 103,
            "UserAlreadyExistsError": 200,
            "AuthorisationFailedError": 401,
            "LoginFailedError": 202,
            "IncorrectPasswordError": 203,
            "OrganisationAlreadyExistsError": 204,
            "OrganisationDoesNotExistsError" : 205,
            'OwnerAlreadyExistsError' : 206,
            "ClaimAlreadyExistsError" : 207,
            "InviteAlreadyExistsError" : 208,
            'RoleDoesNotExistsError' : 209,
            "RoleAlreadyExistsError" : 210,
            "LinkAlreadyExistsError" : 211,
            "EventAlreadyExists" : 212,
            "InternalServerError" : 500,
            "ChatSessioOver": 213,

            // new codes
            "ValueAlreadyExistsError" : 10001,
            "ValueExpired" : 10003,
            "DoesNotExistsError" : 10004,
            "NoSlots" : 10005,
            "CustomError" : 10006
            
        }
    };
})();

module.exports = errorConstant;
