import React, { useState, useEffect } from 'react'
import {
    Card,
    CardFooter,
    CardHeader,
} from "reactstrap"
import ListaAgencias from './subComponents/listaMovimientos'
import FiltroComp from './subComponents/filtro'
import Row from 'reactstrap/lib/Row'
import Col from 'reactstrap/lib/Col'
import ButtonToggle from 'components/subComponents/buttonToggle/buttonToggle1'
import CardBody from 'reactstrap/lib/CardBody'
import Paginacion from 'components/subComponents/Paginacion/Paginacion'
import FormAgencia from './subComponents/formAgencia'

const ListaExtractos = ({
    setActividadStr,
    nvaActCall,
    setNvaActCall,
    alertar,
    setAlertar,
    setMsgStrong,
    setMsgGralAlert,
    setSuccessAlert
}) => {
    const [call, setCall] = useState(false)
    const [filtro, setFiltro] = useState(false)
    const [filtroStr, setFiltroStr] = useState("")
    const [pagina, setPagina] = useState(1)
    const [plantPaginas, setPlantPaginas] = useState([])
    const [ultimaPag, setUltimaPag] = useState(0)
    const [pages, setPages] = useState([])
    const [nvoForm, setNvoForm] = useState(false)
    const [windowToggle, setWindowToggle] = useState(false)
    const [detallesBool, setDetallesbool] = useState(false)
    const [idDetalle, setIdDetalle] = useState(0)
    const [agenciaDet, setAgenciaDet] = useState("")

    useEffect(() => {
        setFiltro(false)
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        setPagina(1)
        // eslint-disable-next-line
    }, [filtro])

    if (windowToggle) {
        return (
            <Card className="shadow" style={{ marginTop: "30px" }}>
                <CardHeader className="border-0">
                    {
                        nvoForm ?
                            <>
                                <Row>
                                    <Col style={{ textAlign: "right" }}>
                                        <button className="btn btn-danger" onClick={e => {
                                            e.preventDefault();
                                            setNvoForm(false);
                                        }}>
                                            X
                                        </button>
                                    </Col>
                                </Row>
                                {
                                    detallesBool ?
                                        <h2 className="mb-0" style={{ textAlign: "center" }}>Detalles de {agenciaDet}</h2> :
                                        <h2 className="mb-0" style={{ textAlign: "center" }}>Nueva Agencia</h2>
                                }
                            </>
                            :
                            <>
                                <ButtonToggle
                                    symbol={windowToggle ? "-" : "+"}
                                    textToDo={windowToggle ? "Minimizar" : "Maximizar"}
                                    toogle={windowToggle}
                                    setToggle={setWindowToggle}
                                />
                                <h2 className="mb-0" style={{ textAlign: "center" }}>Comodato</h2>
                            </>
                    }

                </CardHeader>
                {
                    nvoForm ?
                        <FormAgencia
                            setMsgStrong={setMsgStrong}
                            setMsgGralAlert={setMsgGralAlert}
                            setSuccessAlert={setSuccessAlert}
                            setAlertar={setAlertar}
                            alertar={alertar}
                            setActividadStr={setActividadStr}
                            setNvaActCall={setNvaActCall}
                            nvaActCall={nvaActCall}
                            detallesBool={detallesBool}
                            idDetalle={idDetalle}
                            setDetallesBool={setDetallesbool}
                            setIdDetalle={setIdDetalle}
                            setCall={setCall}
                            call={call}
                            setNvoForm={setNvoForm}
                            agenciaDet={agenciaDet}
                            setAgenciaDet={setAgenciaDet}
                        />
                        :
                        <>
                            <Card>
                                <CardBody>
                                    <FiltroComp
                                        detalleStr={filtroStr}
                                        setDetalleStr={setFiltroStr}
                                        setFiltro={setFiltro}
                                        filtro={filtro}
                                    />
                                </CardBody>
                            </Card>
                            <ListaAgencias
                                pagina={pagina}
                                filtro={filtro}
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
                                setPagina={setPages}
                                setUltimaPag={setUltimaPag}
                                setPages={setPages}
                                filtroStr={filtroStr}
                                setDetallesBool={setDetallesbool}
                                setIdDetalle={setIdDetalle}
                                nvoForm={nvoForm}
                                setNvoForm={setNvoForm}
                            />
                            <CardFooter>
                                <Row>
                                    <Col>
                                        <button className="btn btn-primary" onClick={e => {
                                            e.preventDefault();
                                            setNvoForm(true);
                                        }}>
                                            Nueva Agencia
                                        </button>
                                    </Col>
                                    <Col>
                                        <Paginacion
                                            setPagina={setPagina}
                                            pagina={pagina}
                                            plantPaginas={plantPaginas}
                                            ultimaPag={ultimaPag}
                                            pages={pages}
                                            setPlantPaginas={setPlantPaginas}
                                            setUltimaPag={setUltimaPag}
                                        />
                                    </Col>
                                </Row>
                            </CardFooter>
                        </>
                }
            </Card>
        )
    } else {
        return (

            <Card className="shadow" style={{ marginTop: "30px" }}>
                <CardHeader className="border-0">
                    <ButtonToggle
                        symbol={windowToggle ? "-" : "+"}
                        textToDo={windowToggle ? "Minimizar" : "Maximizar"}
                        toogle={windowToggle}
                        setToggle={setWindowToggle}
                    />
                    <h2 className="mb-0" style={{ textAlign: "center" }}>Comodato</h2>
                </CardHeader>
            </Card>
        )
    }
}

export default ListaExtractos