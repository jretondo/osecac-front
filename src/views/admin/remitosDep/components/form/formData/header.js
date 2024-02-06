import formatMoney from 'Function/NumberFormat';
import React, { useContext } from 'react';
import { Col, FormGroup, Input, Label, Row } from 'reactstrap';
import ChqBolContext from '../../../../../../context/chqBol';

const HeadeerFormDep = ({
    fecha,
    setFecha
}) => {

    const { totalBol, sigBol } = useContext(ChqBolContext)

    const successInput = {
        border: "3px solid green",
        background: "#b0fbdb",
        color: "#333",
        fontSize: "20px"
    }
    const warningInput = {
        border: "3px solid orange",
        background: "#fbefb0",
        color: "#333",
        fontSize: "20px"
    }
    const dangerInput = {
        border: "3px solid red",
        background: "#ffcfcf",
        color: "#333",
        fontSize: "20px"
    }

    return (
        <Row style={{ border: "2px solid #626DDE", background: "#626DDE", padding: "10px", marginBottom: "20px" }} >
            <Col md="4">
                <FormGroup>
                    <Label for="fechaTxt" style={{ color: "white" }}>Fecha</Label>
                    <Input
                        type="date"
                        id="fechaTxt"
                        value={fecha}
                        onChange={e => setFecha(e.target.value)}
                        style={{ color: "black" }}
                        required
                    />
                </FormGroup>
            </Col>
            <Col md="4">
                <FormGroup>
                    <Label for="ultBolTxt" style={{ color: "white" }}>Primera boleta</Label>
                    <Input
                        type="text"
                        id="ultBolTxt"
                        value={sigBol}
                        style={{ color: "black" }}
                        disabled
                    />
                </FormGroup>
            </Col>
            <Col md="4">
                <FormGroup>
                    <Label for="cantDispTxt" style={{ color: "white" }}>Cantidad de boletas disp.</Label>
                    <Input valid style={
                        totalBol > 1200 ?
                            successInput :
                            totalBol < 800 ?
                                dangerInput :
                                warningInput
                    } type="text" value={formatMoney(totalBol, 0)} disabled />
                </FormGroup>
            </Col>
        </Row>
    )
}

export default HeadeerFormDep