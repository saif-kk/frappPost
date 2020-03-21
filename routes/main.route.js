var mainController = require("../controllers/main.controller");
var authController = require("../controllers/auth.controller");
var bcrypt = require('bcrypt');
var errorCodeList = (require('../constant/error.constant').ERROR_CODE_LIST);
var errorHelper = require('../constant/error.helper');
var CustomError = require('../constant/CustomError');

var mainRoute = (function (){
    return {
        createUser: function (req, res){
            try{
                var name = req.body.name;
                var password = bcrypt.hashSync(req.body.password, 5);
                var email = req.body.email;
                var mobile = req.body.mobile;

                // console.log(name)
                if(!name) throw new error ('name is required');
                if(!password) throw new error ('password is required');

                return mainController.createUser(name, password, mobile, email)
                .then(function (result) {
                    res.status(200).json({
                        status: "Success",
                        data: result
                    });
                })
                .then(undefined, function (err) {
                    if (err) console.log(err);
                    res.end(JSON.stringify({
                        type: false,
                        resultData: "Error occured: " + err
                    }));
                })
            } catch (err) {
                if (err) console.log(err);
                    res.end(JSON.stringify({
                        type: false,
                        resultData: "Error occured: " + err
                   }));
            }
        },

        getUser: function (req, res){
            try{
                return mainController.getUser()
                .then(function (result) {
                    res.status(200).json({
                        status: "Success",
                        data: result
                    });
                })
            }catch(err){
                if (err) console.log(err);
                res.end(JSON.stringify({
                    type: false,
                    resultData: "Error occured: " + err
               }));
            }
        },

        userSignIn: function (req, res){
            try{
                var name = req.body.name;
                var password = (req.body.password);

                // console.log(name)
                if(!name) throw new error ('name is required');
                if(!password) throw new error ('password is required');

                return authController.signIN(name, password)
                .then(function (result) {
                    res.status(200).json({
                        status: "Success",
                        data: result
                    });
                })
                .then(undefined, function (err) {
                    if (err) console.log(err);
                    res.end(JSON.stringify({
                        type: false,
                        resultData: "Error occured: " + err
                    }));
                })
            }catch(err){
                if (err) console.log(err);
                res.end(JSON.stringify({
                    type: false,
                    resultData: "Error occured: " + err
               }));
            }
        },

        addPost: function (req, res, err){
            try{
                var userId = req.body.user;
                var title = req.body.title;
                var post = req.body.post;

                // console.log(name)
                if(!title) throw new InvalidValueError("title", "null", errorCodeList.InvalidValueError);
                if(!post)  throw new InvalidValueError("post", "null", errorCodeList.InvalidValueError);

                return mainController.addPost(userId, title, post)
                .then(function (result) {
                    res.status(200).json({status: "Success",data: result});
                })
                .then(undefined, function (err) {
                    if (err) console.log(err);
                    res.status(400).json(errorHelper.formatError(err));
                })
            }catch{
                if (err) console.log(err);
                res.status(400).json(errorHelper.formatError(err));
            }
        },

        getUserPost: function (req, res){
            try{
                var userId = req.body.user;
                var from = req.query.from;
                var size = req.query.size;

                if (from) from = parseInt(from);
                if (size) size = parseInt(size);

                return mainController.getUserPost(from, size, userId)
                .then(function (result) {
                    res.status(200).json({status: "Success",data: result});
                })
                .then(undefined, function (err) {
                    if (err) console.log(err);
                    res.status(400).json(errorHelper.formatError(err));
                })
            }catch{
                if (err) console.log(err);
                res.status(400).json(errorHelper.formatError(err));
            }
        },

        getAllPost: function (req, res){
            try{
                var from = req.query.from;
                var size = req.query.size;
                
                if (from) from = parseInt(from);
                if (size) size = parseInt(size);

                return mainController.getAllPost(from, size)
                .then(function (result) {
                    res.status(200).json({status: "Success",data: result});
                })
                .then(undefined, function (err) {
                    if (err) console.log(err);
                    res.status(400).json(errorHelper.formatError(err));
                })
            }catch{
                if (err) console.log(err);
                res.status(400).json(errorHelper.formatError(err));
            }
        },

        updatePost: function (req, res){
            try{
                var postId = req.body.postId;
                var datObj = req.body;
                var userId = req.body.user;

                if(req.body.comment) throw new CustomError("can't update comment");
            
                return mainController.updatePost(postId, userId, datObj)
                .then(function (result) {
                    res.status(200).json({status: "Success",data: result});
                })
                .then(undefined, function (err) {
                    if (err) console.log(err);
                    res.status(400).json(errorHelper.formatError(err));
                })
            }catch{
                if (err) console.log(err);
                res.status(400).json(errorHelper.formatError(err));
            }
        },

        addComment: function (req, res){
            try{
                let id = req.body.postId;
                let comment = [{
                    "userId": req.body.user,
                    "comment": req.body.comment,
                    "createdOn": new Date()
                    }]

                if(!id) throw new InvalidValueError("postId", "null", errorCodeList.InvalidValueError);
                if(!comment) throw new InvalidValueError("comment", "null", errorCodeList.InvalidValueError);

                return mainController.addComment(id, comment)
                .then(function (result) {
                    res.status(200).json({status: "Success",data: result});
                })
                .then(undefined, function (err) {
                    if (err) console.log(err);
                    res.status(400).json(errorHelper.formatError(err));
                })
            }
            catch{
                if (err) console.log(err);
                res.status(400).json(errorHelper.formatError(err));
            }
        },

        deletePost: function (req, res){
            try{
                var postId = req.query.postId;
                var userId = req.body.user;

                return mainController.deletePost(postId, userId)
                .then(function (result) {
                    res.status(200).json({status: "Success",data: result});
                })
                .then(undefined, function (err) {
                    if (err) console.log(err);
                    res.status(400).json(errorHelper.formatError(err));
                })
            }catch{
                if (err) console.log(err);
                res.status(400).json(errorHelper.formatError(err));
            }
        },

        updateComment: function (req, res){
            try{
                var postId = req.body.postId;
                var comment = req.body.comment;
                var commentId= req.body.commentId;
                var userId = req.body.user;

                if(!req.body.commentId) throw new InvalidValueError("commentId", "null", errorCodeList.InvalidValueError);
            
                return mainController.updateComment(postId, commentId, comment, userId)
                .then(function (result) {
                    res.status(200).json({status: "Success",data: result});
                })
                .then(undefined, function (err) {
                    if (err) console.log(err);
                    res.status(400).json(errorHelper.formatError(err));
                })
            }catch{
                if (err) console.log(err);
                res.status(400).json(errorHelper.formatError(err));
            }
        },

        hideComment: function (req, res){
            try{
                var postId = req.body.postId;
                var commentId = req.body.commentId;
                var userId = req.body.user;

                return mainController.hideComment(postId, commentId, userId)
                .then(function (result) {
                    res.status(200).json({status: "Success",data: result});
                })
                .then(undefined, function (err) {
                    if (err) console.log(err);
                    res.status(400).json(errorHelper.formatError(err));
                })
            }catch{
                if (err) console.log(err);
                res.status(400).json(errorHelper.formatError(err));
            }
        },

    }
})();

module.exports = mainRoute;