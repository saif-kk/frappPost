var Promise = require('bluebird');
var userModel = require('../models/user.model');
var postModel = require('../models/post.model');
var CustomError = require('../constant/CustomError');
var _ = require('underscore')


var userControllerr = (function () {
    return{
        createUser: function(name, password, mobile, email){
            return userModel.findOne({$or:[{ email: email , mobile: mobile}]})
            .then( function (user){
                if(user) throw new CustomError ("this user already exist")
                
                let newUser = {
                    "name": name,
                    "password": password,
                    "mobile": mobile,
                    "email": email
                };

                console.log(newUser)
                 return new userModel(newUser).save()
            })  
            .then(function (newUser) {
                return ({message :"hello "+newUser.name+" you have registered, please login!"})
            })
        },   

        getUser: function(){
            return userModel.find({})
             .then(function (userData){
                return userData
             })
        },

        addPost: function(userId, title, post){
            return postModel.findOne({title: title})
            .then( function (postD){
                if (postD) throw new CustomError ("post with same title already exist")
                var dataPost = {
                    "userId" : userId,
                    "title" : title,
                    "postDesc" : post
                }

                return new postModel(dataPost).save()
            })
            .then( function(postData){
                return postData
            })
        },

        getAllPost: function(from, size){
            return postModel.find({'comment.status' : 1})
            .skip(from).limit(size)
            .populate({
                path: 'userId',
                select: 'name email',
            })
            .populate({
                path: 'comment.userId',
                select: 'name email',
            })
            .sort({'createdOn' : -1})
            .then( function (postAll){
                return postAll
            })
        },

        getUserPost: function(from, size, userId){
            return postModel.find({'userId' : userId.userId, 'comment.status' : 1})
            .skip(from).limit(size)
            .populate({
                path: 'userId',
                select: 'name email',
            })
            .populate({
                path: 'comment.userId',
                select: 'name email',
            })
            .sort({'createdOn' : -1})
            .then( function (postAll){
                return postAll
            })
        },

        addComment: function(postId, commentObj){
            return postModel.findById({'_id': postId})
            .then( function(postD){
                if(!postD) throw new CustomError ('This post no longer exist');
                
                return postModel.findByIdAndUpdate(postId, {
                    $addToSet: {
                        comment: {
                            $each: commentObj
                        }
                    }
                }, {
                    new: true
                })
            })
            .then( function(result){
                return result
            })
        },

        updatePost: function(postId, userId, dataObj){
            return postModel.findById({'_id': postId})
            .then( function(postD){
                if(!postD) throw new CustomError ('This post no longer exist');
                if(postD.userId != userId.userId) throw new CustomError ('No right to make changes on this post');
                return postModel.findByIdAndUpdate(postId, {
                    $set: dataObj
                    }, {
                        new: true
                    })
            })
            .then( function(result){
                return result
            })
        },

        deletePost: function (postId, userId) {
            return postModel.findById({
                    "_id": postId
                })
                .then(function (postD) {
                    if (!postD) throw new CustomError(`This id: ${Id} doesn't exists`);
                    if(postD.userId != userId.userId) throw new CustomError ('No right to make changes on this post');
                    return postModel.remove({
                        "_id": postId
                    }).exec()
                })
                .then(function () {
                    return {
                        message: 'Successfully deleted'
                    }
                })
        },

        updateComment: function(postId, commentId, comment, userId){
            return postModel.findById({'_id': postId})
            .then( function(postD){
                if(!postD) throw new CustomError ('This post no longer exist');
                var found = false;;
                var userA = postD.comment;
               console.log(userA.includes({'userId' : userId.userI}));
                    for(var i = 0; i < userA.length; i++){
                    if(userA[i].userId == userId.userId && userA[i]._id == commentId) {
                        console.log(userA[i].userId+" "+userA[i]._id)
                            found = true;
                            break;
                        }
                    }

                if(found == false) throw new CustomError ("you can't update this comment");

                return postModel.findOneAndUpdate({'_id' : postId,  'comment._id' : commentId},{$set : {'comment.$.comment' : comment} }, {new : true})
            })
            .then( function(result){
                return result
            })
        },

        hideComment: function (postId, commentId, userId) {
            return postModel.findById({
                    "_id": postId
                })
                .then(function (postD) {
                    if (!postD) throw new CustomError(`This id: ${Id} doesn't exists`);
                    if(postD.userId != userId.userId) throw new CustomError ('cannot hide this comment');
                    return postModel.findOneAndUpdate({'_id' : postId, 'comment._id' : commentId},{$set : {'comment.$.status': 0 }}, {new : true})
                })
                .then(function () {
                    return {
                        message: 'the comment was removed'
                    }
                })
        },

    }
})();

module.exports = userControllerr;

