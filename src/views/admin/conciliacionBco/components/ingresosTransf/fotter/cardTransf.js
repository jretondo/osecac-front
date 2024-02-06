import React from 'react';
import { Col, FormGroup, Input, Label } from 'reactstrap';

const CardTransf = ({ id, colSize, tittle, amount, total }) => {
    return (
        <Col md={colSize} key={id}>
            <FormGroup>
                <Label style={total && { fontSize: "18px", fortWeight: "bold" }}>{tittle}</Label>
                <Input style={total && { fontSize: "18px", fortWeight: "bold", color: "green" }} type="text" value={"$ " + amount} disabled />
            </FormGroup>
        </Col>
    )
}

export default CardTransf