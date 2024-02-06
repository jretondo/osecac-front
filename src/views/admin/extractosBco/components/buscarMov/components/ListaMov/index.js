import React, { useEffect } from 'react'
import ListaExtractosComp from './subComponents/listaMovimientos'

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
    desde,
    hasta,
    setDetBool,
    filtroStr,
    filtro,
    setFiltro
}) => {

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
                desde={desde}
                hasta={hasta}
                filtroStr={filtroStr}
                setDetBool={setDetBool}
            />
        </>
    )
}

export default ListaExtractos