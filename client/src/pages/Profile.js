import React, { useState, useContext, useEffect } from "react";
import {
  Form,
  Container,
  Button,
  Col,
  Image,
  Row,
  Alert,
  Dropdown,
} from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { check, editEmail, editName, editSurname, getRole } from "../http/userAPI";
import { Context } from "../index";
import image from "../images/fbpic_0.jpg";
import { getOrder, getOrderDevice } from "../http/orderAPI";
import { getBasket } from "../http/basketAPI";
import moment from 'moment'
import { fetchDevices } from "../http/deviceAPI";
import { DEVICE_ROUTE } from "../utils/consts";
import { useHistory } from "react-router-dom";
import '../styles/style.css'
import Footer from "../components/Footer";
import {Spinner} from 'react-bootstrap'


export const Profile = observer(() => {
  const { user, device } = useContext(Context);
  const [email, setEmail] = useState(user.user.email);
  const [name, setName] = useState(user.user.name);
  const [surname, setSurname] = useState(user.user.surname);
  const [trigger, setTrigger] = useState(false);
  const [orderItems, setOrderItems] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const setInfo = (email, name, surname) => {
    setEmail(email)
    setName(name)
    setSurname(surname)
  }


  useEffect(() => {
    getRole(user.user.id).then(data => setInfo(data.email, data.name, data.surname))
    getOrderDevice(user.user.id).then(orderDevice => setOrderItems(orderDevice))
    getBasket(user.user.id).then(basketId => getOrder(basketId.id).then(orderId => setOrders(orderId.reverse())))
    fetchDevices(null, null, 1, 20).then(data => {
      device.setDevices(data.rows)
      device.setTotalCount(data.count)
  }).finally(() => setLoading(false))
  }, [])

  const editMail = () => {
    editEmail(user.user.id, email)
    setTrigger(true);
  };
  const editname = () => {
    editName(user.user.id, name)
    setTrigger(true);
  };
  const editsurname = () => {
    editSurname(user.user.id, surname)
    setTrigger(true);
  };
  if(loading){
    return <Spinner animation={'grow'}></Spinner>
  }

  
  return (
    <>
    <div className="pl-5 pt-1">
      <Row style={{fontFamily: "Roboto"}} className="mt-3 mr-0">
      <Col  md={6}>
      <h3 className="mb-4">Profile</h3>
        <Row  style={{fontFamily: "Roboto"}}>
          <Col md={4}>
            <Image className="profile__img" src={image} style={{maxWidth: "200px", maxHeight: "200px"}}></Image>
          </Col>
          <Col md={5}>
          <Form.Label>E-mail</Form.Label>
            <Form.Control
              onChange={(e) => setEmail(e.target.value)}
              style={{ maxWidth: "300px", marginBottom: "3px", height: "30px" }}
              value={email}
              className="profile__input"
            />
            
            <Form.Label>First name</Form.Label>
            <Form.Control
              onChange={(e) => setName(e.target.value)}
              style={{ maxWidth: "300px", marginBottom: "3px", height: "30px" }}
              value={name}
              className="profile__input"
            />
            <Form.Label>Last name</Form.Label>
            <Form.Control
              onChange={(e) => setSurname(e.target.value)}
              style={{ maxWidth: "300px", marginBottom: "3px", height: "30px" }}
              value={surname}
              className="profile__input"
            />
          </Col>
          <Col className="mt-1 pl-0"  md={1}>
          <Button size="sm" style={{marginTop: "30px"}} onClick={() => editMail()}>✓</Button>
          <Button size="sm" style={{marginTop: "30px"}} onClick={() => editname()}>✓</Button>
          <Button size="sm" style={{marginTop: "30px"}} onClick={() => editsurname()}>✓</Button>
          </Col>
        </Row>
        {trigger && (
       <Alert dismissible onClose={() => setTrigger(false)}  variant="success">
       Edited success!
       </Alert>
      )}
      </Col>
      <Col style={{fontFamily: "Roboto"}} className="pr-5 ml-0" md={6}>
      <h3 className="pr-0 mb-4">Your purchases</h3>
          { orders.map((info, index) => 
          <div key={index}>
            <div className="d-flex justify-content-between">
               <h6 className="mb-0" key={index+1}>{moment(info.createdAt).format("YYYY-MM-DD HH:mm")}</h6>
               <h6>№ {info.id}</h6>
              <h6 key={index+2}>Сумма: {info.total} ₴</h6>
            </div>
         
            <div  style={{border: "2px solid #E0E0E0", marginBottom: "20px"}} key={index}>
              {orderItems.map((item, x) => info.id === item.orderId && <Row key={x} style={{borderBottom: "1px solid #E0E0E0"}} className="mr-0 ml-0 d-flex justify-content-between align-items-center pl-3 pr-3">
              <p>{item.amount} шт.</p>
                <a href={DEVICE_ROUTE + '/' + item.deviceid} style={{color: "black"}}  key={x}>{item.name}</a>
                {device.devices.map((dev, i) => dev.name === item.name && <Image style={{objectFit: 'contain'}} key={i} width={100} height={100} src={process.env.REACT_APP_API_URL + dev.img}/>)}
              </Row>)}
            </div>
          </div>
          ) }
      </Col>
      </Row>
    </div>
    </>
  );
});

export default Profile;

/*{moment(item.time).format("YYYY-MM-DD HH:mm")}*/