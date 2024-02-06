import UrlNodeServer from '../../../../../../api/NodeServer';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {
    Col,
    Form,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row,
    Spinner
} from 'reactstrap';

const ModalTypeList = ({
    modal,
    setModal,
    idMov,
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
    const [loading, setloading] = useState(false)
    const [plantTipos, setPlanttipos] = useState(<></>)

    useEffect(() => {
        ListaTiposMov()
        // eslint-disable-next-line
    }, [])

    const ListaTiposMov = async () => {
        setloading(true)
        await axios.get(UrlNodeServer.extractosDir.sub.tiposmov, {
            headers:
                { 'Authorization': 'Bearer ' + localStorage.getItem('user-token') }
        })
            .then(res => {
                setloading(false)
                const respuesta = res.data
                const status = parseInt(respuesta.status)
                if (status === 200) {
                    const body = respuesta.body
                    setPlanttipos(
                        // eslint-disable-next-line
                        body.map(item => {
                            return (
                                <Row style={{ margin: "10px" }}>
                                    <Col md="12">
                                        <button
                                            className="btn btn-primary"
                                            style={{ width: "100%", textAlign: "center" }}
                                            onClick={e => {
                                                e.preventDefault();
                                                ChangeTypeMov(item.orden)
                                            }}
                                        >
                                            <Row>
                                                <Col>
                                                    <span>{item.tipo_name}</span>

                                                </Col>
                                            </Row>
                                        </button>
                                    </Col>
                                </Row>
                            )
                        })
                    )
                } else {
                    setPlanttipos(<></>)
                }
            })
            .catch(() => {
                setloading(false)
                setPlanttipos(<></>)
            })
    }

    const ChangeTypeMov = async (idTipo) => {
        const datos = {
            set: {
                id_tipo: idTipo
            }
        }
        await axios.patch(`${UrlNodeServer.extractosDir.extractos}/${idMov}`, datos, {
            headers:
                { 'Authorization': 'Bearer ' + localStorage.getItem('user-token') }
        })
            .then(res => {
                const respuesta = res.data
                const status = parseInt(respuesta.status)
                if (status === 200) {
                    setActividadStr("El usuario ha modificado el tipo de moviemnto de ID: " + idMov)
                    setNvaActCall(nvaActCall)
                    setMsgStrong("Tipo de moviemnto asignado correctamente ! ")
                    setMsgGralAlert("")
                    setSuccessAlert(true)
                    setAlertar(!alertar)
                    setCall(!call)
                } else {
                    setMsgStrong("No se pudo cambiar el tipo de movimiento ")
                    setMsgGralAlert("")
                    setSuccessAlert(false)
                    setAlertar(!alertar)
                }
            })
            .catch(() => {
                setMsgStrong("No se pudo cambiar el tipo de movimiento ")
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
                        <>
                            <div style={{ textAlign: "center", marginTop: "100px" }}>
                                <Spinner type="grow" color="primary" style={{ width: "100px", height: "100px" }} /> </div>
                        </> :
                        <>
                            <ModalHeader toggle={() => setModal(!modal)}>Asignar Tipo a movimiento</ModalHeader>
                            <ModalBody>
                                {plantTipos}
                            </ModalBody>
                            <ModalFooter>
                                <Row>
                                    <Col md="12">
                                        <button
                                            className="btn btn-danger"
                                            onClick={e => {
                                                e.preventDefault()
                                                setModal(false)
                                            }}
                                        >
                                            Cancelar
                                        </button>
                                    </Col>
                                </Row>
                            </ModalFooter>
                        </>
                }
            </Form>
        </Modal>
    )
}

export default ModalTypeList