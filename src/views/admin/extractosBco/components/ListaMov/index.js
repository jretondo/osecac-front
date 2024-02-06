import React, { useState, useEffect } from 'react'
import {
    CardHeader,
} from "reactstrap"
import ListaExtractosComp from './subComponents/listaMovimientos'
import FiltroComp from './subComponents/filtro'
import moment from 'moment'
import Row from 'reactstrap/lib/Row'
import Col from 'reactstrap/lib/Col'

const ListaExtractos = ({
    pagina,
    setActividadStr,
    nvaActCall,
    setNvaActCall,
    alertar,
    setAlertar,
    setMsgStrong,
    setMsgGralAlert,
    setSuccessAlert,
    setCall2,
    call2,
    setUltimaPag,
    setPages,
    setPagina,
    fechaDet,
    setDetBool
}) => {

    const [filtro, setFiltro] = useState(false)
    const [filtroStr, setFiltroStr] = useState("")

    useEffect(() => {
        setFiltro(false)
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (filtro) {
            setPagina(1)
        }
        // eslint-disable-next-line
    }, [filtro])

    useEffect(() => {
        if (filtro) {
            setFiltro(false)
        }
        // eslint-disable-next-line 
    }, [filtroStr])

    return (
        <>
            <CardHeader className="border-0">
                <Row>
                    <Col md="10" style={{ textAlign: "right" }}>
                        <h1 className="mb-0" style={{ textAlign: "center", color: "gray", fontWeight: "bold", paddingLeft: "20%" }}>Movimientos del {moment(fechaDet, "YYYY-MM-DD").format("DD/MM/YYYY")}</h1>
                    </Col>
                    <Col md="2" style={{ textAlign: "right" }}>
                        <button
                            className="btn btn-danger"
                            onClick={e => {
                                e.preventDefault()
                                setDetBool(false)
                            }}
                        >
                            X
                        </button>
                    </Col>
                </Row>

                <FiltroComp
                    detalleStr={filtroStr}
                    setDetalleStr={setFiltroStr}
                    setFiltro={setFiltro}
                />
            </CardHeader>
            <ListaExtractosComp
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
                setCall2={setCall2}
                call2={call2}
                setPagina={setPages}
                setUltimaPag={setUltimaPag}
                setPages={setPages}
                fechaDet={fechaDet}
                filtroStr={filtroStr}
                setDetBool={setDetBool}
            />
        </>
    )
}

export default ListaExtractos