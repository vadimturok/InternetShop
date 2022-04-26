import React, { useContext, useEffect, useState } from "react";
import { Container, Button, Col, Row, Image, Form, Dropdown } from "react-bootstrap";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import {
  editBasketItem,
  fetchBasketItems,
  fetchOneBasketItem,
  getBasket,
} from "../http/basketAPI";
import { useHistory } from "react-router-dom";
import OrderItem from "../components/OrderItem";
import novaposhta from '../images/unnamed.png'
import ukrposhta from '../images/ukrpost.png'
import Submit from "../components/modals/Submit";
import InputMask from 'react-input-mask';
import Footer from "../components/Footer";

export const Order = observer(() => {
  const { user, device } = useContext(Context);
  const [item, setItem] = useState([
    {id: 0, basketId: 0, deviceId: 0, name: null, price: 0, image: null, amount: 0},
  ]);
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [region, setRegion] = useState('')
  const [city, setCity] = useState('')
  const [phone, setPhone] = useState(0)
  const [delivery, setDelivery] = useState('')
  const [department, setDepartment] = useState(0)
  const [payment, setPayment] = useState('')
  const [successVisible, setSuccessVisible] = useState(false)
  const [isPhoneError, setIsPhoneError] = useState(false)
  const [phoneError, setPhoneError] = useState('')
  let total = 0
  const deleteBasketItem = (deev) => {
    fetchOneBasketItem(deev).then((i) =>
      getBasket(user.user.id).then((info) =>
        fetchBasketItems(info.id).then((data) => setItem(data))
      )
    );
  };
  useEffect(() => {
    getBasket(user.user.id).then(info => fetchBasketItems(info.id).then(data => setItem(data))) 
      getBasket(user.user.id).then((info) =>
        fetchBasketItems(info.id).then((data) => setItem(data))
      )
      for(let i = 0; i < item.length; i++){
        editBasketItem(item[i].id, item[i].amount)
      }
  }, []);

  const setNovaPoshta = () => {
    setDelivery('Нова пошта')
  }
  const setUkrPoshta = () => {
    setDelivery('Укрпошта')
  }
  const setCard = () => {
    setPayment('Card')
  }
  const setNal = () => {
    setPayment('On hands')
  }
  const handlePhone = (e) => {
    setPhone(e.target.value)
    const defaultPhone = e.target.value.replace(/\D/g,'')
    if(defaultPhone.toString().length < 12){
      setPhoneError('Phone incorrect!')
      setIsPhoneError(true)
    }else{
      setPhoneError('Phone incorrect')
      setIsPhoneError(false)
    }
  }

  return (
    <>
    <div className="d-flex justify-content-between ">
      <Col className="pl-5" md={6}>
        <h2 style={{ marginLeft: "200px", marginTop: "10px" }}>
          Ordering
        </h2>

        <Form style={{fontFamily: "Roboto"}}>
            <Row>
                <Col>
                <Form.Label>First name</Form.Label>
                <Form.Control value={name} onChange={e => setName(e.target.value)} style={{width: "300px"}}  placeholder="First name..." />
                </Col>
                <Col>
                <Form.Label>Last name</Form.Label>
                <Form.Control value={surname} onChange={e => setSurname(e.target.value)} style={{width: "300px"}}  placeholder="Last name..." />
                </Col>
            </Row>
               
            <Row className="mt-3">
                <Col>
                <Form.Label>Oblast</Form.Label>
                <Form.Control value={region} onChange={e => setRegion(e.target.value)} style={{width: "300px"}}  placeholder="Oblast..." />
                </Col>
                <Col>
                <Form.Label>City</Form.Label>
                <Form.Control value={city} onChange={e => setCity(e.target.value)} style={{width: "300px"}}  placeholder="City..." />
                </Col>
            </Row>

            <Row className="mt-3">
            <Col>
                <Form.Label>Phone number</Form.Label>
                {isPhoneError ? <p style={{fontSize: "12px", color: "red"}} className="mb-0">{phoneError}</p> : <p style={{fontSize: "12px", color: "green"}} className="mb-0">{phoneError}</p>} 
                <InputMask  style={{display: 'flex', flexWrap: 'wrap', width: '300px', height: '35px', border: '1px solid #E0E0E0', borderRadius: '3px'}}  onChange={e => handlePhone(e)} mask="+38(999)-999-9999" maskChar="_" />
            </Col>
            <Col className="d-flex pt-3">
                <Col>
                <div className="form-check mr-4">
                <input onClick={() => setNovaPoshta()} className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                    Нова пошта
                </label>
                <Image className="mt-2" width={70} height={70} src={novaposhta}></Image>
            </div>
            </Col>
            <Col>
             <div className="form-check">
                <input onClick={() => setUkrPoshta()} className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" defaultValue/>
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                    Укрпошта
                </label>
                <Image className="mt-2" width={70} height={70} src={ukrposhta}></Image>
            </div>
            </Col>
            </Col>
            </Row>
            <Row className="mt-1">
            <Col>
                <Form.Label>Department number</Form.Label>
                <Form.Control value={department} onChange={e => setDepartment(e.target.value)} style={{width: "300px"}} type="number" />
            </Col>
            <Col>
            
            <Dropdown className="mt-4">
                <Dropdown.Toggle>{payment || 'Payment'}</Dropdown.Toggle>
                    <Dropdown.Menu>
                                <Dropdown.Item onClick={() => setCard()}>
                                    Card
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => setNal()}>
                                    On hands
                                </Dropdown.Item>
                        </Dropdown.Menu>
            </Dropdown>
            </Col>
            </Row>
        {item.reduce((a, x) => (a += x.price), 0) === 0 || name === '' || surname === '' || region === '' || city === '' || phone === 0 || delivery === '' || department === 0 || delivery === '' || payment === '' || isPhoneError ? <Button disabled className="mt-5" size="lg">Submit</Button> : <Button onClick={() => setSuccessVisible(true)} className="mt-5" size="lg">Submit</Button> }
        </Form>
      </Col>

      <Col style={{fontFamily: "Roboto"}} className="mt-5 pr-5" md={6}>
        {item.map((inf, index) => (
          <OrderItem
            deleteBasketItem={() => deleteBasketItem(inf.id)}
            device={device}
            className="mb-5"
            key={index}
            info={inf}
          ></OrderItem>
        ))}
        <h4>Total: {(total = item.reduce((a, x) => (a += x.price*x.amount), 0))} ₴</h4>
      </Col>
      <Submit dev={device} total={total} user={user} item={item} name={name} surname={surname} phone={phone} region={region} city={city} delivery={delivery} department={department} delivery={delivery} show={successVisible} payment={payment} onHide={() => setSuccessVisible(false)}></Submit>
    </div>
    <Footer></Footer>
    </>
  );
});

export default Order;
