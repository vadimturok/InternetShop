const Router = require('express')
const router = new Router()
const reviewController = require('../controllers/reviewController')

router.post('/', reviewController.create)
router.get('/:deviceId', reviewController.getAll)
router.get('/delete/:id', reviewController.delete)

module.exports = router