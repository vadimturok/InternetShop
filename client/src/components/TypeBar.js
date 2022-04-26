import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { ListGroup, Button, Dropdown } from "react-bootstrap";
import {fetchBrands, fetchDevices, fetchTypes} from "../http/deviceAPI";
import '../styles/style.css'

export const TypeBar = observer(({ascending, descending}) => {
  const { device } = useContext(Context);
  const [clicked, setClicked] = useState(false)
  const [isAscending, setIsAscending] = useState(false)


  const getAllItems = () => {
    fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
        fetchDevices(null, null, 1, 20).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
            device.setSelectedType(data)
            device.setSelectedBrand(data)
        })
        setClicked(false)
  }
  const handleSelectedType = (type) => {
    device.setSelectedType(type)
    setClicked(false)
  }

  const sortByAscending = () => {
    ascending()
    setClicked(true)
    setIsAscending(true)
  }
  const sortByDescending = () => {
    descending()
    setClicked(true)
    setIsAscending(false)
  }

  return (
    <div  className="type__menu">
    <ListGroup>
      <Button variant="info" className="mt-2 mb-3" onClick={() => getAllItems()}>Show all</Button>
      {device.types.map((type) => (
        <ListGroup.Item
          key={type.id}
          onClick={() => handleSelectedType(type)}
          active={type.id === device.selectedType.id}
          style={{ cursor: "pointer" }}
        >
          {type.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
    <h5 className=" mt-3 mb-1">Order by price:</h5>
    <Dropdown >
                <Dropdown.Toggle variant="success" style={{width: "210px"}}>{clicked ? isAscending ? 'Ascending' : 'Descending' : 'Select'}</Dropdown.Toggle>
                    <Dropdown.Menu style={{width: "210px"}}>
                                <Dropdown.Item onClick ={() => sortByAscending()}>
                                    Ascending
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => sortByDescending()}>
                                    Descending
                                </Dropdown.Item>
                        </Dropdown.Menu>
            </Dropdown>
    </div>
  );
});
export default TypeBar;
