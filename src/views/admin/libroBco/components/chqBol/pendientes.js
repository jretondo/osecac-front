import React, { useContext } from 'react';
import { Col, FormGroup, Input, Label, Row, Spinner } from 'reactstrap';
import formatMoney from 'Function/NumberFormat';
import ChqBolCOntext from '../../../../../context/chqBol';

const PendientesChqBol = () => {
    const { totalBol, totalChq, loadingChqBol } = useContext(ChqBolCOntext)

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
        <>
            {
                loadingChqBol ?
                    <div style={{ textAlign: "center", marginTop: "100px" }}>
                        <Spinner type="grow" color="primary" style={{ width: "100px", height: "100px" }} />
                    </div>
                    :
                    <Row style={{ marginTop: "30px" }}>
                        <Col md="6">
                            <FormGroup>
                                <Label >Chequeras pendientes de uso</Label>
                                <Input style={
                                    totalChq > 1500 ?
                                        successInput :
                                        totalChq < 1000 ?
                                            dangerInput :
                                            warningInput
                                } type="text" value={formatMoney(totalChq, 0)} disabled />
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <Label>Boletas pendientes de uso</Label>
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
            }

        </>
    )
}
export default PendientesChqBol
