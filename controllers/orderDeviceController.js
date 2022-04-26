const {OrderDevice} = require('../models/models')
const ApiError = require('../error/ApiError');

class OrderDeviceController {
    async create(req, res) {
        const {name, orderId, userid, time, deviceid, amount} = req.body
        const orderDevice = await OrderDevice.create({name, orderId, userid, time, deviceid, amount})
        return res.json(orderDevice)
    }
    async getDevice(req, res){
        const {userid} = req.params
        const getDevices = await OrderDevice.findAll({
            where: {userid: userid}
        })
        return res.json(getDevices)
    }
    async getAllOrderDevices(req, res){
        const orderDevices = await OrderDevice.findAll({})
        return res.json(orderDevices)
    }
}

module.exports = new OrderDeviceController()