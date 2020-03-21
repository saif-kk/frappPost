"use strict";
 
//Utils module loaded
var util = require('util');
 
/**
 * Error Class InvalidValueError
 * */
function InternalServerError(errorCode) {

    /*INHERITANCE*/
    Error.call(this); //super constructor
    Error.captureStackTrace(this, this.constructor); //super helper method to include stack trace in error object
 
    //Set the name for the ERROR 
    this.name = this.constructor.name; //set our function’s name as error name.
 
    //Define error message
    this.message = "Internal Server Error";
    // Set Error Code
    this.errorCode = errorCode;            
}
 
// inherit from Error
util.inherits(InternalServerError, Error);
 
//Export the constructor function as the export of this module file.
exports = module.exports = InternalServerError;