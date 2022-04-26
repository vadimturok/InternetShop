const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)
router.get('/:id', userController.getOne)
router.get('/edit/email/:id/:email', userController.editEmail)
router.get('/edit/name/:id/:name', userController.editName)
router.get('/edit/surname/:id/:surname', userController.editSurname)
router.get('/delete/:id', userController.delete)
router.get('/all/:role', userController.getAll)

module.exports = router