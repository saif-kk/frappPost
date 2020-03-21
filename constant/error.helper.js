var errorHelper = (function () {
    return {
        formatError: function (error) {
            return  {
                status: "Error",
                message: error.message,
                errorCode: error.errorCode
            }
        }
    };
})();

module.exports = errorHelper;
