import React, {useContext, useEffect, useState} from 'react'
import {Container, Button, Col, Row, Image} from 'react-bootstrap'
import { Context } from '../index'
import {observer} from 'mobx-react-lite'
import { editBasketItem, fetchBasketItems , fetchOneBasketItem, getBasket} from '../http/basketAPI'
import { fetchDevices } from '../http/deviceAPI'
import BasketItem from '../components/BasketItem'
import {useHistory} from "react-router-dom"
import { ORDER_ROUTE } from '../utils/consts'
import {Spinner} from 'react-bootstrap'




export const Basket = observer(() => {
    const {user, basket, device} = useContext(Context)
    const history = useHistory()
    const [isOrdered, setIsOrdered] = useState(false)
    const [item, setItem] = useState([{id: 0, basketId: 0, deviceId: 0, name: null, price: 0, image: null, amount: 0}])
    const [loading, setLoading] = useState(true)
    let total = 0
    
    const deleteBasketItem = (deev) => {
        fetchOneBasketItem(deev).then(i => getBasket(user.user.id).then(info => fetchBasketItems(info.id).then(data => setItem(data))))
    }
    useEffect(() => {
        getBasket(user.user.id).then(info => fetchBasketItems(info.id).then(data => setItem(data))).finally(() => setLoading(false))
    
    },[])
    if(loading){
        return <Spinner animation={'grow'}></Spinner>
      }
    
    const takeOrder = () => {
        history.push(ORDER_ROUTE)
        device.setIsBought(false)
        for(let i = 0; i < item.length; i++){
            editBasketItem(item[i].id, item[i].amount)
            console.log(item[0])
        }
    }
    return(
        <div className="pt-1 pl-5" style={{fontFamily: "Roboto", paddingRight: "300px"}}>
            <h1 className="mb-3 mt-3">Your basket</h1>
            {item.map((inf, index) => 
                <BasketItem isOrdered={isOrdered}  device={device} deleteBasketItem={() => deleteBasketItem(inf.id)} className="mb-5" key={index} info={inf} id={inf.id}>
                </BasketItem> 
            )}
            
            {item.reduce((a, x) => (a += x.price*x.amount), 0) !== 0 ? <Button style={{marginBottom: "30px"}} onClick={() => takeOrder()} size="lg">Next</Button>: <p style={{color: "#bdbebd", fontSize: "20px"}}>Basket is empty</p>}
        </div>
    )
    
})

export default Basket
