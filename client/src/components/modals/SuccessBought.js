import React from 'react'
import {Modal, Button, Col, Image, Row} from 'react-bootstrap'
import {useHistory} from "react-router-dom"
import { BASKET_ROUTE } from '../../utils/consts'

export const SuccessRegistration = ({show, onHide, device}) => {
    const history = useHistory()
    return (
        <Modal
        show={show}
        onHide={onHide}
        style={{fontFamily: "Roboto"}}
      >
        <Modal.Header closeButton>
          <Modal.Title>Товар добавлено в корзину</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
              <Col md={4}>
            <Image className="mt-1" width={100} height={100} src={process.env.REACT_APP_API_URL + device.img}/>
          </Col>
          <Col md={4}>
            <h5>{device.name}</h5>
          </Col>
          <Col className="d-flex align-items-center" md={4}>
           <h3>{device.price} ₴</h3>
          </Col>
          </Row>
          
        </Modal.Body>
        <Modal.Footer>
         <Button variant="info" onClick={() => history.push(BASKET_ROUTE)}>Корзина</Button>
          <Button variant="secondary" onClick={onHide}>
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>
    )
}
export default SuccessRegistration