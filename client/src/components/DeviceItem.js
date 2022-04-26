import React, {useState, useContext, useEffect} from 'react';
import {Card, Col, Button} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import {useHistory} from "react-router-dom"
import { Context } from '../index';
import { addItem, getBasket } from '../http/basketAPI';
import {DEVICE_ROUTE} from "../utils/consts";
import SuccessBought from './modals/SuccessBought'
import '../styles/style.css'

const DeviceItem = ({dev}) => {
    const history = useHistory()
    const [isBought, setIsBought] = useState(false)
    const {user, device, basket} = useContext(Context)
    const [successVisible, setSuccessVisible] = useState(false)
        const additem = async () => {
        getBasket(user.user.id).then(data => addItem(data.id, dev.id, dev.name, dev.price, dev.img, 1))
        setIsBought(true)
        setSuccessVisible(true)
        device.setIsBought(true)

    }
   
    return (
        <div className="menu__item ">
        <Col className={"mt-3 menu-item"}>
            <Card className="card__menu-item" style={{maxWidth: 210, cursor: 'pointer'}} border="#E0E0E0">
                <div className="d-flex justify-content-around">
                    <Image style={{width: '100%', objectFit: 'contain'}}  onClick={() => history.push(DEVICE_ROUTE + '/' + dev.id)} className="mt-1" width={199} height={200} src={process.env.REACT_APP_API_URL + dev.img}/>
                </div>
            
                <div style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', borderTop: '1px solid 	#E0E0E0', marginTop: '2px'}} className="pl-2 pr-2">{dev.name}</div>
                <h4 className="pl-2 pr-2">{dev.price} ₴</h4>
                {user.isAuth ? isBought ? <Button style={{fontSize: '20px'}} variant="info" size="sm">Added to basket</Button> : <Button style={{fontSize: '20px'}} size="sm" onClick={() => additem()}>Add to basket</Button> : <Button disabled style={{fontSize: '20px'}} size="sm" onClick={() => additem()}>Add to basket</Button>}
            </Card>
        </Col>
        <SuccessBought device={dev} show={successVisible} onHide={() => setSuccessVisible(false)}></SuccessBought>
        </div>
    );
};

export default DeviceItem;