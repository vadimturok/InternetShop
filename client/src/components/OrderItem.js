import React, {useState, useEffect, useContext} from 'react'
import {Image, Row, Col, Button} from 'react-bootstrap'
import { DEVICE_ROUTE } from '../utils/consts'
import {useHistory} from "react-router-dom"
import { Context } from '../index'


export const OrderItem = ({info}) => {
    const history = useHistory()
    const {basket} = useContext(Context)
    const [amount, setAmount] = useState(0)
    useEffect(() => {
        basket.setAmount(info.amount)
        setAmount(basket.amount)
    }, [])
    return (
        <Row className="mb-3 d-flex align-items-center" style={{borderBottom: "1px solid #E0E0E0", borderLeft: "1px solid #E0E0E0", borderRight: "1px solid #E0E0E0", borderTop: "1px solid #E0E0E0"}} >
            <Col md={3}>
                <Image style={{width: '100%', objectFit: 'contain'}} width={150} height={150} src={process.env.REACT_APP_API_URL + info.image}/>
            </Col>
            <Col style={{cursor: 'pointer'}} onClick={() => history.push(DEVICE_ROUTE + '/' + info.deviceId)} md={4}>
                <h5>{info.name}</h5>
            </Col>
            <Col style={{marginLeft: "40px"}} md={2}>
                <h4>{info.price} ₴</h4>
            </Col>
            <Col md={2}>
               <h6>Quantity: {info.amount}</h6>
            </Col>
        </Row>
    )
}

export default OrderItem