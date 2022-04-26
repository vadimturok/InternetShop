import React, {useState} from 'react'
import {Modal, Button, Form} from 'react-bootstrap'
import { createType } from '../../http/deviceAPI'

export const CreateType = ({show, onHide}) => {
  const [value, setValue] = useState('')
  const addType = () => {
    createType({name: value}).then(data => {
      setValue('')
      onHide()
    })
  }
    return (
        <Modal
        show={show}
        onHide={onHide}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить тип
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
            <Form.Control onChange={e => setValue(e.target.value)} value={value} placeholder="Введите название типа"></Form.Control>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={onHide}>Закрыть</Button>
        <Button variant="info" onClick={addType}>Добавить</Button>
      </Modal.Footer>
    </Modal>
    )
}
export default CreateType
