import {makeAutoObservable} from 'mobx'

export default class BasketStore {
    constructor(){
        this._basket = {}
        this._basketItems = []
        this._amount = 1
        makeAutoObservable(this)
    }
    setAmount(amount){
        this._amount = amount
    }
    setBasket(basket){
        this._basket = basket
    }
    setNames(name){
        this._names = name
    }
    setBasketItems(basketItems){
        this._basketItems = basketItems
    }
    get amount() {
        return this._amount
    }
    get basket(){
        return this._basket
    }
    get basketItems(){
        return this._basketItems
    }
    get names(){
        return this._names
    }

}