import React, { useState, useEffect } from 'react'
import {
    CardHeader,
} from "reactstrap"
import ListaExtractosComp from './subComponents/listaExtractos'
import FiltroComp from './subComponents/filtro'
import ButtonToggle1 from '../../../../../components/subComponents/buttonToggle/buttonToggle1'

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
    setFechaDet,
    setDetBool,
    windowToggle,
    setWindowToggle
}) => {
    const [desde, setDesde] = useState("")
    const [hasta, setHasta] = useState("")
    const [filtro, setFiltro] = useState(false)

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
        setFiltro(false)
    }, [desde, hasta])

    return (
        <>
            <CardHeader className="border-0">
                <ButtonToggle1
                    symbol={
                        windowToggle ? "-" : "+"
                    }
                    textToDo={
                        windowToggle ? "Minimizar" : "Maximizar"
                    }
                    toogle={windowToggle}
                    setToggle={setWindowToggle}
                />
                <h2 className="mb-0" style={{ textAlign: "center" }}>Extractos Banco de Córdoba</h2>
                <FiltroComp
                    desde={desde}
                    hasta={hasta}
                    setDesde={setDesde}
                    setHasta={setHasta}
                    setFiltro={setFiltro}
                    setMsgStrong={setMsgStrong}
                    setMsgGralAlert={setMsgGralAlert}
                    setSuccessAlert={setSuccessAlert}
                    setAlertar={setAlertar}
                    alertar={alertar}
                    windowToggle={windowToggle}
                />
            </CardHeader>
            {
                windowToggle ?
                    <ListaExtractosComp
                        desde={desde}
                        hasta={hasta}
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
                        setFechaDet={setFechaDet}
                        setDetBool={setDetBool}
                    /> :
                    <></>
            }
        </>
    )
}

export default ListaExtractos