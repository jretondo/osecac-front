import UrlNodeServer from '../../../../../../api/NodeServer';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import moment from 'moment'
import {
    Col,
    Form,
    Modal,
    ModalBody,
    ModalHeader,
    Row,
    Spinner,
    FormGroup,
    Label,
    Input
} from 'reactstrap';

const ModalAddObs = ({
    modal,
    setModal,
    item,
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
    const [observaciones, setObservaciones] = useState(item.obs)
    const [concepto, setConcepto] = useState(item.descripcion === "" ? item.concepto : `${item.descripcion}`)
    const [rendicionBool, setRendicionBool] = useState(item.transf_int)

    useEffect(() => {
        setConcepto(item.descripcion === "" ? item.concepto : `${item.descripcion}`)
        setRendicionBool(item.transf_int)
    }, [item])

    const ActualizarObs = async () => {
        const datos = {
            set: {
                obs: observaciones,
                transf_int: rendicionBool,
                descripcion: concepto
            }
        }
        setLoading(true)
        await axios.patch(`${UrlNodeServer.conciliacionDir.conciliacion}/${item.id}`, datos, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('user-token')
            }
        })
            .then(res => {
                setLoading(false)
                const respuesta = res.data
                const status = parseInt(respuesta.status)
                if (status === 200) {
                    setLoading(false)
                    setActividadStr("El usuario modificó el registro del movimiento " + item.id)
                    setNvaActCall(!nvaActCall)
                    setMsgStrong("Observación cargado con éxito! ")
                    setMsgGralAlert("")
                    setSuccessAlert(true)
                    setAlertar(!alertar)
                    setCall(!call)
                    setModal(false)
                } else {
                    setMsgStrong("Hubo un error al querer actualizar la observación!")
                    setMsgGralAlert("")
                    setSuccessAlert(false)
                    setAlertar(!alertar)
                    setLoading(false)
                }
            })
            .catch(() => {
                setLoading(false)
                setMsgStrong("Hubo un error al querer actualizar la observación!")
                setMsgGralAlert("")
                setSuccessAlert(false)
                setAlertar(!alertar)
            })
    }

    return (
        <Modal isOpen={modal} toggle={() => setModal(!modal)}>
            <Form onSubmit={e => e.preventDefault()}>
                {
                    loading ?
                        <div style={{ textAlign: "center", marginTop: "100px" }}>
                            <Spinner type="grow" color="primary" style={{ width: "100px", height: "100px" }} />
                        </div>
                        :
                        <>
                            <ModalHeader toggle={() => setModal(!modal)}><h3>Agregar Observaciones:</h3></ModalHeader>
                            <ModalBody>
                                <Form>
                                    <Row>
                                        <Col md="6" >
                                            <FormGroup>
                                                <Label for="fechaTxt">Fecha:</Label>
                                                <Input type="date" id="fechaTxt" value={moment(item.fecha).format("YYYY-MM-DD")} disabled />
                                            </FormGroup>
                                        </Col>
                                        <Col md="6" >
                                            <FormGroup>
                                                <Label for="importeTxt">Importe:</Label>
                                                <Input type="number" id="importeTxt" value={(item.monto)} disabled />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="12">
                                            <FormGroup>
                                                <Label for="conceptoTxt">Concepto:</Label>
                                                <Input type="text" id="conceptoTxt" value={concepto} onChange={e => setConcepto(e.target.value)} />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="12">
                                            <FormGroup>
                                                <Label for="coseguroTxt">Es rendición de coseguro:</Label>
                                                <Input type="select" id="coseguroTxt" onChange={e => setRendicionBool(e.target.value)} value={rendicionBool} >
                                                    <option value={0}>No</option>
                                                    <option value={1}>Si</option>
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="12">
                                            <FormGroup>
                                                <Label for="obsTxt">Observaciones:</Label>
                                                <Input type="textarea" id="obsTxt" value={observaciones} onChange={e => setObservaciones(e.target.value)} />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="12" style={{ textAlign: "center" }}>
                                            <button
                                                className="btn btn-primary"
                                                style={{ margin: "15px", width: "150px" }}
                                                onClick={e => {
                                                    e.preventDefault();
                                                    ActualizarObs();
                                                }}
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

export default ModalAddObs