import UrlNodeServer from 'api/NodeServer'
import axios from 'axios'
import formatMoney from 'Function/NumberFormat'
import React, { useEffect, useState } from 'react'
import {
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row,
    Spinner
} from 'reactstrap'

const ModalNewTal = ({
    toggle,
    nvoTalBool,
    setMsgStrong,
    setMsgGralAlert,
    setSuccessAlert,
    nvaActCall,
    setNvaActCall,
    setActividadStr,
    alertar,
    setAlertar,
    call,
    setCall
}) => {
    const [loading, setLoading] = useState(false)
    const [desde, setDesde] = useState("")
    const [hasta, setHasta] = useState("")
    const [tipoDoc, setTipoDoc] = useState(0)
    const [cantidad, setCantidad] = useState("0")

    useEffect(() => {
        cantTotal()
        // eslint-disable-next-line 
    }, [desde, hasta])

    useEffect(() => {
        ResetFormNvo()
        // eslint-disable-next-line 
    }, [nvoTalBool])

    const ResetFormNvo = () => {
        setDesde("")
        setHasta("")
        if (nvoTalBool) {
            setTimeout(() => {
                try {
                    document.getElementById("desdeTxt").focus()
                } catch (error) {

                }
            }, 200);
        }
    }

    const cantTotal = () => {
        if (parseInt(desde) > 0 && parseInt(hasta) >= parseInt(desde)) {
            const diferencia = parseInt(hasta) - parseInt(desde) + 1
            setCantidad(formatMoney(diferencia, 0))
        } else {
            setCantidad("No válido")
        }
    }

    const NvoTalonario = async () => {
        const data = {
            desde,
            hasta,
            tipo: tipoDoc
        }
        setLoading(true)
        await axios.post(UrlNodeServer.libroBcoDir.sub.talonarios, { data }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('user-token')
            }
        })
            .then(res => {
                setLoading(false)
                const respuesta = res.data
                const status = parseInt(respuesta.status)
                if (status === 201) {
                    let tipoStr = "Cheques"
                    if (tipoDoc === 1) {
                        tipoStr = "Boletas"
                    }
                    setMsgStrong("Talonario cargado con éxito! ")
                    setMsgGralAlert("")
                    setSuccessAlert(true)
                    setAlertar(!alertar)
                    setActividadStr("El usuario ha cargado el siguiente rango " + desde + " - " + hasta + " de " + tipoStr)
                    setNvaActCall(nvaActCall)
                    setCall(!call)
                    ResetFormNvo()
                } else {
                    setMsgStrong("Hubo un error inesperado! ")
                    setMsgGralAlert("Revise la información colocada")
                    setSuccessAlert(false)
                    setAlertar(!alertar)
                }
            })
            .catch(() => {
                setLoading(false)
                setMsgStrong("Hubo un error inesperado! ")
                setMsgGralAlert("Revise la información colocada")
                setSuccessAlert(false)
                setAlertar(!alertar)
            })
    }

    return (
        <Modal isOpen={nvoTalBool} toggle={toggle} fade={true}>
            <Form onSubmit={e => {
                e.preventDefault();
                NvoTalonario();
            }}>
                <ModalHeader toggle={toggle}>Nuevo talonario</ModalHeader>
                {
                    loading ?
                        <div style={{ textAlign: "center", marginTop: "100px" }}>
                            <Spinner type="grow" color="primary" style={{ width: "100px", height: "100px" }} />
                        </div>
                        :
                        <ModalBody>
                            <Row>
                                <Col md="12">
                                    <FormGroup>
                                        <Label for="tipoTxt">Tipo</Label>
                                        <Input type="select" id="tipoTxt" value={tipoDoc} onChange={e => setTipoDoc(e.target.value)}>
                                            <option value={0}>Chequeras</option>
                                            <option value={1}>Boletas</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                        <Label for="desdeTxt">Desde</Label>
                                        <Input
                                            type="number"
                                            id="desdeTxt"
                                            placeholder="Nº desde..."
                                            value={desde}
                                            step={1}
                                            min={0}
                                            max={hasta > 0 ? hasta : null}
                                            onChange={e => setDesde(e.target.value)}
                                            required
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md="6">
                                    <FormGroup>
                                        <Label for="hastaTxt">Hasta</Label>
                                        <Input
                                            type="number"
                                            id="hastaTxt"
                                            placeholder="Nº hasta..."
                                            value={hasta}
                                            step={1}
                                            min={desde > 0 ? desde : 0}
                                            onChange={e => setHasta(e.target.value)}
                                            required />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                        <Label for="cantTxt">Cantidad</Label>
                                        <Input
                                            type="text"
                                            id="cantTxt"
                                            value={cantidad}
                                            disabled
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </ModalBody>
                }
                <ModalFooter>
                    <Row>
                        <Col md="12" style={{ textAlign: "center" }}>
                            <button
                                className="btn btn-primary"
                                style={{ width: "150px", marginInline: "20px" }}
                                type="submit"
                            >
                                Agregar
                            </button>
                            <button
                                className="btn btn-danger"
                                style={{ width: "150px", marginInline: "20px" }}
                                onClick={e => {
                                    e.preventDefault();
                                    toggle();
                                }}
                            >
                                Cancelar
                            </button>
                        </Col>
                    </Row>
                </ModalFooter>
            </Form>
        </Modal>
    )
}
export default ModalNewTal