import React, { useEffect, useState } from "react";
import { UseActivity } from '../../../Hooks/UseActivity'
import { Redirect } from "react-router-dom"
// reactstrap components
import {
    Card,
    CardFooter,
    Container,
    Row,
    Spinner,
    Col,
} from "reactstrap"
// core components
import Header from "components/Headers/Header.js";
import UrlNodeServer from '../../../api/NodeServer'
import AlertaForm from '../../../components/subComponents/alerts/Alerta1'
import Paginacion from '../../../components/subComponents/Paginacion/Paginacion'
import { UseSecureRoutes } from '../../../Hooks/UseSecureRoutes'
import ListaExtractos from './components/ListaExtractos'
import ListaMov from './components/ListaMov'
import ExcelProcess from './components/excelProcess'
import ExcelProcessForm1 from './components/excelProcess2'
import MovSinIdentificar from "./components/movSin";
import BuscarMov from "./components/buscarMov";
import ReplaceImpGstos from "./components/replaceImpGstos";
import BuscarMovBack from "./components/buscarMovback";

const ProductsItems = () => {
    const [alertar, setAlertar] = useState(false)
    const [msgStrongAlert, setMsgStrong] = useState("")
    const [msgGralAlert, setMsgGralAlert] = useState("")
    const [successAlert, setSuccessAlert] = useState(false)
    const [pagina, setPagina] = useState(1)
    const [plantPaginas, setPlantPaginas] = useState([])
    const [ultimaPag, setUltimaPag] = useState(0)
    const [pages, setPages] = useState([])
    const [call2, setCall2] = useState(false)

    const [detBool, setDetBool] = useState(false)
    const [fechaDet, setFechaDet] = useState("")
    const [windowToggle, setWindowToggle] = useState(false)

    const [nvaActCall, setNvaActCall] = useState(false)
    const [actividadStr, setActividadStr] = useState("")
    UseActivity(
        nvaActCall,
        actividadStr
    )
    const [call, setCall] = useState(false)
    const { loading, error } = UseSecureRoutes(
        UrlNodeServer.routesDir.sub.extractosbancarios,
        call
    )

    useEffect(() => {
        setCall(!call)
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        setPagina(1)
        // eslint-disable-next-line
    }, [call2])

    if (loading) {
        return (
            <>
                <div style={{ textAlign: "center", marginTop: "100px" }}>
                    <Spinner type="grow" color="primary" style={{ width: "100px", height: "100px" }} /> </div>
            </>
        )
    } else if (error) {
        return (
            <Redirect
                className="text-light"
                to={process.env.PUBLIC_URL + "/auth/login"}
            />
        )
    } else {
        return (
            <>
                <AlertaForm
                    success={successAlert}
                    msgStrong={msgStrongAlert}
                    msgGral={msgGralAlert}
                    alertar={alertar}
                />
                <Header />
                <Container className="mt--7" fluid>
                    <>
                        <Row>
                            <Col>
                                <Card className="shadow">
                                    {
                                        !detBool ?
                                            <>
                                                <ListaExtractos
                                                    pagina={pagina}
                                                    setActividadStr={setActividadStr}
                                                    nvaActCall={nvaActCall}
                                                    setNvaActCall={setNvaActCall}
                                                    alertar={alertar}
                                                    setAlertar={setAlertar}
                                                    setMsgStrong={setMsgStrong}
                                                    setMsgGralAlert={setMsgGralAlert}
                                                    setSuccessAlert={setSuccessAlert}
                                                    setCall2={setCall2}
                                                    call2={call2}
                                                    setUltimaPag={setUltimaPag}
                                                    setPages={setPages}
                                                    setDetBool={setDetBool}
                                                    setFechaDet={setFechaDet}
                                                    setPagina={setPagina}
                                                    windowToggle={windowToggle}
                                                    setWindowToggle={setWindowToggle}
                                                />
                                            </> :
                                            <ListaMov
                                                pagina={pagina}
                                                setActividadStr={setActividadStr}
                                                nvaActCall={nvaActCall}
                                                setNvaActCall={setNvaActCall}
                                                alertar={alertar}
                                                setAlertar={setAlertar}
                                                setMsgStrong={setMsgStrong}
                                                setMsgGralAlert={setMsgGralAlert}
                                                setSuccessAlert={setSuccessAlert}
                                                setCall2={setCall2}
                                                call2={call2}
                                                setUltimaPag={setUltimaPag}
                                                setPages={setPages}
                                                setDetBool={setDetBool}
                                                setIdDet={setFechaDet}
                                                setPagina={setPagina}
                                                fechaDet={fechaDet}
                                            />
                                    }
                                    {
                                        windowToggle ?
                                            <CardFooter className="py-4">
                                                <nav aria-label="..." style={{ marginBottom: "20px" }}>
                                                    <Paginacion
                                                        setPagina={(pagina) => setPagina(pagina)}
                                                        pagina={pagina}
                                                        plantPaginas={plantPaginas}
                                                        ultimaPag={ultimaPag}
                                                        pages={pages}
                                                        setPlantPaginas={(plantPaginas) => setPlantPaginas(plantPaginas)}
                                                        setUltimaPag={(ultimaPag) => setUltimaPag(ultimaPag)}
                                                    />
                                                </nav>
                                            </CardFooter> :
                                            <></>
                                    }
                                </Card>
                            </Col>
                        </Row>
                        {/*
                         <Row style={{ marginTop: "30px" }}>
                            <Col>
                                <ExcelProcess
                                    setMsgStrong={setMsgStrong}
                                    setMsgGralAlert={setMsgGralAlert}
                                    setSuccessAlert={setSuccessAlert}
                                    setAlertar={setAlertar}
                                    alertar={alertar}
                                    setCall2={setCall2}
                                    call2={call2}
                                />
                            </Col>
                        </Row>
                        <Row style={{ marginTop: "30px" }}>
                            <Col>
                                <ExcelProcessForm1
                                    setMsgStrong={setMsgStrong}
                                    setMsgGralAlert={setMsgGralAlert}
                                    setSuccessAlert={setSuccessAlert}
                                    setAlertar={setAlertar}
                                    alertar={alertar}
                                    setCall2={setCall2}
                                    call2={call2}
                                />
                            </Col>
                        </Row>
                        <Row style={{ marginTop: "30px" }}>
                            <Col>
                                <ReplaceImpGstos
                                    setMsgStrong={setMsgStrong}
                                    setMsgGralAlert={setMsgGralAlert}
                                    setSuccessAlert={setSuccessAlert}
                                    setAlertar={setAlertar}
                                    alertar={alertar}
                                    setCall2={setCall2}
                                    call2={call2}
                                />
                            </Col>
                        </Row>
                        */}

                        <Row style={{ marginTop: "30px" }}>
                            <Col>
                                <ExcelProcess
                                    setMsgStrong={setMsgStrong}
                                    setMsgGralAlert={setMsgGralAlert}
                                    setSuccessAlert={setSuccessAlert}
                                    setAlertar={setAlertar}
                                    alertar={alertar}
                                    setCall2={setCall2}
                                    call2={call2}
                                />
                            </Col>
                        </Row>

                        <Row style={{ marginTop: "30px" }}>
                            <Col>
                                <MovSinIdentificar
                                    setActividadStr={setActividadStr}
                                    nvaActCall={nvaActCall}
                                    setNvaActCall={setNvaActCall}
                                    setMsgStrong={setMsgStrong}
                                    setMsgGralAlert={setMsgGralAlert}
                                    setSuccessAlert={setSuccessAlert}
                                    setAlertar={setAlertar}
                                    alertar={alertar}
                                    setCall={setCall}
                                    call={call}
                                    setDetBool={setDetBool}
                                />
                            </Col>
                        </Row>
                        <Row style={{ marginTop: "30px" }}>
                            <Col>
                                <BuscarMov />
                            </Col>
                        </Row>
                        <Row style={{ marginTop: "30px" }}>
                            <Col>
                                <BuscarMovBack />
                            </Col>
                        </Row>
                    </>
                </Container>
            </>
        )
    }
}

export default ProductsItems;
