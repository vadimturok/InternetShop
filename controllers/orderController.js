const {Order} = require('../models/models')
const userController = require('./userController')
const {User} = require('../models/models')

class OrderController{
    async create(req, res){
        let {name, surname, phone, region, city, department, delivery, payment, basketid, total} = req.body
        const {email} = req.params
        const order = await Order.create({name, surname, phone, region, city, department, delivery, payment, basketid, total})
        const message = {
            to: email,
            subject: 'Заказ успешно оформлен!',
            text: `Поздравляем! Ваш заказ №${order.id} успешно обработан!`
        }
        return res.json(order)
    }
    async getOrder(req, res){
        const {id} = req.params
        const order = await Order.findAll({
            where: {basketid: id}
        })
        return res.json(order)
    }

}

module.exports = new OrderController()