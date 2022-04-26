import {$authHost, $host} from "./index";

export const createOrder = async (name, surname, phone, region, city, department, delivery, payment, basketid, email, total) => {
    const {data} = await $authHost.post(`api/order/${email}`, {name, surname, phone, region, city, department, delivery, payment, basketid, total})
    return data
}

export const addOrderDevice = async (name, orderId, userid, time, deviceid, amount) => {
    const {data} = await $authHost.post('api/orderDevice', {name, orderId, userid, time, deviceid, amount})
    return data
}

export const getOrder = async (basketId) => {
    const {data} = await $host.get(`api/order/${basketId}`)
    return data
}

export const getOrderDevice = async (userid) => {
    const {data} = await $host.get(`api/orderDevice/oneDev/${userid}`)
    return data
}

export const getAllOrderDevices = async () => {
    const {data} = await $host.get(`api/orderDevice/allDevices`)
    return data
}