import React, {useContext} from 'react'
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import DeviceItem from './DeviceItem';
import {Row} from 'react-bootstrap'
import '../styles/style.css'

export const DeviceList = observer(() => {
    const { device } = useContext(Context);
    return (
        <Row className="d-flex items-row">
            {device.devices.map(device =>
                <DeviceItem  className="device__item" dev={device} key={device.id}/>
            )}
        </Row>
    )
})
export default DeviceList
