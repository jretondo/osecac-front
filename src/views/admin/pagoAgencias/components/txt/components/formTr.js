import UrlNodeServer from '../../../../../../api/NodeServer';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import ListaAgencias from './listAgencias'

const FormTr = ({
    setArrayPagos,
    arrayPagos,
    alertar,
    setAlertar,
    setMsgStrong,
    setMsgGralAlert,
    setSuccessAlert
}) => {
    const [agenciaId, setAgenciaId] = useState(0)
    const [motivo, setMotivo] = useState("FAC")
    const [importe, setImporte] = useState("")
    const [concepto, setConcepto] = useState("")
    const [referencia, setReferencia] = useState("")
    const [agSelect, setAgselect] = useState(false)

    useEffect(() => {
        document.getElementById("motivoSelectTxt").focus();
    }, [agenciaId])

    const NvoPago = async () => {
        await axios.get(`${UrlNodeServer.proveedoresDir.sub.getOne}/${agenciaId}`, {
            headers:
                { 'Authorization': 'Bearer ' + localStorage.getItem('user-token') }
        })
            .then(res => {
                const respuesta = res.data
                const status = parseInt(respuesta.status)
                if (status === 200) {
                    const dataAgencia = respuesta.body[0]

                    const cbu = dataAgencia.cbu
                    const email = dataAgencia.email

                    const data = {
                        cbu,
                        importe,
                        concepto,
                        motivo,
                        referencia,
                        email,
                        raz_soc: dataAgencia.raz_soc
                    }

                    let lista = []
                    lista = arrayPagos
                    lista.push(data)
                    setArrayPagos(lista)
                    ResetForm()
                    setMsgStrong("CBU agregado con éxito!")
                    setMsgGralAlert("")
                    setSuccessAlert(true)
                    setAlertar(!alertar)
                } else {
                    setMsgStrong("Hubo un error inesperado!")
                    setMsgGralAlert("")
                    setSuccessAlert(false)
                    setAlertar(!alertar)
                }
            })
            .catch(() => {
                setMsgStrong("Hubo un error inesperado!")
                setMsgGralAlert("")
                setSuccessAlert(false)
                setAlertar(!alertar)
            })
    }

    const ResetForm = () => {
        setMotivo("FAC")
        setImporte("")
        setConcepto("")
        setReferencia("")
        setAgselect(false)
    }


    return (
        <Form onSubmit={e => {
            e.preventDefault();
            NvoPago();
        }} >
            <Container>
                <Row>
                    <Col md="6">
                        <FormGroup>
                            <ListaAgencias
                                setAgenciaId={setAgenciaId}
                                agSelect={agSelect}
                                setAgselect={setAgselect}
                            />
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
                    <Col md="3">
                        <FormGroup>
                            <Label for="importeTxt">Importe</Label>
                            <Input
                                type="number"
                                id="importeTxt"
                                placeholder="$ 0,00"
                                value={importe}
                                onChange={e => setImporte(e.target.value)}
                                required
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md="4">
                        <FormGroup>
                            <Label for="refTxt">Referencia</Label>
                            <Input
                                type="text"
                                id="refTxt"
                                placeholder="Referencia..."
                                value={referencia}
                                onChange={e => setReferencia(e.target.value)}
                                required />
                        </FormGroup>
                    </Col>
                    <Col md="8">
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
                </Row>
                <Row>
                    <Col style={{ textAlign: "center" }}>
                        <button
                            className="btn btn-primary"
                            style={{ margin: "20px", width: "200px" }}
                            type="submit"
                        >
                            Agregar Transferencia
                        </button>

                        <button
                            className="btn btn-danger"
                            style={{ margin: "20px", width: "200px" }}
                            onClick={e => {
                                e.preventDefault();
                                ResetForm();
                            }}
                        >
                            Cancelar
                        </button>
                    </Col>
                </Row>
            </Container>
        </Form>
    )
}

export default FormTr