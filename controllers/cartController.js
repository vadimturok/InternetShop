const {Basket} = require('../models/models')
const ApiError = require('../error/ApiError');

class CartController {
    async createBasket(req, res) {
        const {userId} = req.body
        const cart = await Basket.create({userId})
        return res.json(cart)
    }
    async getOne(req, res){
        const {id} = req.params
        const cart = await Basket.findOne({
            where: {userId: id}
        })
        return res.json(cart)
    }

}

module.exports = new CartController()