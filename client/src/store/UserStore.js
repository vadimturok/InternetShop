import {makeAutoObservable} from 'mobx'

export default class UserStore {
    constructor(){
        this._isAuth = false
        this._user = {}
        this._guest = true
        makeAutoObservable(this)
    }
    setIsAuth(bool){
        this._isAuth = bool
    }
    setGuest(bool){
        this._guest = bool
    }
    setUser(user){
        this._user = user
    }
    get guest(){
        return this._guest
    }
    get isAuth(){
        return this._isAuth
    }
    get user(){
        
    return this._user
    }

}