import React, { useContext, useEffect, useState } from "react";
import { Container, Dropdown, Carousel } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchBrands, fetchDevices, fetchTypes } from "../http/deviceAPI";
import Pages from "../components/Pages";
import { check } from "../http/userAPI";
import "../styles/style.css";
import { fetchBasketItems, getBasket } from "../http/basketAPI";
import { getAllOrderDevices } from "../http/orderAPI";
import image1 from "../images/banner1.jpg";
import image2 from "../images/banner2.jpg";
import image3 from "../images/banner3.jpg";
import Footer from "../components/Footer";

const Shop = observer(() => {
  const { device } = useContext(Context);
  const { user } = useContext(Context);
  const [item, setItem] = useState([{}]);
  const [result, setResult] = useState(0);
  let x;

  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data));
    fetchBrands().then((data) => device.setBrands(data));
    fetchDevices(null, null, 1, 15).then((data) => {
      device.setDevices(data.rows);
      device.setTotalCount(data.count);
    });
  }, []);

  useEffect(() => {
    fetchDevices(
      device.selectedType.id,
      device.selectedBrand.id,
      device.page
    ).then((data) => {
      device.setDevices(data.rows);
      device.setTotalCount(data.count);
    });
  }, [device.page, device.selectedType, device.selectedBrand]);

  const ascending = () => {
    for (let i = 0; i < device.devices.length; i++) {
      for (let j = device.devices.length - 1; j > i; j--) {
        if (device.devices[j - 1].price > device.devices[j].price) {
          x = device.devices[j - 1];
          device.devices[j - 1] = device.devices[j];
          device.devices[j] = x;
        }
      }
    }
  };
  const descending = () => {
    for (let i = 0; i < device.devices.length; i++) {
      for (let j = device.devices.length - 1; j > i; j--) {
        if (device.devices[j - 1].price < device.devices[j].price) {
          x = device.devices[j - 1];
          device.devices[j - 1] = device.devices[j];
          device.devices[j] = x;
        }
      }
    }
  };

  return (
      <>
    <div className="pr-5 pl-5">
        <Carousel className="mt-3">
            <Carousel.Item interval={2000}>
              <img
                className="d-block w-100"
                src="http://via.placeholder.com/600x100"
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={2000}>
              <img
                className="d-block w-100"
                src="http://via.placeholder.com/600x100"
                alt="Second slide"
              />
              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={2000}>
              <img
                className="d-block w-100"
                src="http://via.placeholder.com/600x100"
                alt="Third slide"
              />
              <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
      <Row style={{ fontFamily: "Roboto" }} className="mt-2 type">
        <Col md={2}>
          <TypeBar
            ascending={() => ascending()}
            descending={() => descending()}
          ></TypeBar>
        </Col>
        <Col md={10}>
          <BrandBar />
          <DeviceList result={result} />
        </Col>
        <Pages />
      </Row>
    </div>
    </>
  );
});

export default Shop;
