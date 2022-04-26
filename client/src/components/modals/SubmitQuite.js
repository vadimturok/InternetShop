import React, {useState, useContext, useEffect} from 'react'
import {Modal, Button, Col, Image, Row} from 'react-bootstrap'
import {useHistory} from "react-router-dom"
import { LOGIN_ROUTE } from '../../utils/consts'
import { Context } from '../../index'

export const SubmitQuite = ({show, onHide}) => {
    const history = useHistory()
    const {user, device} = useContext(Context)
    const logOut = () => {
        onHide()
        user.setGuest(true)
        localStorage.setItem('guest', user.guest)
        localStorage.removeItem('email')
        localStorage.removeItem('name')
        localStorage.removeItem('surname')
        user.setUser({})
        user.setIsAuth(false)
        history.push(LOGIN_ROUTE)
    }
   
    return (
        <Modal
        show={show}
        onHide={onHide}
      >
        <Modal.Header closeButton>
          <Modal.Title>Выход</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         Вы действительно хотите выйти?
        </Modal.Body>
        <Modal.Footer>
         <Button variant="success" onClick={() => logOut()}>Да</Button>
          <Button onClick={onHide} variant="secondary">
            Нет
          </Button>
        </Modal.Footer>
      </Modal>
    )
}
export default SubmitQuite