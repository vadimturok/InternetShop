const {Review} = require('../models/models')

class ReviewController{
    async create(req, res){
        let {deviceId, userId, text} = req.body
        const review = await Review.create({deviceId, userId, text})
        return res.json(review)
    }
    async getAll(req, res){
        const {deviceId} = req.params
        const reviews = await Review.findAll({
            where: {deviceId: deviceId}
        })
        return res.json(reviews)
    }
    async delete(req, res){
        const {id} = req.params
        const rev = await Review.destroy({
            where: {id: id}
        })
        return res.json(rev)
    }
}

module.exports = new ReviewController()