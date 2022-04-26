import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (email, password, name, surname) => {
    const {data} = await $host.post('api/user/registration', {email, password, role: 'ADMIN', name, surname})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth' )
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const getRole = async (id) => {
    const {data} = await $host.get(`api/user/${id}`)
    return data
}

export const editEmail = async (id, email) => {
    const {data} = await $host.get(`api/user/edit/email/${id}/${email}`)
    return data
}
export const editName = async (id, name) => {
    const {data} = await $host.get(`api/user/edit/name/${id}/${name}`)
    return data
}
export const editSurname = async (id, surname) => {
    const {data} = await $host.get(`api/user/edit/surname/${id}/${surname}`)
    return data
}

export const getAllUsers = async (role) => {
    const {data} = await $host.get(`api/user/all/${role}`)
    return data
}
