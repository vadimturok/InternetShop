const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket} = require('../models/models')

const generateJwt = (id, email, role, name, surname) => {
    return jwt.sign(
        {id, email, role, name, surname},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {email, password, role, name, surname} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или password'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, role, password: hashPassword, name, surname})
        const basket = await Basket.create({userId: user.id})
        const token = generateJwt(user.id, user.email, user.role, user.name, user.surname)
        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password, name, surname} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.email, user.role, user.name, user.surname)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role, req.user.name, req.user.surname)
        return res.json({token})
    }
    async getOne(req, res){
        const {id} = req.params
        const userRole = await User.findOne(
            {
                where: {id: id}
            },
        )
        return res.json(userRole)
    }
    async getAll(req, res){
        const {role} = req.params
        const us = await User.findAll({
            where: {role: role}
        })
        return res.json(us)
    }
    async editEmail(req, res){
        const {id,email} = req.params
        const updateData = await User.update(
            {email: email},
            {where: {id: id}}
        )
        return res.json(updateData)
    }
    async editName(req, res){
        const {id,name} = req.params
        const updateData = await User.update(
            {name: name},
            {where: {id: id}}
        )
        return res.json(updateData)
    }
    async editSurname(req, res){
        const {id,surname} = req.params
        const updateData = await User.update(
            {surname: surname},
            {where: {id: id}}
        )
        return res.json(updateData)
    }
    async delete(req, res){
        const {id} = req.params
        const deleteUser = await User.destroy(
            {where: {id: id}}
        )
        return res.json(deleteUser)
    }
}

module.exports = new UserController()