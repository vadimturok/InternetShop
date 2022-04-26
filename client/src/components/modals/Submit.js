import React, {useState, useContext, useEffect} from 'react'
import {Modal, Button, Col, Image, Row} from 'react-bootstrap'
import {useHistory} from "react-router-dom"
import { fetchBasketItems, fetchOneBasketItem, getBasket } from '../../http/basketAPI'
import { addOrderDevice, createOrder } from '../../http/orderAPI'
import { BASKET_ROUTE, ORDER_SUCCESS_ROUTE } from '../../utils/consts'

export const Submit = ({show, onHide, name, surname, region, city, department, delivery, payment, item, phone, user, total, amount}) => {
    const history = useHistory()
    const d = new Date();
    const yes = async () => {
        await createOrder(name, surname, phone.replace(/\D/g,''), region, city, department, delivery, payment, item[0].basketId, user.user.email, total).then(order => {
          for(let i = 0; i < item.length; i++){
            addOrderDevice(item[i].name, order.id, user.user.id, d.toLocaleString(), item[i].deviceId, item[i].amount)
            fetchOneBasketItem(item[i].id).then(i => getBasket(user.user.id).then(info => fetchBasketItems(info.id)))
          }

      })
        history.push(ORDER_SUCCESS_ROUTE)
    }
    return (
        <Modal
        show={show}
        onHide={onHide}
      >
        <Modal.Header closeButton>
          <Modal.Title>Подтвердите заказ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         Вы действительно подтверждаете заказ?
        </Modal.Body>
        <Modal.Footer>
         <Button variant="info" onClick={() => yes()}>Да</Button>
          <Button onClick={onHide} variant="secondary">
            Нет
          </Button>
        </Modal.Footer>
      </Modal>
    )
}
export default Submit