import React, { useState } from 'react';
import moment from 'moment'
import {
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalHeader,
    Row,
    Spinner
} from 'reactstrap';
import TipoCoseguro from './coseguro';
import UrlNodeServer from 'api/NodeServer';
import axios from 'axios';

const ModalDepTransf = ({
    item,
    modal,
    setModal,
    setActividadStr,
    nvaActCall,
    setNvaActCall,
    alertar,
    setAlertar,
    setMsgStrong,
    setMsgGralAlert,
    setSuccessAlert,
    setCall,
    call,
}) => {
    const [loading, setLoading] = useState(false)
    const [fecha, setFecha] = useState(moment(new Date()).format("YYYY-MM-DD"))
    const [oficinaId, setOficinaId] = useState(0)
    const [oficina, setOficina] = useState("Actas")
    const [agSelect, setAgselect] = useState(false)

    const ActualizarTransf = async () => {
        const datos = {
            set: {
                conciliado: 1,
                oficina: oficina + " " + (oficinaId !== 2 ? moment(fecha).format("DD/MM/YYYY") : ""),
                confirmado: 0,
                fecha_dep: fecha,
                tipo: oficinaId
            }
        }
        setLoading(true)
        await axios.patch(`${UrlNodeServer.transferenciasDir.conciliacion}/${item.id}`, datos, {
            headers:
                { 'Authorization': 'Bearer ' + localStorage.getItem('user-token') }
        }).then(res => {
            const respuesta = res.data
            const status = parseInt(respuesta.status)
            if (status === 200) {
                setActividadStr("El usuario ha marcado como contabilizado el movimiento de ID: " + item.id)
                setNvaActCall(nvaActCall)
                setMsgStrong("Contabilizado correctamente! ")
                setMsgGralAlert("")
                setSuccessAlert(true)
                setAlertar(!alertar)
                setCall(!call)
            } else {
                setMsgStrong("No se pudo contabilizar la transferencia ")
                setMsgGralAlert("")
                setSuccessAlert(false)
                setAlertar(!alertar)
            }
        }).catch((error) => {
            console.error(error);
            setMsgStrong("No se pudo contabilizar la transferencia ")
            setMsgGralAlert("")
            setSuccessAlert(false)
            setAlertar(!alertar)
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <Modal isOpen={modal} toggle={() => setModal(!modal)}>
            <Form onSubmit={e => {
                e.preventDefault()
                ActualizarTransf()
            }}>
                {
                    loading ?
                        <div style={{ textAlign: "center", marginTop: "100px" }}>
                            <Spinner type="grow" color="primary" style={{ width: "100px", height: "100px" }} />
                        </div>
                        :
                        <>
                            <ModalHeader toggle={() => setModal(!modal)}><h3>Rendición de transferencia:</h3></ModalHeader>
                            <ModalBody>
                                <Form>
                                    <Row>
                                        <Col md="6" >
                                            <FormGroup>
                                                <Label for="fechaTxt">Fecha de Deposito:</Label>
                                                <Input type="date" id="fechaTxt" value={fecha} onChange={e => setFecha(e.target.value)} />
                                            </FormGroup>
                                        </Col>
                                        <Col md="6" >
                                            <FormGroup>
                                                <Label for="importeTxt">Oficina:</Label>
                                                <Input value={oficinaId} onChange={e => {
                                                    setOficinaId(e.target.value)
                                                    setAgselect(false)
                                                    if (e.target.value1 !== 2) {
                                                        console.log('e.target :>> ', e.target.selectedOptions[0]);
                                                        setOficina(e.target.selectedOptions[0].innerText)
                                                    }
                                                }} type="select" id="importeTxt">
                                                    <option value={0}>Actas</option>
                                                    <option value={1}>Legales</option>
                                                    <option value={2}>Bonos</option>
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    {parseInt(oficinaId) === 2 ?
                                        <Row>
                                            <Col md="12">
                                                <TipoCoseguro
                                                    detalle={oficina}
                                                    setDetalle={setOficina}
                                                    agSelect={agSelect}
                                                    setAgselect={setAgselect}
                                                />
                                            </Col>
                                        </Row>
                                        : null}
                                    <Row>
                                        <Col md="12" style={{ textAlign: "center" }}>
                                            <button
                                                className="btn btn-primary"
                                                style={{ margin: "15px", width: "150px" }}
                                                type="submit"
                                            >
                                                Aplicar
                                            </button>
                                            <button
                                                className="btn btn-danger"
                                                style={{ margin: "15px", width: "150px" }}
                                                onClick={e => {
                                                    e.preventDefault()
                                                    setModal(false)
                                                }}
                                            >
                                                Cancelar
                                            </button>
                                        </Col>
                                    </Row>
                                </Form>
                            </ModalBody>
                        </>
                }
            </Form>
        </Modal>
    )
}

export default ModalDepTransf