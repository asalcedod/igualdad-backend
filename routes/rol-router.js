const express = require('express')
const routeSecure = require('./../libs/routeSecure')
const RolCtrl = require('../controllers/rol-ctrl')

const router = express.Router()

router.post('/rol', routeSecure, RolCtrl.createRol)
router.put('/rol/:id', routeSecure, RolCtrl.updateRol)
router.delete('/rol/:id', routeSecure, RolCtrl.deleteRol)
router.get('/rol/:id', routeSecure, RolCtrl.getRolById)
router.get('/rols', routeSecure, RolCtrl.getRols)

module.exports = router