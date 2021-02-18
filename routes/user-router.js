const express = require('express')

const upload = require('./../libs/storage')
const routeSecure = require('./../libs/routeSecure')
const UserCtrl = require('../controllers/user-ctrl')

const router = express.Router()

router.post('/user', upload.single('imageUrl'), UserCtrl.createUser)
router.put('/user/:id', routeSecure, upload.single('imageUrl'), UserCtrl.updateUser)
router.delete('/user/:id', routeSecure, UserCtrl.deleteUser)
router.get('/user/:id', routeSecure, UserCtrl.getUserById)
router.get('/login/:username/:password', UserCtrl.getUserByLogin)
router.get('/users', routeSecure, UserCtrl.getUsers)

module.exports = router