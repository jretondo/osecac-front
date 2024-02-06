import UrlNodeServer from '../../../../../../api/NodeServer';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';

const FormTr = ({
    setArrayPagos,
    arrayPagos,
    alertar,
    setAlertar,
    setMsgStrong,
    setMsgGralAlert,
    setSuccessAlert,
    getAgenciasTransf,
    getCtaSindicalTransf,
    getComodatoTransf,
    getReintBenefTransf,
    motivo,
    setMotivo,
    concepto,
    setConcepto
}) => {

    return (
        <Form onSubmit={e => {
            e.preventDefault();
        }} >
            <Container>
                <Row>
                    <Col md="5">
                        <FormGroup>
                            <Label for="conceptoTxt">Concepto</Label>
                            <Input
                                type="text"
                                id="conceptoTxt"
                                placeholder="Concepto..."
                                value={concepto}
                                onChange={e => setConcepto(e.target.value)}
                                required />
                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup>
                            <Label for="motivoSelectTxt">Motivo</Label>
                            <Input
                                type="select"
                                name="select"
                                id="motivoSelectTxt"
                                value={motivo}
                                onChange={e => setMotivo(e.target.value)}
                            >
                                <option value="FAC" >Facturas</option>
                                <option value="CUO">Cuotas</option>
                                <option value="HON">Honorarios</option>
                                <option value="ALQ">Alquileres</option>
                                <option value="EXP">Expensas</option>
                                <option value="VAR">Varios</option>
                            </Input>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md="12" className="text-center">
                        <Button color="primary" onClick={e => {
                            getAgenciasTransf()
                        }} >
                            Importar Cód. 405 <i className='fa fa-download'></i>
                        </Button>
                        <Button color="primary" onClick={e => {
                            getCtaSindicalTransf()
                        }} >
                            Importar Cta Sindical <i className='fa fa-download'></i>
                        </Button>
                        <Button color="primary" onClick={e => {
                            getComodatoTransf()
                        }}>
                            Importar Comodato <i className='fa fa-download'></i>
                        </Button>
                        <Button color="primary" onClick={e => {
                            getReintBenefTransf()
                        }}>
                            Importar Reint Beneficiarios <i className='fa fa-download'></i>
                        </Button>
                    </Col>
                </Row>
            </Container>
        </Form>
    )
}

export default FormTr