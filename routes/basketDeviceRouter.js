const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')

router.post('/', basketController.create)
router.get('/items/:id', basketController.getAll)
router.get('/:id', basketController.destroy)
router.get('/edit/:id/:amount', basketController.editBasket)
router.get('/amount/:id', basketController.getOne)


module.exports = router