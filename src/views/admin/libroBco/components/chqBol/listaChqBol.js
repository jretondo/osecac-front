import ListadoTable from '../../../../../components/subComponents/Listados/ListadoTable'
import React, { useContext, useEffect, useState } from 'react'
import { Col, FormGroup, Input, Label, Spinner } from 'reactstrap'
import Row from 'reactstrap/lib/Row'
import ModalNewTal from './modalNewTal'
import FilaBolChq from '../../../../../components/subComponents/Listados/SubComponentes/FilaBolChq'
import formatMoney from 'Function/NumberFormat'
import ChqBolCOntext from '../../../../../context/chqBol';

const titulos = ["Desde", "Hasta", ""]

const ListaChqBol = ({
    setMsgStrong,
    setMsgGralAlert,
    setSuccessAlert,
    nvaActCall,
    setNvaActCall,
    setActividadStr,
    alertar,
    setAlertar
}) => {
    const [nvoTalBool, setNvoTalBool] = useState(false)
    const [listaChq, setListaChq] = useState(<tr><td>No hay chequeras cargadas</td></tr>)
    const [listaBol, setListaBol] = useState(<tr><td>No hay boletas cargadas</td></tr>)
    const [call, setCall] = useState(false)
    const [esperar, setEsperar] = useState(false)

    const { totalBol, totalChq, loadingChqBol, listadoBol, listadoChq, } = useContext(ChqBolCOntext)

    useEffect(() => {
        listar()
        // eslint-disable-next-line
    }, [call, listadoBol, listadoChq])

    const toggle = () => {
        setNvoTalBool(!nvoTalBool)
    }

    const listar = () => {
        try {
            setListaBol(
                // eslint-disable-next-line
                listadoBol.map((item, key) => {
                    return (
                        <FilaBolChq
                            key={key}
                            id={key}
                            item={item}
                            setActividadStr={setActividadStr}
                            nvaActCall={nvaActCall}
                            setNvaActCall={setNvaActCall}
                            alertar={alertar}
                            setAlertar={setAlertar}
                            setMsgStrong={setMsgStrong}
                            setMsgGralAlert={setMsgGralAlert}
                            setSuccessAlert={setSuccessAlert}
                            setCall={setCall}
                            call={call}
                            setEsperar={setEsperar}
                        />
                    )
                })
            )
            setListaChq(
                // eslint-disable-next-line
                listadoChq.map((item, key) => {
                    return (
                        <FilaBolChq
                            key={key}
                            id={key}
                            item={item}
                            setActividadStr={setActividadStr}
                            nvaActCall={nvaActCall}
                            setNvaActCall={setNvaActCall}
                            alertar={alertar}
                            setAlertar={setAlertar}
                            setMsgStrong={setMsgStrong}
                            setMsgGralAlert={setMsgGralAlert}
                            setSuccessAlert={setSuccessAlert}
                            setCall={setCall}
                            call={call}
                            setEsperar={setEsperar}
                        />
                    )
                })
            )
        } catch (error) {
            setListaChq(<tr><td>No hay chequeras cargadas</td></tr>)
            setListaBol(<tr><td>No hay boletas cargadas</td></tr>)
        }
    }

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
            <Row>
                <Col md="6" style={{ border: "2px solid #626DDE", minHeight: "200px" }} >
                    <h3 style={{ textAlign: "center" }} >Chequeras en uso</h3>
                    {
                        loadingChqBol || esperar ?
                            <div style={{ textAlign: "center", marginTop: "100px" }}>
                                <Spinner type="grow" color="primary" style={{ width: "100px", height: "100px" }} />
                            </div>
                            :
                            <ListadoTable
                                titulos={titulos}
                                listado={listaChq}
                            />
                    }

                </Col>
                <Col md="6" style={{ border: "2px solid #626DDE", minHeight: "200px" }} >
                    <h3 style={{ textAlign: "center" }}>Boletas en uso</h3>
                    {
                        loadingChqBol || esperar ?
                            <div style={{ textAlign: "center", marginTop: "100px" }}>
                                <Spinner type="grow" color="primary" style={{ width: "100px", height: "100px" }} />
                            </div>
                            :
                            <ListadoTable
                                titulos={titulos}
                                listado={listaBol}
                            />
                    }
                </Col>
            </Row>
            {
                loadingChqBol ?
                    <div style={{ textAlign: "center", marginTop: "100px" }}>
                        <Spinner type="grow" color="primary" style={{ width: "100px", height: "100px" }} />
                    </div>
                    :
                    <>
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
                        <Row>
                            <Col md="12" style={{ textAlign: "center", padding: "20px" }}>
                                <button className="btn btn-primary" onClick={e => {
                                    e.preventDefault()
                                    setNvoTalBool(true)
                                }}>
                                    Agregar Nuevo Talonario
                                </button>
                            </Col>
                        </Row>
                    </>
            }
            <ModalNewTal
                toggle={toggle}
                nvoTalBool={nvoTalBool}
                setMsgStrong={setMsgStrong}
                setMsgGralAlert={setMsgGralAlert}
                setSuccessAlert={setSuccessAlert}
                nvaActCall={nvaActCall}
                setNvaActCall={setNvaActCall}
                setActividadStr={setActividadStr}
                alertar={alertar}
                setAlertar={setAlertar}
                call={call}
                setCall={setCall}
            />
        </>
    )
}

export default ListaChqBol