import React, { useState } from 'react'
import Filtro from './components/filtro'
import ListaMov from './components/ListaMov'
import Paginacion from 'components/subComponents/Paginacion/Paginacion'

const BuscarMov = ({
    setActividadStr,
    nvaActCall,
    setNvaActCall,
    alertar,
    setAlertar,
    setMsgStrong,
    setMsgGralAlert,
    setSuccessAlert
}) => {
    const [desde, setDesde] = useState("")
    const [hasta, setHasta] = useState("")
    const [filtroStr, setFiltroStr] = useState("")
    const [buscar, setBuscar] = useState(false)
    const [pagina, setPagina] = useState(1)
    const [ultimaPag, setUltimaPag] = useState(0)
    const [pages, setPages] = useState([])
    const [call2, setCall2] = useState(false)
    const [plantPaginas, setPlantPaginas] = useState([])

    return (
        <>
            <Filtro
                desde={desde}
                hasta={hasta}
                setDesde={setDesde}
                setHasta={setHasta}
                setFiltroStr={setFiltroStr}
                filtroStr={filtroStr}
                buscar={buscar}
                setBuscar={setBuscar}
            />
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
                setPagina={setPagina}
                setDetBool={buscar}
                filtroStr={filtroStr}
                filtro={buscar}
                setFiltro={setBuscar}
                desde={desde}
                hasta={hasta}
                setPlantPaginas={setPlantPaginas}
            />
            <Paginacion
                setPagina={setPagina}
                pagina={pagina}
                plantPaginas={plantPaginas}
                ultimaPag={ultimaPag}
                pages={pages}
                setPlantPaginas={setPlantPaginas}
                setUltimaPag={setUltimaPag}
                cantTotal={pages}
                totalPag={ultimaPag}
            />
        </>
    )
}

export default BuscarMov