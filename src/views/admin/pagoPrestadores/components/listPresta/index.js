import ButtonToggle from 'components/subComponents/buttonToggle/buttonToggle1';
import Paginacion from 'components/subComponents/Paginacion/Paginacion';
import React, { useState } from 'react'
import { Card, CardBody, CardFooter, CardHeader, Col, Row } from 'reactstrap';
import FiltroComp from './filtro';
import FormPresta from '../formPresta'
import ListadoPresta from './lista'

const ListPresta = ({
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
    const [windowToggle, setWindowToggle] = useState(false)
    const [nvoForm, setNvoForm] = useState(false)
    const [detallesBool, setDetallesBool] = useState(false)
    const [prestaNombre, setPrestaNombre] = useState("")
    const [idDetalle, setIdDetalle] = useState(0)

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
                                        <h2 className="mb-0" style={{ textAlign: "center" }}>Detalles de {prestaNombre}</h2> :
                                        <h2 className="mb-0" style={{ textAlign: "center" }}>Nuevo Prestador</h2>
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
                                <h2 className="mb-0" style={{ textAlign: "center" }}>Lista de Prestadores</h2>
                            </>
                    }

                </CardHeader>
                {
                    nvoForm ?
                        <FormPresta
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
                            setDetallesBool={setDetallesBool}
                            setIdDetalle={setIdDetalle}
                            setCall={setCall}
                            call={call}
                            setNvoForm={setNvoForm}
                            prestaNombre={prestaNombre}
                            setPrestaNombre={setPrestaNombre}
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
                            <ListadoPresta
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
                                setDetallesBool={setDetallesBool}
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
                                            Nuevo Prestador
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
                    <h2 className="mb-0" style={{ textAlign: "center" }}>Lista de Prestadores</h2>
                </CardHeader>
            </Card>
        )
    }
}

export default ListPresta