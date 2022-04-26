const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
    name: {type: DataTypes.STRING, allowNull: false},
    surname: {type: DataTypes.STRING, allowNull: false},
})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const BasketDevice = sequelize.define('basket_device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    image: {type: DataTypes.STRING, allowNull: false},
    amount: {type: DataTypes.INTEGER, allowNull: false}
})

const Review = sequelize.define('review', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    text: {type: DataTypes.STRING, defaultValue: ''}
})


const Order = sequelize.define('order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    surname: {type: DataTypes.STRING, allowNull: false},
    phone: {type: DataTypes.DECIMAL, allowNull: false},
    region: {type: DataTypes.STRING, allowNull: false},
    city: {type: DataTypes.STRING, allowNull: false},
    department: {type: DataTypes.INTEGER, allowNull: false},
    delivery: {type: DataTypes.STRING, allowNull: false},
    payment: {type: DataTypes.STRING, allowNull: false},
    basketid: {type: DataTypes.INTEGER, allowNull: false},
    total: {type: DataTypes.INTEGER, allowNull: false}
})


const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Brand = sequelize.define('brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Device = sequelize.define('device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
    text: {type: DataTypes.STRING, defaultValue: ''}
})

const DeviceInfo = sequelize.define('device_info', {
    id: {type: DataTypes.INTEGER, unique: true, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})

const OrderDevice = sequelize.define('order_device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    userid: {type: DataTypes.INTEGER},
    time: {type: DataTypes.TIME},
    deviceid: {type: DataTypes.INTEGER, allowNull: false},
    amount: {type: DataTypes.INTEGER, allowNull: false}
})

const TypeBrand = sequelize.define('type_brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

User.hasMany(Review)
Review.belongsTo(User)

Device.hasMany(Review)
Review.belongsTo(Device)

Order.hasMany(OrderDevice)
OrderDevice.belongsTo(Order)



User.hasOne(Basket)
Basket.belongsTo(User)


Device.hasOne(BasketDevice)
BasketDevice.belongsTo(Device)


Basket.hasOne(BasketDevice)
BasketDevice.belongsTo(Basket)


Type.hasMany(Device)
Device.belongsTo(Type)

Brand.hasMany(Device)
Device.belongsTo(Brand)

Device.hasMany(DeviceInfo, {as: 'info'});
DeviceInfo.belongsTo(Device)


Type.belongsToMany(Brand, {through: TypeBrand })
Brand.belongsToMany(Type, {through: TypeBrand })

module.exports = {
    User,
    Type,
    Brand,
    TypeBrand,
    DeviceInfo,
    Device,
    Basket,
    BasketDevice,
    Review,
    Order,
    OrderDevice
}
