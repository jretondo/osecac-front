import UrlNodeServer from '../../../../../../api/NodeServer'
import axios from 'axios'
import React, { useState } from 'react'
import {
    Row,
    Col,
    Input,
    Form,
    FormGroup,
    Label,
    Spinner,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "reactstrap"
import { DescargarPDF } from '../../../functions'
import ModalGastos from './modalGstos'
import FileSaver from 'file-saver'
import moment from 'moment'

const Filtro = ({
    desde,
    hasta,
    setDesde,
    setHasta,
    setFiltro,
    setMsgStrong,
    setMsgGralAlert,
    setSuccessAlert,
    setAlertar,
    alertar,
    windowToggle
}) => {
    const [loading, setLoading] = useState(false)
    const [modalToggle, setmodalToggle] = useState(false)
    const [gastos, setGastos] = useState([])
    const [nuevoSaldo, setNuevoSaldo] = useState(0)
    const [ajustaModal, setAjustarModal] = useState(false)
    const [fechahastaAlivio, setFechaHastaAlivio] = useState(moment(new Date().setMonth(new Date().getMonth() - 6)).format("YYYY-MM-DD"))
    const [aliviarModal, setAliviarModal] = useState(false)

    const toggleAliviar = () => setAliviarModal(!aliviarModal)
    const toggleAjustar = () => setAjustarModal(!ajustaModal)

    const ConsultaFechas = (e) => {
        e.preventDefault()
        setFiltro(true)
    }

    const getPDF = async (e) => {
        e.preventDefault()

        await DescargarPDF(desde, hasta)
            .then(res => {
                if (parseInt(res.status) === 200) {
                    setLoading(false)
                    setMsgStrong("Extracto descargado con éxito! ")
                    setMsgGralAlert("")
                    setSuccessAlert(true)
                    setAlertar(!alertar)
                } else {
                    setMsgStrong("Hubo un error al querer descargar el Extracto")
                    setMsgGralAlert("")
                    setSuccessAlert(false)
                    setAlertar(!alertar)
                    setLoading(false)
                }
            })
            .catch(() => {
                setMsgStrong("Hubo un error al querer descargar el Extracto")
                setMsgGralAlert("")
                setSuccessAlert(false)
                setAlertar(!alertar)
                setLoading(false)
            })
    }


    const getValores = async (e) => {
        e.preventDefault()

        await axios.get(UrlNodeServer.conciliacionDir.sub.valores, {
            responseType: 'arraybuffer',
            params: {
                fromDate: desde,
                toDate: hasta
            },
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('user-token'),
                Accept: 'application/vnd.ms-excel',
            }
        })
            .then(res => {
                var blob = new Blob([res.data], { type: 'application/vnd.ms-excel' })
                FileSaver.saveAs(blob, "Valores.xls");
                setLoading(false)
                setMsgStrong("Archivo descargado con éxito! ")
                setMsgGralAlert("")
                setSuccessAlert(true)
                setAlertar(!alertar)
            })
            .catch((err) => {
                console.error(err)
                setMsgStrong("Hubo un error al querer descargar el Extracto")
                setMsgGralAlert("")
                setSuccessAlert(false)
                setAlertar(!alertar)
                setLoading(false)
            })
    }


    const calcGstos = async () => {
        const query = `?desde=${desde}&hasta=${hasta}`
        setLoading(true)
        await axios.get(`${UrlNodeServer.extractosDir.sub.calcGstos}${query}`, {
            headers:
                { 'Authorization': 'Bearer ' + localStorage.getItem('user-token') }
        })
            .then((res) => {
                setLoading(false)
                console.log(`res.data`, res.data)
                setGastos(res.data.body)
                setmodalToggle(true)
            })
            .catch(() => {
                setMsgStrong("Hubo un error al querer mostrar los Gastos e impuestos")
                setMsgGralAlert("")
                setSuccessAlert(false)
                setAlertar(!alertar)
                setLoading(false)
            })
    }

    const aliviarBD = async () => {
        const query = `?hasta=${fechahastaAlivio}`
        setLoading(true)
        await axios.get(`${UrlNodeServer.extractosDir.sub.aliviarBD}${query}`, {
            headers:
                { 'Authorization': 'Bearer ' + localStorage.getItem('user-token') }
        })
            .then((res) => {
                setLoading(false)
                setMsgStrong("Base de Datos aliviada con éxito")
                setMsgGralAlert("")
                setSuccessAlert(true)
                setAlertar(!alertar)
                setLoading(false)
                setFiltro(true)
                setFiltro(false)
                setAliviarModal(false)
            })
            .catch((error) => {
                setMsgStrong("Hubo un error. Revise que no hayan transferencias sin dar de baja")
                setMsgGralAlert("")
                setSuccessAlert(false)
                setAlertar(!alertar)
                setLoading(false)
            })
    }

    const ajustarSaldo = async () => {
        const query = `?saldo=${nuevoSaldo}`
        setLoading(true)
        await axios.get(`${UrlNodeServer.extractosDir.sub.ajustarSaldo}${query}`, {
            headers:
                { 'Authorization': 'Bearer ' + localStorage.getItem('user-token') }
        })
            .then((res) => {
                setLoading(false)
                setMsgStrong("Saldo ajustado con éxito")
                setMsgGralAlert("")
                setSuccessAlert(true)
                setAlertar(!alertar)
                setLoading(false)
                setFiltro(true)
                setFiltro(false)
                setAliviarModal(false)
            })
            .catch((error) => {
                setMsgStrong(error.msg)
                setMsgGralAlert("")
                setSuccessAlert(false)
                setAlertar(!alertar)
                setLoading(false)
            })
    }

    if (loading) {
        return (
            <>
                <div style={{ textAlign: "center", marginTop: "100px" }}>
                    <Spinner type="grow" color="primary" style={{ width: "100px", height: "100px" }} /> </div>
            </>
        )
    } else {
        return (
            <Form onSubmit={e => ConsultaFechas(e)}>
                <Row form style={{ textAlign: "left" }}>
                    <Col md={3}>
                        <FormGroup>
                            <Label for="exampleEmail">Desde:{" "}</Label>
                            <Input type="date" name="desde" required value={desde} onChange={e => { setDesde(e.target.value) }} max={hasta} />
                        </FormGroup>
                    </Col>
                    <Col md={3}>
                        <FormGroup>
                            <Label for="exampleEmail">Hasta:{" "}</Label>
                            <Input type="date" name="hasta" required value={hasta} onChange={e => { setHasta(e.target.value) }} min={desde} />
                        </FormGroup>
                    </Col>
                    <Col md="6">
                        <Row>
                            <Col >
                                <button
                                    className="btn btn-primary"
                                    disabled={!windowToggle}
                                    style={{ marginTop: "33px" }} type="submit">Filtrar</button>
                                <button className="btn btn-warning" style={{ marginTop: "33px" }} onClick={e => getPDF(e)}>
                                    Descargar PDF
                                </button>
                                <button
                                    className="btn btn-default"
                                    style={{ marginTop: "33px" }}
                                    onClick={e => {
                                        e.preventDefault()
                                        calcGstos()
                                    }}
                                >
                                    Gastos e Imp.
                                </button>
                                <button
                                    className="btn btn-default"
                                    style={{ marginTop: "33px" }}
                                    onClick={e => {
                                        e.preventDefault()
                                        getValores(e)
                                    }}
                                >
                                    <i className='fa fa-download'></i>{" "}
                                    Valores
                                </button>
                                <button
                                    className='btn btn-danger'
                                    style={{ marginTop: "33px" }}
                                    onClick={e => {
                                        e.preventDefault()
                                        toggleAliviar()
                                    }}
                                >
                                    Aliviar BD (BackUp)
                                </button>
                                <button
                                    className='btn btn-warning'
                                    style={{ marginTop: "33px" }}
                                    onClick={e => {
                                        e.preventDefault()
                                        toggleAjustar()
                                    }}
                                >
                                    Ajustar Saldo
                                </button>
                                <ModalGastos
                                    toggle={modalToggle}
                                    setToggle={setmodalToggle}
                                    data={gastos}
                                    desde={desde}
                                    hasta={hasta}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Modal isOpen={aliviarModal} toggle={toggleAliviar} >
                    <ModalHeader>
                        Aliviar Base de Datos
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label>Elija la última fecha a quitar (todo lo anterior a esta fecha irá al backup y no se podrá revertir):</Label>
                            <Input value={fechahastaAlivio} onChange={e => setFechaHastaAlivio(e.target.value)} type="date" />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <button
                            className='btn btn-danger'
                            onClick={e => {
                                e.preventDefault()
                                toggleAliviar()
                            }}
                        >
                            Cerrar
                        </button>
                        <button
                            className='btn btn-primary'
                            onClick={e => {
                                e.preventDefault()
                                aliviarBD()
                            }}
                        >
                            Aplicar
                        </button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={ajustaModal} toggle={toggleAjustar} >
                    <ModalHeader>
                        Ajustar saldo
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label>Fijese bien la primer fecha de los extractos y coloque manualmente el saldo inicial de la fecha:</Label>
                            <Input value={nuevoSaldo} onChange={e => setNuevoSaldo(e.target.value)} type="number" />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <button
                            className='btn btn-danger'
                            onClick={e => {
                                e.preventDefault()
                                toggleAjustar()
                            }}
                        >
                            Cerrar
                        </button>
                        <button
                            className='btn btn-primary'
                            onClick={e => {
                                e.preventDefault()
                                ajustarSaldo()
                            }}
                        >
                            Aplicar
                        </button>
                    </ModalFooter>
                </Modal>
            </Form>
        )
    }
}

export default Filtro