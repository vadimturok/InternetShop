import {$authHost, $host} from "./index";


export const addItem = async (basketId, deviceId, name, price, image, amount) => {
    const {data} = await $authHost.post('api/basketDevice', {basketId, deviceId, name, price, image, amount})
    return data;
}

export const fetchBasketItems = async (id) => {
    const {data} = await $host.get(`api/basketDevice/items/${id}`)
    return data
}

export const getBasket = async (id) => {
    const {data} = await $host.get(`api/cart/${id}`)
    return data
}

export const getDeviceAmount = async (id) => {
    const {data} = await $host.get(`api/basketDevice/amount/${id}`)
    return data
}


export const fetchOneBasketItem = async (deviceId) => {
    const {data} = await $host.get(`api/basketDevice/${deviceId}`)
    return data
}

export const editBasketItem = async (id, amount) => {
    const {data} = await $host.get(`api/basketDevice/edit/${id}/${amount}`)
    return data
}
