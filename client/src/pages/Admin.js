import React, {useState, useContext, useEffect} from 'react'
import {Container, Button, Col, Row} from 'react-bootstrap'
import CreateType from '../components/modals/CreateType'
import CreateBrand from '../components/modals/CreateBrand'
import CreateDevice from '../components/modals/CreateDevice'
import { Context } from '../index'
import { fetchTypes, fetchBrands, fetchDevices, deleteOneDevice } from '../http/deviceAPI'
import {observer} from 'mobx-react-lite'

export const Admin = observer(() => {

    const {device} = useContext(Context)
    const [brandVisible, setBrandVisible] = useState(false)
    const [typeVisible, setTypeVisible] = useState(false)
    const [deviceVisible, setDeviceVisible] = useState(false)
    const deleteItem = (id) => {
        deleteOneDevice(id).then(date =>fetchDevices(null, null, 1, 50).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        }))
        
    }
    useEffect(() => {
        fetchDevices(null, null, 1, 50).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    },[deviceVisible])

    return (
        <Container style={{fontFamily: "Roboto"}} className="d-flex flex-column">
            <Button onClick={() => setTypeVisible(true)} variant="dark" className="mt-4 p-2">Add type</Button>
            <Button onClick={() => setBrandVisible(true)} variant="dark" className="mt-4 p-2">Add brand</Button>
            <Button onClick={() => setDeviceVisible(true)} variant="dark" className="mt-4 p-2">Add device</Button>
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}></CreateType>
            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}></CreateBrand>
            <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)}></CreateDevice>
            {device.devices.map((item, index) =>(
                <Row key={index} className="mb-3 mt-3">
                    <Col md={4}>
                    <h5>{item.name}</h5>
                    </Col>
                    <Col md={5}></Col>
                 <Col md={3}>
                 <Button onClick={() => deleteItem(item.id)} className="mr-3">Delete from list</Button>
                </Col>
                </Row>
            ))}
        </Container>
    )
})

export default Admin
