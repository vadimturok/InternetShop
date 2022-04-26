import React, {useState, useEffect, useContext} from 'react'
import {Image, Row, Col, Button} from 'react-bootstrap'
import {fetchOneBasketItem,fetchBasketItems, getBasket, addItem, editBasketItem, getDeviceAmount, editAllAmount} from '../http/basketAPI'
import { DEVICE_ROUTE } from '../utils/consts'
import {useHistory} from "react-router-dom"
import { Context } from '../index'
import { fetchOneDevice } from '../http/deviceAPI'
import {useParams} from 'react-router-dom'
import {observer} from 'mobx-react-lite'


export const BasketItem = observer(({info, deleteBasketItem, isOrdered}) => {
    const history = useHistory()
    const {user, basket} = useContext(Context)
    let [amount, setAmount] = useState(info.amount)
    const increment = () => {
        setAmount(info.amount = info.amount + 1)
        
    }
    const decrement = () => {
        setAmount(info.amount = info.amount - 1)
        if(info.amount === 0){
            setAmount(info.amount = info.amount + 1)
        }
    }

    return (
        <Row className="mb-3 d-flex align-items-center" style={{borderBottom: "1px solid #E0E0E0", borderLeft: "1px solid #E0E0E0", borderRight: "1px solid #E0E0E0", borderTop: "1px solid #E0E0E0"}} >
            <Col md={2}>
                <Image style={{width: '100%', objectFit: 'contain'}} width={150} height={150} src={process.env.REACT_APP_API_URL + info.image}/>
            </Col>
            <Col style={{cursor: 'pointer'}} onClick={() => history.push(DEVICE_ROUTE + '/' + info.deviceId)} md={4}>
                <h5>{info.name}</h5>
            </Col>
            <Col style={{marginLeft: "40px"}} md={2}>
                <h4>{info.price} ₴</h4>
            </Col>
            <Col className="mr-3 d-flex align-items-center">
            <Button onClick={() => increment()}  className="mr-1">+</Button>
            <h6>{info.amount}</h6>
            <Button onClick={() => decrement()} className="ml-1" style={{width: "35px"}}>-</Button>
            </Col>
            <Col md={2}>
               <Button onClick={deleteBasketItem}>Delete</Button>
            </Col>
        </Row>
    )
})

export default BasketItem
