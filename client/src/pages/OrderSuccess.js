import React from 'react'
import {Container, Button} from 'react-bootstrap'
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";
import { SHOP_ROUTE } from '../utils/consts';

export const OrderSuccess = observer(() => {
    const history = useHistory()
    return (
        <Container className="d-flex flex-column align-items-center" style={{marginTop: "200px"}}>
            <h1>Your purchase is successful</h1>
            <Button size="lg" onClick={() => history.push(SHOP_ROUTE)}>Home</Button>
        </Container>
    )
})
export default OrderSuccess
