const Router = require('express')
const router = new Router()
const orderDeviceController = require('../controllers/orderDeviceController')

router.post('/', orderDeviceController.create)
router.get('/oneDev/:userid', orderDeviceController.getDevice)
router.get('/allDevices', orderDeviceController.getAllOrderDevices)

module.exports = router