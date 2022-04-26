import React, {useContext} from 'react'
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import {Row, Card} from 'react-bootstrap'
import '../styles/style.css'

export const BrandBar = observer(() => {
    const { device } = useContext(Context);
    return (
        <Row className="d-flex brand__menu ml-1" style={{marginTop: "10px"}}>
            {device.brands.map(brand =>
                <Card key={brand.id} className="p-3" onClick={() => device.setSelectedBrand(brand)}
                border={brand.id === device.selectedBrand.id ? 'danger' : 'light'}
                style={{ cursor: "pointer" }}>
                    {brand.name}
                </Card>
            )}
            
        </Row>
    )
})
export default BrandBar
