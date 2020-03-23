var router = require('express').Router();
var mainRouteController = require('./main.route');
var authController = require('../controllers/auth.controller');



///Sign In
router.post('/api/user/signup', mainRouteController.createUser);
router.post('/api/user/signin', mainRouteController.userSignIn);

router.post('/api/user/addpost', authController.validateToken, mainRouteController.addPost);
router.get('/api/user/getPostAll', authController.validateToken, mainRouteController.getAllPost);
router.get('/api/user/getPost', authController.validateToken, mainRouteController.getUserPost);
router.patch('/api/user/comment/post', authController.validateToken, mainRouteController.addComment);
router.patch('/api/user/postUpdate', authController.validateToken, mainRouteController.updatePost);
router.delete('/api/user/deletePost', authController.validateToken, mainRouteController.deletePost);
router.patch('/api/user/updateComment', authController.validateToken, mainRouteController.updateComment);
router.patch('/api/user/hideComment', authController.validateToken, mainRouteController.hideComment);


module.exports = router