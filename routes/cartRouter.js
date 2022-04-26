const Router = require('express')
const router = new Router()
const cartController = require('../controllers/cartController')

router.post('/', cartController.createBasket)
router.get('/:id', cartController.getOne)

module.exports = router