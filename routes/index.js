  
const Router = require('express')
const router = new Router()
const deviceRouter = require('./deviceRouter')
const userRouter = require('./userRouter')
const brandRouter = require('./brandRouter')
const typeRouter = require('./typeRouter')
const basketDeviceRouter = require('./basketDeviceRouter')
const reviewRouter = require('./reviewRouter')
const cartRouter = require('./cartRouter')
const orderRouter = require('./orderRouter')
const orderDeviceRouter = require('./orderDeviceRouter')

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/device', deviceRouter)
router.use('/basketDevice',basketDeviceRouter)
router.use('/review', reviewRouter)
router.use('/cart', cartRouter)
router.use('/order', orderRouter)
router.use('/orderDevice', orderDeviceRouter)

module.exports = router