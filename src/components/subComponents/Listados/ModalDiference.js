import UrlNodeServer from '../../../api/NodeServer'
import axios from 'axios'
import React, { useState } from 'react'
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
    Row
} from 'reactstrap'
import Spinner from 'reactstrap/lib/Spinner'

const opPos = ["Acreditado de más", "Acreditado de menos"]
const opNeg = ["Débitado de más", "Débitado de menos"]

const ModalDiference = ({
    impOriginal,
    modal,
    setModal,
    idMov,
    alertar,
    setAlertar,
    setMsgStrong,
    setMsgGralAlert,
    setSuccessAlert,
    setActividadStr,
    nvaActCall,
    setNvaActCall,
    setCall,
    call
}) => {

    const [impNvo, setImpNvo] = useState(0)
    const [dif, setDif] = useState(0)
    const [textDif, setTextoDif] = useState("Diferencia")
    const [credDeb, setCredDeb] = useState(false)
    const [loading, setLoading] = useState(false)

    const chageNewValue = (e) => {
        setImpNvo(e.target.value)
        let impO
        let impN
        if (impOriginal >= 0) {
            impO = impOriginal
            impN = e.target.value
        } else {
            impO = (-impOriginal)
            impN = e.target.value
        }

        if (impOriginal >= 0) {
            if (impO > impN) {
                setCredDeb(false)
                setTextoDif(opPos[0])
            } else {
                setCredDeb(true)
                setTextoDif(opPos[1])
            }
        } else {
            if (impO > impN) {
                setCredDeb(true)
                setTextoDif(opNeg[0])
            } else {
                setCredDeb(false)
                setTextoDif(opNeg[1])
            }
        }

        try {
            setDif((Math.round((impO - impN) * 100) / 100))
        } catch (error) {
        }
    }

    const applyChange = async (e) => {
        e.preventDefault()
        if (impOriginal === impNvo) {
            setMsgStrong("El nuevo importe no puede ser igual al del extracto")
            setMsgGralAlert("")
            setSuccessAlert(false)
            setAlertar(!alertar)
        } else {
            let diferencia = dif
            if (impOriginal < 0) {
                diferencia = (- dif)
            }

            let nvoImporte = impNvo
            if (impOriginal < 0) {
                nvoImporte = - impNvo
            }

            const data = {
                "amount": nvoImporte,
                "dif": diferencia,
                "original": impOriginal,
                "concepto": textDif,
                "crDb": credDeb
            }

            console.log(`data`, data)
            setLoading(true)
            await axios.put(`${UrlNodeServer.extractosDir.extractos}/${idMov}`, data, {
                headers:
                {
                    'Authorization': 'Bearer ' + localStorage.getItem('user-token')
                }
            })
                .then(res => {
                    setLoading(false)
                    const status = parseInt(res.data.status)
                    if (status === 200) {
                        setActividadStr("El usuario ha modificado el movimiento con id " + idMov)
                        setNvaActCall(!nvaActCall)
                        setMsgStrong("Movimiento modificado con éxito!")
                        setMsgGralAlert("")
                        setSuccessAlert(true)
                        setAlertar(!alertar)
                        setCall(!call)
                    } else {
                        setMsgStrong("Error inesperado!")
                        setMsgGralAlert("")
                        setSuccessAlert(false)
                        setAlertar(!alertar)
                    }
                })
                .catch(() => {
                    setLoading(false)
                    setMsgStrong("Error inesperado!")
                    setMsgGralAlert("")
                    setSuccessAlert(false)
                    setAlertar(!alertar)
                })
        }
    }

    return (
        <Modal isOpen={modal} toggle={() => setModal(!modal)}>
            <Form onSubmit={e => applyChange(e)}>
                {
                    loading ?
                        <>
                            <div style={{ textAlign: "center", marginTop: "100px" }}>
                                <Spinner type="grow" color="primary" style={{ width: "100px", height: "100px" }} /> </div>
                        </> :
                        <>
                            <ModalHeader toggle={() => setModal(!modal)}>Diferencia de Importe</ModalHeader>
                            <ModalBody>
                                <FormGroup>
                                    <Label for="examplePassword">Importe Extracto {impOriginal >= 0 ? "(Crédito)" : "(Débito)"}:</Label>
                                    <Input style={impOriginal >= 0 ? { background: "#cbffcb", color: "black" } : { background: "#ff7c7c", color: "white" }} type="number" value={impOriginal >= 0 ? impOriginal : (-impOriginal)} disabled />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="examplePassword">Importe Real:</Label>
                                    <Input type="number" value={impNvo >= 0 ? impNvo : (-impNvo)} placeholder="Importe del libro banco..." onChange={e => chageNewValue(e)} min={0.01} step={0.01} required />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="examplePassword">{textDif}:</Label>
                                    <Input type="number" style={
                                        impOriginal >= 0 ?
                                            dif >= 0 ?
                                                { background: "#cbffcb", color: "black" } :
                                                { background: "#ff7c7c", color: "white" }
                                            :
                                            dif >= 0 ?
                                                { background: "#ff7c7c", color: "white" } :
                                                { background: "#cbffcb", color: "black" }
                                    } value={dif >= 0 ? dif : (-dif)} disabled />
                                    <span>{
                                        impOriginal >= 0 ?
                                            dif >= 0 ?
                                                "*La diferencia de le restará a los gastos" :
                                                "*La diferencia de le sumará a los gatos"
                                            :
                                            dif >= 0 ?
                                                "*La diferencia de le sumará a los gastos" :
                                                "*La diferencia de le restará a los gatos"
                                    }</span>
                                </FormGroup>
                            </ModalBody>
                            <ModalFooter>
                                <Row>
                                    <Col md="6">
                                        <button className="btn btn-primary">
                                            Aplicar
                                        </button>
                                    </Col>
                                    <Col md="6">
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

export default ModalDiference