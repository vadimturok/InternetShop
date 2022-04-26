const Router = require('express')
const router = new Router()
const orderController = require('../controllers/orderController')

router.post('/:email', orderController.create)
router.get('/:id', orderController.getOrder)

module.exports = router