import React from 'react'
import {Modal, Button} from 'react-bootstrap'

export const SuccessRegistration = ({show, onHide}) => {
    return (
        <Modal
        show={show}
        onHide={onHide}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          I will not close if you click outside me. Don't even try to press
          escape key.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    )
}
export default SuccessRegistration
