const Router = require('express')
const UserController = require("../controllers/UserController.js");
const routerUser = new Router();

routerUser.post('/auth', UserController.auth)
routerUser.post('/auth/refresh', UserController.authByRefreshToken)
routerUser.post('/refreshToken', UserController.refreshToken)
routerUser.post('/registration', UserController.registration)
routerUser.get('/logout/:id', UserController.logout)
routerUser.get('/:id', UserController.getOne)

module.exports = routerUser;