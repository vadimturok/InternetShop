const {BasketDevice} = require('../models/models')
const uuid = require('uuid')
const path = require('path');

class BasketController{
    async create(req, res){
        let {cartId, deviceId, basketId, name, price, image, amount} = req.body
        const basketDevice = await BasketDevice.create({cartId, deviceId, basketId, name, price, image, amount})
        return res.json(basketDevice)
    }
    async getAll(req, res) {
        const {id} = req.params
        const itemsBasket = await BasketDevice.findAll({
            where: {basketId: id}
        })
        return res.json(itemsBasket)
    }
    async getOne(req, res){
        const {id} = req.params
        const basketAmount = await BasketDevice.findOne({
            where: {id: id}
        })
        return res.json(basketAmount)
    }
    async destroy(req, res){
        const {id} = req.params
        const delItem = await BasketDevice.destroy({
            where: {id: id}
        })
        return res.json(delItem)
    }
    async editBasket(req, res){
        const {id, amount} = req.params
        const updateData = await BasketDevice.update(
            {amount: amount},
            {where: {id: id}}
        )
        return res.json(updateData)
    }

}

module.exports = new BasketController()