import {$authHost, $host} from "./index";

export const createReview = async (deviceId, userId, text) => {
    const {data} = await $authHost.post('api/review', {deviceId, userId, text})
    return data
}

export const fetchReviews = async (deviceId) => {
    const {data} = await $host.get(`api/review/${deviceId}`)
    return data
}

export const deleteReview = async (id) => {
    const {data} = await $host.get(`api/review/delete/${id}`)
    return data
}