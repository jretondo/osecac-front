import ButtonToggle from 'components/subComponents/buttonToggle/buttonToggle1'
import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, Col, FormGroup, Input, Label, Row } from 'reactstrap'
import BuscarMov from './components/buscarMov'
import NewMov from './components/newMov'


const FormsLibro = () => {
    const [nvoMovBool, setNvoMovBool] = useState(false)

    const [fecha, setFecha] = useState("")
    const [descrSm, setDescrSm] = useState("")
    const [descrLgBool, setDescrLgBool] = useState(false)
    const [descrLg, setDescrLg] = useState(false)
    const [nroCbte, setNroCbte] = useState("")
    const [nroOp, setNroOp] = useState("")
    const [impNeto, setImpNeto] = useState("")
    const [haber, setHaber] = useState("")
    const [debe, setDebe] = useState("")
    const [retMun, setRetMun] = useState("")
    const [retGcias, setRetGcias] = useState("")
    const [tipoLibro, setTipoLibro] = useState(0)
    const [windowToggle, setWindowToggle] = useState(false)

    if (windowToggle) {
        return (
            <Card className="shadow">
                <CardHeader className="border-0">
                    <ButtonToggle
                        symbol={windowToggle ? "-" : "+"}
                        toogle={windowToggle}
                        setToggle={setWindowToggle}
                        tittle=" Libro Banco"
                    />
                </CardHeader>
                <CardBody>
                    <Row className="align-items-center">
                        <Col md="8" >
                            {
                                nvoMovBool ?
                                    <h3>Nuevo Movimiento en Libro Banco Córdoba</h3> :
                                    <h2 className="mb-0">Libro Banco - Consulta </h2>
                            }
                        </Col>
                        <Col md="4" style={{ textAlign: "right" }} >
                            {
                                nvoMovBool ?
                                    <button
                                        onClick={e => {
                                            e.preventDefault()
                                            setNvoMovBool(false)
                                        }}
                                        className="btn btn-danger">
                                        <i className="ni ni-ungroup" style={{ fontSize: "16px" }} aria-hidden="true"></i> {" "} Consulta de Movimientos
                                    </button> :
                                    <button
                                        onClick={e => {
                                            e.preventDefault()
                                            setNvoMovBool(true)
                                        }}
                                        className="btn btn-danger">
                                        <i className="ni ni-fat-add" style={{ fontSize: "16px" }} aria-hidden="true"></i> {" "}
                                        Nuevo Movimiento
                                    </button>
                            }
                        </Col>
                    </Row>
                    {
                        nvoMovBool ?
                            <NewMov /> :
                            <BuscarMov />
                    }
                </CardBody>
            </Card>)
    } else {
        return (
            <Card className="shadow">
                <CardHeader className="border-0">
                    <ButtonToggle
                        symbol={windowToggle ? "-" : "+"}
                        toogle={windowToggle}
                        setToggle={setWindowToggle}
                        tittle=" Libro Banco"
                    />
                </CardHeader>
            </Card>
        )
    }
}

export default FormsLibro