const express = require('express')
const route = express.Router()
const userController = require('../controller/userController')


route.get( '/getUser' , userController.getUser)
route.post( '/createUser' , userController.createUser)
route.post( '/loginUser' , userController.loginUser)
route.get( '/verifyToken' , userController.verifyToken)


module.exports = route
