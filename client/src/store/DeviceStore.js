import {makeAutoObservable} from 'mobx'
import { configure } from "mobx"

export default class DeviceStore {
    constructor(){
        this._types = []
        this._brands = []
        this._devices = []
        this._basketDevices = []
        this._selectedType = {}
        this._selectedBrand = {}
        this._reviews = []
        this._page = 1
        this._totalCount = 0
        this._limit = 12
        this._isBought = false
        makeAutoObservable(this)
        configure({
            enforceActions: "never",
        })
    }
    setIsBought(bool){
        this._isBought = bool
    }
    setReviews(reviews){
        this._reviews = reviews
    }
    setSelectedType(type){
        this.setPage(1)
        this._selectedType = type
    }
    setBasketDevices(basket){
        this._basketDevices = basket
    }
    setSelectedBrand(brand){
        this.setPage(1)
        this._selectedBrand = brand
    }
    setPage(page){
        this._page = page
    }
    setTotalCount(totalCount){
        this._totalCount = totalCount
    }
    setLimit(limit){
        this._limit = limit
    }
    setTypes(types){
        this._types = types
    }
    setBrands(brands){
        this._brands = brands
    }
    setDevices(devices){
        this._devices = devices
    }
    get basketDevices(){
        return this._basketDevices
    }
    get isBought(){
        return this._isBought
    }
    get types(){
        return this._types
    }
    get brands(){
        return this._brands
    }
    get devices(){
        return this._devices
    }
    get selectedType(){
        return this._selectedType
    }
    get selectedBrand(){
        return this._selectedBrand
    }
    get page(){
        return this._page
    }
    get totalCount(){
        return this._totalCount
    }
    get limit(){
        return this._limit
    }
    get reviews(){
        return this._reviews
    }
}